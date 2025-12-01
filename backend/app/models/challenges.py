from typing import List, Optional
from pydantic import BaseModel

class AllowedPart(BaseModel):
    part_id: str
    max_quantity: Optional[int] = None

class ChallengeBase(BaseModel):
    title: str
    description: str
    difficulty: int # 1-5

class Challenge(ChallengeBase):
    id: str
    allowed_parts: List[AllowedPart] = []

    class Config:
        from_attributes = True

