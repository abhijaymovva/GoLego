import httpx
from app.core.config import settings

class RebrickableClient:
    def __init__(self):
        self.base_url = "https://rebrickable.com/api/v3"
        self.api_key = settings.REBRICKABLE_API_KEY

    async def get_lego_set(self, set_num: str):
        # Placeholder for actual implementation
        # headers = {"Authorization": f"key {self.api_key}"}
        # async with httpx.AsyncClient() as client:
        #     resp = await client.get(f"{self.base_url}/lego/sets/{set_num}/", headers=headers)
        #     return resp.json()
        
        # Stub return
        return {
            "set_num": set_num,
            "name": "Placeholder Set",
            "year": 2024,
            "num_parts": 100
        }

rebrickable_service = RebrickableClient()

