import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  viewMode: "grid" | "list";
}

const ProductGrid = ({ products, viewMode }: ProductGridProps) => {
  return (
    <div className={`grid gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-16 ${
      viewMode === 'grid' 
        ? 'grid-cols-2 lg:grid-cols-3' 
        : 'grid-cols-1'
    }`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
