import { AppSidebar } from "@/components/admin/app-sidebar";
import { Navbar } from "@/components/ui/navbar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="min-h-[calc(100svh-4rem)] bg-slate-50/60 flex flex-col">
        {/* Subheader Toolbar */}
        <header className=" flex h-12 shrink-0 items-center justify-between gap-3 border-b border-slate-200/80 bg-white/85 px-4 sm:px-6 backdrop-blur-sm transition-[width,height] ease-linear">
          <div className="flex items-center gap-2.5">
            <SidebarTrigger className="-ml-1 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-lg size-8 transition-colors cursor-pointer" />
            <Separator orientation="vertical" className="h-4 bg-slate-200" />
            {/* <Breadcrumb>
                <BreadcrumbList className="text-xs">
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="/admin"
                      className="font-medium text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      Admin
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-slate-300" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold text-slate-900">
                      {currentSection}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb> */}
          </div>
        </header>

        {/* Main Children Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto space-y-6">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
