"use client";

import type { RegistryOption } from "@/types/registry-modal";
import { RegistryModalFrame } from "./RegistryModalFrame";

export interface RegistrySelectModalProps {
  open: boolean;
  onClose: () => void;
  options: RegistryOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  productName: string;
  onConfirm: () => void;
}

const primaryBtn =
  "flex h-[54px] w-full items-center justify-center bg-[#E9DCC0] px-4 font-playfair text-[20px] font-bold leading-none text-[#1A1A1A] transition-colors hover:bg-[#dccfb0] disabled:pointer-events-none disabled:opacity-40 sm:w-[437px] sm:max-w-[437px]";
const secondaryBtn =
  "flex h-[54px] w-full items-center justify-center border border-solid border-[#1A1A1A] bg-[#F5F3EF] px-4 font-playfair text-[20px] font-bold leading-none text-[#1A1A1A] transition-colors hover:bg-[#ebe8e0] sm:w-[437px] sm:max-w-[437px]";

export function RegistrySelectModal({
  open,
  onClose,
  options,
  selectedId,
  onSelect,
  productName,
  onConfirm,
}: RegistrySelectModalProps) {
  return (
    <RegistryModalFrame open={open} labelledBy="registry-select-title" onClose={onClose}>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center overflow-y-auto px-8 pb-6 pt-2 text-center sm:px-[46px]">
          <div className="flex w-full max-w-[647px] flex-col gap-8 sm:gap-10">
            <div className="flex flex-col gap-4 sm:gap-5">
              <h2
                id="registry-select-title"
                className="font-playfair text-[26px] font-semibold leading-snug text-[#1A1A1A] sm:text-[28px]"
              >
                Choose a registry
              </h2>
              <p className="font-playfair text-[20px] font-normal leading-[1.35] text-[#5c5852] sm:text-[22px]">
                {productName} will be added to the registry you select below.
              </p>
            </div>

            <ul className="flex w-full flex-col gap-2.5 text-left sm:gap-3">
              {options.map((opt) => {
                const checked = selectedId === opt.id;
                return (
                  <li key={opt.id}>
                    <label
                      className={`flex min-h-[52px] cursor-pointer items-center gap-3.5 border border-solid px-4 py-3.5 transition-colors sm:min-h-[54px] sm:gap-4 sm:px-5 sm:py-[15px] ${
                        checked
                          ? "border-[#1A1A1A] bg-white/80"
                          : "border-[#d8d4cd] bg-transparent hover:bg-white/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="registry-choice"
                        value={opt.id}
                        checked={checked}
                        onChange={() => onSelect(opt.id)}
                        className="size-4 shrink-0 accent-[#1A1A1A]"
                      />
                      <span className="font-playfair text-[18px] font-normal leading-snug text-[#1A1A1A] sm:text-[20px]">
                        {opt.name}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-3 px-8 pb-8 pt-2 sm:flex-row sm:justify-center sm:gap-[29px] sm:px-[46px] sm:pb-10">
          <button type="button" disabled={!selectedId} onClick={onConfirm} className={primaryBtn}>
            Add To Registry
          </button>
          <button type="button" onClick={onClose} className={secondaryBtn}>
            Cancel
          </button>
        </div>
      </div>
    </RegistryModalFrame>
  );
}
