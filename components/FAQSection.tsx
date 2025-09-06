// components/FAQSection.tsx
"use client";

import React, { useState } from 'react';
import NextImage from 'next/image';           // << вот так
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, useReducedMotion } from "framer-motion";

//import SectionWithFade from "@/components/SectionWithFade";

// пути к вашим PNG/SVG теперь станут строкой или React-компонентом
//import leftSphere from '@/public/decorative/EllipseFAQLeft.png';
//import centerSphere from '@/public/decorative/Ellipse7.png';

//import sphereLeft from "@/public/decorative/EllipseFAQLeft.png";    // ellipse6 сбоку слева
import sphereRightTop from "@/public/decorative/Ellipse50.png";    //  сбоку 
import sphere from "@/public/decorative/Ellipse8.png";    // ellipse6 // сбоку слева

//const sphereUpperRight = "@/public/decorative/Ellipse50.png";    //  right top

type FAQItem = { question: string; answer: string };

export default function FAQSection() {
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleIndex = (idx: number) =>
    setOpenIndex(prev => (prev === idx ? null : idx));

  
  const spring = {
    type: "spring",
    stiffness: 320,
    damping: 34,
    mass: 0.6,
  } as const;

  return (
    <section
      className={[
        'relative z-10',
        'text-white',
         //' stars-mask',  px-4 py-10 sm:px-6 lg:px-8
        //'overflow-hidden',
        'bg-faq-gradient',
        //'horizon',
        'py-10'
      ].join(' ')}
      >
        {/* — Усиленный фэйд вверх для FAQ */}
{/* — Плавный фэйд сверху для стыка Калькулятора → FAQ */}
<div
  className="absolute top-0 left-0 w-full h-24 pointer-events-none z-[-1] opacity-30"
  style={{
    backgroundImage: [
      // 0) чуть более лёгкая «чёрная» полоса сверху
      `linear-gradient(
         to bottom,
         rgba(0, 0, 0, 0.3) 0%,
         rgba(0, 0, 0, 0.15) 8%,
         transparent 30%
       )`,
      // 1) смягчённый радиальный блик в левом верхнем углу
      `radial-gradient(
         circle at top left,
         rgba(10, 19, 41, 0.7) 0%,
         transparent 70%
       )`,
      // 2) основной линейный фейд сверху вниз
      `linear-gradient(
         to top,
         rgba(10, 19, 41, 1) 0%,
         rgba(10, 19, 41, 0) 100%
       )`
    ].join(', ')
  }}
/>

      

      <div className="relative z-10 container mx-auto pb-10 px-5 py-25">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
          FAQ
        </h2>
        <p className="text-center text-gray-300 mb-12">
          Quick answers to popular questions...
        </p>
        
        {/* layout-анимация грида: перестройка без «рывков» */}
        <motion.div
          layout
          transition={spring}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.article
                key={idx}
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

                {/* вместо max-height — height:auto с framer-motion */}
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
{/**
 * 
        <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-min gap-8">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`relative group rounded-xl overflow-hidden transition-all ${
                  isOpen
                    ? 'bg-gradient-to-r from-[#00BFFF] to-[#009FEF] text-white'
                    : 'bg-[#0A1329] border border-[#00BFFF] text-white'
                }`}
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full flex items-center justify-between px-6 py-4 font-medium"
                >
                  <span className="text-lg sm:text-xl">{item.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </button>
                <div
                  className={`px-6 overflow-hidden transition-[max-height] duration-300 ${
                    isOpen ? 'max-h-96 py-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-100 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
 */}

<div className="absolute inset-0 -z-10 pointer-events-none" style={{}} />

{/* 1) Слой «шум» на весь блок 

      <NextImage // w-full h-auto
          src={sphereLeft}
          alt=""
          className="pointer-events-none opacity-99" 
          style={{ objectFit: "cover", objectPosition: "left bottom" }}
        />
        
<div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
  <NextImage
    src={sphereUpperRight}
    alt=""
    fill
    style={{
      objectFit: "cover",
      objectPosition: "left bottom",
      opacity: 0.6,
    }}
  />
</div>
        */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-0">
  <NextImage
    src={sphere}
    alt=""
    fill
    style={{
      objectFit: "cover",
      objectPosition: "left bottom",
      opacity: 0.9,
    }}
  />
</div>


<div className="absolute top-0 right-0 h-full w-full pointer-events-none z-0">
  <NextImage
    src={sphereRightTop}
    alt=""
    fill
    style={{
      objectFit: "cover",
      objectPosition: "top right",
      opacity: 0.22,
    }}
  />
</div>

      {/* 2) Плавающие ton сверху */}
      <div className="pointer-events-none absolute top-[-10px] left-2/5 w-40 h-40 opacity-60 animate-float-slow">
        <NextImage
          src="/decorative/ton2.png"
          alt=""
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="pointer-events-none absolute top-[-10px] left-1/4 w-60 h-60 opacity-65 animate-float-slow delay-2000">
        <NextImage
          src="/decorative/ton4.svg"
          alt=""
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* 3) Центрированный блюр-эллипс */}
      <div className="pointer-events-none absolute top-0 inset-x-0 mx-auto w-1/3 h-1/3 opacity-35">
        <NextImage
          src="/decorative/EllipseFull.png"
          alt=""
          fill
          style={{ objectFit: "contain" }}
        />
      </div>


      <NextImage
        src="/decorative/starsbg1.png"       // укажите свой файл со звёздами stars-bg ?
        alt=""
        fill
        className="pointer-events-none"
        style={{ objectFit: "cover", objectPosition: "center top", opacity: "0.1" }}
      />

<div
  className="absolute inset-x-0 bottom-0 h-32 pointer-events-none -z-10"
  style={{
    background: `
      linear-gradient(
      )
    `,
  }}
/>


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