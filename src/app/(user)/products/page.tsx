import { ProductCard, ProductSkeleton } from "../_components/productCard";
import { Suspense } from "react";
import prisma from "@/lib/prisma";

function getProducts() {
  return prisma.product.findMany({
    where: { available: true },
    orderBy: { name: "asc" },
  });
}

export default async function ProductGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
      <Suspense
        fallback={
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        }
      >
        <ProductSuspense />
      </Suspense>
    </div>
  );
}

async function ProductSuspense() {
  const products = await getProducts();

  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
