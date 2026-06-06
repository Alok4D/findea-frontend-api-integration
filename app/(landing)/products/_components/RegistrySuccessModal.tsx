"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { RegistryModalFrame } from "./RegistryModalFrame";

const FIGMA_SUCCESS_ICON =
  "https://www.figma.com/api/mcp/asset/a40717f7-ebd2-4932-871e-4a7bb2a0f477";

const primaryBtn =
  "flex h-[54px] w-full items-center justify-center bg-[#E9DCC0] px-4 font-playfair text-[20px] font-bold leading-none text-[#1A1A1A] transition-colors hover:bg-[#dccfb0] sm:w-[437px] sm:max-w-[437px]";
const secondaryBtn =
  "flex h-[54px] w-full items-center justify-center border border-solid border-[#1A1A1A] bg-[#F5F3EF] px-4 font-playfair text-[20px] font-bold leading-none text-[#1A1A1A] transition-colors hover:bg-[#ebe8e0] sm:w-[437px] sm:max-w-[437px]";

export interface RegistrySuccessModalProps {
  open: boolean;
  onClose: () => void;
  productName: string;
  registryName: string;
  viewRegistryHref?: string;
}

/** Layout + colors aligned to design reference (success state). */
export function RegistrySuccessModal({
  open,
  onClose,
  productName,
  registryName,
  viewRegistryHref = "/products",
}: RegistrySuccessModalProps) {
  const [useIconFallback, setUseIconFallback] = useState(false);

  return (
    <RegistryModalFrame open={open} labelledBy="registry-success-title" onClose={onClose}>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-8 overflow-y-auto px-8 pb-6 text-center sm:gap-10 sm:px-[46px]">
          <div className="relative size-[100px] shrink-0">
            {useIconFallback ? (
              <div className="flex size-[100px] items-center justify-center rounded-full bg-[#E0D9CF]">
                <Check className="text-[#1A1A1A]" size={38} strokeWidth={2.2} aria-hidden />
              </div>
            ) : (
              <Image
                src={FIGMA_SUCCESS_ICON}
                alt=""
                width={100}
                height={100}
                className="size-[100px] object-contain"
                unoptimized
                onError={() => setUseIconFallback(true)}
              />
            )}
          </div>
          <div className="flex max-w-[560px] flex-col gap-4 sm:max-w-[647px] sm:gap-5">
            <h2
              id="registry-success-title"
              className="font-playfair text-[26px] font-semibold leading-snug text-[#1A1A1A] sm:text-[28px]"
            >
              Item Added to Registry!
            </h2>
            <p className="font-playfair text-[20px] font-normal leading-[1.35] text-[#1A1A1A] sm:text-[22px]">
              {productName} has been added to &lsquo;{registryName}&rsquo; Registry
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-3 px-8 pb-8 pt-2 sm:flex-row sm:justify-center sm:gap-[29px] sm:px-[46px] sm:pb-10">
          <Link href={viewRegistryHref} onClick={onClose} className={primaryBtn}>
            View Registry
          </Link>
          <button type="button" onClick={onClose} className={secondaryBtn}>
            Continue Shopping
          </button>
        </div>
      </div>
    </RegistryModalFrame>
  );
}
