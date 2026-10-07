"use client";

import { useState } from "react";

type Ingredient = {
  name: string;
  amount: number | null;
  unit: string | null;
  notes: string | null;
};

type Step = {
  instruction: string;
};

type Recipe = {
  title: string;
  description: string;
  servings: number;
  prep_time_minutes: number;
  cook_time_minutes: number;
  ingredients: Ingredient[];
  steps: Step[];
  tips: string[];
};

export default function Home() {
  const [ingredient, setIngredients] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!ingredient.trim()) return;

    setLoading(true);
    setError("");
    setRecipe(null);

    try {
      const res = await fetch("http://localhost:8000/api/generate_recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: ingredient }),
      });

      if (!res.ok) throw new Error("Failed to generate recipe");

      const data = await res.json();
      if (data.error) setError(data.error);
      else setRecipe(data.recipe);
    } catch (err) {
      setError("Something went wrong. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex w-full flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Recipe Generator
          </h1>
          <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter an ingredient..."
                className="border border-gray-300 rounded-md py-2 px-4 bg-white text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={ingredient}
                onChange={(e) => setIngredients(e.target.value)}
              />
            <button
              type="submit"
              disabled={loading}
              className="mt-4 ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Recipe"}
            </button>

          {loading && (
            <div className="pt-6">
              <div className="animate-spin h-96 w-96 border-4 border-blue-500 border-t-transparent rounded-full pt-6">
              </div>
            </div>
          )}
            
          </form>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {recipe && (
            <article className="mt-6 w-full space-y-8 rounded-md border border-gray-200 bg-zinc-50 p-6 text-left dark:bg-zinc-900 dark:border-zinc-700">
              <header>
                <h2 className="text-2xl font-bold text-black dark:text-zinc-50">
                  {recipe.title}
                </h2>
                <p className="mt-2 text-gray-600 dark:text-zinc-400">
                  {recipe.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-800">
                    Serves {recipe.servings}
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-800">
                    Prep {recipe.prep_time_minutes} min
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-800">
                    Cook {recipe.cook_time_minutes} min
                  </span>
                </div>
              </header>

              <section>
                <h3 className="mb-3 text-xl font-semibold text-black dark:text-zinc-50">
                  Ingredients
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-zinc-300">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="w-28 shrink-0 font-medium">
                        {[ing.amount, ing.unit].filter(Boolean).join(" ")}
                      </span>
                      <span>
                        {ing.name}
                        {ing.notes && (
                          <span className="text-gray-500"> ({ing.notes})</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-xl font-semibold text-black dark:text-zinc-50">
                  Steps
                </h3>
                <ol className="space-y-4 text-gray-700 dark:text-zinc-300">
                  {recipe.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <p>{step.instruction}</p>
                        
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {recipe.tips.length > 0 && (
                <section>
                  <h3 className="mb-3 text-xl font-semibold text-black dark:text-zinc-50">
                    Tips
                  </h3>
                  <ul className="list-disc space-y-2 pl-5 text-gray-700 dark:text-zinc-300">
                    {recipe.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </section>
              )}
            </article>
          )}
        </div>
      </main>
    </div>
  );
}