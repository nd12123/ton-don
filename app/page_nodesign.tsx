"use client";
//import Link from "next/link";

import { useState, useEffect } from "react";
//import { useStakeStore } from "@/lib/store";
import { PLANS }  from "@/components/Plans";
import Plans from "@/components/Plans"
//import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
//import WalletConnect from "@/components/WalletConnect";
//import Hero  from "@/components/Hero(nouse)";
import Footer from "@/components/Footer"
import Reveal from "@/components/ui/Reveal";
//import WhyUs from "@/components/WhyUs";
import FAQSection from "@/components/FAQSection";
import WhyUs from "@/components/WhyUs";
import StakeCalculator from "@/components/StakeCalculator";
import { InfoCard } from "@/components/InfoCard";

import TotalValue  from "@/components/TotalValue";
import StepsToInvest  from "@/components/StepsToInvest";
import { Database, Archive, Award } from "lucide-react";
import StartInvesting from "@/components/StartInvesting";

export default function Page() {
  const plansList = PLANS

  const [selectedPlanName, setSelectedPlanName] = useState(plansList[0].name);
  const selectedPlan = plansList.find((p) => p.name === selectedPlanName)!;

  const [stakeAmount, setStakeAmount] = useState(500);
// 1) когда stakeAmount меняется — находим план и ставим его
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
}

  const [duration, setDuration] = useState(12); // месяцев
//Header connected={connected} onConnect={() => setConnected(true)}
//<main className="container mx-auto px-4 py-10"></main>
//<main className="min-h-screen bg-gray-50 px-4 text-black flex flex-col items-center dark:bg-gray-800"> 

  return (
<main
   className="
     min-h-screen
     bg-bg-light    /* вместо bg-gray-50 */
     text-text-light /* вместо text-black */
     dark:bg-bg-dark /* вместо dark:bg-gray-800 */
     dark:text-text-dark
     flex flex-col items-center
   "
 >

<Header />
      <TotalValue />
      <Reveal className="mt-16">
        <WhyUs/>
      </Reveal>
      <StepsToInvest />

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
          //if (stakeAmount > 0) setModalOpen(true);
        }}
      >
        Connect wallet first
      </Button>
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


/*
  const [connected, setConnected] = useState(false);
  const handleConnect = () => {
    // Здесь позже добавим TonConnect
    setConnected(true);
  };
  <p className= "text-blue-600">
          {connected ? "Wallet Connected ✅" : "Connect your wallet to start staking."}
        </p>
        
*/
  

/*
//доходность
<section className="w-full max-w-6xl mx-auto items-start  mt-10 justify-center flex flex-col lg:flex-row gap-8">

<motion.section
  className="w-full max-w-xl bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-md p-6  border border-gray-200"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1, duration: 0.6 }}
>
  <h2 className="text-2xl font-semibold mb-6 text-center dark:text-gray-100">
    Customize Your Stake
  </h2>

  <div className="mb-6">
    <label htmlFor="deposit" className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
      Deposit Amount: {deposit} TON
    </label>
    <input
      id="deposit"
      type="range"
      min={0}
      max={5000}
      step={50}
      value={deposit}
      onChange={(e) => setDeposit(Number(e.target.value))}
      className="w-full"
    />
  </div>

  <div className="mb-6">
    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
      Staking Duration: {duration} months
    </label>
    <input
      id="duration"
      type="range"
      min={1}
      max={24}
      step={1}
      value={duration}
      onChange={(e) => setDuration(Number(e.target.value))}
      className="w-full"
    />
  </div>

  <div className="text-center text-gray-600 dark:text-gray-100 text-sm">
    Expected reward: <strong>≈ {reward} TON</strong>
  </div>
</motion.section>

//доходность
<div className="w-full flex-none lg:w-64 bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm dark:bg-gray-700">
  <h4 className="text-lg font-semibold mb-4 dark:text-gray-100">Estimated Earnings</h4>
  <ul className="text-sm text-gray-700 space-y-2 dark:text-gray-200">
    <li><strong>1 week:</strong> ≈ {rewardWeek} TON</li>
    <li><strong>1 month:</strong> ≈ {rewardMonth} TON</li>
    <li><strong>1 year:</strong> ≈ {rewardYear} TON</li>
    <li className="pt-2 border-t border-gray-100">
      <strong>{duration} months total:</strong> ≈ {rewardTotal} TON
    </li>
  </ul>
</div>


</section>






<section className="
    w-full max-w-6xl mx-auto   // центрируем по странице 
    px-4                       // боковые паддинги 
    mt-14                      // отступ сверху 
    flex flex-col items-center // колонки + центр контента 
  ">
  <div className="flex-1">
    <h3 className="text-lg font-semibold mb-4 dark:text-gray-300">Choose Validator</h3>
    <div className="flex gap-4 overflow-x-auto pb-2">
    {validators.map((v, i) => {
  const isSelected = selectedValidator.name === v.name;
  return (
    <div
      key={i}
      onClick={() => setSelectedValidator(v)}
      className={`min-w-[200px] flex-shrink-0 border rounded-xl p-4 shadow-sm cursor-pointer transition-all
        ${isSelected ? "bg-blue-50 border-blue-500 dark:bg-gray-800" : "bg-gray-50 border-gray-200 dark:bg-gray-700"}
      `}
    >
      <h4 className="text-base font-bold">{v.name}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-100">{v.apr} APR</p>
      <Button
        className={`mt-3 text-sm w-full ${
          isSelected
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {isSelected ? "Selected" : "Select"}
      </Button>
    </div>
  );
})}
    </div>
  </div>
</section>

<motion.div
        className="bg-[#1c2733] p-8 rounded-2xl shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        

      <WalletConnect />
      </motion.div>


      
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Stake TON Easily
      </motion.h1>
*/

/*



  const stakeOptions = [
    { name: "Validator One", apr: "6.5%", description: "Safe & Reliable" },
    { name: "Validator Two", apr: "7.1%", description: "High Yield" },
    { name: "Validator Three", apr: "5.8%", description: "Low Fees" },
  ];

  
  <section className="w-full max-w-6xl mt-12 px-4">
  <h3 className="text-xl font-semibold mb-6">Choose a Plan</h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {stakeOptions.map((opt, i) => (
      <motion.div
        key={i}
        className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-md flex flex-col justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * i, duration: 0.5 }}
      >
        <div>
          <h4 className="text-lg font-semibold">{opt.name}</h4>
          <p className="text-sm text-gray-500">{opt.description}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-blue-600 font-bold">{opt.apr} APR</span>
          
          <Button
           className="text-white bg-blue-500 hover:bg-blue-600 text-sm px-4 py-2 rounded-lg">
            Stake
          </Button>
        </div>
      </motion.div>
    ))}
  </div>
</section>

*/