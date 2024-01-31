import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { playfairDisplay } from "../fonts";

export default function ProductsLoader() {
  return (
    <>
      <section
        className={`grid relative items-center justify-center text-center sm:px-6 py-6 h-72 lg:h-96 border-b-border [mask-image:linear-gradient(to_bottom,transparent,10%,white,90%,transparent)] ${playfairDisplay.className} `}
      >
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
        <h1 className="text-3xl tracking-wide md:text-5xl text-balance lg:text-6xl z-30">
          <span>Gear up for success with our</span>
          <span className="sm:mt-3 sm:block">
            {" "}
            high-performance mechanical components
          </span>
        </h1>
      </section>
      <MaxWidthWrapper>
        <div className="relative grid items-start gap-4 py-4 sm:px-8 lg:grid-cols-[1fr_3fr] lg:gap-8 lg:py-8 xl:grid-cols-[1fr_4fr]">
          <Skeleton className="h-[800px]" />
          <Skeleton className="h-[800px]" />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
