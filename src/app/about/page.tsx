import { Metadata } from "next";
import { playfairDisplay } from "../fonts";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export const metadata: Metadata = {
  title: "About Us",
};

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
          className={`text-3xl tracking-wide md:text-4xl text-balance lg:text-5xl z-30 ${playfairDisplay.className}`}
        >
          Introducing Modern Engineers (India)
          <div className="text-muted-foreground sm:mt-2 lg:mt-3">
            Where Passion Drives Mechanical Excellence.
          </div>
        </h1>
      </section>
      <MaxWidthWrapper className="py-4 md:px-8 lg:px-16 2xl:px-0">
        <div className="grid">
          <div className="bg-muted aspect-square rounded-md" />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
