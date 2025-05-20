"use client";

import React from "react";
//import { Range } from "@headlessui/react"; // if using headless UI, else native input

export default function StakeCalculator({
  stakeAmount,
  setStakeAmount,
  duration,
  setDuration,
  apr,
}: {
  stakeAmount: number;
  setStakeAmount: (value: number) => void;
  duration: number;
  setDuration: (value: number) => void;
  apr: number;
}) {
  // Calculate earnings
  const calculateEarnings = (days: number) => (
    ((stakeAmount * (apr / 100)) / 365) * days
  );

  return (
    <div className="bg-background-light dark:bg-background-dark border dark:border-gray-700 p-6 rounded-2xl shadow-md w-full">
      <h3 className="text-xl font-semibold mb-4 dark:text-white">APR: {apr}%</h3>

      {/* Stake Amount Input */}
      <div className="space-y-2 mb-6">
        <label className="block text-sm font-medium dark:text-gray-400">
          Stake Amount
        </label>
        <input
          type="number"
          min={0}
          value={stakeAmount}
          onChange={(e) => setStakeAmount(Number(e.target.value))}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 px-4 py-2 text-text-dark dark:text-text-light focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <input
          type="range"
          min={1}
          max={5000}
          step={50}
          value={stakeAmount}
          onChange={(e) => setStakeAmount(Number(e.target.value))}
          className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer"
        />
      </div>

      {/* Duration Input */}
      <div className="space-y-2 mb-6">
        <label className="block text-sm font-medium dark:text-gray-400">
          Duration: {duration} days
        </label>
        <input
          type="range"
          min={7}
          max={365}
          step={1}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer"
        />
      </div>

      {/* Earnings Summary */}
      <div className="text-sm space-y-1 dark:text-gray-300">
        <p>In 7 days: {calculateEarnings(7).toFixed(2)} TON</p>
        <p>In 30 days: {calculateEarnings(30).toFixed(2)} TON</p>
        <p>In 365 days: {calculateEarnings(365).toFixed(2)} TON</p>
        <p className="mt-2 text-base font-medium text-accent">
          In {duration} days: {calculateEarnings(duration).toFixed(2)} TON
        </p>
      </div>
    </div>
  );
}
