import { PageBreadcrumbHero } from "@/components/shared/PageBreadcrumbHero";

export function WishlistHero() {
  return (
    <PageBreadcrumbHero
      segments={[{ label: "Home", href: "/" }]}
      title="WISHLIST"
      trailingChevron
      mergeTitleOnMobile
    />
  );
}
