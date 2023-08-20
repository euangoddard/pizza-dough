import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { useChooseBallCount } from "~/routes/layout";

export const BallSelector = component$(() => {
  const loc = useLocation();
  const locBalls = parseInt(loc.params.balls, 10);
  const chooseBallCount = useChooseBallCount();
  const ballOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <div class="mb-1">
      <label for="balls">How many dough balls do you want to make?</label>
      <br />
      <select
        id="balls"
        onChange$={(event) => {
          chooseBallCount.submit({ balls: event.target.value });
        }}
      >
        {isNaN(locBalls) && <option>Choose</option>}
        {ballOptions.map((value) => (
          <option key={value} value={value} selected={value === locBalls}>
            {value.toString()}
          </option>
        ))}
      </select>
    </div>
  );
});
