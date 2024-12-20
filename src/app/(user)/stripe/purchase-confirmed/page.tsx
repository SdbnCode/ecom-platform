import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { payment_intent: string; redirect_status?: string };
}) {
  const { payment_intent, redirect_status } = searchParams;

  if (!payment_intent) return notFound();

  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

  if (!paymentIntent || !paymentIntent.metadata.productId) return notFound();

  const product = await prisma.product.findUnique({
    where: { id: paymentIntent.metadata.productId },
  });

  if (!product) return notFound();

  const isSuccess = redirect_status === "succeeded";

  return (
    <div>
      <h1 className="text-4xl font-bold">
        {isSuccess ? "Purchase Successful!" : "Purchase Failed"}
      </h1>

      <div className="mx-auto w-full max-w-5xl space-y-8">
        <div className="flex items-center gap-4">
          <div className="relative aspect-video w-1/3 flex-shrink-0">
            {product.image && (
              <Image
                src={product.image}
                fill
                alt={product.name}
                className="cover"
              />
            )}
          </div>
          <div>
            <div className="text-lg">${product.price}</div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="line-clamp-3 text-muted-foreground">
              {product.description}
            </div>
            <div className="mt-4">
              {isSuccess ? (
                <p className="text-green-500">Thank you for your purchase!</p>
              ) : (
                <p className="text-red-500">
                  Something went wrong. Please try again.
                </p>
              )}
              <Button className="mt-4" size="lg" asChild></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
