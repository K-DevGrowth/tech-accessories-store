"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Package,
  Tags,
  ReceiptText,
  Store,
  ExternalLink,
} from "lucide-react";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const items: MenuItem[] = [
  {
    title: "Tổng quan",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Sản phẩm",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "Danh mục",
    url: "/admin/catalog",
    icon: Tags,
  },
  {
    title: "Đơn hàng",
    url: "#",
    icon: ReceiptText,
    badge: "Sắp có",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="none"
      className="w-64 shrink-0 border-r border-slate-200/80 bg-white min-h-screen"
      {...props}
    >
      {/* 1. Header with workspace badge */}
      <SidebarHeader className="border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-slate-950 text-[#FFB800] flex items-center justify-center shrink-0 shadow-xs font-bold text-sm">
            TG
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-xs text-slate-950 truncate">
              TechGear Admin
            </span>
            <span className="text-[10px] text-slate-500 truncate font-mono">
              v1.0 • Control Panel
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* 2. Main Navigation Menu */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-2">
            Menu quản trị
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      className={`h-9.5 px-3 rounded-lg text-xs font-medium transition-all ${
                        pathname === item.url
                          ? "bg-slate-900 text-white font-semibold hover:bg-slate-900 hover:text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/80"
                      }`}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span className="truncate flex-1">{item.title}</span>
                      {item.badge && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-500 border border-slate-200">
                          {item.badge}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 3. Footer with quick link to store */}
      <SidebarFooter className="border-t border-slate-100 p-2 mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/" />}
              className="h-9 px-3 text-xs text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Store className="size-4 shrink-0 text-slate-500" />
              <span className="truncate flex-1">Xem trang bán hàng</span>
              <ExternalLink className="size-3 text-slate-400" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
