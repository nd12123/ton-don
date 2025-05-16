"use client";
//import GetStartedButton from "@/components/GetStartedButton"; <GetStartedButton />
import { MotionButton } from "@/components/ui/MotionButton";
// /images/image-ton-contribute.jpg
import TestTx from "@/components/TestTx"
import { useState } from "react";


export default function Hero() {


  const [connected, setConnected] = useState(false);
  const handleConnect = () => {
    // Здесь позже добавим TonConnect
    //console.log("done")
    setConnected(true);
  };


  return (
<section className="
     w-full h-96
     bg-hero      /* ваш токен для фонового цвета-слоя, если он есть */
     bg-[url('/images/ton-graphics.jpg')]
     bg-cover bg-center
     flex items-center justify-center
   ">


      {/* затемняющая накладка */}
      <div className="absolute inset-0 bg-black/30" />

      <h1 className="relative z-10 text-4xl sm:text-5xl lg:text-6xl font-extrabold
                     text-white max-w-3xl px-4">
        Stake TON Easily & Securely
      </h1>
      <p className="relative z-10 mt-4 text-lg md:text-xl
                    text-gray-200 max-w-2xl px-4">
        Earn passive rewards by staking your TON tokens with trusted validators.
      </p>

      <div className="relative z-10 mt-8">
      <MotionButton
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
  onClick= {() => handleConnect()}
>
  Stake Now
</MotionButton>

<p className= "text-white-600 dark:text-gray-800">
          {connected ? "Wallet Connected ✅" : "Connect your wallet to start staking."}
</p>
    <section className="mt-12">
        <h2 className="text-xl font-semibold">Тестовая транзакция</h2>
        <TestTx />
      </section>
      </div>
    </section>
  );
}
