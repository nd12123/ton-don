// app/InteractivePage.tsx
"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import MainSection from "@/components/MainSection";
import TotalValue from "@/components/TotalValue";
import WhyUs from "@/components/WhyUs";
import StepsToInvest from "@/components/StepsToInvest";
import { PLANS } from "@/components/Plans";
import Plans from "@/components/Plans";
import StakeCalculator from "@/components/StakeCalculator";
import { InfoCard } from "@/components/InfoCard";
import StartInvesting from "@/components/StartInvesting";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { Database, Archive, Award } from "lucide-react";

export default function InteractivePage() {
  const plansList = PLANS;

  const [selectedPlanName, setSelectedPlanName] = useState(plansList[0].name);
  const selectedPlan = plansList.find((p) => p.name === selectedPlanName)!;

  const [stakeAmount, setStakeAmount] = useState(500);
  const [duration, setDuration] = useState(12);

  // Авто-выбор плана при изменении суммы
  useEffect(() => {
    const auto = plansList.find(
      (p) =>
        stakeAmount >= p.min &&
        (p.max === undefined || stakeAmount <= p.max)
    );
    if (auto && auto.name !== selectedPlanName) {
      setSelectedPlanName(auto.name);
    }
  }, [stakeAmount, selectedPlanName, plansList]);

  function handlePlanSelect(planName: string) {
    const p = plansList.find((pl) => pl.name === planName)!;
    setSelectedPlanName(planName);
    setStakeAmount(p.min);
  }

  return (
    <>
      <Header />
      <MainSection />
      <TotalValue />
      <WhyUs />
      <StepsToInvest />

      {/* Staking Plans & Calculator */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">
            Staking Plans
          </h1>
          <Plans
            plans={plansList}
            selectedPlanName={selectedPlanName}
            onSelect={handlePlanSelect}
          />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
            <StakeCalculator
              stakeAmount={stakeAmount}
              setStakeAmount={setStakeAmount}
              duration={duration}
              setDuration={setDuration}
              apr={selectedPlan.apr}
            />
            <div className="space-y-6 max-w-md w-full">
              <div className="grid grid-cols-3 gap-4">
                <InfoCard title="Your Balance" value="2,750 TON" Icon={Database} />
                <InfoCard title="Staked" value="1,200 TON" Icon={Archive} />
                <InfoCard title="Total Rewards" value="102.4 TON" Icon={Award} />
              </div>
              <div className="bg-white dark:bg-gray-600 border border-gray-200 p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
                  Confirm Stake
                </h2>
                <p className="text-sm text-gray-700 mb-4 dark:text-gray-100">
                  You are about to stake{" "}
                  <strong>{stakeAmount} TON</strong> for{" "}
                  <strong>{duration} days</strong> at{" "}
                  <strong>{selectedPlan.apr}% APR</strong>.
                </p>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg">
                  Connect wallet first
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FAQSection />
      <StartInvesting />
      <Footer />
    </>
  );
}