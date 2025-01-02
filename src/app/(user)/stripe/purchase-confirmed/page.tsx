import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { payment_intent, redirect_status } = searchParams;
  if (!payment_intent) return notFound();

  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent,
  );

  if (!paymentIntent.metadata.orderId) return notFound();

  const order = await prisma.order.findUnique({
    where: { id: paymentIntent.metadata.orderId },
    include: { items: { include: { product: true } } },
  });

  if (!order) return notFound();

  const isSuccess = redirect_status === "succeeded";

  if (!order) return notFound();

  return (
    <div>
      <h1 className="text-4xl font-bold">
        {isSuccess ? "Purchase Successful!" : "Purchase Failed"}
      </h1>

      <div className="mx-auto w-full max-w-5xl space-y-8">
        {order?.items.map((item) => (
          <div
            key={item.id}
            className="relative aspect-video w-1/3 flex-shrink-0"
          >
            {order.items.map((item) => (
              <div key={item.id}>
                {item.product.image && (
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={150}
                    height={150}
                  />
                )}
                <h2>{item.product.name}</h2>
                <p>Price: ${item.price / 100}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}

            <Button className="mt-4" size="lg" asChild>
              <Link href={isSuccess ? "/" : `/products/${order.id}/purchase`}>
                {isSuccess ? "Go to Home" : "Try Again"}
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
