import Link from "next/link";
import { formatMinutes, type Recipe } from "@/data/recipes";

const DIFFICULTY_STYLE: Record<Recipe["difficulty"], string> = {
  Mudah: "bg-green-100 text-green-800",
  Sedang: "bg-amber-100 text-amber-800",
  Sulit: "bg-red-100 text-red-800",
};

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const total = recipe.prepTime + recipe.cookTime;
  return (
    <Link
      href={`/resep/${recipe.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="bg-gradient-to-br from-red-700 to-red-900 px-5 py-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-red-200">
          {recipe.region}
        </p>
        <h2 className="mt-1 text-xl font-bold leading-tight group-hover:underline">
          {recipe.name}
        </h2>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="line-clamp-2 text-sm text-stone-600">
          {recipe.description}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2 text-xs font-medium">
          <span className="rounded-full bg-stone-100 px-3 py-1 text-stone-700">
            ⏱️ {formatMinutes(total)}
          </span>
          <span
            className={`rounded-full px-3 py-1 ${DIFFICULTY_STYLE[recipe.difficulty]}`}
          >
            {recipe.difficulty}
          </span>
          <span className="rounded-full bg-red-50 px-3 py-1 text-red-800">
            {recipe.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
