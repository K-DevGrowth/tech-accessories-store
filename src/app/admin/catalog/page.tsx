import { CreateCategoryDialog } from "@/app/features/category/components/create-category-dialog";
import PageHeader from "@/components/admin/shared/page-header";
import { getCategories } from "@/app/features/category/category-queries";
import { Suspense } from "react";

export default function CategoriesPage() {
  return (
    <>
      <PageHeader
        title="Danh mục"
        description="Quản lý danh mục sản phẩm"
        action={<CreateCategoryDialog />}
      />
      <div className="space-y-6">
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3 font-medium">Thứ tự</th>
                <th className="px-4 py-3 font-medium">Tên danh mục</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Ngày tạo</th>
                <th className="px-4 py-3 text-right font-medium">Thao tác</th>
              </tr>
            </thead>

            <Suspense>
              <CategoriesContent />
            </Suspense>
          </table>
        </div>
      </div>
    </>
  );
}

async function CategoriesContent() {
  const categories = await getCategories();

  return (
    <tbody className="divide-y divide-gray-200">
      {categories.length === 0 ? (
        <tr>
          <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
            Chưa có danh mục nào.
          </td>
        </tr>
      ) : (
        categories.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-500">{item.sortOrder}</td>
            <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
            <td className="px-4 py-3 font-mono text-xs text-gray-600">
              {item.slug}
            </td>
            <td className="px-4 py-3 text-gray-500">
              {new Date(item.createdAt).toLocaleDateString("vi-VN")}
            </td>
            <td className="px-4 py-3 text-right">
              <div className="inline-flex items-center gap-3">
                <button className="text-blue-600 hover:underline">Sửa</button>
                <button className="text-red-600 hover:underline">Xóa</button>
              </div>
            </td>
          </tr>
        ))
      )}
    </tbody>
  );
}
