import { Button } from "@/components/ui/button";
import ProductTable from "@/app/admin/_components/productTable";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function ProductPage() {
  const product = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      image: true,
      available: true,
      quantity: true,
      _count: { select: { orderItems: true } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="prose mt-4 max-w-none overflow-x-auto">
      <div className="flex justify-evenly">
        <h1 className="mb-0">Products</h1>
        <Button asChild>
          <Link href="/admin/products/new" className="no-underline">
            Add Product
          </Link>
        </Button>
      </div>
      <ProductTable product={product} />
    </div>
  );
}
