"use client";

import Link from "next/link";
import { ShieldCheck, Activity, Clock, ArrowRight, TrendingUp, Sparkles, Network } from "lucide-react";
import { useT } from "@/i18n/react";
import type { ReactNode } from "react"; // ⬅️ добавили
import { motion, useReducedMotion } from "framer-motion"; // ⬅️ добавили

type FeatureKey =
  | "security"
  | "transparency"
  | "flexibility"
  | "profitability"
  | "simplicity"
  | "networkSupport";

// было: Record<FeatureKey, JSX.Element>
// стало:
const ICONS: Record<FeatureKey, ReactNode> = {
  security: <ShieldCheck size={28} className="text-sky-400" />,
  transparency: <Activity size={28} className="text-sky-400" />,
  flexibility: <Clock size={28} className="text-sky-400" />,
  profitability: <TrendingUp size={28} className="text-sky-400" />,
  simplicity:   <Sparkles    size={28} className="text-sky-400" />,
  networkSupport: <Network   size={28} className="text-sky-400" />,
};

const containerV = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      //when: "beforeChildren",
    },
  },
};

// универсальный easing (cubic-bezier), duration — без spring
const makeCardV = (dir: "up" | "left" | "right") => {
  const delta =
    dir === "up" ? { y: 32, x: 0 } :
    dir === "left" ? { x: -28, y: 0 } :
    { x: 28, y: 0 };

  return {
    hidden: { opacity: 0, ...delta, scale: 0.98 },
    visible: {
      opacity: 1, x: 0, y: 0, scale: 1,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }, // ⬅️ универсально
    },
    hover: {
      y: -4, scale: 1.01,
      transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
    },
  };
};

// направление по индексу: 0↑, 1←, 2→, 3↑, 4←, 5→
const dirByIndex = (i: number) =>
  (["up","left","right","up","left","right"] as const)[i % 6];

function FeatureCard({
  title,
  icon,
  description,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
}) {
  const tCommon = useT("common");
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={ prefersReduced ? false : { opacity: 0, y: 28, scale: 0.985 } }
      whileInView={ prefersReduced ? {} : { opacity: 1, y: 0, scale: 1 } }
      viewport={{ amount: 0.3, once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={ prefersReduced ? undefined : { y: -4, scale: 1.01, transition: { duration: 0.22 } } }
      className="
        pb-4 md:mb-3 relative w-full max-w-xs
        min-h-[220px] md:min-h-[240px]
        bg-[radial-gradient(ellipse_at_top_right,_#2C3553_0%,_#1A223E_100%)]
        rounded-3xl outline outline-1 outline-offset-[-1px] outline-sky-500/70
        overflow-hidden flex flex-col md:mx-auto sm:mx-0
      "
    >
      <div className="p-4 md:p-6 flex-1 flex flex-col">
        <div className="mb-1 md:mb-4 flex justify-center">{icon}</div>
        <h4 className="text-white text-xl md:text-2xl font-semibold mb-2 font-inter text-center sm:text-left">
          {title}
        </h4>
        <p className="text-gray-300 text-base font-medium md:flex-1 leading-relaxed font-inter text-center sm:text-left">
          {description}
        </p>
      </div>

      <div className="p-4 md:p-0">
        <Link href="#calculate-plans" aria-label={tCommon("buttons.exploreOptions")}>
          <button
            type="button"
            className="
              absolute bottom-5 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-6
              inline-flex items-center gap-2 text-sky-400 text-base font-bold font-inter
              hover:underline transition
            "
          >
            <span>{tCommon("buttons.exploreOptions")}</span>
            <ArrowRight size={16} />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}


export default function WhyUs() {
  const tHome = useT("home");

  // все 6 фич из локали
  const keys: FeatureKey[] = [
    "security",
    "transparency",
    "flexibility",
    "profitability",
    "simplicity",
    "networkSupport",
  ];

  return (
    <section id="why-us" className="relative overflow-hidden mb-3 md:mb-8">
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-85 " //3xl:hidden
        style={{
          background:
            "linear-gradient(to bottom, #010512  0%, #050C1E 20%, #060E21 42%, #0A1324 80%, #0A1324 100%)",
        }}
      />

  <motion.div
  variants={containerV}
  initial="hidden"
  whileInView="visible"
  viewport={{ amount: 0.25, once: true }}
  className="
    relative z-10 py-8
    max-w-6xl mx-auto
    grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 px-4
    justify-items-center sm:justify-items-stretch
  "
>
  {keys.slice(0, 3).map((k, i) => (
    <FeatureCard
      key={k}
      title={tHome(`features.${k}.title`)}
      description={tHome(`features.${k}.desc`)}
      icon={ICONS[k]}
      //variants={makeCardV(dirByIndex(i))}      
    />
  ))}
</motion.div>

{/* второй ряд тоже нужен свой motion-контейнер; без lg:contents */}
<div className="hidden lg:block">
  <motion.div
    variants={containerV}
    initial="hidden"
    whileInView="visible"
    viewport={{ amount: 0.2, once: true }}
    className="       relative z-10
      max-w-6xl mx-auto
      grid grid-cols-3 gap-4 md:gap-8 px-4
      justify-items-stretch
    "
  >
    {keys.slice(3).map((k, i) => (
      <FeatureCard
        key={k}
        title={tHome(`features.${k}.title`)}
        description={tHome(`features.${k}.desc`)}
        icon={ICONS[k]}
        //variants={makeCardV(dirByIndex(i + 3))} 
      />
    ))}
  </motion.div>
</div>
      
      {/* --- НИЖНИЙ ФЕЙД НУЖНОГО ЦВЕТА --- */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-[0] 
                   h-[clamp(56px,9vw,160px)]"
        style={{
          // тот же цвет, что и фон следующей секции
          background:
            "linear-gradient(to bottom, rgba(10,19,36,0) 0%, #0B1128 60%, #0B1128 100%)",
        }}
      />
    </section>
  );
}
