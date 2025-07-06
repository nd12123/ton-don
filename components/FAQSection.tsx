// components/FAQSection.tsx
"use client";

import React, { useState } from 'react';
import NextImage from 'next/image';           // << вот так
import { ChevronDown, ChevronUp } from 'lucide-react';

// пути к вашим PNG/SVG теперь станут строкой или React-компонентом
//import leftSphere from '@/public/decorative/EllipseFAQLeft.png';
//import centerSphere from '@/public/decorative/Ellipse7.png';

import sphereLeft from "@/public/decorative/EllipseFAQLeft.png";    // ellipse6 сбоку слева
import sphereRightTop from "@/public/decorative/Ellipse50.png";    //  сбоку слева

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

  return (
    <section
      className={[
        'relative z-10',
        'text-white',
         //' stars-mask',  px-4 py-10 sm:px-6 lg:px-8
        'overflow-hidden',
        'bg-faq-gradient',
      ].join(' ')}
      >

      <div className="relative z-10 container mx-auto pb-10 px-5">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
          FAQ
        </h2>
        <p className="text-center text-gray-300 mb-12">
          Quick answers to popular questions...
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

<div className="absolute inset-0 -z-10 pointer-events-none" style={{}} />

{/* 1) Слой «шум» на весь блок 

      <NextImage // w-full h-auto
          src={sphereLeft}
          alt=""
          className="pointer-events-none opacity-99" 
          style={{ objectFit: "cover", objectPosition: "left bottom" }}
        />
        */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-0">
  <NextImage
    src={sphereLeft}
    alt=""
    fill
    style={{
      objectFit: "cover",
      objectPosition: "left bottom",
      opacity: 0.85,
    }}
  />
</div>

<div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
  <NextImage
    src={sphereRightTop}
    alt=""
    fill
    style={{
      objectFit: "cover",
      objectPosition: "top right",
      opacity: 0.16,
    }}
  />
</div>

      {/* 2) Плавающие ton сверху */}
      <div className="pointer-events-none absolute top-10 left-1/3 w-40 h-40 opacity-60 animate-float-slow">
        <NextImage
          src="/decorative/ton5.png"
          alt=""
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="pointer-events-none absolute top-0 left-2/5 w-60 h-60 opacity-65 animate-float-slow delay-2000">
        <NextImage
          src="/decorative/ton4.png"
          alt=""
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* 3) Центрированный блюр-эллипс */}
      <div className="pointer-events-none absolute top-0 inset-x-0 mx-auto w-1/2 h-96 opacity-30">
        <NextImage
          src="/decorative/EllipseFull.png"
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </div>


      <NextImage
        src="/decorative/starsbg1.png"       // укажите свой файл со звёздами stars-bg ?
        alt=""
        fill
        className="pointer-events-none"
        style={{ objectFit: "cover", objectPosition: "center top", opacity: "0.25" }}
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