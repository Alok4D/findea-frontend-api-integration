export const CartItemsSkeleton = () => {
    return (
        <div className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 animate-pulse">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_min(100%,380px)] lg:items-start lg:gap-12">
                <div>
                    <div className="h-8 bg-gray-200 w-32 mb-6 rounded" />

                    {/* Desktop table skeleton */}
                    <div className="hidden md:block">
                        <div className="h-10 bg-[#E3DDD3] w-full mb-4 rounded" />
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-4 items-center py-6 border-b border-[#2C2724]/12">
                                <div className="h-28 w-24 bg-gray-200 shrink-0 rounded" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 w-1/3 rounded" />
                                    <div className="h-3 bg-gray-200 w-16 rounded" />
                                </div>
                                <div className="w-16 h-4 bg-gray-200 rounded" />
                                <div className="w-16 h-4 bg-gray-200 rounded" />
                                <div className="w-24 h-8 bg-gray-200 rounded" />
                                <div className="w-16 h-4 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>

                    {/* Mobile cards skeleton */}
                    <div className="space-y-6 md:hidden">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="border border-[#2C2724]/15 bg-white/50 p-4">
                                <div className="flex gap-4">
                                    <div className="h-28 w-24 bg-gray-200 shrink-0 rounded" />
                                    <div className="min-w-0 flex-1 space-y-2 py-2">
                                        <div className="h-4 bg-gray-200 w-3/4 rounded" />
                                        <div className="h-3 bg-gray-200 w-1/2 rounded" />
                                        <div className="h-4 bg-gray-200 w-1/3 rounded mt-2" />
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                    <div className="w-24 h-8 bg-gray-200 rounded" />
                                    <div className="w-24 h-4 bg-gray-200 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-col gap-4 border-t border-[#2C2724]/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex gap-3">
                            <div className="w-[160px] h-10 bg-gray-200 rounded" />
                            <div className="w-24 h-10 bg-gray-200 rounded" />
                        </div>
                        <div className="w-48 h-10 bg-gray-200 rounded" />
                    </div>
                </div>

                {/* Cart totals skeleton */}
                <aside className="border border-[#2C2724]/25 bg-[#dedad2] p-6 md:p-8">
                    <div className="h-4 bg-gray-300 w-1/2 mb-6 rounded border-b border-[#2C2724]/20 pb-4" />
                    
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <div className="h-4 bg-gray-300 w-1/4 rounded" />
                            <div className="h-4 bg-gray-300 w-1/4 rounded" />
                        </div>
                        <div className="border-t border-[#2C2724]/10 pt-4 flex justify-between">
                            <div className="h-4 bg-gray-300 w-1/4 rounded" />
                            <div className="space-y-2 text-right flex flex-col items-end">
                                <div className="h-4 bg-gray-300 w-24 rounded" />
                                <div className="h-4 bg-gray-300 w-20 rounded" />
                                <div className="h-3 bg-gray-300 w-32 rounded mt-2" />
                            </div>
                        </div>
                        <div className="flex justify-end pt-2">
                            <div className="h-3 bg-gray-300 w-24 rounded" />
                        </div>
                        <div className="flex justify-between border-t border-[#2C2724]/20 pt-5">
                            <div className="h-6 bg-gray-300 w-1/4 rounded" />
                            <div className="h-6 bg-gray-300 w-1/4 rounded" />
                        </div>
                    </div>
                    
                    <div className="mt-8 flex flex-col gap-3">
                        <div className="w-full h-12 bg-gray-300 rounded" />
                        <div className="w-full h-12 bg-gray-300 border border-[#2C2724] bg-transparent rounded" />
                    </div>
                </aside>
            </div>
        </div>
    );
};
