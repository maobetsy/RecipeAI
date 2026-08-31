from dotenv import load_dotenv
load_dotenv()

from google import genai

from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.routes.response import router as recipe_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    recipe_router,
    prefix="/api",
    tags=["Recipes"]
)