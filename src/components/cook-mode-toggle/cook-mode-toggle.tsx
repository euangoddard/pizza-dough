import { component$, type PropFunction } from "@builder.io/qwik";

interface CookModeToggleProps {
  cookMode: boolean;
  onToggleCookMode$: PropFunction<() => void>;
}

export const CookModeToggle = component$<CookModeToggleProps>(
  ({ cookMode, onToggleCookMode$ }) => {
    return (
      <div class="glass-panel flex items-center justify-between rounded-xl p-4">
        <div class="flex items-center gap-3">
          <div
            class={[
              "rounded-full p-2 transition-colors duration-300",
              cookMode
                ? "bg-[#FF6B6B] text-white shadow-[0_0_15px_rgba(255,107,107,0.5)]"
                : "bg-gray-800 text-gray-400",
            ]}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="font-medium text-gray-200">Cook Mode</span>
            <span class="text-xs text-gray-500">Keep screen awake</span>
          </div>
        </div>

        <button
          onClick$={onToggleCookMode$}
          class={[
            "relative h-8 w-14 rounded-full transition-colors duration-300 focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 focus:ring-offset-[#1a1a1a] focus:outline-none",
            cookMode ? "bg-[#FF6B6B]" : "bg-gray-700",
          ]}
          aria-pressed={cookMode}
        >
          <div
            class={[
              "absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300",
              cookMode ? "translate-x-6" : "translate-x-0",
            ]}
          />
        </button>
      </div>
    );
  },
);
