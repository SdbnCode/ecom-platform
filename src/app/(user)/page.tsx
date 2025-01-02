import "../globals.css";
import { ProductCard, ProductSkeleton } from "./_components/productCard";
import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { cache } from "@/lib/cache";

const NewestProducts = cache(
  () => {
    return prisma.product.findMany({
      where: { available: true },
      orderBy: { orderItems: { _count: "desc" } },
      take: 6,
    });
  },
  ["/", "getNewestProducts"],
  { revalidate: 60 * 60 * 24 },
);

const MostPopularProducts = cache(
  () => {
    return prisma.product.findMany({
      where: { available: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    });
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 * 60 * 24 },
);

type ProductGridProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  return (await productsFetcher()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}

async function ProductGrid({ productsFetcher, title }: ProductGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-4xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/products">View All</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Suspense
          fallback={
            <>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          }
        >
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  );
}

export default async function HomePage() {
  return (
    <div className="container mx-auto">
      <ProductGrid title="Newest Products" productsFetcher={NewestProducts} />
      <ProductGrid
        title="Most Popular Products"
        productsFetcher={MostPopularProducts}
      />
    </div>
  );
}
