import { NextResponse } from "next/server";
import Stripe from "stripe";

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

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: "cad",
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
