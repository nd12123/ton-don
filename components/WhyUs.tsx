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

export default function WhyUs() {
  return (
    <section className="py-20 bg-bg-dark relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="
              relative
              w-full max-w-xs h-60
              bg-[radial-gradient(ellipse_at_top_right,_#2C3553_0%,_#1A223E_100%)]
              rounded-3xl
              outline outline-1 outline-offset-[-1px] outline-sky-500
              overflow-hidden
              flex flex-col
            "
          >
            {/* Иконка + Заголовок + Описание */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-4 flex justify-center">{f.icon}</div>
              <h4 className="text-white text-2xl font-semibold mb-2 font-inter">
                {f.title}
              </h4>
              <p className="text-gray-300 text-base font-medium flex-1 leading-relaxed font-inter">
                {f.description}
              </p>
            </div>

            {/* Ссылка внизу */}
            
        <Link href="#calculate-plans" //scroll={false}
        >
            <button
              type="button"
              className="
                absolute bottom-4 left-6 inline-flex items-center gap-2
                text-sky-400 text-base font-bold font-inter
                hover:underline
                transition
              "
            >
              <span>Explore options</span>
              <ArrowRight size={16} />
            </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
