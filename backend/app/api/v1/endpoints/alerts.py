from fastapi import APIRouter
from typing import List

router = APIRouter()

@router.get("/")
async def get_alerts():
    """
    Get live crisis and shortage alerts.
    """
    return [
        {
            "id": 1,
            "title": "Red Sea Shipping Crisis",
            "severity": "critical",
            "commodity": "Crude Oil",
            "impact": "+12% price risk",
            "time": "2h ago"
        },
        {
            "id": 2,
            "title": "Heavy Rain Alert: South Region",
            "severity": "high",
            "commodity": "Vegetables",
            "impact": "+15% price risk",
            "time": "4h ago"
        }
    ]
