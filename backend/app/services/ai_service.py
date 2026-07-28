import os
import httpx
from typing import Optional

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"


async def get_ai_explanation(
    commodity_name: str,
    current_price: float,
    price_change_pct: float,
    historical_summary: str = "",
    prediction_summary: str = "",
) -> dict:
    """
    Use Groq LLM to generate an AI explanation of commodity price trends.
    Returns a structured response with the explanation text.
    """
    if not GROQ_API_KEY:
        return {
            "explanation": "AI service unavailable — GROQ_API_KEY not configured.",
            "model": "none",
            "error": True,
        }

    prompt = f"""You are SupplyShield AI, an expert commodity analyst specializing in Indian markets in 2026.

Commodity: {commodity_name}
Current Price: {current_price}
Recent Change: {price_change_pct:+.1f}%
Historical Data: {historical_summary}
AI Predictions: {prediction_summary}

Provide a concise analysis (150 words max) covering:
1. Why prices moved this way (key drivers)
2. Risk factors for the next 3-4 months in 2026
3. One actionable tip for Indian consumers

Use bullet points. Be specific to Indian context. Reference real-world events like monsoons, OPEC, trade policies."""

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                GROQ_API_URL,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {GROQ_API_KEY}",
                },
                json={
                    "model": "llama-3.1-8b-instant",
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.7,
                    "max_tokens": 300,
                },
            )
            data = response.json()
            explanation = data.get("choices", [{}])[0].get("message", {}).get("content", "")
            return {
                "explanation": explanation or "Unable to generate analysis.",
                "model": "llama-3.1-8b-instant",
                "error": False,
            }
    except Exception as e:
        return {
            "explanation": f"AI service error: {str(e)}",
            "model": "none",
            "error": True,
        }
