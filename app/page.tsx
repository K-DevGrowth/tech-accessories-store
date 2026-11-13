"use client";

import { useEffect, useState, useTransition } from "react";
import { Product } from "@/db/schema";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/app/actions";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Form thêm sản phẩm
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // Trạng thái sửa sản phẩm
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const refreshProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    let isMounted = true;
    getProducts()
      .then((data) => {
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Lỗi tải sản phẩm:", err);
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    startTransition(async () => {
      try {
        await createProduct({
          name: name.trim(),
          price: Number(price),
          description: description.trim(),
        });
        setName("");
        setPrice("");
        setDescription("");
        await refreshProducts();
      } catch (err) {
        console.error("Lỗi khi thêm:", err);
      }
    });
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(product.price.toString());
    setEditDescription(product.description || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleUpdate = async (id: number) => {
    if (!editName.trim() || !editPrice) return;

    startTransition(async () => {
      try {
        await updateProduct(id, {
          name: editName.trim(),
          price: Number(editPrice),
          description: editDescription.trim(),
        });
        setEditingId(null);
        await refreshProducts();
      } catch (err) {
        console.error("Lỗi khi cập nhật:", err);
      }
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xoá sản phẩm này không?")) return;

    startTransition(async () => {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } catch (err) {
        console.error("Lỗi khi xoá:", err);
      }
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 text-black">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-black">Quản lý Sản phẩm</h1>

        {/* Form thêm sản phẩm */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-base font-semibold text-black mb-4">
            Thêm sản phẩm mới
          </h2>
          <form
            onSubmit={handleCreate}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div>
              <label className="block text-xs font-medium text-black mb-1">
                Tên sản phẩm *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: Bàn phím cơ"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-black mb-1">
                Giá (VNĐ) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="VD: 500000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-black mb-1">
                Mô tả
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="VD: Không dây, RGB"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm transition duration-150 disabled:opacity-50"
              >
                {isPending ? "Đang xử lý..." : "Thêm"}
              </button>
            </div>
          </form>
        </div>

        {/* Bảng sản phẩm */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-base font-semibold text-black">
              Danh sách sản phẩm
            </h2>
            <span className="text-xs text-black font-medium">
              Tổng số: {products.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-black">
              <thead className="bg-gray-100 text-xs uppercase text-black font-bold border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-black">ID</th>
                  <th className="px-6 py-3 text-black">Tên</th>
                  <th className="px-6 py-3 text-black">Giá</th>
                  <th className="px-6 py-3 text-black">Mô tả</th>
                  <th className="px-6 py-3 text-right text-black">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-black">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-black">
                      Đang tải danh sách...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-black">
                      Chưa có sản phẩm nào.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => {
                    const isEditing = editingId === product.id;
                    return (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-xs text-black font-semibold">
                          #{product.id}
                        </td>
                        <td className="px-6 py-4 font-medium text-black">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          ) : (
                            product.name
                          )}
                        </td>
                        <td className="px-6 py-4 text-black font-medium">
                          {isEditing ? (
                            <input
                              type="number"
                              min="0"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          ) : (
                            `${product.price.toLocaleString("vi-VN")} đ`
                          )}
                        </td>
                        <td className="px-6 py-4 text-black">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          ) : (
                            product.description || "-"
                          )}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => handleUpdate(product.id)}
                                disabled={isPending}
                                className="text-green-700 hover:text-green-900 font-semibold text-sm"
                              >
                                Lưu
                              </button>
                              <button
                                onClick={cancelEdit}
                                disabled={isPending}
                                className="text-black hover:underline text-sm font-medium"
                              >
                                Huỷ
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(product)}
                                className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                              >
                                Sửa
                              </button>
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="text-red-600 hover:text-red-800 font-semibold text-sm"
                              >
                                Xoá
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
