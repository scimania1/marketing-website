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
  return (
    <Carousel
      className="w-full"
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 2000 })]}
    >
      <CarouselContent>
        <CarouselItem>
          <div>
            <Card className="p-0">
              <CardContent className="p-0 flex bg-secondary aspect-square items-center justify-center">
                <Image
                  src="/MainPhoto.png"
                  alt="Main Photo of Various Parts"
                  className="object-cover w-full h-full"
                  width={1000}
                  height={1000}
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-1">
            <Card>
              <CardContent className="p-0 flex bg-secondary aspect-square items-center justify-center">
                <Image
                  src="/TillerPins.png"
                  alt="Tiller Pins"
                  className="object-cover w-full h-full"
                  height={1000}
                  width={1000}
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-1">
            <Card>
              <CardContent className="p-0 flex bg-secondary aspect-square items-center justify-center">
                <Image
                  src="/DrobberPin.png"
                  alt="Drobber Pin"
                  className="object-cover w-full h-full"
                  width={1000}
                  height={1000}
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="left-4 p-1 lg:left-8" />
      <CarouselNext className="right-4 p-1 lg:right-8" />
    </Carousel>
  );
}
