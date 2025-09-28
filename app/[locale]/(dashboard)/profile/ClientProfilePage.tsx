// app/[locale]/(dashboard)/profile/ClientProfilePage.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useTonAddress } from "@tonconnect/ui-react";

import { useStakeStore, StakeRecord } from "@/lib/store";
import { useTonPrice } from "@/lib/hooks/useTonPrice";
import { PLANS } from "@/components/Plans";
import { WithdrawModal } from "@/components/WithdrawModal";
import { dailyIncomeActive, totalEarnedSoFar, balanceActive } from "@/lib/earnings";
import { useT } from "@/i18n/react";

// рендерим тяжёлые компоненты только на клиенте
const DashboardStats = dynamic(() => import("@/components/DashboardStats"), {
  ssr: false,
  loading: () => <div className="rounded-2xl border border-white/10 bg-white/5 h-40 animate-pulse" />,
});
const ProfileHistory = dynamic(() => import("@/components/ProfileHistory"), {
  ssr: false,
  loading: () => <div className="rounded-2xl border border-white/10 bg-white/5 h-40 animate-pulse" />,
});

export default function ClientProfilePage() {
  const t = useT("profile");
  // безопасный фолбэк для переводов (вторая строка НЕ идёт в t как params!)
  const tf = (key: string, fallback: string) => {
    const v = t(key);
    return v === key ? fallback : v;
  };

  const address        = useTonAddress();
  const fetchHistory   = useStakeStore((s) => s.fetchHistory);
  const withdrawStake  = useStakeStore((s) => s.withdrawStake);
  const history        = useStakeStore((s) => s.history as StakeRecord[]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStake, setSelectedStake] = useState<StakeRecord | null>(null);

  // загрузка истории по адресу кошелька
  useEffect(() => {
    if (address) fetchHistory(address);
  }, [address, fetchHistory]);

  // по подтверждению в модалке — только апдейт истории + тосты
  const handleWithdraw = async (stake: StakeRecord, amt: number) => {
    const safeAmt = Math.min(Math.max(amt, 0), stake.amount);
    if (safeAmt <= 0) {
      setModalOpen(false);
      return;
    }

    try {
      await toast.promise(
        withdrawStake(stake.id, safeAmt), // обновит Supabase и локальный стор
        {
          loading: tf("toasts.saving", "Сохраняем запрос…"),
          success: tf("toasts.saved", "Запрос на вывод одобрен"),
          error:   (e) => e?.message || tf("toasts.error", "Ошибка в запросе"),
        }
      );
      // при желании — подтянуть свежую историю с сервера
      //if (address) await fetchHistory(address);
    } finally {
      setModalOpen(false);
      setSelectedStake(null);
    }
  };

  const priceUsd    = useTonPrice();
  const totalStaked = useMemo(() => history.reduce((sum, item) => sum + item.amount, 0), [history]);

  const deposit     = totalStaked;
  const dailyIncome = useMemo(() => dailyIncomeActive(history), [history]);
  const balance     = useMemo(() => balanceActive(history), [history]);
  const earnedNow   = useMemo(() => totalEarnedSoFar(history), [history]);

  return (
    <main className="max-w-4xl mx-auto px-4 pb-6 pt-3 md:py-10 space-y-2 md:space-y-8">
      <motion.h1
        className="text-3xl font-bold text-center md:text-left"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {t("titles.myProfile")}
      </motion.h1>

      <DashboardStats
        balanceTon={balance}
        dailyIncomeTon={dailyIncome}
        totalIncomeTon={earnedNow}
        priceUsd={priceUsd}
        deposit={deposit}
        plans={PLANS}
      />

      <section>
        <h2 className="text-center md:text-left text-xl font-semibold mb-4 text-gray-600">
          {t("titles.history")}
        </h2>

        <ProfileHistory
          history={history}
          onWithdrawClick={(stake: StakeRecord) => {
            setSelectedStake(stake);
            setModalOpen(true);
          }}
        />
      </section>

      {selectedStake && (
        <WithdrawModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          stake={selectedStake}
          onConfirm={handleWithdraw}
        />
      )}
    </main>
  );
}
