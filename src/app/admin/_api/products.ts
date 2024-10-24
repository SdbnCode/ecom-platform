"use server";
import z from "zod";
import prisma from "@/lib/prisma";
import fs from "fs/promises";

const MaxFileSize = 2 * 1024 * 1024;

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.coerce.number().min(0, "Price must be more than 0"),
  description: z.string().min(1, "Description is required"),
  image: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: "Image is required",
    })
    .refine((files) => files[0]?.type.startsWith("image/"), {
      message: "Only image files are allowed (JPEG, PNG, etc.).",
    })
    .refine((files) => files[0]?.size <= MaxFileSize, {
      message: "File size must be less than 2MB",
    }),
});

export async function addNewProduct(formData: FormData) {
  const entries = Object.fromEntries(formData.entries());
  const result = productSchema.safeParse({
    ...entries,
    image: formData.getAll("image"),
  });

  if (!result.success) {
    return { error: result.error.formErrors.fieldErrors };
  }

  const { name, price, description, image } = result.data;
  const file = image[0];
  const imageUrl = `/uploads/${file.name}`;

  try {
    await prisma.product.create({
      data: {
        name,
        price,
        description,
        image: imageUrl,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating product:", error);
    return { error: "Error saving the product. Please try again." };
  }
}
