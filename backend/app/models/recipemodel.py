from pydantic import BaseModel

class RecipeRequest(BaseModel):
    prompt: str

class RecipeResponse(BaseModel):
    response: str