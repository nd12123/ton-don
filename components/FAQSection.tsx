"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    question: "Что такое стейкинг?",
    answer:
      "Стейкинг — это способ заработать TON, блокируя ваши монеты для поддержки сети.",
  },
  {
    question: "Как быстро я получу награду?",
    answer:
      "Награды начисляются каждый день, а итоговая сумма зависит от выбранного срока стейкинга.",
  },
  {
    question: "Можно ли отменить стейк досрочно?",
    answer:
      "Нет, после подтверждения стейк фиксируется на выбранный срок. Рекомендуем внимательно выбирать период.",
  },
];

export default function FAQSection() {
  return (
    <motion.section
      className="py-16 bg-gray-50 rounded-3xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-center mb-8">FAQ</h2>
      <div className="max-w-3xl mx-auto space-y-4 px-4">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="border border-gray-200 rounded-xl p-4 bg-gray-50"
          >
            <summary className="cursor-pointer font-medium">
              {faq.question}
            </summary>
            <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
          </details>
        ))}
      </div>
    </motion.section>
  );
}
