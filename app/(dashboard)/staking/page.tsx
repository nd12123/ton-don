'use client';

import { useState, useEffect, useMemo } from 'react';
import { useStakeStore } from '@/lib/store';
import { StakeModal } from '@/components/StakeModal';
import { Button } from '@/components/ui/button';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';

// заглушка для стоимости TON в долларах
const TON_PRICE = 3.0;

export default function StakingPage() {
  const address = useTonAddress();                     // строка вида "EQCx…"
  const [tonConnectUI] = useTonConnectUI();            // для открытия модалки подключения
  const addStake = useStakeStore((s) => s.addStake);

  // параметры тарифов (проценты в день и минимальные суммы)
  const PLANS = [
    { id: 0, label: 'Basic', apr: 4, min: 1 },
    { id: 1, label: 'Pro', apr: 7, min: 1000 },
    { id: 2, label: 'Premium', apr: 10, min: 2000 },
  ];

  // выбранный тариф и сумма/срок
  const [selectedPlanId, setSelectedPlanId] = useState(0);
  const [stakeAmount, setAmount] = useState(PLANS[0].min);
  const [duration, setDuration] = useState(30);
  const [modalOpen, setModalOpen] = useState(false);

  // когда пользователь вводит сумму, автоматически выбираем подходящий тариф
  useEffect(() => {
    const auto = PLANS.filter((p) => stakeAmount >= p.min).pop();
    if (auto && auto.id !== selectedPlanId) {
      setSelectedPlanId(auto.id);
    }
  }, [stakeAmount]);

  // рассчитываем доходность
  const apr = PLANS[selectedPlanId].apr;
  const dailyEarnings = useMemo(
    () => (stakeAmount * (apr / 100)), // / 365
    [stakeAmount, apr]
  );
  const weeklyEarnings = dailyEarnings * 7;

  // обработчик отправки стейка (открывает модалку или модальное окно подключения)
  const handleStakeClick = () => {
    if (!address) {
      tonConnectUI.openModal();
      return;
    }
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen px-4 py-10 text-white">
      {/* Заголовок страницы */}
      <h1 className="text-4xl font-bold mb-8">Profile</h1>

      {/* === Блок со стейкингом (баланс, доходы) === */}
      <section className="mb-12">
        <div className="rounded-3xl border border-blue-700 bg-[#001E3C]/60 p-8 relative">
          <h2 className="text-2xl font-semibold mb-6">Staking</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Balance */}
            <div className="rounded-xl border border-blue-600 bg-[#012c53]/80 p-4">
              <p className="text-xs uppercase mb-1 text-blue-300">Balance</p>
              <p className="text-2xl font-semibold">{stakeAmount} TON</p>
              <p className="text-xs text-blue-400">
                ≈ ${(stakeAmount * TON_PRICE).toFixed(2)}
              </p>
            </div>
            {/* Daily income */}
            <div className="rounded-xl border border-blue-600 bg-[#012c53]/80 p-4">
              <p className="text-xs uppercase mb-1 text-blue-300">Daily income</p>
              <p className="text-2xl font-semibold">
                {dailyEarnings.toFixed(2)} TON
              </p>
              <p className="text-xs text-blue-400">
                ≈ ${(dailyEarnings * TON_PRICE).toFixed(2)}
              </p>
            </div>
            {/* Total income (заглушка) */}
            <div className="rounded-xl border border-blue-600 bg-[#012c53]/80 p-4">
              <p className="text-xs uppercase mb-1 text-blue-300">Total income</p>
              <p className="text-2xl font-semibold">
                {(stakeAmount + dailyEarnings).toFixed(2)} TON
              </p>
              <p className="text-xs text-blue-400">
                ≈ ${(stakeAmount + dailyEarnings) * TON_PRICE}
              </p>
            </div>
          </div>

          {/* Asset value + кнопка подключения */}
          <div className="border border-blue-700 rounded-xl bg-[#012c53]/50 p-6 flex items-center justify-between">
            <div>
              <p className="uppercase text-xs mb-1 text-blue-300">
                Asset value <span className="italic text-[10px]">(updated hourly)</span>
              </p>
              <p className="text-2xl font-semibold">
                {address ? `${stakeAmount} TON` : '—'}
              </p>
            </div>
            <Button onClick={() => (!address ? tonConnectUI.openModal() : null)}>
              {address ? 'Connected' : 'Connect Wallet'}
            </Button>
          </div>
        </div>
      </section>

      {/* === Блок добавления стейка === */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Add to staking</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Левая половина: слайдеры и предварительные расчёты */}
          <div className="rounded-3xl border border-blue-700 bg-[#001E3C]/60 p-6">
            <div className="mb-4">
              <label className="block text-sm mb-2">Amount</label>
              <input
                type="range"
                min={1}
                max={5000}
                step={1}
                value={stakeAmount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-right text-sm mt-1">{stakeAmount} TON</div>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Days</label>
              <input
                type="range"
                min={7}
                max={365}
                step={1}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-right text-sm mt-1">{duration} days</div>
            </div>

            {/* Предварительный прогноз дохода */}
            <div className="grid grid-cols-3 text-center mt-4 gap-2">
              <div>
                <p className="text-xs text-blue-300">Per day</p>
                <p className="font-semibold">
                  +{dailyEarnings.toFixed(2)} TON
                </p>
              </div>
              <div>
                <p className="text-xs text-blue-300">In 24 hours</p>
                <p className="font-semibold">
                  +{dailyEarnings.toFixed(2)} TON
                </p>
              </div>
              <div>
                <p className="text-xs text-blue-300">In 7 days</p>
                <p className="font-semibold">
                  +{weeklyEarnings.toFixed(2)} TON
                </p>
              </div>
            </div>

            <Button
              onClick={handleStakeClick}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600"
            >
              Stake Now
            </Button>
          </div>

          {/* Правая половина: карточка Daily Income */}
          <div className="relative rounded-3xl border border-blue-700 bg-[#001E3C]/60 p-6 flex flex-col">
            <div className="absolute right-4 top-4 bg-blue-700 text-white py-1 px-2 rounded-md">
              {apr}%
            </div>
            <h3 className="text-xl font-semibold mb-2">Daily Income</h3>
            <p className="text-3xl font-bold mb-2">
              ${(dailyEarnings * TON_PRICE).toFixed(2)}
            </p>
            <p className="text-sm mb-4">
              {dailyEarnings.toFixed(2)} TON
            </p>
            <p className="text-xs text-blue-300">
              TonStake.ai automates your income — over $2 million TON is already
              making a profit on our algorithms. Start with 10 TON and watch your
              capital grow!
            </p>
          </div>
        </div>
      </section>

      {/* модальное окно подтверждения */}
      <StakeModal
        open={modalOpen}
        amount={stakeAmount}
        validator={PLANS[selectedPlanId].label}
        onClose={() => setModalOpen(false)}
        onConfirm={(txHash) => {
          console.log('🟢 [Page] received txHash:', txHash);
          addStake({
            validator: PLANS[selectedPlanId].label,
            wallet: address!,
            amount: stakeAmount,
            apr: PLANS[selectedPlanId].apr,
            duration,
            txHash,
          });
          setModalOpen(false);
        }}
      />
    </main>
  );
}
