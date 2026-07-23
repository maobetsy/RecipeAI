"use client";

import { useState } from "react";

export default function Home() {
  const [ingredient, setIngredients] = useState("");

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Recipe Generator
          </h1>
          <form>
            <input type="text" 
            placeholder="Enter an ingredient..." 
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={ingredient}
            onChange={(e) => setIngredients(e.target.value)}
            ></input>
            <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Generate
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
