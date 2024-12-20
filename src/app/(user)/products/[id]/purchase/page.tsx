// import prisma from "@/lib/prisma";
// import { notFound } from "next/navigation";
// import Stripe from "stripe";
// import { CheckoutForm } from "../../../checkout/_components/Checkout";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// export default async function purchasePage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const { id } = params;
//   const product = await prisma.product.findUnique({ where: { id } });
//   if (product == null) return notFound();

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: product.price,
//     currency: "usd",
//     metadata: { productId: product.id },
//   });

//   if (paymentIntent.client_secret == null) {
//     throw Error("Stripe failed to create payment intent");
//   }

//   return (
//     <CheckoutForm cart={cart} clientSecret={paymentIntent.client_secret} />
//   );
// }
