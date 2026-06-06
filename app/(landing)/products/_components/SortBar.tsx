import { ChevronDown, LayoutGrid, List } from "lucide-react";

interface SortBarProps {
  activeSort: string;
  setActiveSort: (sort: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

const SortBar = ({ activeSort, setActiveSort, viewMode, setViewMode }: SortBarProps) => {
  return (
    <div className="flex flex-wrap justify-between items-center mb-10 gap-4">
      <div className="flex items-center gap-4">
        <div className="relative inline-block border border-gray-300 bg-white">
            <select 
              className="appearance-none bg-transparent pl-4 pr-10 py-2 text-[13px] outline-none cursor-pointer"
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
            >
              <option>Default Sorting</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
        </div>

        <div className="flex items-center border border-gray-300 bg-white">
          <button 
            onClick={() => setViewMode("grid")}
            className={`p-2 transition-colors ${viewMode === "grid" ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
          >
            <LayoutGrid size={18} />
          </button>
          <div className="w-[1px] h-6 bg-gray-200"></div>
          <button 
            onClick={() => setViewMode("list")}
            className={`p-2 transition-colors ${viewMode === "list" ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-[14px] text-gray-500">Show</span>
        <div className="relative inline-block border border-gray-300 bg-white">
          <select className="appearance-none bg-transparent pl-4 pr-10 py-2 text-[13px] outline-none cursor-pointer">
            <option>12</option>
            <option>24</option>
            <option>48</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default SortBar;
