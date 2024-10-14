import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function productCard({ product }: ProductCardProps) {
  return (
    <div className="border p-4">
      <Image
        src={product.image || "/default-image.jpg"}
        alt={product.name}
        className="h-48 w-full object-cover"
      />
      <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
    </div>
  );
}
