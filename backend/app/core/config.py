import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "GOLEGO API"
    API_V1_STR: str = "/api/v1"
    
    # Placeholder for future env vars
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "https://your-project.supabase.co")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "your-anon-key")
    REBRICKABLE_API_KEY: str = os.getenv("REBRICKABLE_API_KEY", "")

    class Config:
        case_sensitive = True

settings = Settings()

