"use client";

import Link from "next/link";
import { ShieldCheck, Activity, Clock, ArrowRight } from "lucide-react";

const features = [
  {
    title: "Безопасность",
    icon: <ShieldCheck size={28} className="text-sky-400" />,
    description: "Ваши средства хранятся в безопасных валидаторах.",
  },
  {
    title: "Прозрачность",
    icon: <Activity size={28} className="text-sky-400" />,
    description: "Каждая транзакция полностью прозрачна на блокчейне.",
  },
  {
    title: "Гибкость",
    icon: <Clock size={28} className="text-sky-400" />,
    description: "Настройте срок стейкинга под свои нужды.",
  },
];

function FeatureCard({
  title,
  icon,
  description,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
}) {
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
        <Link href="#calculate-plans">
          <button
            type="button"
            className="
              absolute bottom-5 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-6
              inline-flex items-center gap-2
              text-sky-400 text-base font-bold font-inter
              hover:underline transition
            "
          >
            <span>Explore options</span>
            <ArrowRight size={16} />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function WhyUs() {
  return (
    <section className="py-20 bg-bg-dark relative overflow-hidden">
      <div
        className="
          max-w-6xl mx-auto
          grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 px-4
          justify-items-center sm:justify-items-stretch
        "
      >
        {/* первые 3 карточки — видны везде */}
        {features.map((f) => (
          <FeatureCard
            key={f.title}
            title={f.title}
            icon={f.icon}
            description={f.description}
          />
        ))}

        {/* ещё 3 карточки — показываем только на десктопе (lg+) */}
        <div className="hidden lg:contents">
          {features.map((f, i) => (
            <FeatureCard
              key={`dup-${i}-${f.title}`}
              title={f.title}
              icon={f.icon}
              description={f.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
