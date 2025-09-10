'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useStakeStore, StakeRecord } from '@/lib/store';
import { StakeModal } from '@/components/StakeModal';
import GoToStakingButton from '@/components/GoToStakingButton';
import ProfileTop from '@/components/ProfileTop';
import {useTonPrice} from '@/lib/hooks/useTonPrice'
import { motion } from "framer-motion";
import Image from "next/image"
import {
  //actualProfit,
  dailyIncomeActive,
  totalEarnedSoFar,
  //isMature,
  balanceActive,
  //displayStatus
} from "@/lib/earnings";
// если есть реальный прайс — подставишь сюда
const TON_PRICE = 3.0;

type Plan = { id: number; label: string; apr: number; min: number };

const PLANS: Plan[] = [
  { id: 0, label: 'Basic',   apr: 4,  min: 1    },
  { id: 1, label: 'Pro',     apr: 7,  min: 1000 },
  { id: 2, label: 'Premium', apr: 10, min: 2000 },
];

export default function ProfilePage() {
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const addStake = useStakeStore(s => s.addStake);

  // состояние калькулятора
  const [amount, setAmount] = useState<number>(PLANS[0].min);
  const [days, setDays]     = useState<number>(30);
  const [planId, setPlanId] = useState<number>(0);

  // модалка подтверждения
  const [open, setOpen]     = useState(false);

  // авто-подбор плана по сумме
  useEffect(() => {
    const auto = PLANS.filter(p => amount >= p.min).pop();
    if (auto && auto.id !== planId) setPlanId(auto.id);
  }, [amount]);

  const apr = PLANS[planId].apr;

  // математика
  const dailyTon   = useMemo(() => amount * (apr / 100), [amount, apr]); // по макету — без деления на 365
  const weekTon    = dailyTon * 7;
  const dailyUsd   = dailyTon * TON_PRICE;

  // получаем историю из стора
  const history = useStakeStore((s) => s.history as StakeRecord[]);

  // курс TON -> USD
  const priceUsd = useTonPrice();

  // 1) Всего застейкано
  const totalStaked = useMemo(
    () => history.reduce((sum, item) => sum + item.amount, 0),
    [history]
  );



  // для DashboardStats используем текущий депозит как totalStaked
  //const deposit = totalStaked;

    const earnedNow = useMemo(() => totalEarnedSoFar(history), [history]);



  
// было: dailyIncome: useMemo(... активные ... /365, 0)
// стало: сумма дневных доходов по активным (apr — дневной %)
const dailyIncome = useMemo(() => dailyIncomeActive(history), [history]);
const balance = useMemo(() => balanceActive(history), [history]);

  const onStake = () => {
    if (!address) return tonConnectUI.openModal();
    setOpen(true);
  };

  return (
    <main className="min-h-screen px-4 md:px-6 lg:px-8 py-10 text-white relative isolate ">


<motion.h1
        className="text-3xl font-bold py-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Мой профиль
      </motion.h1>

      {/* НОВЫЙ верхний блок */}
      <ProfileTop
        balanceTon={balance}
        dailyIncomeTon={dailyIncome}
        totalIncomeTon={earnedNow}
        priceUsd={priceUsd}
      />



      {/* ====== Add to staking (calculator + daily income) ====== */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Add to staking</h2>

        <div className="grid md:grid-cols-[1.2fr,0.8fr] gap-6 md:gap-8">
          {/* ==== КАЛЬКУЛЯТОР ==== */}
          <div className="relative rounded-[22px] border border-sky-600/40 bg-[#0a1c3b]/70 p-5 md:p-6">
            {/* свечение по периметру */}
            <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-sky-400/20" />
            <div className="pointer-events-none absolute -inset-2 rounded-[28px] bg-sky-500/10 blur-2xl" />

            {/* верхняя строка value + TON иконка */}
            <div className="flex items-center justify-between bg-white/5 rounded-2xl px-5 py-3 mb-4 md:mb-5">
              <div className="text-2xl font-semibold">{amount}</div>
              <div className="text-sky-300 font-semibold">TON</div>
            </div>

            {/* слайдер суммы */}
            <input
              type="range"
              min={1}
              max={5000}
              step={1}
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              className="w-full ton-range mb-5"
            />

            {/* дни */}
            <div className="flex items-center justify-between bg-white/5 rounded-2xl px-5 py-3 mb-4 md:mb-5">
              <div className="text-2xl font-semibold">{days}</div>
              <div className="text-sky-300 font-semibold">Days</div>
            </div>

            {/* слайдер дней */}
            <input
              type="range"
              min={7}
              max={365}
              step={1}
              value={days}
              onChange={e => setDays(Number(e.target.value))}
              className="w-full ton-range mb-6"
            />

            {/* мини-карточки дохода */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-5">
              {[
                { k: 'Per day',    v: dailyTon },
                { k: 'In 24 hours',v: dailyTon },
                { k: 'In 7 days',  v: weekTon  },
              ].map(({k, v}) => (
                <div key={k} className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center">
                  <div className="text-xs text-sky-200/80">{k}</div>
                  <div className="text-base md:text-lg font-semibold">+ {v.toFixed(2)} TON</div>
                </div>
              ))}
            </div>
{/**
            <button
              onClick={onStake}
              className="w-full md:w-auto md:ml-auto block rounded-xl px-6 py-3 bg-gradient-to-r from-sky-600 to-sky-400 shadow-[0_10px_30px_rgba(6,173,252,0.25)] hover:brightness-110 transition"
            >
              Stake Now
            </button> */}
          </div>

          {/* ==== DAILY INCOME CARD ==== */}
          <div className="relative rounded-[22px] border border-sky-600/40 bg-[#0a1c3b]/70 p-5 md:p-6 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-sky-400/20" />
            <div className="pointer-events-none absolute -inset-2 rounded-[28px] bg-sky-500/10 blur-2xl" />

            <div className="absolute right-4 top-4 bg-sky-400 text-[#0a1730] font-bold text-xl px-3 py-1 rounded-xl">
              {apr}%
            </div>

            <h3 className="text-xl font-semibold mb-2">Daily Income</h3>
            <div className="text-3xl font-bold mb-1">${dailyUsd.toFixed(2)}</div>
            <div className="text-sm text-sky-200/90 mb-4">{dailyTon.toFixed(2)} TON</div>

            <p className="text-sm text-sky-100/80 leading-relaxed">
              TonStake.ai automates your income — over $2 million TON is already making a profit on our algorithms.
              Start with 10 TON and watch your capital grow!
            </p>

            {/* декоративная монета */}
            <img
              src="/decorative/ton22.svg"
              alt=""
              className="pointer-events-none select-none absolute -right-2 -bottom-3 w-28 opacity-90"
            />
          </div>
        </div>
      </section>

      {/* модалка подтверждения */}
      <StakeModal
        open={open}
        amount={amount}
        validator={PLANS[planId].label}
        onClose={() => setOpen(false)}
        onConfirm={(txHash) => {
          addStake({
            validator: PLANS[planId].label,
            wallet: address!,
            amount,
            apr: PLANS[planId].apr,
            duration: days,
            txHash,
          });
          setOpen(false);
        }}
      />

      {/* запасная CTA под блоком (можно удалить) */}
      <div className="mt-10">
        <GoToStakingButton className="btn-primary bg-gradient-to-r from-sky-600 to-sky-400 px-6 py-3 rounded-xl">
          Go to staking
        </GoToStakingButton>
      </div>
    </main>
  );
}
