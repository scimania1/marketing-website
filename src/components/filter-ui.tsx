"use client";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Button, buttonVariants } from "./ui/button";
import { forwardRef } from "react";
import { ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";
import useMediaQuery from "@/hooks/use-media-query";
import { applyFilters } from "@/app/actions";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

const FormButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const { pending } = useFormStatus();
    return (
      <Button
        className={cn(
          buttonVariants({ variant, size, className }),
          pending && "cursor-wait opacity-55 pointer-events-none",
        )}
        disabled={pending}
        ref={ref}
        {...props}
      />
    );
  },
);

FormButton.displayName = "FormButton";

export default function FilterUI({ categories }: { categories: string[] }) {
  const searchParams = useSearchParams();
  const selectedCategories = new Set(searchParams.getAll("categories"));
  // const isDesktop = useMediaQuery("(min-width: 1024px)");
  const query = searchParams.get("query") || "";
  console.log("From Component FilterUI: ", { query });
  const applyFiltersWithQuery = applyFilters.bind(null, query);
  return (
    <form action={applyFiltersWithQuery} className="space-y-3">
      {categories.map((category) => (
        <div key={category} className="w-full flex items-center gap-3">
          <Checkbox
            name={category}
            defaultChecked={selectedCategories.has(category)}
            id={category}
          />
          <Label htmlFor={category}>{category}</Label>
        </div>
      ))}
      <FormButton className="w-full" type="submit">
        Submit
      </FormButton>
    </form>
  );
}
