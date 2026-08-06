from dotenv import load_dotenv
load_dotenv()

from google import genai

from fastapi import FastAPI

from backend.app.api.routes.response import router as recipe_router

app = FastAPI()

app.include_router(
    recipe_router,
    prefix="/api",
    tags=["Recipes"]
)
