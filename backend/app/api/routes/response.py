from dotenv import load_dotenv
load_dotenv()

from fastapi import APIRouter
from google import genai
from google.genai import types

from backend.app.models.recipemodel import (
    Recipe,
    RecipeRequest,
    RecipeResponse,
)

router = APIRouter()

def generate_recipe_ai(prompt):
    
    client = genai.Client()

    config = types.GenerateContentConfig(
    response_mime_type="application/json",
    response_schema=Recipe
)

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,     
       config=config
    
    )
    return Recipe.model_validate_json(response.text)

@router.post(
    "/generate_recipe",
    response_model=RecipeResponse
)
async def generate_recipe(request: RecipeRequest):

    recipe = generate_recipe_ai(request.prompt)

    return RecipeResponse(
        recipe=recipe
    )