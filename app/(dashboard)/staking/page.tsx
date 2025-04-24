"use client";

import { useState } from "react";
import { useStakeStore } from "@/lib/store";
import { StakeModal } from "@/components/StakeModal";
import StakeCalculator from "@/components/StakeCalculator";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Page() {
  const addStake = useStakeStore((s) => s.addStake);
  const completeStake = useStakeStore((s) => s.completeStake);

  const [modalOpen, setModalOpen] = useState(false);

  const validators = [
    { name: "Validator One", apr: "6.5%" },
    { name: "Validator Two", apr: "6.3%" },
    { name: "Validator Three", apr: "6.1%" },
  ];

  const [selectedValidator] = useState(validators[0]);
  const [stakeAmount, setStakeAmount] = useState(500);
  const [duration, setDuration] = useState(30);

  return (
    <>
      <main className="relative z-10 min-h-screen bg-white text-black px-4 py-10 flex flex-col items-center">
        <motion.h1
          className="text-3xl font-bold mb-10 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Stake Your TON
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
  {/* Левая часть: только калькулятор */}
  <div className="space-y-6">
    <StakeCalculator
      stakeAmount={stakeAmount}
      setStakeAmount={setStakeAmount}
      duration={duration}
      setDuration={setDuration}
    />
  </div>

  {/* Правая часть: инфо + кнопка */}
  <div className="space-y-6 h-fit">
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <InfoCard title="Your Balance" value="2,750 TON" />
      <InfoCard title="Staked" value="1,200 TON" />
      <InfoCard title="Total Rewards" value="102.4 TON" />
    </section>

    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Подтвердите стейк</h2>

      <p className="text-sm text-gray-700 mb-4">
        Вы собираетесь застейкать <strong>{stakeAmount} TON</strong> на{" "}
        <strong>{duration} дней</strong> через валидатора{" "}
        <strong>{selectedValidator.name}</strong>.
      </p>

      <Button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        onClick={() => {
          if (stakeAmount > 0) {
            setModalOpen(true);
          }
        }}
      >
        Stake
      </Button>
    </div>
  </div>
</div>


        <StakeModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={() => {
            const newStake = {
              validator: selectedValidator.name,
              amount: stakeAmount,
            };
            addStake(newStake);
            setStakeAmount(0);
            setTimeout(() => {
              completeStake(useStakeStore.getState().history.length);
            }, 5000);
          }}
          amount={stakeAmount}
          validator={selectedValidator.name}
        />
      </main>
    </>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md text-center">
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-xl font-bold mt-1 text-blue-600">{value}</p>
    </div>
  );
}
