"use client";

import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useStakeStore, StakeRecord } from "@/lib/store";
// ❌ было: import DashboardStats from "@/components/DashboardStats";
// ❌ было: import ProfileHistory from "@/components/ProfileHistory";

// ✅ рендерим их только на клиенте
const DashboardStats = dynamic(() => import("@/components/DashboardStats"), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border border-white/10 bg-white/5 h-40 animate-pulse" />
  ),
});

const ProfileHistory = dynamic(() => import("@/components/ProfileHistory"), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border border-white/10 bg-white/5 h-40 animate-pulse" />
  ),
});

import { useTonPrice } from "@/lib/hooks/useTonPrice";
import { PLANS } from "@/components/Plans";
import { WithdrawModal } from "@/components/WithdrawModal";
import { useStakeContract } from "@/lib/ton/useContract";
import { getSupabaseBrowser } from "@/lib/supabase/browser";
import { useTonAddress } from "@tonconnect/ui-react";
import { dailyIncomeActive, totalEarnedSoFar, balanceActive } from "@/lib/earnings";
import { motion } from "framer-motion";
import { useT } from "@/i18n/react";

export default function ClientProfilePage() {
  const supabase = getSupabaseBrowser();
  const t = useT("profile");

  const { withdrawAmount } = useStakeContract();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStake, setSelectedStake] = useState<StakeRecord | null>(null);

  const address = useTonAddress();
  const fetchHistory = useStakeStore((s) => s.fetchHistory);

  const handleWithdraw = async (stake: StakeRecord, amt: number) => {
    try {
      if (amt <= 0 || amt > stake.amount) return;
      await withdrawAmount(amt);

      const newAmount = stake.amount - amt;
      await supabase
        .from("stakes")
        .update({
          amount: newAmount,
          status: newAmount > 0 ? "active" : "completed",
        })
        .eq("id", stake.id);

      await fetchHistory(address);
    } catch (err) {
      console.error("Withdraw failed", err);
      alert("Не удалось выполнить вывод: " + err);
    } finally {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    if (!address) return;
    fetchHistory(address);
  }, [address, fetchHistory]);

  const history = useStakeStore((s) => s.history as StakeRecord[]);
  const priceUsd = useTonPrice();

  const totalStaked = useMemo(
    () => history.reduce((sum, item) => sum + item.amount, 0),
    [history]
  );

  const deposit = totalStaked;
  const dailyIncome = useMemo(() => dailyIncomeActive(history), [history]);
  const balance = useMemo(() => balanceActive(history), [history]);
  const earnedNow = useMemo(() => totalEarnedSoFar(history), [history]);

  return (
    <main className="max-w-4xl mx-auto px-4 pb-6 pt-3 md:py-10 space-y-2 md:space-y-8">
      <motion.h1
        className="text-3xl font-bold text-center justify-center md:text-left md:justify-left"
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
        <h2 className="text-center justify-center md:text-left md:justify-left text-xl font-semibold mb-4 text-gray-600">
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
