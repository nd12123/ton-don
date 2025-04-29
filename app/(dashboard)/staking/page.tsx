"use client";

import { useState } from "react"; //useEffect
import { useStakeStore } from "@/lib/store";
import Plans, { Plan } from "@/components/Plans";
import StakeCalculator from "@/components/StakeCalculator";
import { InfoCard } from "@/components/InfoCard";
import { StakeModal } from "@/components/StakeModal";
import { Button } from "@/components/ui/button";
import { Database, Archive, Award } from "lucide-react";

export default function StakingPage() {
  const addStake = useStakeStore((s) => s.addStake);
  const completeStake = useStakeStore((s) => s.completeStake);

  const plansList: Plan[] = [
    { name: "Basic", apr: 4, range: "10–899 TON" },
    { name: "Pro", apr: 7, range: "900–2 199 TON" },
    { name: "Premium", apr: 10, range: "2 200+ TON" },
  ];

  const [selectedPlanName, setSelectedPlanName] = useState(plansList[0].name);
  const selectedPlan = plansList.find((p) => p.name === selectedPlanName)!;

  const [stakeAmount, setStakeAmount] = useState(500);
  const [duration, setDuration] = useState(30);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 text-black px-4 py-10 flex flex-col items-center">
      {/* Заголовок */}
      <h1 className="text-3xl font-bold mb-6">Staking Plans</h1>

      {/* 1) Выбор плана */}
      <Plans
        plans={plansList}
        selectedPlanName={selectedPlanName}
        onSelect={setSelectedPlanName}
      />

      {/* 2) Сам стейкинг */}
      <section className="w-full max-w-5xl mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 ">
        {/* Левый столбец: калькулятор */}
        <StakeCalculator
          stakeAmount={stakeAmount}
          setStakeAmount={setStakeAmount}
          duration={duration}
          setDuration={setDuration}
          apr={selectedPlan.apr}
        />

        {/* Правый столбец: инфо + кнопка */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InfoCard title="Your Balance" value="2,750 TON" Icon={Database} />
            <InfoCard title="Staked" value="1,200 TON" Icon={Archive} />
            <InfoCard
              title="Total Rewards"
              value="102.4 TON"
              Icon={Award}
            />
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              Подтвердите стейк
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Вы собираетесь застейкать{" "}
              <strong>{stakeAmount} TON</strong> на{" "}
              <strong>{duration} дней</strong> по{" "}
              <strong>{selectedPlan.apr}% APR</strong>.
            </p>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => {
                if (stakeAmount > 0) setModalOpen(true);
              }}
            >
              Stake
            </Button>
          </div>
        </div>
      </section>

      {/* 3) Модалка */}
      <StakeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          // after
addStake({
  validator: selectedPlan.name,
  amount: stakeAmount,
  apr: selectedPlan.apr,
  duration,           // shorthand for duration: duration
  //reward: 0,          // initial reward
});

          setStakeAmount(0);
          setModalOpen(false);
          setTimeout(
            () => completeStake(String(useStakeStore.getState().history.length)), // String() is added by me cos of the bug
            5000
          );
        }}
        amount={stakeAmount}
        validator={selectedPlan.name}
      />
    </main>
  );
}
