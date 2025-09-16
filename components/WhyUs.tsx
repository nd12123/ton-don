"use client";

import Link from "next/link";
import { ShieldCheck, Activity, Clock, ArrowRight } from "lucide-react";
import { useT } from "@/i18n/react";
import type { ReactNode } from "react"; // ⬅️ добавили

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
  profitability: <Activity size={28} className="text-sky-400" />,
  simplicity: <ShieldCheck size={28} className="text-sky-400" />,
  networkSupport: <Clock size={28} className="text-sky-400" />,
};


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
  return (
    <div
      className="
        relative w-full max-w-xs
        min-h-[220px] md:min-h-[240px]
        bg-[radial-gradient(ellipse_at_top_right,_#2C3553_0%,_#1A223E_100%)]
        rounded-3xl
        outline outline-1 outline-offset-[-1px] outline-sky-500/70
        overflow-hidden flex flex-col
        md:mx-auto sm:mx-0
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
              inline-flex items-center gap-2
              text-sky-400 text-base font-bold font-inter
              hover:underline transition
            "
          >
            <span>{tCommon("buttons.exploreOptions")}</span>
            <ArrowRight size={16} />
          </button>
        </Link>
      </div>
    </div>
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
    <section id="why-us" className="relative overflow-hidden md:mb-4">
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-85"
        style={{
          background:
            "linear-gradient(to bottom, #010512  0%, #050C1E 20%, #060E21 42%, #0A1324 80%, #0A1324 100%)",
        }}
      />

      <div
        className="
          relative z-10 py-8
          max-w-6xl mx-auto
          grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 px-4
          justify-items-center sm:justify-items-stretch
        "
      >
        {/* первые 3 карточки */}
        {keys.slice(0, 3).map((k) => (
          <FeatureCard
            key={k}
            title={tHome(`features.${k}.title`)}
            description={tHome(`features.${k}.desc`)}
            icon={ICONS[k]}
          />
        ))}

        {/* ещё 3 карточки — только на десктопе */}
        <div className="hidden lg:contents">
          {keys.slice(3).map((k) => (
            <FeatureCard
              key={k}
              title={tHome(`features.${k}.title`)}
              description={tHome(`features.${k}.desc`)}
              icon={ICONS[k]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
