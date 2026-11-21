import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "TechGear | Phụ Kiện Công Nghệ & Sạc GaN Cao Cấp",
  description:
    "Hệ thống sản phẩm phụ kiện công nghệ cao cấp: củ sạc GaN nhanh, cáp siêu bền, pin dự phòng và trạm kết nối thông minh.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={cn(
        "h-full antialiased scroll-smooth",
        "font-sans",
        geist.variable,
      )}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-surface-canvas text-surface-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
