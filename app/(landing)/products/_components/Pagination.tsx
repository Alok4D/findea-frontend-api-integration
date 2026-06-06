interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-16 font-playfair">
      <button className="px-4 py-2 hover:bg-black hover:text-white transition-colors border border-black/10">1</button>
      <button className="px-4 py-2 hover:bg-black hover:text-white transition-colors border border-black/10">2</button>
      <button className="px-4 py-2 hover:bg-black hover:text-white transition-colors border border-black/10">3</button>
      <span className="mx-2">...</span>
      <button className="px-4 py-2 hover:bg-black hover:text-white transition-colors border border-black/10">{totalPages}</button>
    </div>
  );
};

export default Pagination;
