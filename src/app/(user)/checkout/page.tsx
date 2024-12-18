"use client";

import { useEffect, useState } from "react";
import { useShoppingCart } from "../_components/shoppingCart";
import { CheckoutForm } from "./_components/Checkout";

export default function CheckoutPage() {
  const { cart } = useShoppingCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await fetch("/api/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);
    };

    if (cart.length > 0) fetchClientSecret();
  }, [cart]);

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="container mx-auto py-10">
      <CheckoutForm
        product={{
          id: "cart",
          image: "/cart-image.jpg",
          name: "Your Cart",
          price: totalAmount,
          description: "Items in your shopping cart",
        }}
        clientSecret={clientSecret}
      />
    </div>
  );
}
