export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-full pb-16">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="font-playfair text-3xl font-bold tracking-wide text-[#1A1A1A] hidden lg:block">
          Artisan & Co.
        </h1>
      </div>

      <hr className="mb-6 border-[#CFCAC1]" />

      <div className="mb-8">
        <h2 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-1">
          Services
        </h2>
        <p className="text-sm text-[#4A4A4A]">
          Manage the services you offer to your customers
        </p>
      </div>

      <div className="flex items-center justify-center border border-dashed border-[#CFCAC1] bg-white/30 py-24 text-center">
        <div>
          <p className="font-playfair text-xl font-bold text-[#1A1A1A] mb-2">Coming Soon</p>
          <p className="text-sm text-[#6E6A63]">This section is under development.</p>
        </div>
      </div>
    </div>
  );
}
