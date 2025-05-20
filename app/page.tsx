"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import MainSection from "@/components/MainSection";
import TotalValue from "@/components/TotalValue";
import Reveal from "@/components/ui/Reveal";
import WhyUs from "@/components/WhyUs";
import StepsToInvest from "@/components/StepsToInvest";
import { PLANS } from "@/components/Plans";
import Plans from "@/components/Plans";
import StakeCalculator from "@/components/StakeCalculator";
import { InfoCard } from "@/components/InfoCard";
import FAQSection from "@/components/FAQSection";
import StartInvesting from "@/components/StartInvesting";
import Footer from "@/components/Footer";
import { Database, Archive, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const plansList = PLANS;
  const [selectedPlanName, setSelectedPlanName] = useState(plansList[0].name);
  const selectedPlan = plansList.find((p) => p.name === selectedPlanName)!;
  const [stakeAmount, setStakeAmount] = useState(500);
  const [duration, setDuration] = useState(12);

  useEffect(() => {
    const auto = plansList.find(
      (p) =>
        stakeAmount >= p.min &&
        (typeof p.max === "undefined" || stakeAmount <= p.max)
    );
    if (auto && auto.name !== selectedPlanName) {
      setSelectedPlanName(auto.name);
    }
  }, [stakeAmount, selectedPlanName, plansList]);

  const handlePlanSelect = (planName: string) => {
    const plan = plansList.find((pl) => pl.name === planName)!;
    setSelectedPlanName(planName);
    setStakeAmount(plan.min);
  };

  return (
    <main className="min-h-screen bg-bg-light text-text-light dark:bg-bg-dark dark:text-text-dark flex flex-col items-center">
      <Header />

      {/* Hero section replaced by MainSection */}
      <MainSection />

      {/* Total Value Locked */}
      <Reveal className="mt-16">
      <TotalValue />
      </Reveal>

      {/* Why Us */}
      <Reveal className="mt-16">
        <WhyUs />
      </Reveal>

      {/* Steps To Invest */}
      <StepsToInvest />

      {/* Plans and Calculator */}
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">Staking Plans</h1>
        <Plans
          plans={plansList}
          selectedPlanName={selectedPlanName}
          onSelect={handlePlanSelect}
        />
        <div className="w-full max-w-5xl mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <StakeCalculator
            stakeAmount={stakeAmount}
            setStakeAmount={setStakeAmount}
            duration={duration}
            setDuration={setDuration}
            apr={selectedPlan.apr}
          />
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InfoCard title="Your Balance" value="2,750 TON" Icon={Database} />
              <InfoCard title="Staked" value="1,200 TON" Icon={Archive} />
              <InfoCard title="Total Rewards" value="102.4 TON" Icon={Award} />
            </div>
            <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Confirm Stake</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                You are about to stake <strong>{stakeAmount} TON</strong> for <strong>{duration} days</strong> at <strong>{selectedPlan.apr}% APR</strong>.
              </p>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Connect Wallet</Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ and Call-to-Action */}
      <section className="w-full bg-bg-light dark:bg-bg-dark">
      <Reveal>
        <FAQSection />
        <StartInvesting />
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}


/*
"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import MainSection from "@/components/MainSection";
import TotalValue from "@/components/TotalValue";
import Reveal from "@/components/ui/Reveal";
import WhyUs from "@/components/WhyUs";
import StepsToInvest from "@/components/StepsToInvest";
import { PLANS } from "@/components/Plans";
import Plans from "@/components/Plans";
import StakeCalculator from "@/components/StakeCalculator";
import { InfoCard } from "@/components/InfoCard";
import FAQSection from "@/components/FAQSection";
import StartInvesting from "@/components/StartInvesting";
import Footer from "@/components/Footer";
import { Database, Archive, Award } from "lucide-react";

export default function Page() {
  const plansList = PLANS;
  const [selectedPlanName, setSelectedPlanName] = useState(plansList[0].name);
  const selectedPlan = plansList.find((p) => p.name === selectedPlanName)!;
  const [stakeAmount, setStakeAmount] = useState(500);
  const [duration, setDuration] = useState(12);

  useEffect(() => {
    const auto = plansList.find(
      (p) =>
        stakeAmount >= p.min &&
        (typeof p.max === "undefined" || stakeAmount <= p.max)
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
    <main className="min-h-screen bg-bg-light text-text-light dark:bg-bg-dark dark:text-text-dark flex flex-col items-center">
      <Header />
      <Reveal >
      <MainSection />
      </Reveal>

      <Reveal className="mt-16">
      <TotalValue />
      </Reveal>


      <Reveal className="mt-16">
        <WhyUs />
      </Reveal>

      <StepsToInvest />

      <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">Staking Plans</h1>

      <Plans
        plans={plansList}
        selectedPlanName={selectedPlanName}
        onSelect={handlePlanSelect}
      />

      <section className="w-full max-w-5xl mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StakeCalculator
          stakeAmount={stakeAmount}
          setStakeAmount={setStakeAmount}
          duration={duration}
          setDuration={setDuration}
          apr={selectedPlan.apr}
        />

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InfoCard title="Your Balance" value="2,750 TON" Icon={Database} />
            <InfoCard title="Staked" value="1,200 TON" Icon={Archive} />
            <InfoCard title="Total Rewards" value="102.4 TON" Icon={Award} />
          </div>

          <div className="bg-gray-50 dark:bg-gray-600 border border-gray-200 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
              Подтвердите стейк
            </h2>
            <p className="text-sm text-gray-700 mb-4 dark:text-gray-100">
              Вы собираетесь застейкать <strong>{stakeAmount} TON</strong> на{' '}
              <strong>{duration} дней</strong> по{' '}
              <strong>{selectedPlan.apr}% APR</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-3xl mt-20 px-4 dark:bg-gray-800">
        <Reveal className="mt-16">
          <FAQSection />
          <StartInvesting />
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
*/