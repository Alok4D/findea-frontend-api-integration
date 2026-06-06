import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
}

const Container = ({ children, className, maxWidth = "max-w-[1440px]" }: ContainerProps) => {
  return (
    <div className={cn(maxWidth, "mx-auto px-6 md:px-12 lg:px-20", className)}>
      {children}
    </div>
  );
};

export default Container;
