// components/Plans.tsx
"use client";

import { motion } from "framer-motion";
// hover animation on cards, can be added later whileTap={{ scale: 0.98 }}
export type Plan = {
  name: string;
  apr: number;
  min: number;
  max?: number;
  range: string;
};

export const PLANS: Plan[] = [
  { name: "Basic",   apr:  4, min:    1,   max:   999, range: "1–999 TON" },
  { name: "Pro",     apr:  7, min: 1000,   max:  1999, range: "1000–1 999 TON" },
  { name: "Premium", apr: 10, min: 2000,             /* без max */ range: "2000+ TON" },
];


export default function Plans({
  plans,
  selectedPlanName,
  onSelect,
}: {
  plans: Plan[];
  selectedPlanName: string;
  onSelect: (planName: string) => void;
}) {
  return (
    <motion.section
      className="py-16 "
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      

      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/*<h2 className="text-2xl font-bold text-center mb-8 dark:text-gray-100">Our Plans</h2>*/}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {plans.map((p) => {
          const isActive = p.name === selectedPlanName;
          return (
            <motion.div
              key={p.name}
              onClick={() => onSelect(p.name)}
              className={`cursor-pointer bg-gray-50 dark:bg-gray-700 border rounded-xl p-6 shadow transition-shadow ${
                isActive
                  ? "border-blue-500 shadow-md"
                  : "border-gray-200 hover:shadow-lg"
              }`}
              whileHover={{ y: isActive ? 0 : -4 }}
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-center">
                {p.name}
              </h3>
              <p
                className={`text-3xl font-extrabold mb-2 ${
                  isActive ? "text-blue-600" : "text-gray-800"
                }`}
              >
                {p.apr}% APR
              </p>
              <p className="text-sm text-gray-500 mb-4 text-center">
                {p.range}
              </p>
              <button
                className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {isActive ? "Selected" : "Choose"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
