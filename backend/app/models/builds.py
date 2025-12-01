from typing import List, Optional
from pydantic import BaseModel

class BrickInstance(BaseModel):
    id: str
    type_id: str
    color_id: str
    position: List[float] # [x, y, z]
    rotation: List[float] # [x, y, z]

class BuildBase(BaseModel):
    name: str
    description: Optional[str] = None

class BuildCreate(BuildBase):
    bricks: List[BrickInstance]

class Build(BuildBase):
    id: str
    bricks: List[BrickInstance]

    class Config:
        from_attributes = True

