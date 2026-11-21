"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";

interface ProductItem {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export default function AdminPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Tai nghe & Âm thanh",
    price: "",
    stock: "",
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      category: "Tai nghe & Âm thanh",
      price: "",
      stock: "",
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (p: ProductItem) => {
    setEditingId(p.id);
    setFormData({
      name: p.name,
      category: p.category,
      price: p.price.toString(),
      stock: p.stock.toString(),
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingId !== null) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: formData.name,
                category: formData.category,
                price: Number(formData.price) || 0,
                stock: Number(formData.stock) || 0,
              }
            : p,
        ),
      );
    } else {
      const newProd: ProductItem = {
        id: Date.now(),
        name: formData.name,
        category: formData.category,
        price: Number(formData.price) || 0,
        stock: Number(formData.stock) || 0,
      };
      setProducts((prev) => [newProd, ...prev]);
    }

    setIsFormOpen(false);
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-[#F9FAFB] text-slate-900 font-sans antialiased overflow-hidden">
      {/* Top Navbar: Cố định hoàn toàn trên đỉnh */}
      <div className="shrink-0">
        <Navbar activePage="admin" />
      </div>

      {/* Main Container: Khóa màn hình, chỉ cuộn bên trong danh sách sản phẩm */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Sidebar Drawer (Hiển thị khi mở menu trên mobile) */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-50 md:hidden bg-black/40 backdrop-blur-xs flex"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <aside
              className="w-64 bg-white h-full p-4 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                    Menu quản trị
                  </span>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-700 text-base font-bold cursor-pointer"
                    aria-label="Đóng menu"
                  >
                    ✕
                  </button>
                </div>
                <nav className="space-y-1">
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold bg-slate-100 text-slate-950 text-left transition-colors cursor-pointer"
                  >
                    <span>Quản lý sản phẩm</span>
                    <span className="text-xs font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {products.length}
                    </span>
                  </button>
                </nav>
              </div>

              <div className="text-[11px] text-slate-400 px-3 py-2 border-t border-slate-100">
                TechGear Admin v1.0
              </div>
            </aside>
          </div>
        )}

        {/* Desktop Left Sidebar: Cố định bên trái trên desktop */}
        <aside className="hidden md:flex w-56 lg:w-64 bg-white border-r border-slate-200 p-4 shrink-0 flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              Menu quản trị
            </div>
            <nav className="space-y-1">
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-bold bg-slate-100 text-slate-950 text-left transition-colors cursor-pointer">
                <span>Quản lý sản phẩm</span>
                <span className="text-xs font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {products.length}
                </span>
              </button>
            </nav>
          </div>

          <div className="text-[11px] text-slate-400 px-3 py-2 border-t border-slate-100">
            TechGear Admin v1.0
          </div>
        </aside>

        {/* Content Area: Tiêu đề đứng yên, chỉ cuộn bên trong bảng danh sách */}
        <main className="flex-1 flex flex-col overflow-hidden p-3 sm:p-6 lg:p-8">
          {/* Header Bar: Cố định, không bị cuộn trôi */}
          <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-slate-200 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Nút mở Menu Sidebar trên Mobile */}
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 shrink-0 cursor-pointer shadow-2xs"
                aria-label="Mở menu quản trị"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </button>

              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-950 truncate">
                  Quản lý sản phẩm
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-500 truncate mt-0.5">
                  Danh sách phụ kiện ({products.length} sản phẩm)
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              className="font-bold shrink-0 text-xs sm:text-sm px-3 sm:px-4 py-2"
              onClick={handleOpenAdd}
            >
              <span className="sm:hidden">+ Thêm</span>
              <span className="hidden sm:inline">+ Thêm sản phẩm</span>
            </Button>
          </div>

          {/* Product List Container: CUỘN LÊN XUỐNG BÊN TRONG DANH SÁCH NÀY */}
          <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
            {/* Vùng cuộn độc lập cho danh sách (Scrollable body) */}
            <div className="flex-1 overflow-y-auto">
              {/* 1. Mobile Cards View (sm:hidden) - Tối ưu thao tác vuốt chạm trên điện thoại */}
              <div className="sm:hidden divide-y divide-slate-100">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 space-y-2 hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-slate-900 text-sm leading-snug">
                        {p.name}
                      </div>
                      <span className="shrink-0 px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                        {p.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-slate-900 text-xs">
                          {p.price.toLocaleString("vi-VN")}₫
                        </span>
                        <span className="font-mono text-slate-500 text-[11px]">
                          Kho: {p.stock}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors cursor-pointer"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 2. Desktop/Tablet Table View (hidden sm:table) */}
              <table className="hidden sm:table w-full text-left border-collapse text-xs">
                {/* Header dính ở đầu danh sách khi cuộn (Sticky thead) */}
                <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 z-10 shadow-2xs">
                  <tr className="text-slate-500 font-mono uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Tên sản phẩm</th>
                    <th className="py-3 px-4">Danh mục</th>
                    <th className="py-3 px-4">Giá bán</th>
                    <th className="py-3 px-4">Tồn kho</th>
                    <th className="py-3 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {products.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900 text-sm">
                        {p.name}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {p.price.toLocaleString("vi-VN")}₫
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-700">
                        {p.stock} cái
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors cursor-pointer"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Chân danh sách: Cố định bên dưới bảng */}
            <div className="shrink-0 p-2.5 sm:p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex flex-col sm:flex-row justify-between items-start sm:items-center px-3 sm:px-4 gap-1 sm:gap-0">
              <span>Đang hiển thị {products.length} sản phẩm</span>
              <span className="font-mono text-slate-400 text-[10px] sm:text-[11px]">
                Cuộn danh sách để xem thêm
              </span>
            </div>
          </div>
        </main>
      </div>

      {/* Simple Form Modal (Thêm / Sửa sản phẩm) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-3 sm:p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 sm:p-6 max-h-[90dvh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">
                {editingId ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSave}
              className="space-y-4 text-xs sm:text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Tai nghe chống ồn ANC Bowie H1 Pro"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-base sm:text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Danh mục
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-base sm:text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                >
                  <option value="Tai nghe & Âm thanh">
                    Tai nghe & Âm thanh
                  </option>
                  <option value="Pin dự phòng">Pin dự phòng</option>
                  <option value="Củ sạc GaN">Củ sạc GaN</option>
                  <option value="Cáp sạc & Hub">Cáp sạc & Hub</option>
                  <option value="Phụ kiện ô tô">Phụ kiện ô tô</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Giá bán (VNĐ)
                  </label>
                  <input
                    type="number"
                    placeholder="1350000"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-base sm:text-xs text-slate-900 focus:outline-none focus:border-slate-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Số lượng tồn kho
                  </label>
                  <input
                    type="number"
                    placeholder="30"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-base sm:text-xs text-slate-900 focus:outline-none focus:border-slate-400 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                >
                  Hủy
                </button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="font-bold"
                >
                  {editingId ? "Cập nhật" : "Lưu sản phẩm"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
