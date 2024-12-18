"use client";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "../_components/shoppingCart";

interface ProductCardProps {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  alt: string | null;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  image,
  alt,
}: ProductCardProps) {
  const { addToCart } = useShoppingCart();
  if (!id) {
    return null;
  }
  return (
    <Card
      key={id}
      id={`product-card-${id}`}
      className="flex w-auto flex-col items-center justify-center border-none p-4 shadow-none"
    >
      <CardHeader>
        <Image
          src={image || "/default-image.jpg"}
          alt={alt || "Product image"}
          width={192}
          height={192}
        />
      </CardHeader>
      <CardContent className="product-details">
        <CardTitle>{name}</CardTitle>
        <p>{description}</p>
        <p>${price.toFixed(2)} CAD</p>
      </CardContent>
      <Button
        onClick={() =>
          addToCart({
            id,
            name,
            description,
            price,
            image,
            alt,
            available: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        }
      >
        Add to Cart
      </Button>
    </Card>
  );
}

export function ProductSkeleton() {
  return (
    <Card className="rounded- flex w-auto animate-pulse flex-col">
      <div className="aspect-video w-full bg-gray-200"></div>
      <CardHeader>
        <div className="h-3 w-24 rounded-full bg-gray-200"></div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="h-2 w-full rounded-full bg-gray-200"></div>
        <div className="h-2 w-full rounded-full bg-gray-200"></div>
      </CardContent>
      <Button className="w-full bg-gray-500" disabled size="lg"></Button>
    </Card>
  );
}
