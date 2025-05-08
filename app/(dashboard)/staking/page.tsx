"use client";

import { useState, useEffect } from "react"; //useEffect
import { useStakeStore, StakeRecord } from "@/lib/store";
import Plans, { Plan } from "@/components/Plans";
import StakeCalculator from "@/components/StakeCalculator";
import { InfoCard } from "@/components/InfoCard";
import { StakeModal } from "@/components/StakeModal";
import { Button } from "@/components/ui/button";
import { Database, Archive, Award } from "lucide-react";
//import { PLANS } from "./page";          // ← import our constant

import { useTonAddress } from "@tonconnect/ui-react";
import { useTonPrice } from "@/lib/hooks/useTonPrice";
import { supabase } from "@/lib/supabase";


export const plansList: Plan[] = [
  { name: "Basic",   apr:  4, min:    1, max:   999, range: "1–999 TON" },
  { name: "Pro",     apr:  7, min: 1000, max:  1999, range: "1000–1 999 TON" },
  { name: "Premium", apr: 10, min: 2000,               range: "2000+ TON" },
];

export default function StakingPage() {
  const address = useTonAddress(); // строка вида "EQCx…"

  //const address = useTonAddress()!;
  const priceUsd = useTonPrice();

  // Состояния для истории/профиля
  const [history, setHistory] = useState<StakeRecord[]>([]);
  useEffect(() => {
    if (!address) return;
    supabase
      .from<"stakes", StakeRecord>("stakes")
      .select("*")
      .eq("wallet", address)
      .then(({ data }) => data && setHistory(data));
  }, [address]);

  // Расчёты баланса и дохода
  const totalStaked = history.reduce((sum, r) => sum + r.amount, 0);
  const totalCompletedRewards = history
    .filter((r) => r.status === "completed")
    .reduce(
      (sum, r) => sum + r.amount * (r.apr / 100) * (r.duration / 365),
      0
    );
  const dailyIncome = history
    .filter((r) => r.status === "active")
    .reduce((sum, r) => sum + r.amount * (r.apr / 100) / 365, 0);




  const addStake = useStakeStore((s) => s.addStake);
  //const completeStake = useStakeStore((s) => s.completeStake);

  /*
  const plansList: Plan[] = [
    { name: "Basic",   apr: 4,  min:   1, max:   999, range: "1–999 TON" },
    { name: "Pro",     apr: 7,  min: 1000, max:  1999, range: "1000–1 999 TON" },
    { name: "Premium", apr: 10, min: 2000, max: Infinity, range: "2000+ TON" },
  ];
*/

  const [selectedPlanName, setSelectedPlanName] = useState(plansList[0].name);
  const selectedPlan = plansList.find((p) => p.name === selectedPlanName)!;

  const [stakeAmount, setStakeAmount] = useState(500);
  const [duration, setDuration] = useState(30);
  const [modalOpen, setModalOpen] = useState(false);

  // внутри StakingPage
// 1) когда stakeAmount меняется — находим план и ставим его
useEffect(() => {
  const auto = plansList.find(p => 
    stakeAmount >= p.min && stakeAmount <= p.max
  );
  if (auto && auto.name !== selectedPlanName) {
    setSelectedPlanName(auto.name);
  }
}, [stakeAmount, selectedPlanName, plansList]);

function handlePlanSelect(planName: string) {
  const p = plansList.find(pl => pl.name === planName)!;
  setSelectedPlanName(planName);
  setStakeAmount(p.min);    // ползунок «прыгает» на min тарифного диапазона
}

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black px-4 py-10 flex flex-col items-center">
      {/* Заголовок */}
      <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">Staking Plans</h1>

      {/* 1) Выбор плана */}
      <Plans
  plans={plansList}
  selectedPlanName={selectedPlanName}
  onSelect={handlePlanSelect}
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

          <div className="bg-gray-50 dark:bg-gray-600 border border-gray-200 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
              Подтвердите стейк
            </h2>
            <p className="text-sm text-gray-700 mb-4 dark:text-gray-100">
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
                  wallet: address,
                  amount: stakeAmount,
                  apr: selectedPlan.apr,
                  duration,
                });
                setStakeAmount(0);
                setModalOpen(false);
        }}
        amount={stakeAmount}
        validator={selectedPlan.name}
      />
    </main>
  );
}
