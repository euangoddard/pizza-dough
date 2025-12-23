import { component$, useStore, useVisibleTask$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { CookModeToggle } from "~/components/cook-mode-toggle/cook-mode-toggle";
import { IngredientsList } from "~/components/ingredients-list/ingredients-list";
import { PizzaHeader } from "~/components/pizza-header/pizza-header";
import { QuantitySelector } from "~/components/quantity-selector/quantity-selector";

export default component$(() => {
  const state = useStore({
    count: 4,
    cookMode: false,
    wakeLock: null as WakeLockSentinel | null,
  });

  const toggleCookMode = $(async () => {
    state.cookMode = !state.cookMode;
    if (state.cookMode) {
      try {
        if ("wakeLock" in navigator) {
          state.wakeLock = await navigator.wakeLock.request("screen");
        }
      } catch (err) {
        console.error("Wake Lock error:", err);
        state.cookMode = false;
      }
    } else {
      if (state.wakeLock) {
        await state.wakeLock.release();
        state.wakeLock = null;
      }
    }
  });

  // Cleanup wake lock on unmount/visibility change handled by browser usually,
  // but explicit release is good hygiene if component unmounts.
  // dependent on cookMode changes primarily.

  // Re-acquire lock if visibility changes and mode is on
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track, cleanup }) => {
    track(() => state.cookMode);

    const handleVisibilityChange = async () => {
      if (
        state.cookMode &&
        document.visibilityState === "visible" &&
        !state.wakeLock
      ) {
        try {
          if ("wakeLock" in navigator) {
            state.wakeLock = await navigator.wakeLock.request("screen");
          }
        } catch (e) {
          console.error("Re-acquire wake lock failed", e);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    cleanup(() => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (state.wakeLock) {
        state.wakeLock.release();
      }
    });
  });

  return (
    <div class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#1a1a1a] p-6 font-sans text-[#F7F9F9]">
      {/* Background gradients */}
      <div class="absolute top-[-10%] left-[-10%] h-[50vh] w-[50vh] rounded-full bg-[#FF6B6B] opacity-20 mix-blend-screen blur-[100px] filter" />
      <div class="absolute right-[-10%] bottom-[-10%] h-[50vh] w-[50vh] rounded-full bg-orange-600 opacity-10 mix-blend-screen blur-[100px] filter" />

      <main class="glass-panel z-10 flex w-full max-w-md flex-col gap-8 rounded-3xl border-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <PizzaHeader />

        <QuantitySelector
          count={state.count}
          onCountChange$={(val: number) => (state.count = val)}
        />

        <IngredientsList count={state.count} />

        <CookModeToggle
          cookMode={state.cookMode}
          onToggleCookMode$={toggleCookMode}
        />
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Pizza Dough Recipe",
  meta: [
    {
      name: "description",
      content:
        "Scale the recipe for pizza dough balls to make as many as you want",
    },
    {
      name: "theme-color",
      content: "#1a1a1a",
    },
  ],
};
