"use client";

import { useState, useEffect, useMemo } from "react"; //useEffect
import { useStakeStore } from "@/lib/store";
//import Plans from "@/components/Plans";
//import StakeCalculator from "@/components/StakeCalculator";
//import { InfoCard } from "@/components/InfoCard";
import { StakeModal } from "@/components/StakeModal";
import { Button } from "@/components/ui/button";
//import { Database, Archive, Award } from "lucide-react";

import { useTonAddress } from "@tonconnect/ui-react";


import PlanCard from "@/components/PlanCard";
import Calculator from "@/components/Calculator";

//import StakePanel from "@/components/StakePanel";


export default function StakingPage() {
  const address = useTonAddress(); // строка вида "EQCx…"


  const addStake = useStakeStore((s) => s.addStake);
  //const completeStake = useStakeStore((s) => s.completeStake);
const PLANS = [
  { id: 0, label: "Basic",   apr:  4, min:    1, rangeText: "1–999 TON",      iconSrc: "/decorative/basic icon.svg", bgSrc: "/decorative/stepsRight.png"},
  { id: 1, label: "Pro",     apr:  7, min: 1000, rangeText: "1000–1 999 TON", iconSrc: "/decorative/pro icon.svg", bgSrc: "/decorative/stepsCardBg.svg"   },
  { id: 2, label: "Premium", apr: 10, min: 2000, rangeText: "2000+ TON",      iconSrc: "/decorative/super icon.svg", bgSrc: "/decorative/stepsLeft.png" },
];
  const plansList = PLANS
  const [selectedPlanId, setSelectedPlanId] = useState(plansList[0].id);
  const selectedPlan = plansList.find((p) => p.id === selectedPlanId)!;

  const [stakeAmount, setAmount] = useState(PLANS[0].min); //setStakeAmount
  const [duration, setDuration] = useState(30); //setDuration
  const [modalOpen, setModalOpen] = useState(false);
  
  
    // Авто-выбор плана при изменении суммы
    useEffect(() => {
      const auto = plansList.find(
        (p) =>
          stakeAmount <= p.min &&
          (p.min === undefined || stakeAmount <= p.min)
      );
      if (auto && auto.id !== selectedPlanId) {
        setSelectedPlanId(auto.id);
      }
    }, [stakeAmount, selectedPlanId, plansList]);

    
      const handlePlanSelect = (id: number) => {
        setSelectedPlanId(id);
        setAmount(PLANS[id].min);
      };
      const handleAmountChange = (v: number) => {
        setAmount(v);
        const newIdx = PLANS
          .map((p, i) => ({ min: p.min, idx: i }))
          .filter(p => v >= p.min)
          .pop()!.idx;
        if (newIdx !== selectedPlanId) setSelectedPlanId(newIdx);
      };
      const apr = PLANS[selectedPlanId].apr;
      const dailyEarnings = useMemo(() => (stakeAmount * (apr/100)) / 365, [stakeAmount, apr]);
    
  

  return (
    <main className="min-h-screen text-blue-900 px-4 py-10 flex flex-col items-center">
      {/**Jetton*/}
      {/* Заголовок */}
      <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">Staking Plans</h1>
        
              <div className="max-w-6xl mx-auto px-4 pb-6">
                {/* === 3) Карточки планов === */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-8 mb-16">
                  {PLANS.map((plan, idx) => (
                    <PlanCard
                      key={plan.id}
                      title={plan.label}
                      dailyProfit={plan.apr}
                      rangeText={plan.rangeText}
                      iconSrc={plan.iconSrc}
                      isActive={idx === selectedPlanId}
                      //bgSrc={plan.bgSrc}
                      onSelect={() => handlePlanSelect(idx)}
                    />
                  ))}
                </div>
        
        
                {/* === 4) Калькулятор === */}
                <Calculator
                  amount={stakeAmount}
                  onAmountChange={handleAmountChange}
                  sliderMin={PLANS[0].min}
                  sliderMax={5000}
                  days={duration}
                  onDaysChange={setDuration}
                  apr={apr}
                  dailyEarnings={dailyEarnings}
                />
              </div>

      {/* 2) Сам стейкинг */}
      <section className="w-full max-w-5xl mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 ">
        
        <div className="space-y-6 items-center">

          <div className="bg-gray-50 dark:bg-gray-600 border border-gray-200 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
              Подтвердите стейк
            </h2>
            <p className="text-sm text-gray-700 mb-4 dark:text-gray-100">
              Вы собираетесь застейкать{" "}
              <strong>{stakeAmount} TON</strong> на{" "}
              <strong>{duration} дней</strong> по{" "} {/**<strong>{selectedPlan.apr}% APR</strong> */}
              .
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
        onConfirm={(txHash) => {
          console.log("🟢 [Page] received txHash:", txHash);
          addStake({ validator: selectedPlan.label, wallet: address!, amount:stakeAmount, apr:selectedPlan.apr, duration, txHash }); //selectedPlan.name, selectedPlan.apr
          setModalOpen(false);
        }}
        //{handleConfirm}
        amount={stakeAmount}
        validator={selectedPlan.label} //selectedPlan.name
        //walletAddress={address}
        //apr={selectedPlan.apr}
        //duration={duration}
      />
    </main>
  );
}



      {/* 1) Выбор плана
      <Plans
  plans={plansList}
  selectedPlanName={selectedPlanName}
  onSelect={handlePlanSelect}
/> */}
        {/* Левый столбец: калькулятор
        <StakeCalculator
          stakeAmount={stakeAmount}
          setStakeAmount={setStakeAmount}
          duration={duration}
          setDuration={setDuration}
          apr={selectedPlan.apr}
        /> */}

        {/* Правый столбец: инфо + кнопка
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InfoCard title="Your Balance" value="2,750 TON" Icon={Database} />
            <InfoCard title="Staked" value="1,200 TON" Icon={Archive} />
            <InfoCard
              title="Total Rewards"
              value="102.4 TON"
              Icon={Award}
            />
          </div> */}

  // … your validator / apr / duration logic …
/*
  const handleConfirm = (txHash: string) => {
    addStake({
      validator: selectedPlan.name,
      wallet: address,
      amount: stakeAmount,
      apr: selectedPlan.apr,
      duration,
      txHash,
    });
    // reset form…
  };
*/

  // внутри StakingPage
// 1) когда stakeAmount меняется — находим план и ставим его
/*
useEffect(() => {
  const auto = plansList.find(p => 
    stakeAmount >= p.min  &&  ((typeof p.max == "undefined") || stakeAmount <= p.max)// p.max can be undefined //?????
  );
  if (auto && auto.name !== selectedPlanName) {
    setSelectedPlanName(auto.name);
  }
}, [stakeAmount, selectedPlanName, plansList]);

function handlePlanSelect(planName: string) {
  const p = plansList.find(pl => pl.name === planName)!;
  setSelectedPlanName(planName);
  setStakeAmount(p.min);    // ползунок «прыгает» на min тарифного диапазона
} */