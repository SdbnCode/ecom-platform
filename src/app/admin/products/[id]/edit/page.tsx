import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductForm from "../../../_components/productForm";
import prisma from "@/lib/prisma";

export default async function EditProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({ where: { id } });

  return (
    <div className="my-8 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-lg font-bold">Edit Product</h1>
        </CardHeader>
        <CardContent>
          <ProductForm product={product} />
        </CardContent>
      </Card>
    </div>
  );
}
