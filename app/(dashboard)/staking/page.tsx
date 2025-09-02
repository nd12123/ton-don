'use client';
import { useState, useMemo, useEffect } from 'react';
import { useTonAddress, useTonConnectUI, useIsConnectionRestored } from '@tonconnect/ui-react';
import { useStakeStore } from '@/lib/store';
import DashboardStats from '@/components/DashboardStats';
import { PLANS, type Plan } from '@/components/Plans'; // ⬅️ используем готовые
import { StakeModal } from '@/components/StakeModal';
import { Button } from '@/components/ui/button';

import {
  balanceActive,
  dailyIncomeActive,
  totalEarnedSoFar,
} from '@/lib/earnings';
// если нужен реальный курс — подключи свой хук, тут просто заглушка:
const TON_PRICE = 3;

export default function StakingPage() {
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const addStake = useStakeStore((s) => s.addStake);

// внутри компонента:
const restored = useIsConnectionRestored();
const fetchHistory = useStakeStore(s => s.fetchHistory);

  // калькулятор
  const [amount, setAmount] = useState<number>(PLANS[0].min);
  const [duration, setDuration] = useState<number>(30);
  const [open, setOpen] = useState(false);

  // выбираем план по сумме (учитываем min/max)
  const selectedPlan: Plan = useMemo(() => {
    const byAmount =
      PLANS.find(p => amount >= p.min && (p.max == null || amount <= p.max)) || PLANS[0];
    return byAmount;
  }, [amount]);

  const apr = selectedPlan.apr;
  const dailyTon = useMemo(() => amount * (apr / 100), [amount, apr]);

  // производные значения для статистики
  const dailyIncomeTon = useMemo(() => amount * (apr / 100), [amount, apr]);
  const totalIncomeTon = useMemo(() => dailyIncomeTon * duration, [dailyIncomeTon, duration]);

  // deposit/balance для шапки (под калькулятор)
  const deposit = amount;
  const balanceTon = amount;

// 1) первичная загрузка истории (и при смене адреса)
useEffect(() => {
  if (!restored || !address) return;
  // опционально очистить прошлые данные, чтобы исключить «наслоения»
  useStakeStore.setState({ history: [], loading: true });
  fetchHistory(address);
}, [restored, address, fetchHistory]);

// 2) рефетч при возврате на вкладку/страницу
useEffect(() => {
  const onFocus = () => { if (address) fetchHistory(address); };
  window.addEventListener('focus', onFocus);
  document.addEventListener('visibilitychange', onFocus);
  return () => {
    window.removeEventListener('focus', onFocus);
    document.removeEventListener('visibilitychange', onFocus);
  };
}, [address, fetchHistory]);


  // ===== базовые метрики пользователя из истории =====
  const history = useStakeStore(s => s.history); // as StakeRecord[]
  const baseBalanceTon = useMemo(() => balanceActive(history), [history]);
  const baseDailyIncomeTon = useMemo(() => dailyIncomeActive(history), [history]);
  const baseTotalIncomeTon = useMemo(() => totalEarnedSoFar(history), [history]);
  const baseDeposit = useMemo(
    () => history.filter(h => h.status === 'active').reduce((s, r) => s + r.amount, 0),
    [history]
  );

  // ===== предпросмотр (база + калькулятор) =====
  const previewBalanceTon      = baseBalanceTon      + amount;
  const previewDailyIncomeTon  = baseDailyIncomeTon  + dailyTon;
  const previewTotalIncomeTon  = baseTotalIncomeTon  + dailyTon * duration;
  const previewDeposit         = baseDeposit         + amount;

  const handleStakeClick = () => {
    if (!address) return tonConnectUI.openModal();
    setOpen(true);
  };

  return (
    <main className="min-h-screen px-4 py-10 text-white">
      <h1 className="text-4xl font-bold mb-8">Stats after stake</h1>

      {/* ВЕРХНЯЯ СТАТИСТИКА — показывает "как станет" с учётом текущего ввода */}
      <DashboardStats
        balanceTon={previewBalanceTon}
        dailyIncomeTon={previewDailyIncomeTon}
        totalIncomeTon={previewTotalIncomeTon}
        priceUsd={3}            // подставь свой хук, если нужен реальный курс
        deposit={previewDeposit}
        plans={PLANS}
      />

      {/* ——— КАЛЬКУЛЯТОР ——— */}
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
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-right text-sm mt-1">{amount} TON</div>
              <div className="text-xs text-blue-300 mt-1">
                Plan: <b>{selectedPlan.name}</b> ({selectedPlan.range})
              </div>
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

            {/* Предпросчёт */}
            <div className="grid grid-cols-3 text-center mt-4 gap-2">
              <div>
                <p className="text-xs text-blue-300">Per day</p>
                <p className="font-semibold">+{dailyIncomeTon.toFixed(2)} TON</p>
              </div>
              <div>
                <p className="text-xs text-blue-300">In 24 hours</p>
                <p className="font-semibold">+{dailyIncomeTon.toFixed(2)} TON</p>
              </div>
              <div>
                <p className="text-xs text-blue-300">In 7 days</p>
                <p className="font-semibold">+{(dailyIncomeTon * 7).toFixed(2)} TON</p>
              </div>
            </div>

            <Button onClick={handleStakeClick} className="mt-4 w-full bg-blue-500 hover:bg-blue-600">
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
              ${(dailyIncomeTon * TON_PRICE).toFixed(2)}
            </p>
            <p className="text-sm mb-4">{dailyIncomeTon.toFixed(2)} TON</p>
            <p className="text-xs text-blue-300">
              TonStake.ai automates your income — over $2 million TON is already making a
              profit on our algorithms. Start with 10 TON and watch your capital grow!
            </p>
          </div>
        </div>
      </section>

      {/* модалка подтверждения */}
      <StakeModal
        open={open}
        amount={amount}
        validator={selectedPlan.name}
        onClose={() => setOpen(false)}
        onConfirm={(txHash) => {
          addStake({
            validator: selectedPlan.name,
            wallet: address!,
            amount,
            apr: selectedPlan.apr,
            duration,
            txHash,
          });
          setOpen(false);
          fetchHistory(address!); // <- досинхронизируемся с бэком
        }}
      />
    </main>
  );
}
