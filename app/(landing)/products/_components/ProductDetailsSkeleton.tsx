export const ProductDetailsSkeleton = () => {
    return (
        <div className="p-4 md:p-12 text-[#2a2a2a] animate-pulse">
            <div className="max-w-7xl mx-auto p-6 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Left: Image Gallery */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="aspect-[3/4] bg-gray-200 w-full" />
                        <div className="grid grid-cols-4 gap-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square bg-gray-200 w-full" />
                            ))}
                        </div>
                    </div>

                    {/* Center: Product Info */}
                    <div className="lg:col-span-5 space-y-6">
                        <header className="space-y-4">
                            <div className="h-8 bg-gray-200 w-3/4 rounded" />
                            <div className="h-6 bg-gray-200 w-1/4 rounded" />
                        </header>

                        <div className="space-y-2 border-b pb-6">
                            <div className="h-4 bg-gray-200 w-full rounded" />
                            <div className="h-4 bg-gray-200 w-full rounded" />
                            <div className="h-4 bg-gray-200 w-5/6 rounded" />
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="h-4 bg-gray-200 w-12 rounded mb-2" />
                                <div className="h-10 bg-gray-200 w-full rounded" />
                            </div>
                            <div>
                                <div className="h-4 bg-gray-200 w-12 rounded mb-2" />
                                <div className="h-10 bg-gray-200 w-full rounded" />
                            </div>
                            
                            <div className="py-4">
                                <div className="h-10 bg-gray-200 w-32 rounded" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-12 bg-gray-200 w-full rounded" />
                                <div className="h-12 bg-gray-200 w-full rounded" />
                            </div>
                        </div>

                        <div className="pt-4 space-y-3">
                            <div className="h-4 bg-gray-200 w-1/2 rounded" />
                            <div className="h-4 bg-gray-200 w-1/3 rounded" />
                            <div className="pt-4 border-t space-y-2">
                                <div className="h-4 bg-gray-200 w-1/2 rounded" />
                                <div className="h-4 bg-gray-200 w-1/3 rounded" />
                                <div className="h-4 bg-gray-200 w-1/4 rounded" />
                            </div>
                        </div>
                    </div>

                    {/* Right: Sidebar / Recommendations */}
                    <div className="lg:col-span-3 border-l border-gray-200 pl-8 hidden lg:block">
                        <div className="text-center mb-8 flex flex-col items-center">
                            <div className="h-3 bg-gray-200 w-16 mb-2 rounded" />
                            <div className="h-6 bg-gray-200 w-32 rounded" />
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-2">
                                <div className="h-4 bg-gray-200 w-32 rounded" />
                                <div className="flex gap-2">
                                    <div className="h-4 w-4 bg-gray-200 rounded" />
                                    <div className="h-4 w-4 bg-gray-200 rounded" />
                                </div>
                            </div>
                            
                            {[1, 2].map((item) => (
                                <div key={item} className="flex gap-4">
                                    <div className="w-20 h-24 bg-gray-200 flex-shrink-0 rounded" />
                                    <div className="space-y-2 flex-1">
                                        <div className="h-4 bg-gray-200 w-full rounded" />
                                        <div className="h-3 bg-gray-200 w-1/2 rounded" />
                                        <div className="h-4 bg-gray-200 w-3/4 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
