import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import PurchaseReceiptEmail from "@/email/PurchaseReceipt";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  );

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    const productId = charge.metadata.productId;
    const email = charge.billing_details.email;
    const price = charge.amount;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (product == null || email == null)
      return new Response("Bad Request", { status: 400 });

    const userFields = {
      email,
      orders: {
        create: { productId, price, total: price, status: "completed" },
      },
    };

    const {
      orders: [order],
    } = await prisma.user.upsert({
      where: { email },
      select: { orders: { orderBy: { createdAt: "desc" }, take: 1 } },
      create: userFields,
      update: userFields,
    });

    await resend.emails.send({
      from: `Support <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Purchase confirmed",
      react: (
        <PurchaseReceiptEmail
          product={{
            name: product.name,
            description: product.description || "",
            image: product.image || "",
          }}
          order={order}
        />
      ),
    });
  }
  return new NextResponse();
}
