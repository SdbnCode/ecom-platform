import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function SucessPage({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent,
  );

  if (paymentIntent.metadata.productId == null) return notFound();

  const product = await prisma.product.findUnique({
    where: { id: paymentIntent.metadata.productId },
  });
  if (product == null) return notFound();

  const isSuccess = paymentIntent.status === "succeeded";

  return (
    <div>
      <h1 className="text-4xl font-bold">
        {isSuccess ? "Success purchase!" : "Purchase failed"}
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
            <div className="text-lg">{product.price}</div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="line-clamp-3 text-muted-foreground">
              {product.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
