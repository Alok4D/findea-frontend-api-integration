"use client";

import { PageBreadcrumbHero } from "@/components/shared/PageBreadcrumbHero";

const BreadcrumbHero = () => {
  return (
    <PageBreadcrumbHero
      segments={[
        { label: "Home", href: "/" },
        { label: "Products" },
      ]}
      title="Woman"
      trailingChevron
    />
  );
};

export default BreadcrumbHero;
