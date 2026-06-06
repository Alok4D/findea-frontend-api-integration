import React, { useState, useRef, useCallback, useEffect } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { ApiCategory } from "@/lib/redux/api/productApi";

interface FilterSidebarProps {
  categories: ApiCategory[];
  expandedFilters: string[];
  toggleFilter: (filter: string) => void;
  activeCategory: string;
  setCategory: (slug: string) => void;
}

const FilterSidebar = ({ categories, expandedFilters, toggleFilter, activeCategory, setCategory }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSliderMove = useCallback((clientX: number) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max(0, (clientX - rect.left) / rect.width), 1);
    const newValue = Math.round(percent * 500000);

    setPriceRange([0, newValue]);
  }, [isDragging]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleSliderMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => handleSliderMove(e.touches[0].clientX);
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleSliderMove]);

  const filterSections = [
    "PRICE",
    "DISPONIBILITÉ",
    "OCCASION",
    "MATIÈRE",
    "COULEUR",
    "STYLE",
    "ÂGE",
    "ORIGINE",
  ];

  return (
    <aside className="w-full lg:w-[280px] flex-shrink-0">
      <div className="border-b border-black pb-2 mb-6 flex justify-between items-center group cursor-pointer" 
           onClick={() => toggleFilter("FINDÉA COLLECTION")}>
        <h2 className="text-[16px] font-bold tracking-widest uppercase">FINDÉA COLLECTION</h2>
        {expandedFilters.includes("FINDÉA COLLECTION") ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
      </div>

      {expandedFilters.includes("FINDÉA COLLECTION") && (
        <ul className="space-y-4 mb-10">
          <li className="font-playfair">
            <div className="flex items-center group cursor-pointer"
                 onClick={() => setCategory("")}>
              <span className={`text-[15px] flex-1 ${!activeCategory ? 'font-bold' : 'text-gray-800'}`}>
                All Products
              </span>
              {!activeCategory && <Check size={16} />}
            </div>
          </li>
          {categories.map((cat) => (
            <li key={cat.id} className="font-playfair">
              <div className="flex items-center group cursor-pointer"
                   onClick={() => setCategory(cat.slug)}>
                <span className={`text-[15px] flex-1 ${activeCategory === cat.slug ? 'font-bold' : 'text-gray-800'}`}>
                  {cat.name}
                </span>
                {activeCategory === cat.slug && <Check size={16} />}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Filter Sections */}
      <div className="space-y-6">
        {filterSections.map(section => (
          <div key={section} className="border-t border-gray-300 pt-6">
            <div className="flex justify-between items-center cursor-pointer group"
                 onClick={() => toggleFilter(section)}>
              <h3 className="text-[14px] font-bold tracking-widest uppercase">{section}</h3>
              {expandedFilters.includes(section) ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
            </div>
            {section === "PRICE" && expandedFilters.includes(section) && (
              <div className="mt-6">
                <div className="text-[14px] mb-6 font-bold text-[#1C1C1C]">Price: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</div>
                
                <div 
                  ref={sliderRef}
                  className="relative h-1.5 bg-gray-200 mb-10 mx-3 cursor-pointer rounded-full"
                  onClick={(e) => {
                    if (isDragging) return;
                    const rect = sliderRef.current?.getBoundingClientRect();
                    if (!rect) return;
                    const percent = (e.clientX - rect.left) / rect.width;
                    const val = Math.round(percent * 500000);
                    setPriceRange([0, val]);
                  }}
                >
                  {/* Track highlight */}
                  <div 
                    className="absolute h-full bg-[#D4C3A3] z-10 rounded-full" 
                    style={{ 
                      left: '0%', 
                      width: `${(priceRange[1] / 500000) * 100}%`
                    }}
                  ></div>
                  
                  {/* Max Handle */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#D4C3A3] rounded-full border-2 border-white shadow-md cursor-grab active:cursor-grabbing z-30 transition-shadow hover:shadow-lg"
                    style={{ left: `calc(${(priceRange[1] / 500000) * 100}% - 8px)` }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setIsDragging(true);
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      setIsDragging(true);
                    }}
                  ></div>
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {[
                    { label: "10-25k", max: 25000 },
                    { label: "25-50k", max: 50000 },
                    { label: "50-100k", max: 100000 },
                    { label: "100k+", max: 500000 }
                  ].map(item => (
                    <button 
                      key={item.label} 
                      onClick={() => setPriceRange([0, item.max])}
                      className={`px-3 py-1.5 text-[11px] font-bold transition-colors uppercase tracking-widest border ${
                        priceRange[1] === item.max
                          ? 'bg-black text-white border-black'
                          : 'bg-[#F1EADA] text-[#1C1C1C] border-[#D4C3A3] hover:bg-[#EAE0CD]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;
