import { CreateCategoryDialog } from "@/app/features/category/components/create-category-dialog";
import PageHeader from "@/components/admin/shared/page-header";
import { getCategories } from "@/app/features/category/category-queries";
import { Suspense } from "react";
import Link from "next/link";
import CategoriesTable from "@/app/features/category/components/categories-table";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab = tab === "brands" ? "brands" : "categories";
  const isBrands = activeTab === "brands";

  return (
    <>
      <PageHeader
        title="Danh mục"
        description={`Quản lý ${isBrands ? "hãng" : "danh mục"} sản phẩm`}
        action={<CreateCategoryDialog />}
      />

      <div className="space-y-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6">
            <Link
              href="?tab=categories"
              replace
              className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                !isBrands
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              Danh mục
            </Link>
            <Link
              href="?tab=brands"
              replace
              className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                isBrands
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              Hãng
            </Link>
          </nav>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <Suspense>{isBrands ? "" : <CatalogContent />}</Suspense>
        </div>
      </div>
    </>
  );
}

async function CatalogContent() {
  const categories = await getCategories();

  return <CategoriesTable categories={categories} />;
}
