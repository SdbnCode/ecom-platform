import { Product } from "@prisma/client";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  addToCart: (item: Product) => void;
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <Card
      key={product.id}
      id={`product-card-${product.id}`}
      className="flex w-auto flex-col items-center justify-center border-none p-4 shadow-none"
    >
      <CardHeader>
        <Image
          src={product.image || "/default-image.jpg"}
          alt={product.alt || "Product image"}
          width={192}
          height={192}
        />
      </CardHeader>
      <CardContent className="product-details">
        <CardTitle>{product.brand}</CardTitle>
        <p>{product.description}</p>
        <p>${product.price.toFixed(2)} CAD</p>
      </CardContent>

      <Button onClick={() => addToCart(product)}>Add to Cart</Button>
    </Card>
  );
}
