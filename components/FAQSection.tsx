// components/FAQSection.tsx
"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

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

  // 2) Состояние: индекс текущего раскрытого вопроса, или null, если ничего не открыто
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // 3) Функция для клика по вопросу
  const toggleIndex = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="relative py-20  text-white overflow-hidden">
      {/* bg-[#081028] [Опционально] какие-то декоративные звёздочки или фон можно разместить здесь */}
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
          FAQ
        </h2>
        <p className="text-center text-gray-300 mb-12">
          Quick answers to popular questions about staking in TON. Save time — the solution may be a couple of clicks away.
        </p>

        {/* Сетка FAQ: две колонки на md и выше */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`group relative border ${
                  isOpen
                    ? "bg-gradient-to-r from-[#00BFFF] to-[#009FEF] text-white border-transparent"
                    : "border-[#00BFFF] bg-[#0A1329] text-white"
                } rounded-xl overflow-hidden transition-all duration-300`}
              >
                {/* Заголовок вопроса */}
                <button
                  onClick={() => toggleIndex(idx)}
                  className={`
                    w-full flex items-center justify-between px-6 py-4
                    ${isOpen ? "font-semibold" : "font-medium"} 
                    focus:outline-none
                  `}
                >
                  <span className="text-lg sm:text-xl">
                    {item.question}
                  </span>
                  <span className="ml-4">
                    {isOpen ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </span>
                </button>

                {/* Ответ (раскрывающийся блок) */}
                <div
                  className={`px-6 overflow-hidden transition-[max-height] duration-300 ${
                    isOpen ? "max-h-96 py-4" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-100 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/*
"use cleint" //by hand

import React from 'react';
import Image from 'next/image';

import qIcon from '@/assets/FAQ/Ton 3d 1.png';
import aIcon from '@/assets/FAQ/faq a.svg';

const faqs = [
  {
    question: 'What is TON Staking and how does it work?',
    answer: 'TON Staking allows you to lock up your TON tokens in our smart contract to earn passive rewards according to the selected APR plan.',
  },
  {
    question: 'Is my principal at risk?',
    answer: 'No, your principal is secure in the smart contract; only the earned rewards are subject to network performance.',
  },
  {
    question: 'How can I withdraw my rewards?',
    answer: 'You can claim your rewards at any time via the dashboard or by interacting with the withdraw function in the contract.',
  },
  {
    question: 'Are there any fees?',
    answer: 'There are minimal network transaction fees; no additional platform fees are charged for staking or withdrawing.',
  },
];

export default function FAQSection() {
  return (
    <section className="py-20 bg-bg-light dark:bg-bg-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center mb-12 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-8 max-w-3xl mx-auto">
          {faqs.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex items-center mb-2">
                <Image src={qIcon} alt="Question" width={24} height={24} />
                <h3 className="ml-2 text-xl font-semibold dark:text-white">
                  {item.question}
                </h3>
              </div>
              <div className="flex items-start text-gray-700 dark:text-gray-300">
                <Image src={aIcon} alt="Answer" width={24} height={24} />
                <p className="ml-2">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
*/