import React from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  className?: string;
}

const SectionTitle = ({ title, className }: SectionTitleProps) => {
  return (
    <h2 className={cn("text-[25px] md:text-[32px] font-playfair text-brand-text font-bold uppercase mb-10", className)}>
      {title}
    </h2>
  );
};

export default SectionTitle;
