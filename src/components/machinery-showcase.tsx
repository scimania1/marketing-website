"use client";

import { playfairDisplay } from "@/app/fonts";
import { AnimatePresence, Variants, motion } from "framer-motion";
import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import useStickyScroll from "@/hooks/use-sticky-scroll";
import Image from "next/image";

type StickyScrollContent = {
  title: string;
  description: string;
  display: React.ReactNode;
};

function StickyScroll({ contents }: { contents: StickyScrollContent[] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const activeIdx = useStickyScroll(ref);
  return (
    <div
      ref={ref}
      className="relative px-6 grid md:grid-cols-[1fr_0.1fr_1fr] lg:grid-cols-[1fr_0.2fr_1fr]"
    >
      <div className="grid gap-8 md:gap-0 md:auto-rows-[minmax(70vh,1fr)]">
        {contents.map((content, idx) => (
          <div
            key={`${content}-${idx}`}
            className="grid items-center"
            data-sticky-scroll-item
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: activeIdx === idx ? 1 : 0.3 }}
              className="space-y-6 md:space-y-0"
            >
              <motion.div className="relative md:hidden flex items-center w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
                {content.display}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: activeIdx === idx ? 1 : 0.3 }}
                className="text-xl font-bold md:text-2xl lg:text-3xl xl:text-5xl lg:py-6"
              >
                {content.title.split(" ")[0] + " "}
                <span className="text-muted-foreground">
                  {content.title.split(" ").slice(1).join(" ")}
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: activeIdx === idx ? 1 : 0.3 }}
                className="text-lg lg:text-2xl xl:text-3xl text-muted-foreground"
              >
                {content.description}
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
      <div></div>
      <div className="hidden md:grid md:sticky left-0 top-[calc(50%-35vh)] h-[70vh] items-center">
        <motion.div className="relative aspect-[4/3] overflow-hidden">
          <AnimatePresence>{contents[activeIdx].display}</AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default function MachinerySection() {
  const contents: StickyScrollContent[] = [
    {
      title: "Bandsaw Machine",
      description:
        "Our workshop boasts two versatile bandsaw machines capable of handling a wide range of material diameters, from a delicate 10mm up to a substantial 100mm. This allows us to tackle a diverse range of projects efficiently.",
      display: (
        <Image
          src="/BandsawMachine.png"
          alt="Bandsaw Machine - Modern Engineers (India)"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (min-width: 768px) 40vw"
        />
      ),
    },
    {
      title: "CNC Machine",
      description:
        "Our machine shop is equipped with two state-of-the-art CNC machines that offer precise turning capabilities for various materials. These machines can handle workpieces with diameters ranging from 12mm to 75mm and lengths from 45mm up to 450mm. Their versatility extends to a wide range of metals, including MS, EN8D, EN9, EN15, EN19, EN24, and EN31. This allows us to produce complex components with exceptional accuracy and efficiency.",
      display: (
        <Image
          src="/CNCMachine.png"
          alt="CNC Machine - Modern Engineers (India)"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (min-width: 768px) 40vw"
        />
      ),
    },
    {
      title: "H-Frame Power Press",
      description:
        "Our metal fabrication capabilities are bolstered by two H-frame power presses. The 150-ton press tackles demanding jobs, while the 75-ton press offers versatility for lighter materials. Both machines excel at: cutting flat sections in thicknesses ranging from 5mm to 25mm, bending flat elements from 5mm to 16mm thick, blanking flat stock up to 12mm thick for clean and precise cutouts, round bar stock with diameters between 10mm and 45mm can also be efficiently cut using these machines.",
      display: (
        <Image
          src="/HFramePowerPress.png"
          alt="H Frame Power Press - Modern Engineers (India)"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (min-width: 768px) 40vw"
        />
      ),
    },
    {
      title: "Forging Machine",
      description:
        "Our forging capabilities are met by a dedicated machine that precisely shapes metal. This workhorse handles materials like MS, EN8D, EN9, EN15, EN19, EN24, and EN31, transforming them into forgings with diameters ranging from 12mm to 56mm and lengths from 50mm to 350mm.",
      display: (
        <Image
          src="/ForgingPress.png"
          alt="Forging Press - Modern Engineers (India)"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (min-width: 768px) 40vw"
        />
      ),
    },
    {
      title: "MIG Welding Machine",
      description:
        "Our fabrication prowess extends to various metals with two MIG welding machines.  These versatile machines tackle steel, aluminum, and stainless steel, ensuring strong and precise welds for your project needs.",
      display: (
        <Image
          src="/MIGWeldingSetup.png"
          alt="MIG Welding Machine - Modern Engineers (India)"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (min-width: 768px) 40vw"
        />
      ),
    },
  ];
  return (
    <div className="bg-muted py-8 lg:py-16 xl:py-24">
      <div className="pt-8 mb-16 xl:mb-16 text-center space-y-2 md:space-y-4 lg:space-y-12">
        <div
          className={`text-2xl md:text-3xl lg:text-4xl xl:text-6xl ${playfairDisplay.className} font-medium text-secondary-foreground tracking-tight`}
        >
          Our Machinery
        </div>
        <MaxWidthWrapper>
          <motion.div className="px-6 text-lg text-muted-foreground lg:text-2xl xl:text-4xl">
            Our commitment to quality starts with the machinery. This section
            showcases the versatile equipment that empowers our team to deliver
            exceptional results.
          </motion.div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <StickyScroll contents={contents} />
      </MaxWidthWrapper>
    </div>
  );
}
