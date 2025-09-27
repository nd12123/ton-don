"use client";

import { useState, useMemo, useEffect } from "react";
import { useTonAddress, useTonConnectUI, useIsConnectionRestored } from "@tonconnect/ui-react";
import { useStakeStore } from "@/lib/store";
import DashboardStats from "@/components/DashboardStats";
import { PLANS, type Plan } from "@/components/Plans";
//import { StakeModal } from "@/components/StakeModal";
import { StakeContractModal as StakeModal } from "@/components/StakeContractModal";
import Image from "next/image";
import { balanceActive, dailyIncomeActive, totalEarnedSoFar } from "@/lib/earnings";
import { useT } from "@/i18n/react";
import { useTonPrice } from "@/lib/hooks/useTonPrice";
import TrustWalletPay from "@/components/TrustWalletPay";


//const TON_PRICE = 3;

export default function StakingPage() {
  const price = useTonPrice();                     // <-- тянем цену TON
  const tonPrice = price > 0 ? price : 3;          // <-- мягкий фолбэк
  const isFallbackPrice = price <= 0;              // <-- флаг "цена по умолчанию"
  
  const t = useT("staking");

  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const restored = useIsConnectionRestored();
  const fetchHistory = useStakeStore((s) => s.fetchHistory);
  const addStake = useStakeStore((s) => s.addStake);

  const [amount, setAmount] = useState<number>(PLANS[0].min);
  const [duration, setDuration] = useState<number>(30);
  const [open, setOpen] = useState(false);

  const selectedPlan: Plan = useMemo(() => {
    return PLANS.find((p) => amount >= p.min && (p.max == null || amount <= p.max)) || PLANS[0];
  }, [amount]);

  const apr = selectedPlan.apr;
  const dailyTon = useMemo(() => amount * (apr / 100), [amount, apr]);

  useEffect(() => {
    if (!restored || !address) return;
    useStakeStore.setState({ history: [], loading: true });
    fetchHistory(address);
  }, [restored, address, fetchHistory]);

  useEffect(() => {
    const onFocus = () => {
      if (address) fetchHistory(address);
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [address, fetchHistory]);

  const history = useStakeStore((s) => s.history);
  const baseBalanceTon = useMemo(() => balanceActive(history), [history]);
  const baseDailyIncomeTon = useMemo(() => dailyIncomeActive(history), [history]);
  const baseTotalIncomeTon = useMemo(() => totalEarnedSoFar(history), [history]);
  const baseDeposit = useMemo(
    () => history.filter((h) => h.status === "active").reduce((s, r) => s + r.amount, 0),
    [history]
  );

  const previewBalanceTon = baseBalanceTon + amount;
  const previewDailyIncomeTon = baseDailyIncomeTon + dailyTon;
  const previewTotalIncomeTon =  dailyTon * duration; //baseTotalIncomeTon +
  const previewDeposit = baseDeposit + amount;

  const handleStakeClick = () => {
    if (!address) return tonConnectUI.openModal();
    setOpen(true);
  };

  // локализация плана/диапазона по ключу
  const planKey =
    (selectedPlan.name || "").toLowerCase() as "basic" | "pro" | "premium";
  const planLabel = t(`plans.${planKey}.label`);
  const planRange = t(`plans.${planKey}.range`);

  return (
    <main className="text-white min-h-screen pt-2 md:pt-6" //md:min-h-screen 
    >
      <h1 className="text-4xl text-center -mt-1 md:text-left  font-bold mb-8 md:mt-1">{t("titles.stats")}</h1>

      <DashboardStats
        balanceTon={previewBalanceTon}
        dailyIncomeTon={previewDailyIncomeTon}
        totalIncomeTon={previewTotalIncomeTon}
        priceUsd={tonPrice}
        deposit={previewDeposit}
        plans={PLANS}
        address = {address}
        // при желании: подписи из t("stats.*")
        // statsLabels={{
        //   balance: t("stats.balance"),
        //   dailyIncome: t("stats.dailyIncome"),
        //   totalIncome: t("stats.totalIncome"),
        //   assetValue: t("stats.assetValue"),
        // }}
      />

      <section>
        <h2 className="text-4xl font-bold text-center  md:text-left md:justify-left mb-6 mt-6 md:mb-5 md:mt-5">{t("titles.stake")}</h2>

{/* контейнер: на md+ две колонки: [левая = резиновая][правая = авто] */}
  <div className="grid gap-6 md:gap-10 items-start
                  md:grid-cols-[minmax(0,1fr)_auto]">      
                  {/* ЛЕВАЯ: растягиваемся по максимуму, допускаем ужимание */}
    <div className="min-w-0
                    relative rounded-[28px] p-4 md:p-6
                    bg-[#0B1A34]/80 ring-1 ring-sky-300/40
                    shadow-[0_22px_80px_rgba(0,194,255,0.28)]
                    overflow-hidden">
    
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-[36px] -z-10"
              style={{
                background:
                  "radial-gradient(120% 100% at 50% 0%, rgba(0,194,255,.28) 0%, rgba(0,194,255,0) 65%)",
              }}
            />

            {/* Amount */}
            <div className="mb-4">
              <label className="block text-sm mb-2">{t("inputs.amount")}</label>

              <div
                className="flex items-center gap-3
                           rounded-2xl px-4 py-3
                           bg-gradient-to-r from-[#163B57] via-[#1B4F74] to-[#1D5E86]
                           ring-1 ring-white/10"
              >
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
                <Image src="/decorative/favicon.svg" alt="TON" width={24} height={24} className="shrink-0" />
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
                {/* Plan: <b>{selectedPlan.name}</b> ({selectedPlan.range}) */}
                {t("plans." + planKey + ".label") === `plans.${planKey}.label`
                  ? (
                    <>Plan: <b>{selectedPlan.name}</b> ({selectedPlan.range})</>
                    )
                  : (
                    <>
                      {t("plans." + planKey + ".label")}: <b>{planLabel}</b> ({planRange})
                    </>
                    )}
              </div>
            </div>

            {/* Days */}
            <div className="mb-4">
              <label className="block text-sm mb-2">{t("inputs.days")}</label>

              <div
                className="flex items-center gap-3
                           rounded-2xl px-4 py-3
                           bg-gradient-to-r from-[#163B57] via-[#1B4F74] to-[#1D5E86]
                           ring-1 ring-white/10"
              >
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
                <span className="text-white/85 font-medium">{t("inputs.days")}</span>
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

            {/* Preview pill + button */}
            <div className="mt-4 flex flex-col md:flex-row flex-nowrap items-center gap-2 sm:gap-5 md:gap-5 w-full">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-1 md:-inset-2 rounded-[18px] blur-xl opacity-50"
                style={{
                  background:
                    "radial-gradient(70% 120% at 50% 0%, rgba(0,194,255,.45) 0%, rgba(0,194,255,0) 70%)",
                }}
              />

              <div
                className="relative flex-1 min-w-0 rounded-[18px] px-1 md:px-4 py-2 md:py-2.5 
                           bg-[linear-gradient(180deg,#2BD2FF_0%,#0DA5F2_100%)]
                           ring-1 ring-white/25
                           shadow-[0_14px_40px_rgba(0,174,255,0.35)]"
              >
                <div className="pointer-events-none absolute inset-0 rounded-[18px] ring-1 ring-white/15" />
                <div
                  className="pointer-events-none absolute inset-y-1 left-1/3 w-px opacity-70"
                  style={{ background: "linear-gradient(to bottom,transparent,rgba(255,255,255,.7),transparent)" }}
                />
                <div
                  className="pointer-events-none absolute inset-y-1 left-2/3 w-px opacity-70"
                  style={{ background: "linear-gradient(to bottom,transparent,rgba(255,255,255,.7),transparent)" }}
                />

                <div className="grid grid-cols-3 text-center items-center">
                  <div className="py-1">
                    <div className="text-[11px] md:text-xs font-semibold text-white">{t("cards.in1day")}</div>
                    <div className="mt-0.5 md:mt-1 text-base md:text-lg font-extrabold text-white">
                      +{dailyTon.toFixed(2)} <span className="opacity-90">TON</span>
                    </div>
                  </div>

                  <div className="py-1 text-white/85">
                    <div className="text-[11px] md:text-xs font-semibold">{t("cards.in7days")}</div>
                    <div className="mt-0.5 md:mt-1 text-base md:text-lg font-extrabold">
                      +{(dailyTon * 7).toFixed(2)} <span className="opacity-90">TON</span>
                    </div>
                  </div>

                  <div className="py-1 text-white/70">
                    <div className="text-[11px] md:text-xs font-semibold">
                      {t("cards.inNDays").replace("{days}", String(duration))}
                    </div>
                    <div className="mt-0.5 md:mt-1 text-base md:text-lg font-extrabold">
                      +{(dailyTon * duration).toFixed(2)} <span className="opacity-90">TON</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative shrink-0 md:self-center">
                <div
                  aria-hidden
                  className="absolute -inset-4 rounded-xl md:rounded-[24px] blur-2xl opacity-90"
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
                    {t("buttons.stakeNow")}
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
          </div>
{/* ПРАВАЯ: фиксированная ширина/лимиты, всегда у правого края */}
    <div className="justify-self-end">

          {/* ПРАВАЯ половина: карточка «Daily Income»md:ml-20 h-full w-full  w-[clamp(320px,40vw,560px)]*/}
          <div
            className="relative h-full w-[clamp(320px,40vw,560px)]
             max-w-[550px] overflow-hidden 
                       aspect-[500/350] md:aspect-[500/350]"
          >
            <Image
              src="/staking/stakingBg.svg"
              alt=""
              fill
              priority
              className="pointer-events-none select-none rounded-[inherit] object-cover will-change-transform"
            />

            <div className="absolute inset-[1%] md:inset-[0%] z-10 flex flex-col px-4 pt-1 md:mt-1 md:pl-8 md:ml-2 md:pr-16">
              <div className="absolute right-4 top-[10px] rounded-xl bg-white text-[#0A6CFF]
                              font-bold leading-none text-[18px] md:text-2xl py-1 px-3 md:py-2 md:ml-[12px] md:px-4 shadow">
                {apr}%
              </div>

              <h3 className="text-lg md:text-3xl font-semibold md:text-bold leading-tight pb-1 md:mb-1.5 pt-2 md:mt-1.5">
                {t("ticket.dailyIncome")}
              </h3>

              <p className="font-bold pb-1 md:mb-0.5 text-[24px] md:text-[36px]">
                ${(dailyTon * tonPrice).toFixed(2)}
              </p>

              <p className="font-semibold leading-tight text-[13px] md:text-[16px] mb-2">
                {dailyTon.toFixed(2)} TON
              </p>

              <p className="mt-auto mb-5 md:mb-12 text-[14px] md:text-[20px] pb-6 md:pb-12 md:text-sm leading-snug text-blue-50/90 max-w-[38rem]">
                {t("ticket.note")}
              </p>

             <Image
  src="/decorative/ton22.svg"
  alt=""
  width={138}
  height={138}
  className="pointer-events-none w-[90px] h-[90px] md:w-[138px] md:h-[138px] opacity-100 md:opacity-95 select-none absolute right-[-20px] bottom-[-15px] md:right-[-15px] md:bottom-[-15px]"
/>

            </div>
          </div>
        </div>
        </div>
{process.env.NEXT_PUBLIC_STAKING_WALLET && (
  <div className="mt-3 md:mt-4">
    <div className="text-xs text-sky-300/80 mb-2">
      Нет TonConnect? Попробуйте оплату из Trust Wallet:
    </div>
    <TrustWalletPay
      to={process.env.NEXT_PUBLIC_STAKING_WALLET!}
      amountTon={amount} // ваш state из инпута суммы
      comment={`Stake ${amount} TON • ${duration}d`} // опционально
    />
  </div>
)}
      </section>

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
            txHash
          });
          setOpen(false);
          fetchHistory(address!);
        }}
      />
    </main>
  );
}
