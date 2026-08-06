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

# client = genai.Client()

# interaction = client.interactions.create(
#     model="gemini-3.5-flash",
#     input="Explain how AI works in a few words"
# )
# print(interaction.output_text)