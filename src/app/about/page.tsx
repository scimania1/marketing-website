import { Metadata } from "next";
import { playfairDisplay } from "../fonts";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Timeline from "@/components/timeline";
import { Suspense } from "react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
};

function ShowcaseItem({
  className,
  children,
  title,
  reverse = false,
}: {
  className?: string;
  children: React.ReactNode;
  title: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn(
        `relative grid gap-4 ${reverse ? "md:grid-cols-[3fr_1fr]" : "md:grid-cols-[1fr_3fr]"} md:gap-0`,
        className,
      )}
    >
      <h2 className={`sticky self-start top-0 ${reverse ? "md:order-2" : ""}`}>
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function About() {
  return (
    <>
      <section className="text-center grid place-items-center h-72 lg:h-96 [mask-image:linear-gradient(to_bottom,transparent,10%,white,90%,transparent)]">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#ffffff",
            opacity: 0.1,
            backgroundImage:
              "linear-gradient(#000000 1.2000000000000002px, transparent 1.2000000000000002px), linear-gradient(to right, #000000 1.2000000000000002px, #ffffff 1.2000000000000002px)",
            backgroundSize: "24px 24px",
          }}
        ></div>
        <h1
          className={`text-3xl tracking-wide md:text-5xl text-balance lg:text-6xl z-30 ${playfairDisplay.className}`}
        >
          Introducing Modern Engineers (India)
          <div className="text-muted-foreground sm:mt-2 lg:mt-3">
            Where Passion Drives Mechanical Excellence
          </div>
        </h1>
      </section>
      <MaxWidthWrapper className="my-8">
        <div className="py-4 sm:px-8 lg:py-16 xl:py-28">
          <div className="grid lg:grid-cols-[1fr_2fr] justify-center items-center gap-4">
            <div className="relative bg-secondary aspect-[4/3] lg:h-full lg:aspect-auto rounded-md border overflow-hidden">
              <Image
                src="/OwnerImage.png"
                alt="Image of Owner"
                className="aspect-[4/3] scale-[1.15] object-contain"
                fill
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="p-4 relative rounded-lg border bg-card overflow-hidden shadow-sm grid gap-3">
                <span className="absolute top-0 left-0 bottom-0 w-2 bg-muted" />
                <div className="relative grid place-items-center w-full">
                  <span className="absolute top-1/2 left-0 -translate-y-1/2 right-0 h-[2px] bg-muted" />
                  <Quote
                    className="mx-auto scale-[-1] fill-background"
                    size={24}
                  />
                </div>
                <h1
                  className={`${playfairDisplay.className} px-4 text-md md:text-lg xl:text-xl`}
                >
                  At Modern Engineers (India), we craft precision and quality
                  into every component, cultivating a legacy of excellence in
                  agricultural machinery
                </h1>
                <div className="relative grid place-items-center">
                  <span className="absolute top-1/2 left-0 -translate-y-1/2 right-0 h-[2px] bg-muted" />
                  <Quote
                    className="relative mx-auto fill-background scale-100"
                    size={24}
                  />
                </div>
              </div>
              <div className="bg-primary text-md md:text-lg lg:p-8 xl:text-xl text-pretty text-primary-foreground p-6 rounded-lg shadow-sm border">
                Established in 2010, Modern Engineers (India) is a prominent
                manufacturer of tractor-drawn agricultural implement parts, with
                its main office situated in Jalandhar, Punjab. Led by the
                visionary owner,{" "}
                <span className="font-bold">Parduman Singh</span>, the company
                has garnered a reputable position in the industry.
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      <Suspense>
        <Timeline />
      </Suspense>
      {/* <section className="bg-secondary text-secondary-foreground py-12"> */}
      {/*   <h1 className="text-center tracking-tight font-extrabold text-3xl sm:text-4xl md:text-5xl xl:text-6xl"> */}
      {/*     Our Infrastructure */}
      {/*   </h1> */}
      {/*   <h2 className="text-center py-4"> */}
      {/*     At Modern Engineers India, our state-of-the-art infrastructure is */}
      {/*     equipped with cutting-edge facilities, fostering innovation and */}
      {/*     ensuring top-notch manufacturing processes for high-quality */}
      {/*     agricultural implement parts. */}
      {/*   </h2> */}
      {/* <MaxWidthWrapper className="py-8"> */}
      {/*   <div className="space-y-4"> */}
      {/*     <ShowcaseItem title="Bandsaw Machine"> */}
      {/*       <div className="aspect-video bg-background rounded-lg shadow-sm"></div> */}
      {/*     </ShowcaseItem> */}
      {/*     <ShowcaseItem title="CNC Machine" reverse> */}
      {/*       <div className="aspect-video bg-background rounded-lg shadow-sm order-1"></div> */}
      {/*     </ShowcaseItem> */}
      {/*     <ShowcaseItem title="Forging Press"> */}
      {/*       <div className="aspect-video bg-background rounded-lg shadow-sm"></div> */}
      {/*     </ShowcaseItem> */}
      {/*     <ShowcaseItem title="MIG Welding Setup" reverse> */}
      {/*       <div className="aspect-video bg-background rounded-lg shadow-sm order-1"></div> */}
      {/*     </ShowcaseItem> */}
      {/*     <ShowcaseItem title="H Frame Power Press"> */}
      {/*       <div className="aspect-video bg-background rounded-lg shadow-sm"></div> */}
      {/*     </ShowcaseItem> */}
      {/*   </div> */}
      {/* </MaxWidthWrapper> */}
      {/* </section> */}
    </>
  );
}
