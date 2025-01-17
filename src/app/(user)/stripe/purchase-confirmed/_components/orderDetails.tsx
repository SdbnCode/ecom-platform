"use client";

import Image from "next/image";

interface OrderItem {
  id: string;
  product: {
    image: string | null;
    name: string;
  };
  price: number;
  quantity: number;
}

interface Order {
  items: OrderItem[];
}

interface OrderDetailsProps {
  order: Order;
  isSuccess: boolean;
}

export default function OrderDetails({ order, isSuccess }: OrderDetailsProps) {
  const totalPrice = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="mx-auto mt-8 w-full max-w-5xl space-y-8">
      {order.items.map((item: OrderItem) => (
        <div key={item.id} className="flex items-center space-x-4">
          {item.product.image && (
            <Image
              src={item.product.image}
              alt={item.product.name}
              width={150}
              height={150}
              className="rounded-md"
            />
          )}
          <div className="space-y-2">
            <h2 className="text-lg font-bold">{item.product.name}</h2>
            <p>Unit Price: ${item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      ))}
      <div className="mt-8 flex flex-col items-center">
        <p className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>
        <div
          className={`mt-4 text-xl font-semibold ${
            isSuccess ? "text-green-500" : "text-red-500"
          }`}
        >
          {isSuccess ? "Thank you for your purchase!" : "Purchase Failed."}
        </div>
      </div>
    </div>
  );
}
