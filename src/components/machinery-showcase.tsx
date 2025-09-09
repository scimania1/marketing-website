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
      title: "VMC Machine",
      description:
        "Our machining facility is equipped with two high-performance Vertical Machining Centers (VMCs) powered by Fanuc 0i MF Controllers, designed to deliver superior precision and efficiency. Each machine is driven by an 11/15 kW spindle motor with a maximum speed of 8000 rpm and a BBT-40 spindle taper, ensuring excellent rigidity and surface finish. High-precision C3 class ball screws, roller-type LM guideways on all axes, and laser-calibrated positioning provide outstanding accuracy and repeatability. These VMCs are further enhanced with spindle air blast, rigid tapping, automatic lubrication, full splash guarding, and advanced coolant and chip flushing systems, making them ideal for continuous and reliable performance. With 24-tool twin arm automatic tool changers, servo brakes on the Z-axis, telescopic covers, and provisions for a 4th axis, our two VMCs are fully capable of handling complex and demanding machining tasks with exceptional consistency.",
      display: (
        <Image
          src="/VMC.png"
          alt="VMC Machine - Modern Engineers (India)"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (min-width: 769px) 40vw"
        />
      ),
    },
    {
      title: "CNC Machine",
      description:
        "Our machine shop is equipped with three state-of-the-art CNC machines that offer precise turning capabilities for various materials. These machines can handle workpieces with diameters ranging from 12mm to 75mm and lengths from 45mm up to 600mm. Their versatility extends to a wide range of metals, including MS, EN8D, EN9, EN15, EN19, EN24, and EN31. This allows us to produce complex components with exceptional accuracy and efficiency.",
      display: (
        <Image
          src="/CNC-upscaled.png"
          alt="CNC Machine - Modern Engineers (India)"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (min-width: 769px) 40vw"
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
          sizes="(max-width: 768px) 100vw, (min-width: 769px) 40vw"
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
          sizes="(max-width: 768px) 100vw, (min-width: 769px) 40vw"
        />
      ),
    },
    {
      title: "Drill Machine",
      description:
        "Our workshop is equipped with five precision drill machines that deliver reliable and accurate drilling operations across a wide range of materials. Built with a sturdy column design and a high-quality spindle system, these machines ensure smooth operation and consistent hole accuracy. The adjustable work table and heavy-duty base provide excellent stability, making them ideal for both small and medium-sized components. With their robust construction and ease of use, these drill machines allow us to efficiently perform drilling, reaming, and tapping operations, supporting a variety of machining requirements with speed and precision.",
      display: (
        <Image
          src="/DrillMachine.png"
          alt="Drill Machine - Modern Engineers (India)"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (min-width: 769px) 40vw"
        />
      ),
    },
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
          sizes="(max-width: 768px) 100vw, (min-width: 769px) 40vw"
        />
      ),
    },
    {
      title: "MIG Welding Machine",
      description:
        "Our fabrication unit is equipped with five advanced MIG welding machines that provide high-quality and efficient welding solutions. These machines are designed to deliver strong, clean, and precise welds on a variety of materials, including mild steel, stainless steel, and aluminum. With stable arc performance and excellent control over heat input, they ensure consistent weld quality while minimizing defects. Their versatility allows us to handle both light and heavy fabrication tasks, making them ideal for producing durable and reliable welded components across diverse applications.",
      display: (
        <Image
          src="/MIGWeldingSetup.png"
          alt="MIG Welding Machine - Modern Engineers (India)"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (min-width: 769px) 40vw"
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
