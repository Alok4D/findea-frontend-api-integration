"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Fragment } from "react";

export type PageBreadcrumbSegment = {
  label: string;
  href?: string;
};

export interface PageBreadcrumbHeroProps {
  segments: PageBreadcrumbSegment[];
  title: string;
  /** Match products listing: chevron after the last breadcrumb segment (before the big title). */
  trailingChevron?: boolean;
  /** On small screens, show `title` inline after breadcrumbs (e.g. `Home > CONTACT`). Hidden from `md` where the large title shows. */
  mergeTitleOnMobile?: boolean;
}

/**
 * Shared hero used on products listing (`BreadcrumbHero`) and contact page.
 * Visuals mirror `app/(landing)/products/_components/BreadcrumbHero.tsx`.
 */
export function PageBreadcrumbHero({
  segments,
  title,
  trailingChevron = false,
  mergeTitleOnMobile = false,
}: PageBreadcrumbHeroProps) {
  const router = useRouter();

  return (
    <section className="relative flex h-32 w-full items-center justify-center overflow-hidden bg-[#f5f4ee] md:h-48">
      <div
        className="absolute inset-0 mx-auto w-full max-w-2xl bg-[#DEDAD2] md:max-w-4xl lg:max-w-5xl"
        style={{
          clipPath: "polygon(15% 0%, 85% 0%, 75% 100%, 25% 100%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center px-6">
        <nav
          className="mb-2 flex flex-wrap items-center justify-center gap-0 text-sm text-gray-600"
          aria-label="Breadcrumb"
        >
          {segments.map((seg, i) => (
            <Fragment key={`${seg.label}-${i}`}>
              {i > 0 && <ChevronRight size={14} strokeWidth={3} className="mx-0.5 shrink-0 text-gray-400" />}
              {seg.href ? (
                <Link href={seg.href} className="cursor-pointer font-playfair transition-colors hover:text-black">
                  {seg.label}
                </Link>
              ) : (
                <span className="cursor-pointer font-playfair transition-colors hover:text-black">{seg.label}</span>
              )}
            </Fragment>
          ))}
          {trailingChevron && (
            <ChevronRight size={14} strokeWidth={3} className="mx-0.5 shrink-0 text-gray-400" aria-hidden />
          )}
          {mergeTitleOnMobile && (
            <span className="ml-0.5 font-playfair font-bold uppercase text-black md:hidden">{title}</span>
          )}
        </nav>

        <h1
          className={`text-5xl font-serif font-medium uppercase tracking-tight text-black md:text-6xl ${
            mergeTitleOnMobile ? "hidden md:block" : ""
          }`}
        >
          {title}
        </h1>

        <button
          type="button"
          onClick={() => router.back()}
          className="absolute right-6 hidden items-center space-x-1 font-inter text-[12px] font-normal text-[#1C1C1C] transition-opacity hover:opacity-70 md:flex"
        >
          <ChevronLeft size={14} />
          <span>Return to previous page</span>
        </button>
      </div>
    </section>
  );
}
