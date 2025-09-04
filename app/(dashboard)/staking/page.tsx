'use client';
import { useState, useMemo, useEffect } from 'react';
import { useTonAddress, useTonConnectUI, useIsConnectionRestored } from '@tonconnect/ui-react';
import { useStakeStore } from '@/lib/store';
import DashboardStats from '@/components/DashboardStats';
import { PLANS, type Plan } from '@/components/Plans'; // ⬅️ используем готовые
import { StakeModal } from '@/components/StakeModal';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
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
    <main className="min-h-screen  text-white" //px-4 py-10
    >
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

<div className="grid md:grid-cols-2 gap-8 items-start">
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

          {/* Правая половина: карточка Daily Income */}{/* Правая половина: карточка Daily Income */}
<div className="relative w-full max-w-[620px] overflow-hidden rounded-[28px]
                aspect-[625/420] md:aspect-[640/420]">
  {/* Фон — немного уменьшен и полностью внутри рамки */}
  <Image
    src="/staking/daily-bg.svg"
    alt=""
    fill
    priority
    className="pointer-events-none select-none object-contain transform-gpu
               scale-[1.18] md:scale-[1.25] origin-center top-0"
  />

  {/* Контент (всё лежит на фоне, нижняя граница выше) */}
  <div className="absolute inset-[5%] z-10 flex flex-col  md:py-20 md:mx-15">
    {/* APR бейдж — оставил как был, ты подправишь при желании */}
    <div className="absolute right-0 top-0 rounded-xl bg-white text-[#0A6CFF]
                    font-bold leading-none text-[18px] md:text-2xl py-1 px-3 md:py-2 md:ml-[12px] md:px-4 shadow">
      {apr}%
    </div>

    <h3 className="text-lg md:text-xl font-semibold leading-tight mb-1.5 mt-1.5">Daily Income</h3>

    <p className="font-bold mb-0.5 text-[24px] md:text-[36px]">
      ${(dailyIncomeTon * TON_PRICE).toFixed(2)}
    </p>

    <p className="font-semibold leading-tight text-[13px] md:text-[16px] mb-2"// text-[#00C2FF]
    >
      {dailyIncomeTon.toFixed(2)} TON
    </p>

    <p className="mt-auto md:mb-12 text-[11px] text-[20px] pb-6 md:pb-12 mb:py-15 md:text-sm leading-snug text-blue-50/90 max-w-[38rem]">
      TonStake.ai automates your income — over $2 million TON is already making a
      profit on our algorithms. Start with 10 TON and watch your capital grow!
    </p>

    {/* монетка — без выхода за низ */}
    <Image
      src="/decorative/ton22.svg"
      alt=""
      width={138}
      height={138}
      className="pointer-events-none select-none absolute right-4 bottom-1 md:right-8 md:bottom-2"
    />
  </div>
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
