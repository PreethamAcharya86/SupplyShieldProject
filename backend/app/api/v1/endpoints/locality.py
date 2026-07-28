from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ReportCreate(BaseModel):
    region: str
    type: str
    comment: str

@router.get("/reports")
async def get_locality_reports():
    """
    Get community field reports.
    """
    return [
        {"id": 1, "user": "Arjun S.", "region": "South Asia", "comment": "Flooding disrupting routes.", "type": "Crisis"},
        {"id": 2, "user": "Priya K.", "region": "East Africa", "comment": "Drought worsening.", "type": "News"},
    ]

@router.post("/reports")
async def create_locality_report(report: ReportCreate):
    """
    Submit a new community field report.
    """
    return {"status": "success", "message": "Report submitted", "data": report}
