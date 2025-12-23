import { component$, type PropFunction } from "@builder.io/qwik";

interface QuantitySelectorProps {
  count: number;
  onCountChange$: PropFunction<(count: number) => void>;
}

export const QuantitySelector = component$<QuantitySelectorProps>(
  ({ count, onCountChange$ }) => {
    return (
      <div class="flex flex-col gap-4">
        <div class="flex items-end justify-between px-2">
          <span class="text-sm font-medium tracking-wider text-gray-400 uppercase">
            Quantity
          </span>
          <span class="text-4xl font-bold text-[#FF6B6B]">
            {count} <span class="text-lg font-normal text-gray-400">balls</span>
          </span>
        </div>

        <div class="relative flex h-12 items-center">
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={count}
            onInput$={(e) => {
              const val = parseInt((e.target as HTMLInputElement).value, 10);
              onCountChange$(val);
            }}
            class="h-3 w-full cursor-pointer appearance-none rounded-lg bg-gray-700 accent-[#FF6B6B] transition-all hover:accent-orange-500"
          />
        </div>
        <div class="flex justify-between px-1 text-xs text-gray-500">
          <span>1</span>
          <span>10</span>
        </div>
      </div>
    );
  },
);
