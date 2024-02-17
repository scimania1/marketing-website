import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="flex-grow grid place-items-center">
        <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            <span className="font-extrabold">404</span>
            <span> | Product Not Found </span>
          </h1>
          <h2 className="text-muted-foreground text-lg p-1 leading-tight sm:text-xl md:text-2xl lg:text-3xl">
            The product you are looking for does not exist
          </h2>
          <Link
            href="/products"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "text-lg md:text-xl",
            )}
          >
            Go to Products
          </Link>
        </div>
      </div>
    </>
  );
}
