from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from app.services.prediction_service import predict_prices
from app.services.ai_service import get_ai_explanation

router = APIRouter()

# In-memory commodity data (realistic Indian market prices — May 2026)
COMMODITIES = [
    {"id": "petrol", "name": "Petrol", "price": 108.2, "unit": "₹/L", "change": 3.2, "sector": "Energy"},
    {"id": "diesel", "name": "Diesel", "price": 94.7, "unit": "₹/L", "change": 2.8, "sector": "Energy"},
    {"id": "lpg", "name": "LPG Cylinder", "price": 903, "unit": "₹", "change": 1.5, "sector": "Energy"},
    {"id": "rice", "name": "Rice (Basmati)", "price": 72, "unit": "₹/kg", "change": -1.2, "sector": "Agriculture"},
    {"id": "wheat", "name": "Wheat Flour", "price": 38, "unit": "₹/kg", "change": 0.8, "sector": "Agriculture"},
    {"id": "gold", "name": "Gold (24K)", "price": 7842, "unit": "₹/g", "change": 5.1, "sector": "Precious Metals"},
    {"id": "silver", "name": "Silver", "price": 98.4, "unit": "₹/g", "change": 3.9, "sector": "Precious Metals"},
    {"id": "crude", "name": "Crude Oil", "price": 82.5, "unit": "$/bbl", "change": 4.2, "sector": "Energy"},
    {"id": "onion", "name": "Onion", "price": 42, "unit": "₹/kg", "change": 8.5, "sector": "Agriculture"},
    {"id": "tomato", "name": "Tomato", "price": 55, "unit": "₹/kg", "change": 12.3, "sector": "Agriculture"},
    {"id": "egg", "name": "Eggs (12pc)", "price": 78, "unit": "₹", "change": 2.1, "sector": "Essentials"},
    {"id": "sugar", "name": "Sugar", "price": 45, "unit": "₹/kg", "change": -0.5, "sector": "Agriculture"},
]

# Historical price data for predictions
HISTORY = {
    "petrol": [94, 96, 99, 101, 103, 105, 106, 108, 108.2],
    "diesel": [84, 85, 87, 89, 91, 92, 93, 94, 94.7],
    "lpg": [820, 835, 850, 862, 875, 885, 890, 895, 903],
    "rice": [80, 78, 77, 76, 75, 74, 73, 72, 72],
    "wheat": [34, 34.5, 35, 35.5, 36, 37, 37, 37.5, 38],
    "gold": [6800, 7000, 7200, 7350, 7500, 7600, 7700, 7800, 7842],
    "silver": [82, 84, 87, 89, 91, 94, 95, 97, 98.4],
    "crude": [72, 74, 76, 77, 78, 80, 81, 82, 82.5],
    "onion": [28, 30, 32, 35, 37, 38, 39, 40, 42],
    "tomato": [30, 32, 35, 40, 45, 42, 38, 42, 55],
    "egg": [65, 67, 69, 71, 73, 74, 75, 76, 78],
    "sugar": [48, 47, 47, 46, 46, 46, 45, 45, 45],
}


@router.get("/")
async def get_commodities():
    """Get all tracked commodities with current prices."""
    return {"commodities": COMMODITIES, "total": len(COMMODITIES), "updated": "May 2026"}


@router.get("/{commodity_id}")
async def get_commodity(commodity_id: str):
    """Get detailed info for a single commodity."""
    commodity = next((c for c in COMMODITIES if c["id"] == commodity_id), None)
    if not commodity:
        return {"error": "Commodity not found"}
    history = HISTORY.get(commodity_id, [])
    return {"commodity": commodity, "history": history}


@router.get("/{commodity_id}/predict")
async def get_prediction(commodity_id: str, months: int = 4):
    """Get AI price predictions for a commodity (targeting 2026)."""
    commodity = next((c for c in COMMODITIES if c["id"] == commodity_id), None)
    if not commodity:
        return {"error": "Commodity not found"}
    
    history = HISTORY.get(commodity_id, [])
    if not history:
        return {"error": "No historical data available"}
    
    prediction = predict_prices(commodity["name"], history, months_ahead=months)
    return {
        "commodity": commodity["name"],
        "current_price": commodity["price"],
        "prediction": prediction,
    }


class ExplainRequest(BaseModel):
    commodity_id: str
    context: Optional[str] = ""


@router.post("/explain")
async def explain_commodity(req: ExplainRequest):
    """Get AI-powered explanation for a commodity's price trend."""
    commodity = next((c for c in COMMODITIES if c["id"] == req.commodity_id), None)
    if not commodity:
        return {"error": "Commodity not found"}
    
    history = HISTORY.get(req.commodity_id, [])
    result = await get_ai_explanation(
        commodity_name=commodity["name"],
        current_price=commodity["price"],
        price_change_pct=commodity["change"],
        historical_summary=str(history[-6:]),
        prediction_summary=req.context,
    )
    return result
