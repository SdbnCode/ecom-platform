"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import prisma from "@/lib/prisma";
import { useTransition } from "react";

export function ToggleAvailableforPurchase({
  id,
  available,
}: {
  id: string;
  available: boolean;
}) {
  const [loading, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      disabled={loading}
      onClick={() => {
        startTransition(async () => {
          await prisma.product.update({
            where: { id },
            data: { available: !available },
          });
        });
      }}
    >
      {available ? "Disable" : "Enable"} for purchase
    </DropdownMenuItem>
  );
}

export function DeleteProduct({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [loading, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      disabled={loading || disabled}
      onClick={() => {
        startTransition(async () => {
          await prisma.product.delete({ where: { id } });
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
