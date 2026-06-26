import ProductsHeader from "./_components/ProductsHeader";
import ProductsFilter from "./_components/ProductsFilter";
import ProductsTable from "./_components/ProductsTable";

export default function ProductManagementPage() {
  return (
    <div className="mx-auto max-w-full pb-16">
      <ProductsHeader />
      <ProductsFilter />
      <ProductsTable />
    </div>
  );
}
