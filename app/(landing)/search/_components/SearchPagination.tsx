"use client";

import React from "react";

interface SearchPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const SearchPagination = ({ currentPage, totalPages, onPageChange }: SearchPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-24">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button 
          key={page}
          onClick={() => {
            onPageChange(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`w-12 h-12 border flex items-center justify-center text-[14px] transition-all duration-300 ${
            page === currentPage ? 'bg-[#F1EADA] border-[#D4C3A3] font-bold text-black shadow-sm' : 'border-gray-200 text-gray-400 hover:border-gray-400 hover:text-black'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default SearchPagination;
