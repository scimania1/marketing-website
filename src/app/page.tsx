import HeroSectionCarousel from "@/components/hero-section-carousel";
import { Button } from "@/components/ui/button";
import { playfairDisplay } from "./fonts";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const heroSectionTitle =
  "Modern Engineers (India) - Perfecting your Machinery Components";
// "Excellence Woven in Precision – Your Machinery Components, Perfected.";

const quote =
  "Elevate your expectations as you peruse through our product gallery, where each item represents the pinnacle of craftsmanship and exactness.";

const categories = [
  "Agricultural Implement Parts",
  "CNC Turned Parts",
  "Fasteners",
  "John Deere Weight Bolts",
  "Sheet Metal Parts",
  "Tractor Trolley Parts",
];

export default function Home() {
  return (
    <div className="h-full px-4 py-2 md:px-8 md:py-4 xl:px-16">
      <div className="relative grid grid-cols-1 md:gap-2 lg:grid-cols-2 lg:gap-4">
        <div className="pb-4 pt-2 lg:order-2 lg:px-0">
          <HeroSectionCarousel />
        </div>
        <div className="grid lg:order-1 lg:grid-rows-[2.5fr_1fr]">
          <div className="space-y-1 self-center py-2">
            <span className="py-2 text-sm text-slate-400 lg:text-lg xl:text-xl 2xl:text-2xl">
              Redifining the Agriculture industry standard
            </span>
            <h1
              className={`${playfairDisplay.className} text-balance text-3xl lg:text-4xl min-[1600px]:text-6xl`}
            >
              {heroSectionTitle}
              {/* TODO: some badge here */}
            </h1>
            <p className="text-pretty py-2 text-sm leading-5 tracking-wide text-muted-foreground lg:pt-6 xl:pt-8 xl:text-xl">
              {quote}
            </p>
            <div className="flex gap-4 lg:py-2">
              <Link href="/products">
                <Button className="self-start text-xs xl:py-6 xl:text-xl">
                  Explore Products
                </Button>
              </Link>
              <Link href="/contact-us">
                <Button
                  variant="secondary"
                  className="self-start text-xs xl:py-6 xl:text-xl"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid max-w-lg gap-2 self-start xl:gap-3">
            <h2
              className={`${playfairDisplay.className} text-lg tracking-wide xl:text-3xl`}
            >
              Exclusive Selection
            </h2>
            <div className="flex flex-wrap gap-2 xl:gap-3">
              {categories.map((category) => (
                <Link href="/products" key={category}>
                  <Badge
                    variant="secondary"
                    className="px-6 py-2 text-xs text-muted-foreground xl:text-base"
                  >
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          <div className="bottom-12 left-1/2 hidden max-w-xl -translate-x-1/2 grid-cols-[auto_1fr] items-center gap-3 rounded-xl bg-background shadow-lg lg:absolute min-[1750px]:grid">
            <div className="grid items-center justify-center">
              <div className="size-[160px] rounded-l-xl bg-slate-300"></div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">Our Design Philosophy</h2>
              <p className="text-pretty text-lg text-muted-foreground">
                Pioneering innovation, our design philosophy seamlessly
                integrates elegance and functionality to deliver products that
                transcend expectations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
