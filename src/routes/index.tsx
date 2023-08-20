import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <></>;
});

export const head: DocumentHead = {
  title: "Pizza dough",
  meta: [
    {
      name: "description",
      content: "Recipe to make pizza dough balls",
    },
  ],
};
