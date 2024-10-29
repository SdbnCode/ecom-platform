"use server";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import Product from "@/lib/prisma";

export default async function ProductTable({ product }) {
  if (product.length === 0) {
    return <p>No products found</p>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Label>
                <Input type="checkbox" className="" />
              </Label>
            </TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {product.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Label>
                  <Input type="checkbox" className="" />
                </Label>
              </TableCell>
              <TableCell>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={50}
                  height={50}
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product._count.order}</TableCell>
              <TableCell>
                {product.available ? "Available" : "Not Available"}
              </TableCell>
              <TableCell>
                <Button asChild>
                  <Link href={`/admin/products/${product.id}`}>Edit</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
