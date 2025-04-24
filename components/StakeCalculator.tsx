"use client";
export default function StakeCalculator({
    stakeAmount,
    setStakeAmount,
    duration,
    setDuration,
  }: {
    stakeAmount: number;
    setStakeAmount: (value: number) => void;
    duration: number;
    setDuration: (value: number) => void;
  }) {
    const apr = 6.5;
  
    const earnings = (days: number) =>
      ((stakeAmount * (apr / 100)) / 365) * days;
  
    return (
<div className="border p-6 rounded-xl shadow-sm bg-white w-full space-y-4">
<h2 className="text-lg font-semibold mb-2">Калькулятор доходности</h2>
  
        {/* Ввод суммы */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Сумма вклада</label>
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(Number(e.target.value))}
            min={0}
            className="w-full px-4 py-2 rounded bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="range"
            min={100}
            max={5000}
            step={50}
            value={stakeAmount}
            onChange={(e) => setStakeAmount(Number(e.target.value))}
            className="w-full"
          />
        </div>
  
        {/* Срок */}
        <div>
          <label className="text-sm text-gray-600">
            Срок стейкинга: {duration} дней
          </label>
          <input
            type="range"
            min={7}
            max={365}
            step={1}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full"
          />
        </div>
  
        {/* Доходность */}
        <div className="text-sm text-gray-700 space-y-1 pt-2">
          <p>Доход за неделю: {earnings(7).toFixed(2)} TON</p>
          <p>Доход за месяц: {earnings(30).toFixed(2)} TON</p>
          <p>Доход за год: {earnings(365).toFixed(2)} TON</p>
          <p className="text-blue-600 font-medium">
            За выбранный срок: {earnings(duration).toFixed(2)} TON
          </p>
        </div>
      </div>
    );
  }
  