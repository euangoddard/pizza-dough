import { component$ } from "@builder.io/qwik";

export const PizzaHeader = component$(() => {
  return (
    <header class="text-center">
      <div class="mb-4 inline-block transform rounded-full bg-gradient-to-br from-[#FF6B6B] to-orange-600 p-4 shadow-lg shadow-orange-900/50 transition-transform duration-300 hover:scale-105">
        <span class="text-4xl" role="img" aria-label="pizza">
          🍕
        </span>
      </div>
      <h1 class="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
        Pizza Dough Balls
      </h1>
    </header>
  );
});
