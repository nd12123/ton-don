// components/Hero.tsx
"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#001F3F] via-[#0E1A38] to-[#130B29]" />

      {/* Контейнер */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
          Stake TON. Earn rewards.
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-300">
          Secure your assets and grow with the TON network.
        </p>
        <div className="mt-8">
          <Button >Connect Wallet</Button>
        </div>
      </motion.div>
    </section>
  )
}