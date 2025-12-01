from fastapi import APIRouter, HTTPException
from typing import List
from app.models.challenges import Challenge

router = APIRouter()

@router.get("/{challenge_id}", response_model=Challenge)
async def get_challenge(challenge_id: str):
    # Stub
    if challenge_id == "1":
        return Challenge(
            id="1",
            title="Bridge Builder",
            description="Build a bridge that spans 10 units.",
            difficulty=2,
            allowed_parts=[]
        )
    raise HTTPException(status_code=404, detail="Challenge not found")

@router.get("/", response_model=List[Challenge])
async def list_challenges():
    return [
        Challenge(
            id="1",
            title="Bridge Builder",
            description="Build a bridge that spans 10 units.",
            difficulty=2,
            allowed_parts=[]
        )
    ]

