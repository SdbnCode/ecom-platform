"use client";

import { useEffect, useState } from "react";
import { useShoppingCart } from "../_components/shoppingCart";
import { CheckoutForm } from "./_components/Checkout";

export default function CheckoutPage() {
  const { cart } = useShoppingCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("/api/payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch client secret");
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    if (cart?.length > 0) fetchClientSecret();
  }, [cart]);

  if (!cart || cart.length === 0) {
    return <div>Your cart is empty. Add items to proceed to checkout.</div>;
  }

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <CheckoutForm cart={cart} clientSecret={clientSecret} />
    </div>
  );
}
