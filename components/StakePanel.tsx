// components/StakePanel.tsx
"use client";

import { useState }         from "react";
//import StakePanelStyles     from "./StakePanel.module.css";
import { useStakeContract } from "@/lib/ton/useContract";
import { useTonConnect }    from "@/lib/ton/useTonConnect";

export default function StakePanel() {
  //const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
  const { connected } = useTonConnect(); //connect
  const { totalStaked, userStake, stakeTon, withdrawTon } =
    useStakeContract(); //contractAddress

  const [amount, setAmount] = useState(0);
  const [target, setTarget] = useState("");

  if (!connected) {
    return (
      <div className="p-6 bg-gray-50 rounded">
        <p>Чтобы начать, подключите ваш TON-кошелёк:</p>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={console.log}
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">Стейкинг</h2>
      <p>Общий стейк: {totalStaked.toString()} TON</p>
      <p>Ваш стейк: {userStake.toString()} TON</p>

      <div className="flex gap-2">
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border p-1 rounded w-24"
        />
        <button
          className="bg-green-500 text-white px-3 rounded disabled:opacity-50"
          disabled={amount <= 0}
          onClick={() => stakeTon(amount)}
        >
          Stake
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Адрес для Withdraw"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="border p-1 rounded flex-1"
        />
        <button
          className="bg-red-500 text-white px-3 rounded disabled:opacity-50"
          disabled={amount <= 0 || target === ""}
          onClick={() => withdrawTon(amount, target)}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}
