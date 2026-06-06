interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-16 font-playfair">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 transition-colors border ${
            currentPage === page
              ? "bg-black text-white border-black"
              : "border-black/10 hover:bg-black hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
