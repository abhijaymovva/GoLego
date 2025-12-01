from fastapi import APIRouter, HTTPException
from typing import List, Dict
from app.models.builds import Build, BuildCreate
import uuid

router = APIRouter()

# In-memory storage
builds_db: Dict[str, Build] = {}

@router.post("/", response_model=Build)
async def create_build(build_in: BuildCreate):
    build_id = str(uuid.uuid4())
    # create new build preserving all fields from input
    new_build = Build(id=build_id, **build_in.model_dump())
    builds_db[build_id] = new_build
    return new_build

@router.get("/{build_id}", response_model=Build)
async def get_build(build_id: str):
    if build_id not in builds_db:
        raise HTTPException(status_code=404, detail="Build not found")
    return builds_db[build_id]

@router.get("/", response_model=List[Build])
async def list_builds():
    return list(builds_db.values())
