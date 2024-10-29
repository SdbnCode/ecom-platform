"use client";

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

export default function ProductPage() {
  return (
    <div className="prose mt-4 max-w-none overflow-x-auto">
      <div className="flex justify-evenly">
        <h1 className="mb-0">Products</h1>
        <Button asChild>
          <Link href="/admin/products/new" className="no-underline">
            Add Product
          </Link>
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table className="table w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>
                <Label>
                  <Input type="checkbox" className="" />
                </Label>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Stock </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableHead>
                <Label>
                  <Input type="checkbox" className="" />
                </Label>
              </TableHead>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Image src="" alt="">
                    {/* <Image /> */}
                  </Image>
                  <div>
                    <span>Product Name</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>$100</TableCell>
              <TableCell>Product Description</TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Button className="btn btn-primary btn-sm">Edit</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
