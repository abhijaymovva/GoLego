from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import builds, challenges, sets

app = FastAPI(title=settings.PROJECT_NAME)

# CORS Setup
origins = [
    "http://localhost:3000", # Frontend
    "http://localhost:5173", # Vite default if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(builds.router, prefix="/api/v1/builds", tags=["builds"])
app.include_router(challenges.router, prefix="/api/v1/challenges", tags=["challenges"])
app.include_router(sets.router, prefix="/api/v1/sets", tags=["sets"])

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/")
def root():
    return {"message": "Welcome to GOLEGO API"}

