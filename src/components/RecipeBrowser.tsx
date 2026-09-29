"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, type Category, type Recipe } from "@/data/recipes";
import RecipeCard from "./RecipeCard";

const CATEGORY_EMOJI: Record<Category, string> = {
  "Makanan Utama": "🍚",
  "Lauk": "🍗",
  "Sayur": "🥬",
  "Sambal": "🌶️",
  "Jajanan & Dessert": "🍰",
  "Minuman": "🥤",
};

export default function RecipeBrowser({ recipes }: { recipes: Recipe[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "Semua">("Semua");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter((r) => {
      const matchCategory =
        activeCategory === "Semua" || r.category === activeCategory;
      const matchQuery =
        q === "" ||
        r.name.toLowerCase().includes(q) ||
        r.region.toLowerCase().includes(q) ||
        r.ingredients.some((i) => i.toLowerCase().includes(q));
      return matchCategory && matchQuery;
    });
  }, [recipes, query, activeCategory]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-200">
            🇮🇩 Kuliner Indonesia
          </p>
          <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">
            Resep Nusantara
          </h1>
          <p className="mt-3 max-w-2xl text-red-100">
            Kumpulan resep autentik dari Sabang sampai Merauke — lengkap dengan
            bahan, langkah memasak, dan estimasi waktu. Cari resep favoritmu di
            bawah.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-xl">
            <label htmlFor="search" className="sr-only">
              Cari resep
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                🔍
              </span>
              <input
                id="search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari resep, bahan, atau daerah… (mis. rendang)"
                className="w-full rounded-full bg-white py-3 pl-12 pr-5 text-stone-900 shadow-lg outline-none placeholder:text-stone-400 focus:ring-4 focus:ring-red-300"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Category chips */}
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
          {(["Semua", ...CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-red-700 text-white shadow"
                  : "bg-white text-stone-700 ring-1 ring-stone-200 hover:bg-stone-100"
              }`}
            >
              {cat === "Semua" ? "🍽️ Semua" : `${CATEGORY_EMOJI[cat]} ${cat}`}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-6 text-sm text-stone-500">
          Menampilkan{" "}
          <span className="font-semibold text-stone-800">{filtered.length}</span>{" "}
          dari {recipes.length} resep
          {query && (
            <>
              {" "}
              untuk <span className="font-semibold">“{query}”</span>
            </>
          )}
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center ring-1 ring-stone-200">
            <p className="text-4xl">🍳</p>
            <p className="mt-3 text-lg font-semibold">Resep tidak ditemukan</p>
            <p className="mt-1 text-stone-500">
              Coba kata kunci lain atau pilih kategori yang berbeda.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-stone-500">
          <p className="font-semibold text-stone-700">Resep Nusantara 🇮🇩</p>
          <p className="mt-1">
            Melestarikan cita rasa Indonesia, satu resep dalam satu waktu.
          </p>
        </div>
      </footer>
    </div>
  );
}
