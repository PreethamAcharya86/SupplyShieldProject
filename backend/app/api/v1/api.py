from fastapi import APIRouter
from app.api.v1.endpoints import commodities, alerts, locality, auth

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(commodities.router, prefix="/commodities", tags=["commodities"])
api_router.include_router(alerts.router, prefix="/alerts", tags=["alerts"])
api_router.include_router(locality.router, prefix="/locality", tags=["locality"])
