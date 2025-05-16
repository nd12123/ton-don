// components/StartInvesting.tsx
"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function StartInvesting() {
  return (
    <section className="relative bg-gradient-to-br from-[#0A1329] to-[#131B3A] text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl font-bold">
          Ready to earn with your TON?
        </h2>
        <p className="mt-4 text-gray-300">
          Start staking in just a few clicks. It’s fast, secure, and fully non-custodial.
        </p>
        <div className="mt-8">
          <Button >Start Investing</Button> 
        </div>
      </motion.div>
    </section>
  )
}