"use client";

import { useState } from "react";

export default function Home() {
  const [ingredient, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ingredient.trim()) return;

    setLoading(true);
    setError("");
    setRecipe("");

    try {
      const res = await fetch("http://localhost:8000/api/generate_recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `Generate a recipe using: ${ingredient}` }),
      });

      if (!res.ok) throw new Error("Failed to generate recipe");

      const data = await res.json();
      setRecipe(data.response);
    } catch (err) {
      setError("Something went wrong. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Recipe Generator
          </h1>
          <form onSubmit={handleSubmit}>
            <input type="text" 
            placeholder="Enter an ingredient..." 
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={ingredient}
            onChange={(e) => setIngredients(e.target.value)}
            ></input>
            <button 
              type="submit" 
              disabled={loading}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {loading ? "Generating..." : "Generate Recipe"}
            </button>
          </form>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {recipe && (
            <div className="mt-6 p-4 border border-gray-200 rounded-md bg-zinc-50 dark:bg-zinc-900 w-full">
              <h2 className="text-lg font-semibold mb-2 dark:text-zinc-50">Your Recipe</h2>
              <p className="text-gray-700 dark:text-zinc-300 whitespace-pre-wrap">{recipe}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}