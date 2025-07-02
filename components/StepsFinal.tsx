// components/StepsToInvest.tsx
import React from 'react'

const STEPS = [
  { id: 1, number: '01', title: 'Choose the plan that suits you best' },
  { id: 2, number: '02', title: 'Make a deposit of 10 TON or more' },
  { id: 3, number: '03', title: 'Receive dividends and withdraw them' },
]

export default function StepsFinal() {
  return (
    <section className="relative py-16 bg-[#081028] text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          3 Easy steps to invest in TonStake.Ai
        </h2>
        <div className="flex max-w-5xl mx-auto">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={`
                step-card            /* <-- здесь наш CSS-маск */
                flex-1               /* ровный делёж ширины */
                bg-gradient-to-r from-[#0B1740] to-[#0D1E4D]
                px-6 py-12
              `}
            >
              <span className="text-4xl font-extrabold">{step.number}</span>
              <p className="mt-4 text-lg leading-snug">{step.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
