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
        <h2 className="text-4xl font-bold mb-6 mt-6 md:mb-2 md:mt-2">Add to staking</h2>

<div className="grid md:grid-cols-2 gap-8 items-start">
{/* ЛЕВАЯ половина: калькулятор в стиле главной */}
<div className="relative rounded-[28px] p-4 md:p-6
                bg-[#0B1A34]/80 ring-1 ring-sky-300/40
                shadow-[0_22px_80px_rgba(0,194,255,0.28)]
                overflow-hidden">

  {/* мягкое внешнее свечение карточки */}
  <div
    aria-hidden
    className="pointer-events-none absolute -inset-6 rounded-[36px] -z-10"
    style={{
      background:
        'radial-gradient(120% 100% at 50% 0%, rgba(0,194,255,.28) 0%, rgba(0,194,255,0) 65%)'
    }}
  />
            <div className="mb-4">
              <label className="block text-sm mb-2">Amount</label>
              {/* пилл со вводом + TON-иконкой */}
  <div className="flex items-center gap-3
                  rounded-2xl px-4 py-3
                  bg-gradient-to-r from-[#163B57] via-[#1B4F74] to-[#1D5E86]
                  ring-1 ring-white/10">
    <input
      type="number"
      value={amount}
      min={10}
      max={5000}
      onChange={(e) => setAmount(Number(e.target.value))}
      className="flex-1 bg-transparent text-white font-semibold
                 text-lg md:text-xl tracking-tight outline-none
                 [appearance:textfield]
                 [&::-webkit-outer-spin-button]:appearance-none
                 [&::-webkit-inner-spin-button]:appearance-none"
      inputMode="numeric"
    />
    <Image
      src="/decorative/favicon.svg"
      alt="TON"
      width={24}
      height={24}
      className="shrink-0"
    />
  </div>

              <input
                type="range"
                min={10}
                max={5000}
                step={1}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-blue-300 mt-1">
                Plan: <b>{selectedPlan.name}</b> ({selectedPlan.range})
              </div>
            </div>

           <div className="mb-4">
<label className="block text-sm mb-2">Days</label>

<div className="flex items-center gap-3
                rounded-2xl px-4 py-3
                bg-gradient-to-r from-[#163B57] via-[#1B4F74] to-[#1D5E86]
                ring-1 ring-white/10">
  <input
    type="number"
    value={duration}
    min={7}
    max={365}
    onChange={(e) => setDuration(Number(e.target.value))}
    className="w-[84px] mr-auto bg-transparent text-white font-semibold
               text-lg md:text-xl tracking-tight outline-none tabular-nums
               text-left px-0
               [appearance:textfield]
               [&::-webkit-outer-spin-button]:appearance-none
               [&::-webkit-inner-spin-button]:appearance-none"
    inputMode="numeric"
  />
  <span className="text-white/85 font-medium">Days</span>
</div>


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


{/* Предпросчёт — оверлей-пилюля + кнопка */}
<div className="mt-4 flex flex-row flex-nowrap items-center gap-2 sm:gap-3 md:gap-4 w-full">
  {/* внешнее glow */}
  <div
    aria-hidden
    className="pointer-events-none absolute -inset-2 rounded-[18px] blur-xl opacity-50"
    style={{
      background:
        "radial-gradient(70% 120% at 50% 0%, rgba(0,194,255,.45) 0%, rgba(0,194,255,0) 70%)",
    }}
  />

  {/* сама «пилюля» */}
  <div className="relative flex-1 min-w-0 rounded-[18px] px-3 md:px-4 py-2 md:py-2.5 
                  bg-[linear-gradient(180deg,#2BD2FF_0%,#0DA5F2_100%)]
                  ring-1 ring-white/25
                  shadow-[0_14px_40px_rgba(0,174,255,0.35)]">

    {/* тонкая внутренняя обводка */}
    <div className="pointer-events-none absolute inset-0 rounded-[18px] ring-1 ring-white/15" />

    {/* вертикальные разделители с плавным фейдом */}
    <div className="pointer-events-none absolute inset-y-1 left-1/3 w-px opacity-70"
         style={{background:"linear-gradient(to bottom,transparent,rgba(255,255,255,.7),transparent)"}} />
    <div className="pointer-events-none absolute inset-y-1 left-2/3 w-px opacity-70"
         style={{background:"linear-gradient(to bottom,transparent,rgba(255,255,255,.7),transparent)"}} />

    {/* контент */}
    <div className="grid grid-cols-3 text-center items-center">
      {/* 1) Per day — самый яркий */}
      <div className="py-1">
        <div className="text-[11px] md:text-xs font-semibold text-white">In 24 hours</div>
        <div className="mt-0.5 md:mt-1 text-base md:text-lg font-extrabold text-white">
          +{dailyIncomeTon.toFixed(2)} <span className="opacity-90">TON</span>
        </div>
      </div>

      {/* 2) In 24 hours — чуть приглушён */}
      <div className="py-1 text-white/85">
        <div className="text-[11px] md:text-xs font-semibold">In 7 days</div>
        <div className="mt-0.5 md:mt-1 text-base md:text-lg font-extrabold">
          +{(dailyIncomeTon* 7).toFixed(2)} <span className="opacity-90">TON</span>
        </div>
      </div>

      {/* 3) In 7 days — ещё тише */}
      <div className="py-1 text-white/70">
        <div className="text-[11px] md:text-xs font-semibold">In {duration} days</div>
        <div className="mt-0.5 md:mt-1 text-base md:text-lg font-extrabold">
          +{(dailyIncomeTon * duration).toFixed(2)} <span className="opacity-90">TON</span>
        </div>
      </div>
    </div>
  </div>
  {/* ---- КНОПКА «Stake Now» справа (как на скрине) ---- */}
  <div className="relative shrink-0 md:self-center">
    {/* яркое внешнее свечение */}
    <div
      aria-hidden
      className="absolute -inset-4 rounded-[24px] blur-2xl opacity-90"
      style={{
        background:
          "radial-gradient(70% 120% at 50% 100%, rgba(0,174,255,.65) 0%, rgba(0,174,255,0) 70%)",
      }}
    />
    <button
      type="button"
      onClick={handleStakeClick}
      className="relative z-10 h-12 md:h-[56px] px-6 md:px-7
                 rounded-[16px] text-white font-semibold
                 bg-[linear-gradient(180deg,#30C4FF_0%,#139CF0_100%)]
                 ring-1 ring-white/25 shadow-[0_12px_32px_rgba(0,174,255,.45)]
                 hover:brightness-110 active:translate-y-[1px] transition"
    >
      <span className="inline-flex items-center gap-2">
        Stake Now
        <svg
          className="w-4 h-4 opacity-90"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </span>

      {/* мягкий внутренний хайлайт */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[16px] ring-1 ring-white/20 opacity-80"
        style={{
          background:
            "radial-gradient(140% 180% at 50% -30%, rgba(255,255,255,.45) 0%, rgba(255,255,255,0) 40%)",
        }}
      />
    </button>
    </div>
</div>
{/**
            <Button onClick={handleStakeClick} className="mt-4 w-full bg-blue-500 hover:bg-blue-600">
              Stake Now
            </Button> */}
          </div>

<div
  className="relative w-full max-w-[620px] overflow-hidden rounded-[28px]
             aspect-[625/420] md:aspect-[640/420]">
  {/* Фон внутри контейнера: заполняет форму и масштабируется */}
  <Image
    src="/staking/daily-bg.svg"
    alt=""
    fill
    priority
    className="
 mt-9
       pointer-events-none select-none
      rounded-[inherit]           /* повторяем радиус контейнера */
      object-cover                /* заполняем всю карточку без «пустых полей» */
      will-change-transform
    "
    style={{
      transform: 'scale(1.22)',   /* зум подгони под вкус: 1.1–1.35 */
      transformOrigin: '50% 55%', /* центр/смещение фокуса при зуме */
    }}
  />

  {/* Контент (всё лежит на фоне, нижняя граница выше) */}
  <div className="absolute inset-[3%] z-10 flex flex-col  md:py-8 md:mx-24">
    {/* APR бейдж — оставил как был, ты подправишь при желании */}
    <div className="absolute right-0 top-[10px] rounded-xl bg-white text-[#0A6CFF]
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
      className="pointer-events-none select-none absolute right-4 bottom-1 md:right-2 md:bottom-2"
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
