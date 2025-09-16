// components/FAQSection.tsx
"use client";

import React, { useState } from "react";
import NextImage from "next/image";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import sphereRightTop from "@/public/decorative/Ellipse50.png";
import sphere from "@/public/decorative/Ellipse8.png";

import { useT } from "@/i18n/react";

type FAQItem = { id?: string; question: string; answer: string }; // ★ id опционален

export default function FAQSection() {
  const t = useT("faq"); // ★ берем неймспейс faq

  // ★ тянем массив items из локали и приводим к нужной структуре
  const rawItems = t("items") as unknown;
  const faqs: FAQItem[] = Array.isArray(rawItems)
    ? rawItems.map((it: any) => ({
        id: it?.id,
        question: it?.q ?? "",
        answer: it?.a ?? "",
      }))
    : [];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const spring = {
    type: "spring",
    stiffness: 320,
    damping: 34,
    mass: 0.6,
  } as const;

  return (
    <section
      className={[
        "relative z-10",
        "text-white",
        "bg-faq-gradient",
        "py-6 md:py-10",
      ].join(" ")}
    >
      {/* фейды и т.д. — без изменений */}

      <div className="relative z-10 container mx-auto pb-10 px-5 py-25">
        {/* ★ заголовки из локали */}
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
          {t("title")}
        </h2>
        <p className="text-center text-gray-300 mb-12">{t("subtitle")}</p>

        {/* grid c анимацией */}
        <motion.div layout transition={spring} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.article
                key={item.id ?? idx} // ★ стабильный ключ
                layout
                transition={spring}
                className={[
                  "relative rounded-xl overflow-hidden border",
                  isOpen
                    ? "bg-gradient-to-r from-[#00BFFF] to-[#009FEF] border-sky-400 text-white"
                    : "bg-[#0A1329] border-[#00BFFF] text-white",
                  "will-change-transform",
                ].join(" ")}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-4 font-medium text-left"
                >
                  <span className="text-lg sm:text-xl pr-3">{item.question}</span>
                  <motion.span
                    aria-hidden
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-6 h-6" />
                  </motion.span>
                </button>

                <motion.div
                  initial={false}
                  animate={isOpen ? "open" : "closed"}
                  variants={{
                    open: { height: "auto", opacity: 1 },
                    closed: { height: 0, opacity: 0.6 },
                  }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="px-6 pb-5">
                    <p className="text-gray-100 leading-relaxed">{item.answer}</p>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      {/* дальше твои фоновые слои/сферы — без изменений */}
      <div className="hidden md:block absolute bottom-0 left-[-20px] w-full h-1/2 md:left-0 md:bottom-0 md:w-full md:h-full opacity-[65%] md:opacity-80 pointer-events-none z-0">
        <NextImage src={sphere} alt="" fill style={{ objectFit: "cover", objectPosition: "left bottom" }} />
      </div>

      <div className="md:hidden absolute bottom-0 left-[-0px] w-full h-1/2 md:left-0 md:bottom-0 md:w-full md:h-full opacity-[95%] md:opacity-80 pointer-events-none z-0 overflow-visible">
        <div className="relative w-full h-full" style={{ transform: "scale(0.4)", transformOrigin: "left bottom", willChange: "transform" }}>
          <Image src={sphere} alt="sphere" fill priority className="object-cover object-left-bottom" sizes="(min-width: 768px) 25vw, 50vw" />
        </div>
      </div>

      <div className="hidden md:block absolute top-0 right-0 h-full w-full pointer-events-none z-0">
        <NextImage src={sphereRightTop} alt="" fill style={{ objectFit: "cover", objectPosition: "top right", opacity: 0.22 }} />
      </div>

      <div className="pointer-events-none absolute top-[-10px] left-2/5 w-40 h-40 opacity-60 animate-float-slow">
        <NextImage src="/decorative/ton2.png" alt="" fill style={{ objectFit: "contain" }} />
      </div>
      <div className="hidden md:block pointer-events-none absolute top-[-10px] left-1/4 w-60 h-60 opacity-65 animate-float-slow delay-2000">
        <NextImage src="/decorative/ton4.svg" alt="" fill style={{ objectFit: "contain" }} />
      </div>
      <div className="md:hidden pointer-events-none absolute top-[-10px] left-1/4 w-60 h-60 opacity-65 animate-float-slow delay-2000">
        <NextImage src="/decorative/ton4.png" alt="" fill style={{ objectFit: "contain" }} />
      </div>

      <div className="pointer-events-none absolute top-0 inset-x-0 mx-auto w-1/3 h-1/3 opacity-35">
        <NextImage src="/decorative/EllipseFull.png" alt="" fill style={{ objectFit: "contain" }} />
      </div>

      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0 [--fade-top:clamp(28px,7vw,140px)]"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,1) var(--fade-top), rgba(0,0,0,1) 100%)",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,1) var(--fade-top), rgba(0,0,0,1) 100%)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        >
          <NextImage src="/decorative/starsbg1.png" alt="" fill className="pointer-events-none opacity-10 md:opacity-10" style={{ objectFit: "cover", objectPosition: "center top" }} />
        </div>
      </div>
    </section>
  );
}

      {/* Центральная сфера 
      <div className="absolute top-20 right-1/4 w-96 h-96 pointer-events-none opacity-60">
        <NextImage
          src="/decorative/ellipse10.png"
          alt=""
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div
    className="absolute bottom-0 left-1/2 w-1/2 h-full pointer-events-none"
    style={{ opacity: 0.9 }}>
    <NextImage
      src={centerSphere}
      alt=""
      fill
      style={{
        objectFit: 'cover',
        objectPosition: 'center bottom',
      }}
    />
  </div>
      */}

      {/* Левый хвост
      
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none stars-mask">
        <NextImage
          src={leftSphere}
          alt=""
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'left bottom',
            opacity: 0.1,
          }}
        />
      </div> */}



/*
export default function FAQSection() {
  // 1) Массив вопросов/ответов.
  //    Заполните его своими реальными FAQ, здесь — примерный набор:
  const faqs: FAQItem[] = [
    {
      question: "Where can I calculate my staking profit?",
      answer:
        "You can calculate your staking profit directly on this page using our interactive calculator. Simply choose a plan, enter the amount of TON you want to stake and the number of days — и вы сразу увидите прогнозируемую прибыль.",
    },
    {
      question: "How long does it take to receive rewards?",
      answer:
        "Вы получаете награду каждый день, начиная со следующих 24 часов после того, как ваш стейк будет подтверждён в сети. Средства распределяются автоматически портфельными алгоритмами TONStake.ai.",
    },
    {
      question: "What is the minimum amount to start staking?",
      answer:
        "Минимальная сумма для запуска стейкинга — 10 TON. Мы настроили все тарифы так, чтобы начиная с 10 TON вы уже могли начать получать проценты.",
    },
    {
      question: "Can I withdraw my funds at any time?",
      answer:
        "Да, вы можете вывести свои средства в любой момент. Достаточно зайти в свой дашборд, выбрать функцию «Withdraw» и подтвердить транзакцию через ваш кошелёк — средства придут обратно на ваш адрес.",
    },
    {
      question: "Are there any extra fees or hidden charges?",
      answer:
        "Мы не взимаем никакой дополнительной платы за использование платформы. Единственные комиссии — это сетевые сборы TON (gas) при переводе и выводе. Сама платформа бесплатна.",
    },
    {
      question: "How secure is my staking deposit?",
      answer:
        "Ваши средства хранятся в смарт-контрактах со стандартами безопасности TON. Мы используем проверенные open-source контракты и периодически проводим аудиты безопасности.",
    },
  ];
*/