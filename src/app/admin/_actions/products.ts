"use server";
import z from "zod";
import prisma from "@/lib/prisma";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";

const imageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/") || file.size === 0, {
    message: "Only image files are allowed or no image at all",
  });

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.coerce.number().min(0, "Price must be greater than 0"),
  description: z.string().min(1, "Description is required"),
  image: imageSchema.refine((file) => file.size > 0, {
    message: "Image is required",
  }),
});

const editSchema = productSchema.extend({
  image: imageSchema.optional(),
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

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData,
) {
  {
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!result.success) {
      return result.error.formErrors.fieldErrors;
    }

    const data = result.data;
    const product = await prisma.product.findUnique({ where: { id } });

    if (product == null) return notFound();

    let imagePath = product.image;

    if (data.image != null && data.image.size > 0) {
      await fs.unlink(`public${product.image}`);
      imagePath = `/products/${data.image.name}`;
      await fs.writeFile(
        `public${imagePath}`,
        Buffer.from(await data.image.arrayBuffer()),
      );
    }

    await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        image: imagePath,
      },
    });

    redirect("/admin/products");
  }
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
