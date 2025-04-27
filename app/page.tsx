"use client";
//import Link from "next/link";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
//import WalletConnect from "@/components/WalletConnect";
import Hero from "@/components/Hero";

import FAQSection from "@/components/FAQSection";

export default function Page() {

  const [duration, setDuration] = useState(12); // месяцев
  const [deposit, setDeposit] = useState(1000); // TON

  const reward = ((deposit * 0.065) * (duration / 12)).toFixed(2);

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
  

  const stakeOptions = [
    { name: "Validator One", apr: "6.5%", description: "Safe & Reliable" },
    { name: "Validator Two", apr: "7.1%", description: "High Yield" },
    { name: "Validator Three", apr: "5.8%", description: "Low Fees" },
  ];
/*
  const apr = 0.065; // Fixed value*/

const validators = [
  { name: "Validator One", apr: "6.5%" },
  { name: "Validator Two", apr: "6.3%" },
  { name: "Validator Three", apr: "6.1%" },
  { name: "Validator Four", apr: "6.0%" },
];

const [selectedValidator, setSelectedValidator] = useState(validators[0]);
const apr = parseFloat(selectedValidator.apr) / 100; 

const rewardWeek = ((deposit * apr) / 52).toFixed(2);
const rewardMonth = ((deposit * apr) / 12).toFixed(2);
const rewardYear = (deposit * apr).toFixed(2);
const rewardTotal = (deposit * apr * (duration / 12)).toFixed(2);


//Header connected={connected} onConnect={() => setConnected(true)}
//<main className="container mx-auto px-4 py-10"></main>
  return (
<main className="min-h-screen bg-white text-black flex flex-col items-center dark:bg-gray-800"> 
<Header />



      <Hero />
      
  <section className="w-full max-w-6xl mt-12 px-4">
  <h3 className="text-xl font-semibold mb-6">Choose a Plan</h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {stakeOptions.map((opt, i) => (
      <motion.div
        key={i}
        className="bg-white border border-gray-200 rounded-xl p-6 shadow-md flex flex-col justify-between"
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




<motion.section
  className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 mt-10 border border-gray-200"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1, duration: 0.6 }}
>
  <h2 className="text-2xl font-semibold mb-6 text-center">
    Customize Your Stake
  </h2>

  <div className="mb-6">
    <label htmlFor="deposit" className="block text-sm font-medium text-gray-700 mb-2">
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
    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
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

  <div className="text-center text-gray-600 text-sm">
    Expected reward: <strong>≈ {reward} TON</strong>
  </div>
</motion.section>



<section className="w-full max-w-6xl mt-14 px-4 flex flex-col lg:flex-row gap-8 ">
  {/* Валидаторы */}
  <div className="flex-1">
    <h3 className="text-lg font-semibold mb-4">Choose Validator</h3>
    <div className="flex gap-4 overflow-x-auto pb-2">
    {validators.map((v, i) => {
  const isSelected = selectedValidator.name === v.name;

  return (
    <div
      key={i}
      onClick={() => setSelectedValidator(v)}
      className={`min-w-[200px] flex-shrink-0 border rounded-xl p-4 shadow-sm cursor-pointer transition-all
        ${isSelected ? "bg-blue-50 border-blue-500" : "bg-white border-gray-200"}
      `}
    >
      <h4 className="text-base font-bold">{v.name}</h4>
      <p className="text-sm text-gray-600">{v.apr} APR</p>
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

  {/* Доходность */}
  <div className="w-full lg:w-64 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
  <h4 className="text-lg font-semibold mb-4">Estimated Earnings</h4>
  <ul className="text-sm text-gray-700 space-y-2">
    <li><strong>1 week:</strong> ≈ {rewardWeek} TON</li>
    <li><strong>1 month:</strong> ≈ {rewardMonth} TON</li>
    <li><strong>1 year:</strong> ≈ {rewardYear} TON</li>
    <li className="pt-2 border-t border-gray-100">
      <strong>{duration} months total:</strong> ≈ {rewardTotal} TON
    </li>
  </ul>
</div>
</section>
<section className="w-full max-w-3xl mt-20 px-4 dark:bg-gray-800">
 
<FAQSection />
</section>



    </main>

  );
}


/*
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
