import Link from "next/link";

export default function ProductsHeader() {
  return (
    <>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="font-playfair text-3xl font-bold tracking-wide text-[#1A1A1A] hidden lg:block">
          Artisan & Co.
        </h1>
        <Link href="/dashboard/products/add-product" className="flex w-full sm:w-max justify-center items-center gap-2 bg-[#6E6A63] px-6 py-2.5 font-playfair text-sm font-bold text-white transition-colors hover:bg-[#56534c] lg:ml-auto">
          <span>+</span> Add New Product
        </Link>
      </div>

      <hr className="mb-6 border-[#CFCAC1]" />

      <div className="mb-6">
        <h2 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-1">
          Product Management
        </h2>
        <p className="text-sm text-[#4A4A4A]">
          Manage your product catalog and track registry adds
        </p>
      </div>
    </>
  );
}
