import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function Loading() {
  return (
    <MaxWidthWrapper className="py-4 lg:py-6">
      <article className="px-8 grid gap-4 sm:grid-cols-2">
        <Skeleton className="aspect-square rounded-xl w-full" />
        <div className="space-y-2 lg:space-y-4">
          <Skeleton className="h-7 md:h-9" />
          <Skeleton className="h-7 md:h-9 w-2/5" />
        </div>
      </article>
    </MaxWidthWrapper>
  );
}
