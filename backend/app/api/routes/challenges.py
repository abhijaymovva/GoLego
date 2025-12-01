from fastapi import APIRouter, HTTPException
from typing import List
from app.models.challenges import Challenge, AllowedPart
from app.models.builds import BrickInstance

router = APIRouter()

# Hardcoded Challenge
TARGET_BRICKS = [
    BrickInstance(id="t1", type_id="2x4", color_id="#C91A09", position=[0, 0.48, 0], rotation=[0,0,0]),
    BrickInstance(id="t2", type_id="2x4", color_id="#C91A09", position=[2, 0.48, 0], rotation=[0,0,0]),
    BrickInstance(id="t3", type_id="2x4", color_id="#C91A09", position=[1, 1.44, 0], rotation=[0,0,0])
]

CHALLENGES = {
    "1": Challenge(
        id="1",
        title="Red Pyramid",
        description="Build a simple pyramid with 3 Red 2x4 Bricks.",
        difficulty=1,
        allowed_parts=[
            AllowedPart(part_id="2x4", max_quantity=5)
        ]
        # In a real app, we'd store the target build structure too, but not expose it directly in the model maybe?
        # For now, we won't serve the target build structure to the client to avoid cheating,
        # OR we serve it as a "ghost" to match. Let's assume we validate on client for this step as requested.
    )
}

# We need to expose the target for client-side validation as requested in the prompt
# "Implement a simple validation function that compares the current build to targetBuild"
# So I'll add a target_build field to the response dynamically or just hardcode it in frontend?
# The prompt says: "Hardcode a single Challenge in memory... Implement GET /challenges/{id}"
# "Frontend: Fetch the hardcoded challenge... Implement a simple validation function that compares... to targetBuild"
# So the API needs to return the target build.

@router.get("/{challenge_id}")
async def get_challenge(challenge_id: str):
    if challenge_id not in CHALLENGES:
        raise HTTPException(status_code=404, detail="Challenge not found")
    
    c = CHALLENGES[challenge_id]
    # Augment with target data for the frontend to validate
    return {
        **c.model_dump(),
        "targetBuild": {
            "id": "target",
            "name": "Target",
            "bricks": [b.model_dump() for b in TARGET_BRICKS]
        }
    }

@router.get("/", response_model=List[Challenge])
async def list_challenges():
    return list(CHALLENGES.values())
