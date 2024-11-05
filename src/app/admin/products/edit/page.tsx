"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import addNewProduct from "../../_actions/products";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";

export default function EditProduct({
  parmas: { id },
}: {
  parmas: { id: string };
}) {
  const product = await prisma.product.findUnique({ where: { id } });

  return (
    <div className="my-8 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-lg font-bold">Edit Product</h1>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                placeholder="Enter product name"
                type="text"
                id="name"
                name="name"
                required
              />
              {error.name && <p className="text-destructive">{error.name}</p>}
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                placeholder="0.00"
                step="0.01"
                id="price"
                name="price"
                required
              />
              {error.price && <p className="text-destructive">{error.price}</p>}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                placeholder="Enter product description"
                id="description"
                name="description"
                rows={4}
                required
              />
              {error.description && (
                <p className="text-destructive">{error.description}</p>
              )}
            </div>

            <div>
              <Label htmlFor="image">Product Image</Label>
              <Input
                type="file"
                accept="image/*"
                id="image"
                name="image"
                required
              />
              {error.image && <p className="text-destructive">{error.image}</p>}
            </div>

            <Button type="submit" className="w-full">
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
