// app/(dashboard)/profile/page.tsx
"use client";

import { useState, useMemo } from "react";
import { useStakeStore, StakeRecord } from "@/lib/store";
import { InfoCard } from "@/components/InfoCard";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/table";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import DashboardStats from "@/components/DashboardStats";
import { useTonPrice } from "@/lib/hooks/useTonPrice";
import { PLANS} from "@/components/Plans"; // убедитесь, что PLANS экспортируется из этого модуля
import { WithdrawModal } from "@/components/WithdrawModal";

import { useTonConnectUI } from "@tonconnect/ui-react";
import { supabase } from "@/lib/supabase";

import { useTonAddress } from "@tonconnect/ui-react";

export default function ProfilePage() {

  const [tonConnect] = useTonConnectUI();

  // Локальный стейт для модалки
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStake, setSelectedStake] = useState<StakeRecord | null>(null);

  const address = useTonAddress();
  const fetchHistory = useStakeStore((s) => s.fetchHistory);
  //const withdrawStake = useStakeStore((s) => s.withdrawStake);

// Обработчик вывода
const handleWithdraw = async (stake: StakeRecord, amt: number) => {
  try {
  if (amt <= 0 || amt > stake.amount) {
    // можно добавить валидацию и тост
    return;
  }
      // 1) вызываем TonConnect для отправки транзакции
      const response = await tonConnect.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 60 * 5,
        messages: [
          {
            address: stake.wallet,// адрес площадки: "0QAmQUOW2aGZb8uGmDd8fhhcs7u5NpzzmybooQo46PzGleIL" куда возвращаем
            amount: BigInt(amt * 1e9).toString(),   // переводим TON в нанотоны
            ...("text" in stake ? {} : {}), // другие поля, если нужны
          },
        ],
      });
      const tx : string = response.boc
      // 2) как только транзакция уходит, пушим её хеш/ID в Supabase
      const { } = await supabase //data: updated
        .from("stakes")
        .update({  txHash: tx, amount: stake.amount - amt }) // if amountLaeft == 0, status: "completed",
        .eq("id", stake.id)
        .select();
  /*  // Пример: просто пометим как completed или уменьшить amount
  await supabase
    .from("stakes")
    .update({ amount: stake.amount - amt })
    .eq("id", stake.id);
    */

  // Обновляем список
  await fetchHistory(address);
    } catch (err){
      console.error("Withdraw failed", err);
      alert("Не удалось выполнить вывод: " + err);
    } finally{
      setModalOpen(false);
    }
};


  // получаем историю из стора
  const history = useStakeStore((s) => s.history as StakeRecord[]);

  // курс TON -> USD
  const priceUsd = useTonPrice();

  // 1) Всего застейкано
  const totalStaked = useMemo(
    () => history.reduce((sum, item) => sum + item.amount, 0),
    [history]
  );

  // 2) Общий доход по завершённым стейкам
  const totalCompletedRewards = useMemo(() => {
    return history
      .filter((h) => h.status === "completed")
      .reduce((sum, h) => {
        const reward = h.amount * (h.apr / 100) * (h.duration / 365);
        return sum + reward;
      }, 0);
  }, [history]);

  // 3) Ежедневный доход по активным стейкам
  const dailyIncome = useMemo(() => {
    return history
      .filter((h) => h.status === "active")
      .reduce((sum, h) => sum + h.amount * (h.apr / 100) / 365, 0);
  }, [history]);

  // для DashboardStats используем текущий депозит как totalStaked
  const deposit = totalStaked;

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <motion.h1
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Мой профиль
      </motion.h1>

      {/* 0) Блок общей статистики */}
      <DashboardStats
        balanceTon={totalStaked}
        dailyIncomeTon={dailyIncome}
        totalIncomeTon={totalCompletedRewards}
        priceUsd={priceUsd}
        deposit={deposit}
        plans={PLANS}
      />

      {/* 1) Короткая сводка */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InfoCard
          title="Всего застейкано"
          value={`${totalStaked.toFixed(2)} TON`}
          Icon={Award}
          subtitle={`≈ $${(totalStaked * priceUsd).toFixed(2)}`}
        />
        <InfoCard
          title="Награды получены"
          value={`${totalCompletedRewards.toFixed(2)} TON`}
          Icon={Award}
          subtitle={`≈ $${(totalCompletedRewards * priceUsd).toFixed(2)}`}
        />
      </section>

      {/* 2) Таблица истории */}
      <section>
        <h2 className="text-xl font-semibold mb-4">История стейков</h2>
        {history.length === 0 ? (
          <p className="text-gray-600">Пока нет операций стейка.</p>
        ) : (
          <Table>
            <Thead>
              <Tr>
                <Th>Валидатор</Th>
                <Th>Сумма</Th>
                <Th>Дата</Th>
                <Th>Статус</Th>
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
                    <Td
                      className={
                        h.status === "active"
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      {h.status === "active" ? "Активен" : "Завершён"}
                    </Td>

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
