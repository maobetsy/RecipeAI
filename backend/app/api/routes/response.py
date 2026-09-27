from dotenv import load_dotenv
load_dotenv()

from fastapi import APIRouter, HTTPException
from google import genai
from google.genai import types

from backend.app.models.recipemodel import (
    RecipeRequest,
    RecipeResponse,
)

router = APIRouter()

client = genai.Client()

def generate_recipe_ai(prompt: str) -> str:
    config = types.GenerateContentConfig(
        system_instruction=(
            "You are a fast, efficient kitchen assistant. The user will provide a list of "
            "food ingredients. If ANY input is not a real, edible food ingredient (e.g. it's a "
            "person's name, an object, a brand, gibberish, or anything inedible), respond with "
            "exactly this and nothing else: INVALID_INPUT\n\n"
            "Otherwise, provide exactly one simple recipe using only the provided ingredients. "
            "Start the response with a short, appetizing, creative dish name as a markdown heading "
            "(e.g. '## Garden Veggie Fried Rice') — do NOT simply list the ingredients as the title. "
            "Do not repeat a separate ingredients list section; just include quantities inline within "
            "the steps. Keep the description short. Use clear markdown formatting."
        ),
        max_output_tokens=400,
        temperature=0.3,
    )

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=config,
        )
        return response.text
    except Exception as e:
        return f"Error or Rate Limit Triggered: {e}"

@router.post("/generate_recipe", response_model=RecipeResponse)
async def generate_recipe(request: RecipeRequest):
    recipe = generate_recipe_ai(request.prompt)

    if "INVALID_INPUT" in recipe:
        raise HTTPException(status_code=400, detail="Please enter valid food ingredients.")

    return RecipeResponse(response=recipe)