from pydantic import BaseModel

class RecipeRequest(BaseModel):
    prompt: str

class Ingredient(BaseModel):
    name: str
    amount: float | None = None
    unit: str | None = None
    notes: str | None = None

class Step(BaseModel):
    instruction: str

class Recipe(BaseModel):
    title: str
    description: str
    servings: int
    prep_time_minutes: int
    cook_time_minutes: int
    ingredients: list[Ingredient]
    steps: list[Step]
    tips: list[str]

class RecipeResponse(BaseModel):
    recipe: Recipe | None = None
    error: str | None = None