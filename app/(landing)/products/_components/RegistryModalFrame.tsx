"use client";

import { X } from "lucide-react";

export interface RegistryModalFrameProps {
  open: boolean;
  labelledBy: string;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Shared shell — cream panel, square corners, subtle shadow, dim overlay.
 * Inner column fills height so content can sit centered with footer actions pinned.
 */
export function RegistryModalFrame({ open, labelledBy, onClose, children }: RegistryModalFrameProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4" role="presentation">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="relative flex h-[min(586px,90vh)] w-full max-w-[996px] flex-col bg-[#F5F3EF] shadow-[0_8px_40px_rgba(0,0,0,0.12)] sm:h-[586px] sm:max-h-none rounded-none"
      >
        <div className="flex shrink-0 justify-end px-8 pt-8 sm:px-[46px] sm:pt-10">
          <div className="flex h-[48px] w-full max-w-[860px] items-start justify-end sm:h-[54px] sm:max-w-[909px]">
            <button
              type="button"
              onClick={onClose}
              className="flex size-10 items-center justify-center text-[#1A1A1A] hover:opacity-60 sm:size-[43px]"
              aria-label="Close"
            >
              <X className="size-5 sm:size-6" strokeWidth={1.1} aria-hidden />
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
