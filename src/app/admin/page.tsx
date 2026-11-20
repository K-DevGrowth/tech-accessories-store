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
  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: 1,
      name: "Tai nghe chống ồn chủ động ANC Bowie H1 Pro",
      category: "Tai nghe & Âm thanh",
      price: 1350000,
      stock: 35,
    },
    {
      id: 2,
      name: "Pin sạc dự phòng Blade HD 100W Siêu mỏng",
      category: "Pin dự phòng",
      price: 1690000,
      stock: 18,
    },
    {
      id: 3,
      name: "Tai nghe True Wireless siêu nhỏ gọn Bowie E16",
      category: "Tai nghe & Âm thanh",
      price: 390000,
      stock: 65,
    },
    {
      id: 4,
      name: "Củ sạc GaN6 Pro 140W 4 Cổng",
      category: "Củ sạc GaN",
      price: 1490000,
      stock: 42,
    },
    {
      id: 5,
      name: "Pin sạc dự phòng MagSafe Magnetic Mini 10.000mAh",
      category: "Pin dự phòng",
      price: 790000,
      stock: 28,
    },
    {
      id: 6,
      name: "Cáp sạc Type-C to Type-C 240W Kevlar 2m",
      category: "Cáp sạc & Hub",
      price: 249000,
      stock: 120,
    },
    {
      id: 7,
      name: "Trạm kết nối USB-C Hub 8-in-1 tản nhiệt nhôm",
      category: "Cáp sạc & Hub",
      price: 850000,
      stock: 15,
    },
    {
      id: 8,
      name: "Giá đỡ điện thoại kiêm sạc MagSafe ô tô MagPro 15W",
      category: "Phụ kiện ô tô",
      price: 750000,
      stock: 20,
    },
    {
      id: 9,
      name: "Củ sạc để bàn GaN3 Pro 65W kèm ổ cắm AC",
      category: "Củ sạc GaN",
      price: 890000,
      stock: 14,
    },
    {
      id: 10,
      name: "Pin sạc dự phòng không dây 5000mAh siêu nhẹ",
      category: "Pin dự phòng",
      price: 520000,
      stock: 40,
    },
    {
      id: 11,
      name: "Cáp sạc nhanh 3-trong-1 đa năng 100W",
      category: "Cáp sạc & Hub",
      price: 195000,
      stock: 85,
    },
    {
      id: 12,
      name: "Loa Bluetooth di động chống nước ngoài trời",
      category: "Tai nghe & Âm thanh",
      price: 990000,
      stock: 22,
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Tai nghe & Âm thanh",
    price: "",
    stock: "",
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: "", category: "Tai nghe & Âm thanh", price: "", stock: "" });
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
            : p
        )
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
    <div className="h-screen flex flex-col bg-[#F9FAFB] text-slate-900 font-sans antialiased overflow-hidden">
      {/* Top Navbar: Cố định hoàn toàn trên đỉnh */}
      <div className="shrink-0">
        <Navbar activePage="admin" />
      </div>

      {/* Main Container: Khóa màn hình, chỉ cuộn bên trong danh sách sản phẩm */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Đứng yên, cố định bên trái */}
        <aside className="w-56 lg:w-64 bg-white border-r border-slate-200 p-4 shrink-0 flex flex-col justify-between">
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
        <main className="flex-1 flex flex-col overflow-hidden p-6 lg:p-8">
          {/* Header Bar: Cố định, không bị cuộn trôi */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 shrink-0">
            <div>
              <h1 className="text-xl lg:text-2xl font-extrabold text-slate-950">
                Quản lý sản phẩm
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Danh sách phụ kiện trong kho ({products.length} sản phẩm)
              </p>
            </div>

            <Button
              variant="primary"
              size="sm"
              className="font-bold"
              onClick={handleOpenAdd}
            >
              + Thêm sản phẩm
            </Button>
          </div>

          {/* Product List Table: CUỘN LÊN XUỐNG BÊN TRONG DANH SÁCH NÀY */}
          <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
            {/* Vùng cuộn độc lập cho danh sách (Scrollable table body) */}
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left border-collapse text-xs">
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
                    <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
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
            <div className="shrink-0 p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between items-center px-4">
              <span>Đang hiển thị {products.length} sản phẩm</span>
              <span className="font-mono text-slate-400">Cuộn trong danh sách để xem thêm</span>
            </div>
          </div>
        </main>
      </div>

      {/* Simple Form Modal (Thêm / Sửa sản phẩm) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">
                {editingId ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Tai nghe chống ồn ANC Bowie H1 Pro"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Danh mục
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-400"
                >
                  <option value="Tai nghe & Âm thanh">Tai nghe & Âm thanh</option>
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
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-400 font-mono"
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
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-400 font-mono"
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
                <Button type="submit" variant="primary" size="sm" className="font-bold">
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
