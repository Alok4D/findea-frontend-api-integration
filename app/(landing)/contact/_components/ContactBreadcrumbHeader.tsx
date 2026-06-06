import { PageBreadcrumbHero } from "@/components/shared/PageBreadcrumbHero";

export function ContactBreadcrumbHeader() {
  return (
    <PageBreadcrumbHero
      segments={[{ label: "Home", href: "/" }]}
      title="CONTACT"
      trailingChevron
      mergeTitleOnMobile
    />
  );
}
