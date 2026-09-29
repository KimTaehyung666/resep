"use client";

import { useState } from "react";

export default function IngredientChecklist({
  ingredients,
}: {
  ingredients: string[];
}) {
  const [checked, setChecked] = useState<boolean[]>(
    ingredients.map(() => false)
  );

  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <ul className="space-y-2">
      {ingredients.map((item, i) => (
        <li key={i}>
          <label
            className={`flex cursor-pointer items-start gap-3 rounded-xl px-4 py-3 ring-1 transition ${
              checked[i]
                ? "bg-green-50 ring-green-200"
                : "bg-white ring-stone-200 hover:ring-stone-300"
            }`}
          >
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() => toggle(i)}
              className="mt-1 h-4 w-4 shrink-0 accent-red-700"
            />
            <span
              className={`text-sm ${
                checked[i] ? "text-stone-400 line-through" : "text-stone-800"
              }`}
            >
              {item}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
