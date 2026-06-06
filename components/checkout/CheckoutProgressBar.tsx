import { Fragment } from "react";
import { cn } from "@/lib/utils";

/** Desktop stepper — brown editorial palette. */
const INK = "#4A4439";
const BAR = "#E3DDD3";

const STEPS = [
  { step: 1 as const, label: "Shopping Cart" },
  { step: 2 as const, label: "Checkout" },
  { step: 3 as const, label: "Order Status" },
] as const;

export function CheckoutProgressBar({ activeStep }: { activeStep: 1 | 2 | 3 }) {
  const current = STEPS[activeStep - 1];

  return (
    <>
      {/* Mobile: cream strip + centered inverted trapezoid (reference FINDEA checkout) */}
      <section
        className="w-full bg-[#F9F8F4] md:hidden"
        aria-label="Checkout progress"
      >
        <div className="flex justify-center px-4 pb-1">
          <div className="relative flex min-h-[4.75rem] w-[min(92vw,22.5rem)] items-center justify-center sm:min-h-[5.25rem] sm:w-[min(88vw,26rem)]">
            <div
              aria-hidden
              className="absolute inset-0 bg-[#E3DDD3]"
              style={{
                clipPath: "polygon(8% 0%, 92% 0%, 80% 100%, 20% 100%)",
              }}
            />
            <div className="relative z-10 flex items-center justify-center gap-2.5 px-5 py-3.5 sm:gap-3 sm:px-7">
              <span
                className="inline-flex aspect-square h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#333333] p-0 font-sans text-sm font-semibold tabular-nums leading-none tracking-normal text-white sm:h-9 sm:w-9 sm:text-[15px]"
                aria-hidden
              >
                {activeStep}
              </span>
              <h1 className="whitespace-nowrap font-playfair text-[13px] font-bold uppercase leading-tight tracking-[0.12em] text-[#333333] sm:text-[13px] sm:tracking-[0.16em]">
                {current.label}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop: full-viewport-width greige bar; steps spread with flexing connectors */}
      <header
        className="hidden w-full md:block"
        style={{ backgroundColor: BAR }}
      >
        <div className="max-w-[1280px] mx-auto w-full px-5 py-10 sm:px-8 md:px-10 md:py-12 lg:px-16 xl:px-20">
          <div className="flex w-full min-w-0 flex-nowrap items-center">
            {STEPS.map((item, index) => {
              const reached = item.step <= activeStep;
              const isCurrent = item.step === activeStep;

              return (
                <Fragment key={item.step}>
                  {index > 0 && (
                    <div
                      className="mx-2 h-px min-w-3 flex-1 self-center sm:mx-5 md:mx-8"
                      style={{ backgroundColor: `${INK}66` }}
                      aria-hidden
                    />
                  )}
                  <div
                    className="flex shrink-0 items-center gap-2 md:gap-2.5"
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    <span
                      className={cn(
                        "inline-flex aspect-square h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full p-0 font-sans text-[11px] font-semibold tabular-nums leading-none tracking-normal md:h-6 md:w-6 md:text-[12px]",
                        reached
                          ? "text-white"
                          : "border border-[#4A4439]/55 bg-transparent text-[#4A4439]"
                      )}
                      style={reached ? { backgroundColor: INK } : undefined}
                    >
                      {item.step}
                    </span>
                    <span
                      className={cn(
                        "whitespace-nowrap font-playfair text-[10px] uppercase leading-none tracking-[0.22em] md:text-base md:tracking-[0.24em]",
                        reached ? "font-bold text-[#4A4439]" : "font-normal text-[#4A4439]/55"
                      )}
                    >
                      {item.label}
                    </span>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </header>
    </>
  );
}
