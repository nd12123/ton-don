'use client';

//import Image from 'next/image';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import ConnectWalletButton from '@/components/ConnectWalletButton';

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
  const [tonConnectUI] = useTonConnectUI();

  return (
    <section className="relative overflow-hidden rounded-[24px] border border-sky-500/30 bg-[#091634]/70 p-5 md:p-6">

      <h2 className="text-2xl font-semibold mb-4">Staking</h2>

      {/* 3 метрики */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="rounded-2xl border border-sky-400/25 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wide text-sky-300/90 mb-1">Balance</p>
          <div className="text-2xl font-semibold">{ton(balanceTon)}</div>
          <div className="text-xs text-sky-200/80">{usd(balanceTon, priceUsd)}</div>
        </div>

        <div className="rounded-2xl border border-sky-400/25 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wide text-sky-300/90 mb-1">Daily income</p>
          <div className="text-2xl font-semibold">{ton(dailyIncomeTon)}</div>
          <div className="text-xs text-sky-200/80">{usd(dailyIncomeTon, priceUsd)}</div>
        </div>

        <div className="rounded-2xl border border-sky-400/25 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wide text-sky-300/90 mb-1">Total income</p>
          <div className="text-2xl font-semibold">{ton(totalIncomeTon)}</div>
          <div className="text-xs text-sky-200/80">{usd(totalIncomeTon, priceUsd)}</div>
        </div>
      </div>

      {/* Asset value + connect */}
      <div className="mt-5 md:mt-6 rounded-2xl border border-sky-400/25 bg-white/5 px-4 py-4 flex items-center gap-3 justify-between">
        <div>
          <p className="uppercase text-[10px] tracking-wide text-sky-300/90">
            Asset value <span className="italic text-[10px] opacity-80">updated hourly</span>
          </p>
          <p className="text-xl font-semibold">{ton(balanceTon)}</p>
        </div>

        {address ? (
          <div className="text-sky-300/90 text-sm px-4 py-2 rounded-xl border border-sky-400/30">
            Connected
          </div>
        ) : (
          // если твой ConnectWalletButton сам открывает модалку — оставь его.
          // если нет — можно заменить на обычную кнопку и вызвать tonConnectUI.openModal()
          <div className="shrink-0">
            <ConnectWalletButton />
          </div>
        )}
      </div>
    </section>
  );
}
