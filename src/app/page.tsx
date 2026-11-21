import { Suspense } from "react";
import ProductPage from "./features/product/components/product-listing";
import { getCategories } from "./features/category/category-queries";

export default function HomePage() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}

async function HomeContent() {
  const categories = await getCategories();

  return (
    <div>
      <ProductPage categories={categories} />
    </div>
  );
}
