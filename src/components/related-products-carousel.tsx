"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Link from "next/link";
import { playfairDisplay } from "@/app/fonts";

function shortenName(name: string, limit: number) {
  let ans = name.split("/")[0].trim();
  if (ans.length <= limit) {
    return ans;
  }
  return ans.slice(0, limit) + "...";
}

export default function RelatedProductsCarousel({
  relatedProducts,
}: {
  relatedProducts: { _id: string; name: string; imageURL: string }[];
}) {
  return (
    <Carousel className="w-full" opts={{ loop: true }}>
      <CarouselContent>
        {relatedProducts.map((relatedProduct) => (
          <CarouselItem
            key={`${relatedProduct._id}`}
            className="sm:basis-1/2 md:basis-1/4 lg:basis-1/5"
          >
            <Link
              href={`/products/${relatedProduct.name.split("/")[0].trim().replaceAll(" ", "-")}/${relatedProduct._id}`}
              passHref
            >
              <Card className="p-0">
                <CardContent className="p-0 relative flex bg-secondary aspect-square items-center justify-center">
                  <Image
                    src={relatedProduct.imageURL}
                    alt={relatedProduct.name}
                    className="object-contain w-full h-full"
                    width={300}
                    height={300}
                  />
                  <div
                    className={`${playfairDisplay.className} absolute tracking-wide text-lg font-medium bottom-4 border border-border left-4 rounded-lg p-2 bg-secondary/60 text-secondary-foreground backdrop-blur-lg`}
                  >
                    {shortenName(relatedProduct.name, 20)}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 p-1 lg:left-8" />
      <CarouselNext className="right-4 p-1 lg:right-8" />
    </Carousel>
  );
}
