from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI

from fastapi import APIRouter
from google import genai

from backend.app.models.recipemodel import (
    RecipeRequest,
    RecipeResponse,
)

router = APIRouter()

# @router.post(
#     "/generate_recipe",
#     response_model=RecipeResponse
# )
# async def generate_recipe(request: RecipeRequest):

#     return RecipeResponse(
#         response=request.prompt
#     )

def generate_recipe_ai(prompt):
    
    client = genai.Client()

    interaction = client.interactions.create(
        model="gemini-2.5-flash",
        input=prompt
    )
    return interaction.output_text

@router.post(
    "/generate_recipe",
    response_model=RecipeResponse
)
async def generate_recipe(request: RecipeRequest):

    recipe = generate_recipe_ai(request.prompt)

    return RecipeResponse(
        response=recipe
    )