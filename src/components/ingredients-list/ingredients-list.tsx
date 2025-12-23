import { component$ } from "@builder.io/qwik";

export const baseRecipe = {
  flour: 153.25, // grams
  water: 92, // ml
  salt: 4.5, // grams
  yeast: 0.65, // grams
};

interface IngredientsListProps {
  count: number;
}

export const IngredientsList = component$<IngredientsListProps>(({ count }) => {
  return (
    <div class="glass-panel rounded-2xl bg-black/20 p-6 shadow-inner">
      <h2 class="mb-4 border-b border-white/5 pb-2 text-lg font-semibold text-gray-200">
        Ingredients
      </h2>
      <ul class="space-y-4">
        <li class="ingredient-row group">
          <span class="ingredient-label">
            <span class="ingredient-icon">🥡</span> Flour
          </span>
          <span class="ingredient-value">
            {formatQuantity(count * baseRecipe.flour)}
            <span class="ml-1 text-sm text-gray-500">g</span>
          </span>
        </li>
        <li class="ingredient-row group">
          <span class="ingredient-label">
            <span class="ingredient-icon">💧</span> Water
          </span>
          <span class="ingredient-value">
            {formatQuantity(count * baseRecipe.water)}
            <span class="ml-1 text-sm text-gray-500">ml</span>
          </span>
        </li>
        <li class="ingredient-row group">
          <span class="ingredient-label">
            <span class="ingredient-icon">🧂</span> Salt
          </span>
          <span class="ingredient-value">
            {formatQuantity(count * baseRecipe.salt, 1)}
            <span class="ml-1 text-sm text-gray-500">g</span>
          </span>
        </li>
        <li class="ingredient-row group">
          <span class="ingredient-label">
            <span class="ingredient-icon">🍞</span> Yeast
          </span>
          <span class="ingredient-value">
            {formatQuantity(count * baseRecipe.yeast, 1)}
            <span class="ml-1 text-sm text-gray-500">g</span>
          </span>
        </li>
      </ul>
    </div>
  );
});

const formatQuantity = (
  quantity: number,
  maximumFractionDigits = 0,
): string => {
  const formatter = new Intl.NumberFormat("en-GB", {
    maximumFractionDigits,
  });
  return formatter.format(quantity);
};
