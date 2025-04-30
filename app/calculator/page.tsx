"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CalculatorPage() {
  const [amount, setAmount] = useState<number | null>(null);
  const reward = amount ? (amount * 0.065).toFixed(2) : null;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black flex flex-col items-center px-4">
      <motion.header
        className="w-full max-w-6xl px-4 md:px-8 py-6 flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-xl font-bold tracking-wide">TON Calculator</div>
      </motion.header>

      <motion.section
        className="w-full max-w-xl bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg p-8 mt-10 border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Reward Estimator
        </h2>

        <div className="flex flex-col gap-4">
          <label htmlFor="amount" className="text-sm text-gray-700">
            Amount to Stake
          </label>
          <input
            type="number"
            id="amount"
            placeholder="0.00"
            value={amount ?? ""}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="bg-gray-100 text-black px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
          />

          {reward && (
            <p className="text-sm text-gray-600">
              Expected reward: <strong>≈ {reward} TON</strong> / year
            </p>
          )}

          <Button className="bg-blue-500 hover:bg-blue-600 w-full mt-4 text-white shadow-lg hover:shadow-xl">
            Stake Now
          </Button>
        </div>
      </motion.section>
    </main>
  );
}
