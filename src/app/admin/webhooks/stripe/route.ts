import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  );

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    const productId = charge.metadata.productId;
    const email = charge.metadata.email;
    const price = charge.amount;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (product == null || email == null)
      return new Response("Bad Request", { status: 400 });

    const userFields = { email, orders: { create: { productId, price } } };
    const user = await prisma.user.upsert({
      where: { email },
      select: { orders: { orderBy: { createdAt: "desc" }, take: 1 } },
      create: userFields,
      update: userFields,
    });
  }
}
