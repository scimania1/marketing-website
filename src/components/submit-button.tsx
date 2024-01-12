"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";

type Variant = Pick<ButtonProps, "variant" | "size" | "type"> & {
  className: string;
} & {
  children: React.ReactNode;
};

export default function SubmitButton({
  className,
  variant = "default",
  size = "default",
  children,
  type,
}: Variant) {
  const { pending } = useFormStatus();
  return (
    <Button
      type={type}
      aria-disabled={pending}
      className={cn(
        `${pending ? "opacity-50 pointer-events-none bg-green-500" : ""}`,
        className,
      )}
      variant={variant}
      size={size}
    >
      {children}
    </Button>
  );
}
