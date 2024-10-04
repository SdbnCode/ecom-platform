"use client";
import Cart from "../../components/cart";
import { useShoppingCart } from "../../components/shoppingCart";

export default function CartPage() {
  const { cart } = useShoppingCart();

  return (
    <div>
      <Cart cart={cart} />
    </div>
  );
}
