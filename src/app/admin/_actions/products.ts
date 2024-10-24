"use server";
import z from "zod";
import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";
import { redirect } from "next/navigation";

const MaxFileSize = 2 * 1024 * 1024;

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.coerce.number().min(0, "Price must be more than 0"),
  description: z.string().min(1, "Description is required"),
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed (JPEG, PNG, etc.).",
    })
    .refine((file) => file.size <= MaxFileSize, {
      message: "File size must be less than 2MB",
    }),
});

export default async function addNewProduct(formData: FormData) {
  const result = productSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!result.success) {
    return { error: result.error.formErrors.fieldErrors };
  }

  const data = result.data;

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = path.join("products", data.image.name);

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
    },
  });

  redirect("/admin/products");
}
