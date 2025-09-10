"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    question: "Что такое стейкинг?",
    answer: "Стейкинг — это способ заработать TON, блокируя ваши монеты для поддержки сети.",
  },
  {
    question: "Когда я получу награду?",
    answer: "Награды начисляются ежедневно, но окончательно подтверждаются по завершении стейка.",
  },
  {
    question: "Могу ли я отменить стейк?",
    answer: "Нет, стейк фиксируется на выбранный срок. Будьте внимательны при выборе.",
  },
];

export default function Page() {
  return (
    <motion.main
      className="max-w-3xl mx-auto px-4 py-10 space-y-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-2xl font-bold">FAQ</h1>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="border border-gray-200 p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
            <summary className="font-medium cursor-pointer">{faq.question}</summary>
            <p className="text-sm text-gray-700 dark:text-gray-100 mt-2">{faq.answer}</p>
          </details>
        ))}
      </div>
    </motion.main>
  );
}
