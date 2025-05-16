// app/profile/page.tsx
"use client"

import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const walletAddress = "EQC5...SAD3" // заменить позже на actual wallet
  const balance = "1,430.23 TON"

  return (
    <main className="min-h-screen bg-[#0A1329] text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="bg-[#131B3A] p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Wallet</h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-300">{walletAddress}</p>
            <Button className="mt-4 sm:mt-0">Disconnect</Button>
          </div>
        </section>

        <section className="bg-[#131B3A] p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Your Balance</h2>
          <p className="text-4xl text-[#3C7EFF] font-bold">{balance}</p>
        </section>

        <section className="bg-[#131B3A] p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Staking History</h2>
          <ul className="space-y-4">
            <li className="flex justify-between text-sm text-gray-300">
              <span>12.05.2025</span>
              <span>+300 TON</span>
            </li>
            <li className="flex justify-between text-sm text-gray-300">
              <span>28.04.2025</span>
              <span>+500 TON</span>
            </li>
            <li className="flex justify-between text-sm text-gray-300">
              <span>01.04.2025</span>
              <span>+100 TON</span>
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}