import React from "react";
import { useShoppingCart } from "../components/shoppingCart";
export default function CheckoutPage() {
  return (
    <div>
      <useShoppingCart />

      <h1>Checkout</h1>
      <p> Shipping Information</p>
    </div>
  );
}
