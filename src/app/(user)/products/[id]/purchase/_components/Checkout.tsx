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
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";

type CheckoutFormProps = {
  product: {
    image: string;
    name: string;
    price: number;
    description: string;
  };
  clientSecret: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
);

export function CheckoutForm({ product, clientSecret }: CheckoutFormProps) {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div className="flex items-center gap-4">
        <div className="relative aspect-video w-1/3 flex-shrink-0">
          <Image
            src={product.image}
            fill
            alt={product.name}
            className="cover"
          ></Image>
        </div>
        <div>
          <div className="text-lg">{product.price}</div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground">
            {product.description}
          </div>
        </div>
      </div>
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form price={product.price} />
      </Elements>
    </div>
  );
}

function Form({ price }: { price: number }) {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
          <CardDescription className="text-destructive"> Error</CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentElement />
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            disabled={stripe == null || elements == null}
          >
            Submit Payment - {price}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
