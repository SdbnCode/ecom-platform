import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { cart } = req.body;

    try {
      const amount = cart.reduce(
        (total: number, item: { price: number; quantity: number }) =>
          total + item.price * item.quantity * 100,
        0,
      );

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount),
        currency: "cad",
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
