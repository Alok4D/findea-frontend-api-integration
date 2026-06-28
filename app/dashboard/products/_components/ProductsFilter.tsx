import React from "react";
import { Search } from "lucide-react";
import { ProductsQueryParams, useGetCategoriesQuery } from "@/lib/redux/api/productApi";

interface ProductsFilterProps {
  queryParams: ProductsQueryParams;
  setQueryParams: React.Dispatch<React.SetStateAction<ProductsQueryParams>>;
}

export default function ProductsFilter({ queryParams, setQueryParams }: ProductsFilterProps) {
  const { data: categories } = useGetCategoriesQuery();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams((prev) => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQueryParams((prev) => ({ ...prev, category: e.target.value || undefined, page: 1 }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) {
      setQueryParams((prev) => ({ ...prev, minPrice: undefined, maxPrice: undefined, page: 1 }));
    } else {
      const [min, max] = val.split("-").map(Number);
      setQueryParams((prev) => ({ ...prev, minPrice: min, maxPrice: max || undefined, page: 1 }));
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    // We'll pass status as a sortBy or type field if API supports it
    // For now map to the `type` param as a generic filter
    setQueryParams((prev) => ({ ...prev, type: val || undefined, page: 1 }));
  };

  const handleStockStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setQueryParams((prev) => ({
      ...prev,
      inStock: val === "" ? undefined : val === "in-stock",
      page: 1,
    }));
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQueryParams((prev) => ({ ...prev, sortBy: e.target.value || undefined, page: 1 }));
  };

  // Build current price value string to keep select controlled
  const priceValue =
    queryParams.minPrice !== undefined
      ? `${queryParams.minPrice}-${queryParams.maxPrice ?? ""}`
      : "";

  const stockValue =
    queryParams.inStock === undefined ? "" : queryParams.inStock ? "in-stock" : "out-of-stock";

  return (
    <>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6A63]" size={18} />
          <input
            type="text"
            placeholder="Search Products..."
            value={queryParams.search || ""}
            onChange={handleSearchChange}
            className="w-full border border-[#CFCAC1] bg-transparent py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#1A1A1A]"
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        {/* Category Filter */}
        <select
          value={queryParams.category || ""}
          onChange={handleCategoryChange}
          className="border border-[#CFCAC1] bg-transparent px-4 py-2 text-sm outline-none focus:border-[#1A1A1A] min-w-[140px]"
        >
          <option value="">All Categories</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Price Range Filter */}
        <select
          value={priceValue}
          onChange={handlePriceChange}
          className="border border-[#CFCAC1] bg-transparent px-4 py-2 text-sm outline-none focus:border-[#1A1A1A] min-w-[140px]"
        >
          <option value="">Any Price</option>
          <option value="0-50">Under $50</option>
          <option value="50-100">$50 – $100</option>
          <option value="100-250">$100 – $250</option>
          <option value="250-500">$250 – $500</option>
          <option value="500-">$500+</option>
        </select>

        {/* Status Filter */}
        <select
          value={queryParams.type || ""}
          onChange={handleStatusChange}
          className="border border-[#CFCAC1] bg-transparent px-4 py-2 text-sm outline-none focus:border-[#1A1A1A] min-w-[140px]"
        >
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
        </select>

        {/* Stock Status Filter */}
        <select
          value={stockValue}
          onChange={handleStockStatusChange}
          className="border border-[#CFCAC1] bg-transparent px-4 py-2 text-sm outline-none focus:border-[#1A1A1A] min-w-[140px]"
        >
          <option value="">Stock Status</option>
          <option value="in-stock">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>

        {/* Sort / In Registries */}
        <select
          value={queryParams.sortBy || ""}
          onChange={handleSortByChange}
          className="border border-[#CFCAC1] bg-transparent px-4 py-2 text-sm outline-none focus:border-[#1A1A1A] min-w-[140px]"
        >
          <option value="">In Registries</option>
          <option value="registries_desc">Most Registries</option>
          <option value="registries_asc">Least Registries</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </div>
    </>
  );
}

