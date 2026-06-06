import Container from "@/components/shared/Container";

export default function Loading() {
  return (
    <div className="bg-[#F5F3EE] min-h-screen py-24">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 animate-pulse">
          {/* Sidebar Skeleton */}
          <div className="w-full lg:w-[280px] h-96 bg-gray-200" />
          
          <div className="flex-grow">
            {/* SortBar Skeleton */}
            <div className="h-12 bg-gray-200 mb-10 w-full" />
            
            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="flex flex-col gap-4">
                  <div className="aspect-[4/5] bg-gray-200" />
                  <div className="h-4 bg-gray-200 w-1/2" />
                  <div className="h-6 bg-gray-200 w-3/4" />
                  <div className="h-4 bg-gray-200 w-1/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
