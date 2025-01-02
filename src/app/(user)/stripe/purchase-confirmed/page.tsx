import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import OrderDetails from "./_components/orderDetails";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { payment_intent, redirect_status } = searchParams;

  if (!payment_intent) return notFound();

  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

  if (!paymentIntent.metadata.orderId) return notFound();

  const order = await prisma.order.findUnique({
    where: { id: paymentIntent.metadata.orderId },
    include: { items: { include: { product: true } } },
  });

  if (!order) return notFound();

  const isSuccess = redirect_status === "succeeded";

  return (
    <div className="mt-4 flex max-w-none flex-col justify-center">
      <h1 className="text-4xl font-bold">
        {isSuccess ? "Purchase Successful!" : "Purchase Failed"}
      </h1>
      <OrderDetails order={order} isSuccess={isSuccess} />

      <div className="mt-8">
        <Button className="mt-4 self-center" size="lg" asChild>
          <Link href={isSuccess ? "/" : `/products/${order.id}/purchase`}>
            {isSuccess ? "Go to Home" : "Try Again"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
