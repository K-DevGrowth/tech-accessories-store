import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="vi" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-surface-canvas text-surface-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
