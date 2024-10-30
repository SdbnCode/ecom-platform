"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteProduct, UpdateAvailability } from "../_actions/products";

export function ToggleAvailableforPurchase({
  id,
  available,
}: {
  id: string;
  available: boolean;
}) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      disabled={loading}
      onClick={() => {
        startTransition(async () => {
          await UpdateAvailability(id, !available);
          router.refresh();
        });
      }}
    >
      {available ? "Disable" : "Enable"} for purchase
    </DropdownMenuItem>
  );
}

export function DeleteNewProduct({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      disabled={loading || disabled}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
          router.refresh();
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
