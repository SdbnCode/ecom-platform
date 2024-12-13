import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function purchasePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (product == null) return notFound();
}
