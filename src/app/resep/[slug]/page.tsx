import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatMinutes, getRecipe, recipes } from "@/data/recipes";
import IngredientChecklist from "./IngredientChecklist";

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) return { title: "Resep tidak ditemukan — Resep Nusantara" };
  return {
    title: `${recipe.name} — Resep Nusantara`,
    description: recipe.description,
  };
}

const DIFFICULTY_STYLE: Record<string, string> = {
  Mudah: "bg-green-100 text-green-800",
  Sedang: "bg-amber-100 text-amber-800",
  Sulit: "bg-red-100 text-red-800",
};

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();

  const total = recipe.prepTime + recipe.cookTime;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/25"
          >
            ← Kembali ke semua resep
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-red-200">
            {recipe.region} • {recipe.category}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">
            {recipe.name}
          </h1>
          <p className="mt-3 max-w-2xl text-red-100">{recipe.description}</p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10">
        {/* Meta info */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Persiapan", value: `⏱️ ${formatMinutes(recipe.prepTime)}` },
            { label: "Memasak", value: `🍳 ${formatMinutes(recipe.cookTime)}` },
            { label: "Total", value: `⌛ ${formatMinutes(total)}` },
            { label: "Porsi", value: `🍽️ ${recipe.servings} porsi` },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-2xl bg-white p-4 text-center ring-1 ring-stone-200"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
                {m.label}
              </p>
              <p className="mt-1 font-bold">{m.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${DIFFICULTY_STYLE[recipe.difficulty]}`}
          >
            Tingkat: {recipe.difficulty}
          </span>
          <span className="rounded-full bg-red-50 px-4 py-1.5 text-sm font-medium text-red-800">
            {recipe.category}
          </span>
          <span className="rounded-full bg-stone-100 px-4 py-1.5 text-sm font-medium text-stone-700">
            📍 {recipe.region}
          </span>
        </div>

        {/* Ingredients */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold">
            🧂 Bahan-bahan{" "}
            <span className="text-base font-normal text-stone-500">
              ({recipe.ingredients.length} item — ketuk untuk mencoret)
            </span>
          </h2>
          <div className="mt-4">
            <IngredientChecklist ingredients={recipe.ingredients} />
          </div>
        </section>

        {/* Steps */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold">👩‍🍳 Cara Membuat</h2>
          <ol className="mt-4 space-y-3">
            {recipe.steps.map((step, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-stone-200"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-700 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-stone-800 sm:text-base">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-10 rounded-2xl bg-red-50 p-6 text-center ring-1 ring-red-100">
          <p className="font-semibold text-red-900">Selamat memasak! 🎉</p>
          <p className="mt-1 text-sm text-red-700">
            Bagikan hasilnya ke keluarga dan teman — masakan Indonesia paling
            enak dimakan bersama.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-full bg-red-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            Jelajahi resep lainnya
          </Link>
        </div>
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-8 text-center text-sm text-stone-500">
          <p className="font-semibold text-stone-700">Resep Nusantara 🇮🇩</p>
        </div>
      </footer>
    </div>
  );
}
