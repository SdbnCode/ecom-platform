"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import addNewProduct, { updateProduct } from "../_actions/products";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import Image from "next/image";

export default function ProductForm({ product }: { product: Product | null }) {
  const [error, action] = useFormState(
    product == null ? addNewProduct : updateProduct.bind(null, product.id),
    {},
  );

  return (
    <form action={action} className="space-y-4">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input
          placeholder="Enter product name"
          type="text"
          id="name"
          name="name"
          defaultValue={product?.name || ""}
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
          defaultValue={product?.price || ""}
          required
        />
        {error.price && <p className="text-destructive">{error.price}</p>}
      </div>
      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          type="number"
          placeholder="0"
          id="quantity"
          name="quantity"
          defaultValue={product?.quantity || ""}
          required
        />
        {error.quantity && <p className="text-destructive">{error.quantity}</p>}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          placeholder="Enter product description"
          id="description"
          name="description"
          defaultValue={product?.description || ""}
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
          required={product == null}
        />
        {error.image && <p className="text-destructive">{error.image}</p>}
      </div>
      {product?.image && (
        <Image
          src={product.image}
          height="250"
          width="250"
          alt={product.name}
        />
      )}
      <Button type="submit" className="w-full">
        Add Product
      </Button>
    </form>
  );
}
