import DashboardSidebar from "./_components/DashboardSidebar";

export const metadata = {
  title: "Artisan & Co. Dashboard",
  description: "Manage your products, services, and registries",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-[#F5F3EE] font-sans text-[#1C1C1C]">
      <DashboardSidebar />
      <main className="flex-1 p-4 lg:p-10 lg:pl-16 pt-4 lg:pt-14">
        {children}
      </main>
    </div>
  );
}
