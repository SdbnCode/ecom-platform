"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductForm from "../../_components/productForm";
import { Product } from "@prisma/client";

export default function AddProduct({ product }: { product: Product | null }) {
  return (
    <div className="my-8 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-lg font-bold">Add Product</h1>
        </CardHeader>
        <CardContent>
          <ProductForm product={product} />
        </CardContent>
      </Card>
    </div>
  );
}
