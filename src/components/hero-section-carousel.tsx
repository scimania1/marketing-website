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
import Autoplay from "embla-carousel-autoplay";

export default function HeroSectionCarousel() {
  const content = [
    {
      src: "/MainPhoto.png",
      alt: "Main Photo of Various Parts",
    },
    {
      src: "/TillerPins.png",
      alt: "Tiller Pins",
    },
    {
      src: "/DrobberPin.png",
      alt: "Drobber Pin",
    },
    {
      src: "/ShackleBolt.png",
      alt: "Shackle Pin",
    },
    {
      src: "/SpindleShaft.png",
      alt: "Spindle Shaft",
    },
    {
      src: "/DrobberPinSRP.png",
      alt: "Drobber Pin SRP",
    },
  ];
  return (
    <Carousel
      className="w-full"
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 2000 })]}
    >
      <CarouselContent className="items-center">
        {content.map((item) => (
          <CarouselItem key={item.alt}>
            <div className="rounded-lg overflow-hidden">
              <Card className="p-0">
                <CardContent className="p-0 flex bg-secondary aspect-square items-center justify-center">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    className="object-cover w-full h-full"
                    width={1000}
                    height={1000}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 p-1 lg:left-8" />
      <CarouselNext className="right-4 p-1 lg:right-8" />
    </Carousel>
  );
}
