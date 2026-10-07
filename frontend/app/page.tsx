import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 px-6 text-center dark:bg-black">
      <h1 className="text-5xl font-bold tracking-tight text-black dark:text-zinc-50">
        Recipe AI
      </h1>
      <p className="max-w-md text-lg text-gray-600 dark:text-zinc-400">
        Turn ingredients into recipes.
      </p>
      <Link
        href="/generate"
        className="rounded-lg bg-blue-500 px-6 py-3 font-bold text-white hover:bg-blue-700"
      >
        Get Started
      </Link>
    </div>
  );
}