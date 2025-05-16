// components/TotalValue.tsx
"use client"

import { motion } from "framer-motion"

export default function TotalValue() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0A1329] text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <p className="text-lg uppercase tracking-widest text-[#8FA0C9]">
          Total Value Locked
        </p>
        <h2 className="mt-3 text-5xl sm:text-6xl font-bold text-[#3C7EFF]">
          $12,320,000
        </h2>
        <p className="mt-2 text-base text-gray-400">
          in TON Staking Pool
        </p>
      </motion.div>
    </section>
  )
}