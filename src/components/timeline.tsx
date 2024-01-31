"use client";

import { playfairDisplay } from "@/app/fonts";
import { Variants, motion, useScroll } from "framer-motion";
import MaxWidthWrapper from "./max-width-wrapper";
import { useRef } from "react";
import Image from "next/image";

const variants: Variants = {
  offscreen: {
    opacity: 0.4,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

const spring = {
  duration: 0.4,
  damping: 20,
  type: "spring",
};

const imageVariants: Variants = {
  offscreen: {
    x: -50,
    opacity: 0,
  },
  visible: (i: number) => ({
    x: -20,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      damping: 20,
      type: "spring",
    },
  }),
};

function TimelineItem({
  timelineYear,
  timelineHeading,
  timelineContent,
  children,
}: {
  timelineYear: number;
  timelineHeading: string;
  timelineContent: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative grid grid-cols-[20px_1fr] gap-2 md:grid-cols-[0.75fr_50px_5fr]">
      <motion.h2
        className={`${playfairDisplay.className} col-start-2 col-end-3 md:col-start-auto md:col-end-auto text-3xl sm:text-4xl md:justify-self-start md:self-start md:sticky top-0 left-0 lg:text-5xl xl:text-6xl`}
        variants={variants}
        initial="offscreen"
        whileInView="visible"
        transition={spring}
        viewport={{ margin: "0px 0px -50% 0px" }}
      >
        {timelineYear}
      </motion.h2>
      <div className="sticky size-3 md:size-4 rounded-full ring-primary ring-8 bg-background -translate-x-[4px] md:-translate-x-[2px] self-start top-[60vh] inline-block"></div>
      <motion.div
        className="space-y-3 lg:space-y-6"
        variants={variants}
        initial="offscreen"
        whileInView="visible"
        transition={spring}
        viewport={{ margin: "0px 0px -50% 0px" }}
      >
        <h2 className="text-2xl font-medium tracking-tight text-balance sm:text-3xl lg:text-4xl xl:text-5xl">
          {timelineHeading}
        </h2>
        <p className="text-lg text-muted-foreground sm:text-xl lg:text-2xl">
          {timelineContent}
        </p>
        {children}
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  const timelineContainer = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineContainer,
    offset: ["start center", "end center"],
  });
  return (
    <section className="bg-primary text-primary-foreground py-4 md:py-8 lg:py-16 xl:py-20">
      <MaxWidthWrapper className="max-w-screen-xl py-8 md:py-16 lg:py-20 xl:py-24">
        <div className="py-4 sm:px-8 lg:py-8">
          <div className="space-y-4 mb-6 lg:mb-12 md:space-y-8">
            <h1 className="text-center tracking-tight font-extrabold text-3xl sm:text-4xl md:text-5xl xl:text-6xl">
              From Inception to Impact -{" "}
              <span className="sm:block">
                The Modern Engineers (India) Story
              </span>
            </h1>
            <h2 className="text-center text-muted-foreground text-xl font-medium sm:text-2xl md:text-3xl xl:text-4xl">
              Our Timeline
            </h2>
          </div>
          <div
            ref={timelineContainer}
            className="relative ml-4 md:ml-12 space-y-20 py-6 sm:space-y-24 lg:space-y-32 xl:space-y-40"
          >
            <div className="[mask-image:linear-gradient(to_bottom,transparent,15%,black,85%,transparent)] absolute top-[3%] w-1 bg-muted-foreground/40 -bottom-20 md:left-[13.33333%]">
              <motion.div
                className="h-full w-1 bg-background"
                style={{ scaleY: scrollYProgress, transformOrigin: "0% 0%" }}
              ></motion.div>
            </div>
            <TimelineItem
              timelineYear={2010}
              timelineHeading="Inception as a Trading Firm"
              timelineContent="Founded in 2010, Modern Engineers (India) emerged as a trading firm, laying the foundation for what would evolve into a distinguished entity in the agricultural machinery sector."
            />
            <TimelineItem
              timelineYear={2012}
              timelineHeading="Company started manufacturing tractor and agricultural implement parts"
              timelineContent="In 2012, a transformative chapter unfolded for the company as it transitioned from its trading origins to embark on a new journey – the manufacturing of tractor and agricultural implement parts. This pivotal decision marked a strategic move, allowing the company to not only meet the growing demands of the agricultural machinery market but also assert its presence as a key player in the industry."
            >
              <div className="ml-8 lg:ml-20 grid pt-6 gap-4 lg:gap-8 grid-cols-2 sm:grid-cols-4 max-w-[90%] sm:max-w-[60%]">
                <motion.div
                  className={`rounded-lg relative shadow-background/50 shadow-md aspect-square bg-muted`}
                  variants={imageVariants}
                  initial="offscreen"
                  whileInView="visible"
                  custom={0}
                  viewport={{ margin: "0px 0px -50% 0px" }}
                >
                  <Image
                    className="rounded-lg aspect-square object-cover"
                    src="https://res.cloudinary.com/djlukhirv/image/upload/v1703522086/Modern%20Engineers%20India%20New%20Images/Front_Base_Plate_Bolt_John_Deere_o6co92.png"
                    alt="Weight Bolt"
                    fill
                  />
                </motion.div>
                <motion.div
                  className={`rounded-lg relative shadow-background/50 shadow-md aspect-square bg-muted`}
                  variants={imageVariants}
                  initial="offscreen"
                  whileInView="visible"
                  custom={1}
                  viewport={{ margin: "0px 0px -50% 0px" }}
                >
                  <Image
                    className="rounded-lg aspect-square object-cover"
                    src="https://res.cloudinary.com/djlukhirv/image/upload/v1703521719/Modern%20Engineers%20India%20New%20Images/Base_Bolt_u5lehv.png"
                    alt="Weight Bolt"
                    fill
                  />
                </motion.div>
                <motion.div
                  className={`rounded-lg relative shadow-background/50 shadow-md aspect-square bg-muted`}
                  variants={imageVariants}
                  initial="offscreen"
                  whileInView="visible"
                  custom={2}
                  viewport={{ margin: "0px 0px -50% 0px" }}
                >
                  <Image
                    className="rounded-lg aspect-square object-cover"
                    src="https://res.cloudinary.com/djlukhirv/image/upload/v1703521731/Modern%20Engineers%20India%20New%20Images/Shovel_Bolt_egerje.png"
                    alt="Weight Bolt"
                    fill
                  />
                </motion.div>
                <motion.div
                  className={`rounded-lg relative shadow-background/50 shadow-md aspect-square bg-muted`}
                  variants={imageVariants}
                  initial="offscreen"
                  whileInView="visible"
                  custom={3}
                  viewport={{ margin: "0px 0px -50% 0px" }}
                >
                  <Image
                    className="rounded-lg aspect-square object-cover"
                    src="https://res.cloudinary.com/djlukhirv/image/upload/v1703521740/Modern%20Engineers%20India%20New%20Images/Spindle_Shaft_32mm_without_oil_grooves_pvwzri.png"
                    alt="Weight Bolt"
                    fill
                  />
                </motion.div>
              </div>
            </TimelineItem>
            <TimelineItem
              timelineYear={2014}
              timelineHeading="Market Expansion - Partnering with Ancillaries and Exporters"
              timelineContent="In 2014, Modern Engineers (India) strategically broadened its market reach through collaborations with ancillaries and exporters, demonstrating a commitment to growth. By supplying these partners, the company not only expanded its customer base but also strengthened its industry position, fostering synergies in the supply chain for the seamless functioning of the agricultural machinery ecosystem."
            />
            <TimelineItem
              timelineYear={2015}
              timelineHeading="Became OEM for Leading Agricultural Implement and Tractor Industries"
              timelineContent="Evolved into an OEM for top agricultural implement and tractor industries, showcasing commitment to quality and strong industry partnerships. A pivotal moment in Modern Engineers' journey, emphasizing innovation and excellence."
            />
          </div>
          <div className="mt-20 grid gap-2 text-center lg:gap-8 lg:mt-36">
            <motion.h2
              className={`${playfairDisplay.className} text-3xl sm:text-4xl lg:text-5xl xl:text-6xl`}
              variants={variants}
              initial="offscreen"
              whileInView="visible"
              transition={spring}
              viewport={{ margin: "0px 0px -50% 0px" }}
            >
              Presently
            </motion.h2>
            <motion.div
              className=""
              variants={variants}
              initial="offscreen"
              whileInView="visible"
              transition={spring}
              viewport={{ margin: "0px 0px -50% 0px" }}
            >
              <p className="text-lg text-muted-foreground sm:text-xl lg:text-2xl xl:text-3xl">
                In the present timeline, Modern Engineers (India) continues to
                achieve noteworthy milestones, setting new standards in the
                agricultural implement parts industry.
              </p>
            </motion.div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
