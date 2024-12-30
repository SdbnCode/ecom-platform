"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { FormEvent, useState } from "react";

type CheckoutFormProps = {
  cart: {
    id: string;
    image: string;
    name: string;
    price: number;
    quantity: number;
    description: string;
    alt: string;
  }[];
  clientSecret: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
);

export function CheckoutForm({ cart = [], clientSecret }: CheckoutFormProps) {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Your Order</h1>
        {cart.map((product) => (
          <div key={product.id} className="flex items-center gap-4">
            <div className="relative aspect-video w-1/3 flex-shrink-0">
              <Image
                src={product.image}
                width={150}
                height={150}
                alt={product.name}
                className="cover rounded-md"
              />
            </div>
            <div>
              <div className="text-lg font-bold">{product.name}</div>
              <div className="text-sm text-gray-500">{product.description}</div>
              <div className="text-sm">Quantity: {product.quantity}</div>
              <div className="text-sm font-semibold">
                Price: ${product.price.toFixed(2)}
              </div>
              <div className="text-sm font-bold">
                Subtotal: ${(product.price * product.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-4 text-right">
        <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
      </div>

      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form cart={cart} />
      </Elements>
    </div>
  );
}

function Form({ cart }: { cart: CheckoutFormProps["cart"] }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (stripe == null || elements == null || email == null) return;

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-confirmed`,
        },
      })
      .then(({ error }) => {
        if (
          error &&
          (error.type === "card_error" || error.type === "validation_error")
        ) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unknown error occurred. Please try again.");
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <PaymentElement />
          <div className="mt-4">
            <LinkAuthenticationElement
              onChange={(e) => setEmail(e.value.email)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            disabled={stripe == null || elements == null || isLoading}
          >
            {isLoading
              ? "Processing..."
              : `Pay $${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
