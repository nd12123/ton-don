'use client';

import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import ConnectWalletButton from '@/components/ConnectWalletButton';
import { Wallet, TrendingUp, PiggyBank, Coins } from 'lucide-react';

function ton(v = 0) {
  return `${Number(v || 0).toFixed(2)} TON`;
}
function usd(v = 0, price = 0) {
  return `≈ $${(Number(v || 0) * Number(price || 0)).toFixed(2)}`;
}

export default function ProfileTop({
  balanceTon = 0,
  dailyIncomeTon = 0,
  totalIncomeTon = 0,
  priceUsd = 0,
}) {
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI(); // оставил — вдруг пригодится

  return (
    <section
      className="
        relative overflow-hidden rounded-[24px]
        border border-white/10 bg-[#091634]/70 p-5 md:p-6
        shadow-[0_20px_60px_rgba(0,194,255,0.12)]
      "
    >
      {/* мягкая подсветка всего блока */}
      <div className="pointer-events-none absolute -inset-24 -z-10">
        <div className="h-full w-full bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(0,194,255,0.28),transparent_60%)]" />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Staking</h2>

      {/* 3 метрики */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Balance */}
        <div className="group relative rounded-2xl border border-sky-400/25 bg-white/5 p-4 overflow-hidden">
          {/* микроподсветка карточки */}
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute -inset-8 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(0,194,255,0.15),transparent_70%)]" />
          </div>

          <div className="flex items-center gap-3 mb-1">
            <div className="grid place-items-center h-9 w-9 rounded-lg bg-white/10 ring-1 ring-white/15">
              <Wallet className="h-5 w-5 text-sky-300" />
            </div>
            <p className="text-xs uppercase tracking-wide text-sky-300/90">Balance</p>
          </div>

          <div className="text-2xl font-semibold text-sky-400">{ton(balanceTon)}</div>
          <div className="text-xs text-sky-200/80">{usd(balanceTon, priceUsd)}</div>
        </div>

        {/* Daily income */}
        <div className="group relative rounded-2xl border border-sky-400/25 bg-white/5 p-4 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute -inset-8 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(16,185,129,0.15),transparent_70%)]" />
          </div>

          <div className="flex items-center gap-3 mb-1">
            <div className="grid place-items-center h-9 w-9 rounded-lg bg-white/10 ring-1 ring-white/15">
              <TrendingUp className="h-5 w-5 text-emerald-300" />
            </div>
            <p className="text-xs uppercase tracking-wide text-emerald-300/90">Daily income</p>
          </div>

          <div className="text-2xl font-semibold text-emerald-400">
            +{ton(dailyIncomeTon)}
          </div>
          <div className="text-xs text-emerald-200/80">{usd(dailyIncomeTon, priceUsd)}</div>
        </div>

        {/* Total income */}
        <div className="group relative rounded-2xl border border-sky-400/25 bg-white/5 p-4 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute -inset-8 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(139,92,246,0.16),transparent_70%)]" />
          </div>

          <div className="flex items-center gap-3 mb-1">
            <div className="grid place-items-center h-9 w-9 rounded-lg bg-white/10 ring-1 ring-white/15">
              <PiggyBank className="h-5 w-5 text-violet-300" />
            </div>
            <p className="text-xs uppercase tracking-wide text-violet-300/90">Total income</p>
          </div>

          <div className="text-2xl font-semibold text-violet-400">
            {ton(totalIncomeTon)}
          </div>
          <div className="text-xs text-violet-200/80">{usd(totalIncomeTon, priceUsd)}</div>
        </div>
      </div>

      {/* Asset value + connect */}
      <div
        className="
          mt-5 md:mt-6 rounded-2xl border border-sky-400/25 bg-white/5
          px-4 py-4 flex items-center justify-between gap-3
        "
      >
        <div className="flex items-center gap-3">
          <div className="grid place-items-center h-9 w-9 rounded-lg bg-white/10 ring-1 ring-white/15">
            <Coins className="h-5 w-5 text-sky-300" />
          </div>
          <div>
            <p className="uppercase text-[10px] tracking-wide text-sky-300/90">
              Asset value <span className="italic text-[10px] opacity-80">updated hourly</span>
            </p>
            <p className="text-xl font-semibold text-sky-400">{ton(balanceTon)}</p>
          </div>
        </div>

        {address ? (
          <div className="text-sky-300/90 text-sm px-4 py-2 rounded-xl border border-sky-400/30">
            Connected
          </div>
        ) : (
          <div className="shrink-0">
            <ConnectWalletButton />
          </div>
        )}
      </div>
    </section>
  );
}
