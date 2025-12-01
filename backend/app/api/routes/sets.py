from fastapi import APIRouter, HTTPException
from app.services.rebrickable import rebrickable_service

router = APIRouter()

@router.get("/{set_num}")
async def get_set_info(set_num: str):
    # This would call the Rebrickable service
    data = await rebrickable_service.get_lego_set(set_num)
    if not data:
        raise HTTPException(status_code=404, detail="Set not found")
    return data

