"use server";
import z from "zod";
import prisma from "@/lib/prisma";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";

const imageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), {
    message: "Only image files are allowed",
  });

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.coerce.number().min(0, "Price must be greater than 0"),
  description: z.string().min(1, "Description is required"),
  image: imageSchema.refine((file) => file.size > 0, {
    message: "Image is required",
  }),
});

export default async function addNewProduct(
  oldState: unknown,
  formData: FormData,
) {
  const result = productSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${data.image.name}`;

  await fs.writeFile(
    `public/${imagePath}`,
    Buffer.from(await data.image.arrayBuffer()),
  );

  await prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      description: data.description,
      image: imagePath,
      available: false,
    },
  });

  redirect("/admin/products");
}

export async function UpdateAvailability(id: string, available: boolean) {
  await prisma.product.update({
    where: { id },
    data: { available },
  });
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.delete({ where: { id } });

  if (product == null) return notFound();
  await fs.unlink(`public/${product.image}`);
}
