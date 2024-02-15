"use client";
import { cn } from "@/lib/utils";
import { Variants, motion } from "framer-motion";

type MissionIcon = "mission" | "vision";

const iconVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: (i: number) => {
    const delay = i * 0.1 + 0.4;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        delay,
        duration: 0.7,
        damping: 30,
        stiffness: 80,
      },
    };
  },
};

const missionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "24%",
  },
  visible: (i: number) => {
    const delay = i * 0.25 + 0.4;
    return {
      y: 0,
      opacity: 1,
      transition: {
        delay,
        duration: 0.7,
        damping: 30,
        stiffness: 80,
      },
    };
  },
};

function MissionIcon({ className }: { className: string }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
      initial="hidden"
      animate="visible"
    >
      <motion.path variants={iconVariants} custom={0} d="M12 13V2l8 4-8 4" />
      <motion.path
        variants={iconVariants}
        custom={1}
        d="M20.55 10.23A9 9 0 1 1 8 4.94"
      />
      <motion.path
        variants={iconVariants}
        custom={2}
        d="M8 10a5 5 0 1 0 8.9 2.02"
      />
    </motion.svg>
  );
}

function VisionIcon({ className }: { className: string }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.polyline
        variants={iconVariants}
        custom={0}
        points="15 14 20 9 15 4"
      />
      <motion.path
        variants={iconVariants}
        custom={1}
        d="M4 20v-7a4 4 0 0 1 4-4h12"
      />
    </motion.svg>
  );
}

function getIcon(iconName: MissionIcon) {
  switch (iconName) {
    case "mission":
      return <MissionIcon className="mx-auto size-10 lg:size-12" />;
    case "vision":
      return <VisionIcon className="mx-auto size-10 lg:size-12" />;
  }
}

export default function Mission({
  title,
  iconName,
  children,
}: {
  title: string;
  iconName: MissionIcon;
  children: React.ReactNode;
}) {
  const icon = getIcon(iconName);
  return (
    <div className="space-y-2 px-2">
      {icon}
      <motion.h1
        variants={missionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        className="py-1 text-center font-extrabold text-3xl tracking-tight sm:text-4xl lg:text-5xl lg:pb-6 xl:text-6xl"
      >
        {title}
      </motion.h1>
      <motion.div
        variants={missionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
        className="text-center text-pretty text-lg sm:text-xl md:text-2xl text-muted-foreground"
      >
        {children}
      </motion.div>
    </div>
  );
}
