import { useShoppingCart } from "./_components/shoppingCart";
import "../globals.css";
import { ProductCard } from "./_components/productCard";
import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function NewestProducts() {
  return prisma.product.findMany({
    where: { available: true },
    orderBy: { orders: { _count: "desc" } },
    take: 6,
  });
}

async function MostPopularProducts() {
  return prisma.product.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

type ProductGridProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

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
        {(await productsFetcher()).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default async function HomePage() {
  // const { addToCart } = useShoppingCart();

  return (
    <div className="container mx-auto">
      <h1 className="my-8 text-3xl font-bold">Newest Products</h1>
      <ProductGrid title="Newest Products" productsFetcher={NewestProducts} />
      <h1 className="my-8 text-3xl font-bold">Most Popular Products</h1>
      <ProductGrid
        title="Most Popular Products"
        productsFetcher={MostPopularProducts}
      />
    </div>
  );
}
