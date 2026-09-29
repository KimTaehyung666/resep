import { recipes } from "@/data/recipes";
import RecipeBrowser from "@/components/RecipeBrowser";

export default function Home() {
  return <RecipeBrowser recipes={recipes} />;
}
