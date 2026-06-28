import React from "react";
import { Search } from "lucide-react";
import { ProductsQueryParams } from "@/lib/redux/api/productApi";

interface ProductsFilterProps {
  queryParams: ProductsQueryParams;
  setQueryParams: React.Dispatch<React.SetStateAction<ProductsQueryParams>>;
}

export default function ProductsFilter({ queryParams, setQueryParams }: ProductsFilterProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams((prev) => ({ ...prev, search: e.target.value, page: 1 }));
  };

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
        {["All Categories", "Any Price", "Status", "Stock Status", "In Registries"].map((filter) => (
          <select
            key={filter}
            className="border border-[#CFCAC1] bg-transparent px-4 py-2 text-sm outline-none focus:border-[#1A1A1A] min-w-[140px]"
          >
            <option>{filter}</option>
          </select>
        ))}
      </div>
    </>
  );
}
