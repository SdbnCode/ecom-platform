"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(0, "Price must be more than 0"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  image: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Image is required"),
});

export default function AddProduct() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      category: "",
      image: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    const productData = {
      name: values.name,
      price: values.price,
      description: values.description,
      category: values.category,
      image: values.image[0],
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        router.push("/admin/products");
      } else {
        const data = await response.json();
        setServerError(data.message);
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="prose mt-4 flex max-w-none justify-center">
      <form
        className="form-control w-full max-w-md gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Add Product</h1>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Name:</span>
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            className="input input-bordered input-primary w-full"
            {...register("name")}
            required
          />
        </div>
        {errors.name && (
          <p className="mb-0 mt-1 text-sm text-error">{errors.name.message}</p>
        )}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Price:</span>
          </label>
          <input
            type="number"
            placeholder="0.00"
            step="0.01"
            className="input input-bordered input-primary w-full pl-8"
            min="0"
            required
            {...register("price")}
          />
        </div>
        {errors.price && (
          <p className="mb-0 mt-1 text-sm text-error">{errors.price.message}</p>
        )}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description:</span>
          </label>
          <textarea
            placeholder="Enter product description"
            className="textarea textarea-bordered textarea-primary w-full"
            rows={4}
            required
            {...register("description")}
          ></textarea>
        </div>
        {errors.description && (
          <p className="mb-0 mt-1 text-sm text-error">
            {errors.description.message}
          </p>
        )}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Image:</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered file-input-primary w-full"
            accept="image/*"
            required
            {...register("image")}
          />
        </div>
        {errors.image && (
          <p className="mb-0 mt-1 text-sm text-error">{errors.image.message}</p>
        )}
        {serverError && (
          <p className="mb-0 mt-1 text-sm text-error">{serverError}</p>
        )}
        <button type="submit" className="btn btn-primary btn-md mt-4 w-full">
          Add Product
        </button>
      </form>
    </div>
  );
}
