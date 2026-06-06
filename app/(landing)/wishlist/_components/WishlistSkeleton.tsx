export const WishlistSkeleton = () => {
  return (
    <section className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 md:px-8 md:py-12 animate-pulse">
      {/* Desktop table skeleton */}
      <div className="hidden md:block">
        <div className="h-8 bg-gray-200 w-full mb-4 border-b border-gray-300 pb-2 flex justify-between">
            <div className="w-32 bg-gray-300 rounded h-4" />
            <div className="w-16 bg-gray-300 rounded h-4" />
            <div className="w-16 bg-gray-300 rounded h-4" />
            <div className="w-24 bg-gray-300 rounded h-4" />
            <div className="w-16 bg-gray-300 rounded h-4" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 items-center py-6 border-b border-gray-200">
            <div className="h-24 w-20 bg-gray-200 shrink-0 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 w-1/3 rounded" />
              <div className="h-3 bg-gray-200 w-16 rounded" />
            </div>
            <div className="w-24 h-10 bg-gray-200 rounded" />
            <div className="w-16 h-4 bg-gray-200 rounded ml-8" />
            <div className="w-20 h-4 bg-gray-200 rounded ml-8" />
            <div className="w-32 h-10 bg-gray-200 rounded ml-auto" />
          </div>
        ))}
      </div>

      {/* Mobile cards skeleton */}
      <div className="space-y-6 md:hidden">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-gray-200 p-4">
            <div className="flex gap-4">
              <div className="h-28 w-24 bg-gray-200 shrink-0 rounded" />
              <div className="min-w-0 flex-1 space-y-2 py-2">
                <div className="h-4 bg-gray-200 w-3/4 rounded" />
                <div className="h-3 bg-gray-200 w-1/2 rounded" />
                <div className="h-4 bg-gray-200 w-1/3 rounded mt-2" />
                <div className="h-3 bg-gray-200 w-1/4 rounded mt-2" />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="w-24 h-10 bg-gray-200 rounded" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="w-10 h-10 bg-gray-200 rounded" />
              <div className="flex-1 h-10 bg-gray-200 rounded min-w-[140px]" />
              <div className="w-10 h-10 bg-gray-200 rounded" />
            </div>
            <div className="mt-3 h-3 bg-gray-200 w-32 rounded" />
          </div>
        ))}
      </div>
    </section>
  );
};
