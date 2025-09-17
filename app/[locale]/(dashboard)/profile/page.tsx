// app/(dashboard)/profile/page.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { useStakeStore, StakeRecord } from "@/lib/store";
import DashboardStats from "@/components/DashboardStats";
import { useTonPrice } from "@/lib/hooks/useTonPrice";
import { PLANS } from "@/components/Plans";
import { WithdrawModal } from "@/components/WithdrawModal";
import { useStakeContract } from "@/lib/ton/useContract";
import { supabase } from "@/lib/supabase";
import { useTonAddress } from "@tonconnect/ui-react";
import ProfileHistory from "@/components/ProfileHistory";
import {
  dailyIncomeActive,
  totalEarnedSoFar,
  balanceActive,
} from "@/lib/earnings";
import { motion } from "framer-motion";

// 👇 добавь это:
import { useT } from "@/i18n/react";

export default function ProfilePage() {
  const t = useT("profile"); // 👈 берём неймспейс profile

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
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <motion.h1
        className="text-3xl font-bold"
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
        <h2 className="text-xl font-semibold mb-4 text-gray-600">
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


      {/* 1) Короткая сводка
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InfoCard
          title="Всего застейкано"
          value={`${totalStaked.toFixed(2)} TON`}
          Icon={Award}
          subtitle={`≈ $${(totalStaked * priceUsd).toFixed(2)}`}
        />
        <InfoCard
          title="Награды получены"
          value={`${earnedNow.toFixed(2)} TON`}
          Icon={Award}
          subtitle={`≈ $${(earnedNow * priceUsd).toFixed(2)}`}
        />
      </section> */}

      {/* 2) Таблица истории 
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-600">История стейков</h2>
        {history.length === 0 ? (
          <p className="text-gray-600">Пока нет операций стейка.</p>
        ) : (
          <Table>
            <Thead>
              <Tr>
                <Th className="text-gray-600">Валидатор</Th>
                <Th className="text-gray-600">Сумма</Th>
                <Th className="text-gray-600" >Дата</Th>
                <Th className="text-gray-600" >Статус</Th>
                <Th className="text-gray-600">Профит</Th>
                <Th className="text-gray-600" >Вывести TON</Th>
              </Tr>
            </Thead>
            <Tbody>
              {history.map((h) => {
                const date = new Date(h.created_at).toLocaleDateString("ru-RU");

                return (
                  <Tr key={h.id}>
                    <Td>{h.validator}</Td>
                    <Td>{h.amount.toFixed(2)} TON</Td>
                    <Td>{date}</Td>
                    <Td>{displayStatus(h)}</Td>
<Td>{actualProfit(h).toFixed(2)} TON</Td>
                    <Td>
                    {h.status === "active" && (
                      <button
                        onClick={() => {
                          setSelectedStake(h);
                          setModalOpen(true);
                        }}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Withdraw
                      </button>
                    )}
                  </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </section>*/}

  // 2) Общий доход по завершённым стейкам
  /*
  const totalCompletedRewards = useMemo(() => {
    return history
      .filter((h) => h.status === "completed")
      .reduce((sum, h) => {
        const reward = h.amount * (h.apr / 100) * (h.duration); // / 365
        return sum + reward;
      }, 0);
  }, [history]);
    const calcRowProfit = (r: StakeRecord) => (r.amount * (r.apr / 100) * r.duration);
  */

  // 3) Ежедневный доход по активным стейкам
  /*
  const dailyIncome = useMemo(() => {
    return history
      .filter((h) => h.status === "active")
      .reduce((sum, h) => sum + h.amount * (h.apr / 100), 0); // / 365
  }, [history]);
*/