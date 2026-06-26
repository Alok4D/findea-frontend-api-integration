import { Search } from "lucide-react";

export default function ProductsFilter() {
  return (
    <>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6A63]" size={18} />
          <input
            type="text"
            placeholder="Search Products..."
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
