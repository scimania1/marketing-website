import { Metadata } from "next";
import { playfairDisplay } from "../fonts";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Timeline from "@/components/timeline";
import { Suspense } from "react";
import Image from "next/image";
import Mission from "@/components/mission";
import { Quote } from "lucide-react";
import Typewriter from "@/components/typewriter";
import CeoAchievements from "@/components/ceo-achievements";
import { baseURL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
};

export default function About() {
  const breadcrumbListJsonLd = {
    "@context": "https://schema.org/",
    "@type": "BreadCrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Modern Engineers (India)",
        item: `${baseURL}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Page",
        item: `${baseURL}/about`,
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbListJsonLd),
        }}
      />

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
          className={`text-3xl tracking-wide px-4 md:text-5xl text-balance lg:text-6xl z-30 ${playfairDisplay.className}`}
        >
          Introducing Modern Engineers (India)
          <div className="text-muted-foreground sm:mt-2 lg:mt-3">
            Where Passion Drives Mechanical Excellence
          </div>
        </h1>
      </section>
      <MaxWidthWrapper className="my-12 lg:my-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <Mission iconName="mission" title="Our Mission">
            At Modern Engineers India, we are on a mission to revolutionize
            agriculture with cutting-edge solutions and superior-quality
            implement parts. Focused on innovation and sustainability, we
            empower farmers, contributing to sector growth for increased
            efficiency and productivity.
          </Mission>
          <Mission iconName="vision" title="Our Vision">
            At Modern Engineers India, we envision leading the agricultural
            machinery industry with innovative, sustainable solutions that
            elevate productivity and contribute to the prosperity of the farming
            community.
          </Mission>
        </div>
      </MaxWidthWrapper>
      <div className="bg-muted">
        <MaxWidthWrapper>
          <div className="pb-6 sm:pb-16 lg:pb-28">
            <div className="py-12 sm:py-16 lg:py-20">
              <Typewriter />
            </div>
            <div className="grid gap-8 md:gap-12 lg:gap-16 2xl:grid-cols-[1fr_0.1fr_1.5fr_0.1fr_1fr]">
              <figure className="w-fit self-center mx-auto rounded-full border z-10 border-black/10 overflow-hidden bg-background ring-2 ring-black/10 ring-offset-[10px] sm:ring-offset-[20px] ring-offset-muted 2xl:col-start-3 2xl:col-end-4">
                <Image
                  src="/OwnerImage2.png"
                  alt="CEO of Modern Engineers (India) - Mr. Parduman Singh"
                  width={400}
                  height={1500}
                  className="translate-y-4 -translate-x-4 w-72 h-auto sm:w-80 md:w-[400px] lg:w-auto object-cover"
                />
              </figure>
              <div className="grid gap-12 sm:grid-cols-2 2xl:grid-cols-1 2xl:col-start-1 2xl:col-end-2 2xl:row-start-1 2xl:row-end-2 2xl:my-10">
                <div className="flex flex-col justify-between self-start tracking-tight font-medium text-md sm:self-stretch md:text-lg xl:text-xl text-center p-4 bg-background rounded-xl shadow-lg lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2">
                  <div className="relative mt-3">
                    <div className="w-full h-[2px] bg-muted"></div>
                    <Quote className="-scale-100 fill-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="py-5 px-2">
                    At Modern Engineers (India), we craft precision and quality
                    into every component, cultivating a legacy of excellence in
                    agricultural machinery
                  </div>
                  <div className="relative mb-3">
                    <div className="w-full h-[2px] bg-muted"></div>
                    <Quote className="fill-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <div className="self-end bg-primary text-md md:text-lg lg:p-8 xl:text-xl text-pretty text-primary-foreground p-6 rounded-xl shadow-lg border">
                  Established in 2010, Modern Engineers (India) is a prominent
                  manufacturer of tractor-drawn agricultural implement parts.
                  Led by the visionary owner,{" "}
                  <span className="font-bold">Parduman Singh</span>, the company
                  has garnered a reputable position in the industry.
                </div>
              </div>
              <div className="grid gap-12 text-center 2xl:text-center mb-8 2xl:mb-0 2xl:col-start-5 2xl:col-end-6">
                <CeoAchievements
                  title="Years of Experience"
                  amount={30}
                  symbol="+"
                />
                <CeoAchievements
                  title="Satisfaction of Clients"
                  amount={100}
                  symbol="%"
                />
                <CeoAchievements title="Clients All Over India" amount={33} />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
      <Suspense>
        <Timeline />
      </Suspense>
    </>
  );
}
