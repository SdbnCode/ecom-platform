"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
// import prisma from "@/lib/prisma";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.coerce.number().min(0, "Price must be more than 0"),
  description: z.string().min(1, "Description is required"),
  image: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Image is required")
    .refine(
      (files) => files[0]?.type.startsWith("image/"),
      "Only image files are allowed (JPEG, PNG, etc.).",
    ),
});

export default function AddProduct() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      image: undefined,
    },
  });

  // Handling form submission
  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price.toString());
    formData.append("description", values.description);
    formData.append("image", values.image[0]);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // prisma.product.create({
        //   name: values.name,
        //   price: values.price,
        //   description: values.description,
        //   image: values.image[0].name,
        // });

        router.push("/admin/products");
      } else {
        const data = await response.json();
        setServerError(data.message);
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again later.");
      console.log(error);
    }
  };

  return (
    <div className="my-8 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-lg font-bold">Add Product</h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.price?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description"
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.description?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.image?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {serverError && (
                <p className="text-error mb-0 mt-1 text-sm">{serverError}</p>
              )}

              <Button type="submit" className="w-full">
                Add Product
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
