import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const loc = useLocation();
  const { balls, label } = getBallData(loc.params.balls);
  const quantities = computeQuantities(balls);
  return (
    <>
      <h2 class="mb-0">
        Recipe for {balls} dough {label}
      </h2>
      <p class="text-small mb-1">250g dough ball for 12-inch/30cm pizza</p>
      <h3>Quantities</h3>
      <ul>
        <li>{formatQuantity(quantities.water, "milliliter")} lukewarm water</li>
        <li>{formatQuantity(quantities.salt, "gram")} salt</li>
        <li>{formatQuantity(quantities.flour, "gram")} "00" (pasta) flour</li>
        <li>{formatQuantity(quantities.yeast, "gram")} dried yeast</li>
        <li>Course semolina to dust</li>
      </ul>
      <h3>Method</h3>
      <ol>
        <li>Put the water and salt into your bread maker</li>
        <li>
          Carefully lay the flour on top and sprinkle with the dried yeast
        </li>
        <li>Set the bread maker going on the dough program</li>
        <li>
          Once the dough is ready, divide into {balls} {label} and place on a
          tray, covered with a cloth for 30 mins to prove further in a warm
          place.
        </li>
        <li>
          When you're ready to make pizza, dust a ball with plenty of semolina
          and roll it into a circle. Cover with your favourite topping and bake
        </li>
      </ol>
    </>
  );
});

export const head: DocumentHead = ({ params }) => {
  const { balls, label } = getBallData(params.balls);
  return {
    title: `Pizza dough [${balls} ${label}]`,
    meta: [
      {
        name: "description",
        content: `Recipe to make ${balls} pizza dough ${label}`,
      },
    ],
  };
};

interface BallData {
  balls: number;
  label: string;
}

const getBallData = (rawBalls: string): BallData => {
  const balls = parseInt(rawBalls, 10);
  const label = `ball${balls > 1 ? "s" : ""}`;
  return { balls, label };
};

interface Quantities {
  water: number;
  flour: number;
  salt: number;
  yeast: number;
}

const computeQuantities = (balls: number): Quantities => {
  return {
    water: 92 * balls,
    flour: 153.25 * balls,
    salt: 4.5 * balls,
    yeast: 0.65 * balls,
  };
};

const formatQuantity = (quantity: number, unit: string): string => {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "unit",
    currency: "USD",
    maximumFractionDigits: 2,
    unit,
    unitDisplay: "narrow",
  });
  return formatter.format(quantity);
};
