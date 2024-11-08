import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

      <Button>Add to Cart</Button>
    </Card>
  );
}
