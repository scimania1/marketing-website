"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";

type Variant = Pick<ButtonProps, "variant" | "size"> & { className: string };

export default function SubmitButton({ className, variant, size }: Variant) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className={cn(
        `${pending ? "opacity-50 pointer-events-none" : ""}`,
        className,
      )}
      variant={variant}
      size={size}
    >
      Apply Filters
    </Button>
  );
}
