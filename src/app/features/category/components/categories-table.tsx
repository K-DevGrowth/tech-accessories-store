import type { Category } from "@/db/schema/catalog";
import { DeleteCategoryDialog } from "./delete-category-dialog";
import { EditCategoryDialog } from "./edit-category-dialog";

export default function CategoriesTable({
  categories,
}: {
  categories: Category[];
}) {
  return (
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
              <td className="px-4 py-3 font-medium text-gray-900">
                {item.name}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-gray-600">
                {item.slug}
              </td>
              <td className="px-4 py-3 text-gray-500">
                {new Date(item.createdAt).toLocaleDateString("vi-VN")}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="inline-flex items-center gap-3">
                  <EditCategoryDialog category={item} />
                  <DeleteCategoryDialog id={item.id} name={item.name} />
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
