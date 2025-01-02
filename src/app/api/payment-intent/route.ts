import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cart } = body;

    const amount = cart.reduce(
      (total: number, item: { price: number; quantity: number }) =>
        total + item.price * item.quantity * 100,
      0,
    );

    const productIds = cart.map((item: { id: string }) => item.id);
    const existingProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const existingProductIds = new Set(existingProducts.map((p) => p.id));
    const invalidItems = cart.filter(
      (item: { id: string }) => !existingProductIds.has(item.id),
    );

    if (invalidItems.length > 0) {
      console.error("Invalid product IDs:", invalidItems);
      return NextResponse.json(
        { error: "Some products in the cart are invalid." },
        { status: 400 },
      );
    }

    const guestUser = await prisma.user.create({
      data: {
        email: `${uuidv4()}@guest.com`,
        password: "",
      },
    });

    const order = await prisma.order.create({
      data: {
        userId: guestUser.id,
        status: "pending",
        total: amount,
        items: {
          create: cart.map(
            (item: { id: string; quantity: number; price: number }) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            }),
          ),
        },
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: "cad",
      metadata: { orderId: order.id },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
