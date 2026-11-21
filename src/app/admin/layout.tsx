"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/admin/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

const getPageTitle = (pathname: string) => {
  if (pathname.startsWith("/admin/products")) return "Quản lý sản phẩm";
  if (pathname.startsWith("/admin/catalog")) return "Quản lý danh mục & thương hiệu";
  if (pathname.startsWith("/admin/orders")) return "Quản lý đơn hàng";
  return "Tổng quan";
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="min-h-screen bg-slate-50/60 flex flex-col">
        {/* Header với Title của trang lên đầu, đã bỏ trigger */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white px-4 sm:px-6">
          <h1 className="text-base sm:text-lg font-bold text-slate-900">
            {title}
          </h1>
        </header>

        {/* Main Children Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto space-y-6">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
