"use client";

import Image from "next/image";
import { useShoppingCart } from "../_components/shoppingCart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useShoppingCart();
  const router = useRouter();

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="flex h-max flex-col items-center justify-center bg-white py-10">
      <div className="w-full max-w-4xl bg-white p-6">
        <h1 className="mb-6 text-center text-3xl font-bold">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            Your cart is empty.
          </p>
        ) : (
          <>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="p-4 text-center font-bold text-gray-800">
                    Item
                  </TableHead>
                  <TableHead className="p-4 text-center font-bold text-gray-800">
                    Brand
                  </TableHead>
                  <TableHead className="p-4 text-center font-bold text-gray-800">
                    Product
                  </TableHead>
                  <TableHead className="p-4 text-center font-bold text-gray-800">
                    Quantity
                  </TableHead>
                  <TableHead className="p-4 text-right font-bold text-gray-800">
                    Price
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="items-cente flex justify-center p-4">
                      <Image
                        src={product.image}
                        alt={product.alt}
                        width={96}
                        height={96}
                        className="rounded-md"
                      />
                    </TableCell>
                    <TableCell className="p-4 text-center text-gray-700">
                      {product.brand}
                    </TableCell>
                    <TableCell className="p-4 text-center text-gray-700">
                      {product.description}
                    </TableCell>
                    <TableCell className="p-4 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Input
                          type="number"
                          min="1"
                          value={product.quantity}
                          onChange={(e) =>
                            updateQuantity(product.id, parseInt(e.target.value))
                          }
                          className="w-16 rounded-md border text-center"
                        />
                        <Button
                          onClick={() => removeFromCart(product.id)}
                          className="text-red-500 hover:underline"
                          variant="ghost"
                        >
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="p-4 text-right text-gray-800">
                      ${(product.price * product.quantity).toFixed(2)} CAD
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-8 flex flex-col items-end gap-2">
              <p className="text-xl font-semibold text-gray-800">
                Subtotal: ${cartTotal.toFixed(2)} CAD
              </p>
              <p className="text-sm text-gray-500">
                Shipping, taxes, and discounts are calculated at checkout.
              </p>
              <Button
                onClick={handleCheckout}
                className="mt-4 rounded-md bg-primary px-6 py-2 text-white"
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
