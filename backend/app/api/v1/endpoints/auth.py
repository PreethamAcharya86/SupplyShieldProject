from fastapi import APIRouter

router = APIRouter()

@router.post("/login")
async def login():
    return {"access_token": "dummy-token", "token_type": "bearer"}

@router.post("/register")
async def register():
    return {"message": "User registered successfully"}
