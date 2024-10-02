"use client";
import Cart from "../../components/cart";
import Navbar from "../../components/navbar";
import { useShoppingCart } from "../../components/shoppingCart";

export default function CartPage() {
  const { cart } = useShoppingCart();

  return (
    <div>
      <Navbar />
      <Cart cart={cart} />
    </div>
  );
}
