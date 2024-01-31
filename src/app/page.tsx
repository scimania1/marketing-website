import HeroSectionCarousel from "@/components/hero-section-carousel";
import { Button } from "@/components/ui/button";
import { playfairDisplay } from "./fonts";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Separator } from "@/components/ui/separator";
import NumberCount from "@/components/number-count";
import Image from "next/image";

const heroSectionTitle =
  "Modern Engineers (India) - Perfecting your Machinery Components";
// "Excellence Woven in Precision – Your Machinery Components, Perfected.";

const quote =
  "Elevate your expectations as you peruse through our product gallery, where each item represents the pinnacle of craftsmanship and exactness.";

const categories = [
  "agricultural implement parts",
  "CNC turned parts",
  "fasteners",
  "john deere weight bolts",
  "sheet metal parts",
  "tractor trolley parts",
];

export default function Home() {
  return (
    <>
      <div className="h-full px-4 py-2 md:px-8 md:py-4 xl:px-16">
        <div className="relative grid grid-cols-1 md:gap-2 lg:grid-cols-2 lg:gap-4">
          <div className="pb-4 pt-2 lg:order-2 lg:px-0">
            <HeroSectionCarousel />
          </div>
          <div className="grid lg:order-1 lg:grid-rows-[2fr_1fr]">
            <div className="space-y-1 self-center py-2">
              <span className="py-2 text-sm text-slate-400 lg:text-lg xl:text-xl 2xl:text-2xl">
                Redefining the Agriculture industry standard
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
            <div className="grid py-8 lg:py-0 lg:max-w-lg gap-2 self-start xl:gap-3">
              <h2
                className={`${playfairDisplay.className} text-2xl tracking-wide xl:text-4xl`}
              >
                Exclusive Selection
              </h2>
              <div className="flex flex-wrap gap-2 py-2 lg:py-3 xl:gap-3">
                {categories.map((category) => (
                  <Link
                    href={`/products?categories=${category}`}
                    key={category}
                    passHref
                  >
                    <Badge
                      variant="secondary"
                      className="px-3 sm:px-6 py-2 text-xs text-muted-foreground xl:text-base"
                    >
                      {category
                        .split(" ")
                        .map((val) => val[0].toUpperCase() + val.slice(1))
                        .join(" ")
                        .trim()}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
            <div className="bottom-12 left-1/2 hidden z-30 max-w-xl -translate-x-1/2 grid-cols-[auto_1fr] items-center pr-18 gap-3 rounded-xl bg-background shadow-lg lg:absolute min-[1750px]:grid">
              <div className="grid items-center justify-center">
                <div className="relative size-[150px] rounded-l-xl bg-slate-300 overflow-hidden">
                  <Image
                    className="aspect-square object-cover"
                    src="https://res.cloudinary.com/djlukhirv/image/upload/v1703521740/Modern%20Engineers%20India%20New%20Images/Spindle_Shaft_32mm_without_oil_grooves_pvwzri.png"
                    alt="Weight Bolt"
                    fill
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold">Our Design Philosophy</h2>
                <p className="text-pretty text-md text-muted-foreground">
                  Pioneering innovation, our design philosophy seamlessly
                  integrates elegance and functionality to deliver the best
                  products
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary text-primary-foreground py-4 lg:py-8 xl:py-16">
        <h2
          className={`text-2xl lg:text-4xl xl:text-6xl ${playfairDisplay.className} text-center mb-6 lg:mb-12 xl:mb-20 font-medium`}
        >
          Milestones and Expertise: A Legacy of Excellence
        </h2>
        <MaxWidthWrapper>
          <div className="grid md:grid-cols-[1fr_2px_1fr_2px_1fr] gap-4">
            <div className="space-y-1 text-center ">
              <h2 className="font-extrabold text-xl lg:text-2xl xl:text-4xl">
                <NumberCount start={1} end={10} duration={1} /> Lakh +
              </h2>
              <div className="text-md lg:text-lg font-semibold xl:text-2xl">
                Products Sold
              </div>
            </div>
            <Separator className="md:hidden" orientation="horizontal" />
            <Separator className="hidden md:block" orientation="vertical" />
            <div className="space-y-1 text-center">
              <h2 className="font-extrabold text-xl lg:text-2xl xl:text-4xl">
                <NumberCount start={1} end={30} duration={1} /> +
              </h2>
              <div className="text-md lg:text-lg font-semibold xl:text-2xl">
                Years of Experience
              </div>
            </div>
            <Separator className="md:hidden" orientation="horizontal" />
            <Separator className="hidden md:block" orientation="vertical" />
            <div className="space-y-1 text-center">
              <h2 className="font-extrabold text-xl lg:text-2xl xl:text-4xl">
                <NumberCount start={8000} end={10000} duration={1.5} /> +
              </h2>
              <div className="text-md lg:text-lg font-semibold xl:text-2xl">
                Square Feet Area
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
      {/* <div className="py-4 lg:py-8 xl:py-16 px-2.5"> */}
      {/*   <MaxWidthWrapper> */}
      {/*     <div className="text-center mb-6 lg:mb-12 xl:mb-20 space-y-4 lg:space-y-6 xl:space-y-8"> */}
      {/*       <h1 */}
      {/*         className={`text-2xl lg:text-4xl xl:text-6xl ${playfairDisplay.className} font-medium`} */}
      {/*       > */}
      {/*         Featured Products */}
      {/*       </h1> */}
      {/*       <p className="text-muted-foreground text-md lg:text-lg xl:text-2xl"> */}
      {/*         Discover excellence in our featured products at Modern Engineers */}
      {/*         India. From top-tier tractor drawn agricultural implement parts to */}
      {/*         advanced machinery components, each product embodies precision and */}
      {/*         innovation. */}
      {/*       </p> */}
      {/*     </div> */}
      {/*     <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8 items-start mt-8"> */}
      {/*       <ProductCard _id={new mongoose.Types.ObjectId("659a98f8d97857cf65fd8f4f")}/> */}
      {/*     </div> */}
      {/*   </MaxWidthWrapper> */}
      {/* </div> */}
    </>
  );
}
