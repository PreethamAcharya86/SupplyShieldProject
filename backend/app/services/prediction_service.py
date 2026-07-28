import os
import math
import numpy as np
from typing import Optional

# Try to load the Keras model
MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'models', 'commodity_model.h5')

_model = None
_model_input_shape = None

def _load_model():
    """Lazily load the Keras LSTM model."""
    global _model, _model_input_shape
    if _model is not None:
        return _model
    try:
        import tensorflow as tf
        if os.path.exists(MODEL_PATH):
            _model = tf.keras.models.load_model(MODEL_PATH)
            _model_input_shape = _model.input_shape  # e.g. (None, timesteps, features)
            print(f"[PredictionService] Model loaded from {MODEL_PATH}")
            print(f"[PredictionService] Model input shape: {_model_input_shape}")
            print(f"[PredictionService] Model output shape: {_model.output_shape}")
        else:
            print(f"[PredictionService] Model file not found at {MODEL_PATH}")
    except ImportError:
        print("[PredictionService] TensorFlow not installed. Using statistical fallback.")
    except Exception as e:
        print(f"[PredictionService] Model load error: {e}")
    return _model


def _sanitize_float(v):
    """Ensure a float value is JSON-safe (no NaN/Inf)."""
    if v is None or math.isnan(v) or math.isinf(v):
        return 0.0
    return round(float(v), 2)


def predict_prices(
    commodity_name: str,
    historical_prices: list[float],
    months_ahead: int = 4,
) -> dict:
    """
    Generate price predictions for a commodity.
    Uses the LSTM model if available, otherwise falls back to
    statistical extrapolation (linear trend + seasonal noise).
    """
    model = _load_model()

    if model is not None and len(historical_prices) >= 3:
        try:
            result = _predict_with_model(model, historical_prices, months_ahead, commodity_name)
            # Validate result
            if all(p != 0.0 for p in result["predictions"]):
                return result
            print(f"[PredictionService] Model returned zeros for {commodity_name}, using fallback.")
        except Exception as e:
            print(f"[PredictionService] Model prediction failed for {commodity_name}: {e}. Falling back.")

    return _predict_statistical(historical_prices, months_ahead)


def _predict_with_model(model, prices: list[float], months_ahead: int, commodity_name: str) -> dict:
    """Run LSTM model prediction, adapting input shape to match model expectations."""
    import tensorflow as tf

    data = np.array(prices, dtype=np.float32)
    
    # Normalize to 0-1 range
    min_val = float(data.min())
    max_val = float(data.max())
    scale_range = max_val - min_val if max_val != min_val else 1.0
    normalized = (data - min_val) / scale_range

    # Determine the expected input sequence length from the model
    expected_shape = model.input_shape  # e.g. (None, 6, 1) or (None, 10, 1)
    if expected_shape and len(expected_shape) == 3 and expected_shape[1] is not None:
        seq_len = expected_shape[1]
    else:
        seq_len = min(len(normalized), 6)
    
    n_features = expected_shape[2] if (expected_shape and len(expected_shape) == 3 and expected_shape[2]) else 1

    # Pad or truncate the sequence to match expected length
    if len(normalized) >= seq_len:
        input_data = normalized[-seq_len:]
    else:
        # Pad with the first value if we don't have enough data
        pad_len = seq_len - len(normalized)
        input_data = np.concatenate([np.full(pad_len, normalized[0]), normalized])

    # Reshape: (batch=1, timesteps=seq_len, features=n_features)
    if n_features == 1:
        input_seq = input_data.reshape(1, seq_len, 1)
    else:
        # Tile data across features if model expects multiple
        input_seq = np.tile(input_data.reshape(1, seq_len, 1), (1, 1, n_features))

    predictions_normalized = []
    current_input = input_seq.copy()

    for step in range(months_ahead):
        pred = model.predict(current_input, verbose=0)
        
        # Handle various output shapes
        if pred.ndim == 3:
            pred_val = float(pred[0, -1, 0])
        elif pred.ndim == 2:
            pred_val = float(pred[0, 0])
        else:
            pred_val = float(pred[0])
        
        # Clamp to valid range
        pred_val = max(0.0, min(pred_val, 2.0))  # normalized range guard
        predictions_normalized.append(pred_val)

        # Slide window: drop first timestep, append new prediction
        new_step = np.full((1, 1, current_input.shape[2]), pred_val)
        current_input = np.concatenate([current_input[:, 1:, :], new_step], axis=1)

    # Denormalize back to real price scale
    predictions = [p * scale_range + min_val for p in predictions_normalized]

    # Confidence bands based on historical volatility
    std_dev = float(np.std(prices[-min(6, len(prices)):]))
    if std_dev == 0:
        std_dev = abs(prices[-1]) * 0.03  # 3% of current price as minimum band

    upper = [p + std_dev * (1.0 + 0.25 * i) for i, p in enumerate(predictions)]
    lower = [p - std_dev * (1.0 + 0.25 * i) for i, p in enumerate(predictions)]

    print(f"[PredictionService] {commodity_name} LSTM predictions: {[_sanitize_float(p) for p in predictions]}")

    return {
        "predictions": [_sanitize_float(p) for p in predictions],
        "upper_band": [_sanitize_float(u) for u in upper],
        "lower_band": [_sanitize_float(l) for l in lower],
        "confidence": 0.88,
        "method": "lstm",
        "target_year": 2026,
    }


def _predict_statistical(prices: list[float], months_ahead: int) -> dict:
    """Simple linear trend + noise fallback."""
    if len(prices) < 2:
        last = prices[-1] if prices else 100.0
        return {
            "predictions": [_sanitize_float(last)] * months_ahead,
            "upper_band": [_sanitize_float(last * 1.05)] * months_ahead,
            "lower_band": [_sanitize_float(last * 0.95)] * months_ahead,
            "confidence": 0.5,
            "method": "statistical",
            "target_year": 2026,
        }

    n = len(prices)
    x = np.arange(n, dtype=np.float64)
    coeffs = np.polyfit(x, prices, 1)
    slope = float(coeffs[0])
    last_price = float(prices[-1])
    std_dev = float(np.std(prices[-min(6, n):]))
    if std_dev == 0:
        std_dev = abs(last_price) * 0.03

    predictions = []
    upper = []
    lower = []

    for i in range(1, months_ahead + 1):
        pred = last_price + slope * i
        band = std_dev * (1.0 + 0.25 * i)
        predictions.append(_sanitize_float(pred))
        upper.append(_sanitize_float(pred + band))
        lower.append(_sanitize_float(pred - band))

    return {
        "predictions": predictions,
        "upper_band": upper,
        "lower_band": lower,
        "confidence": 0.72,
        "method": "statistical",
        "target_year": 2026,
    }
