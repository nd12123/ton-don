// app/(dashboard)/profile/page.tsx
"use client";

import { useMemo } from "react";
import { useStakeStore } from "@/lib/store";
import { InfoCard } from "@/components/InfoCard";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/table";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

export default function ProfilePage() {
  const history = useStakeStore((s) => s.history);

  // 1) Всего застейкано
  const totalStaked = useMemo(
    () => history.reduce((sum, item) => sum + item.amount, 0),
    [history]
  );

  // 2) Считаем награды всех COMPLETED
  const totalRewards = useMemo(() => {
    return history
      .filter((h) => h.status === "completed")
      .reduce((sum, h) => {
        // APR в процентах, duration в днях
        const reward = h.amount * (h.apr / 100) * (h.duration / 365);
        return sum + reward;
      }, 0);
  }, [history]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <motion.h1
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Мой профиль
      </motion.h1>

      {/* Статистика */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InfoCard title="Всего застейкано" value={`${totalStaked.toFixed(2)} TON`} Icon={Award} />
        <InfoCard title="Награды получены" value={`${totalRewards.toFixed(2)} TON`} Icon={Award} />
      </section>

      {/* Таблица истории */}
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
                // для каждой записи можно вычислить reward, если нужно
                const date = new Date(h.created_at).toLocaleDateString();
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
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </section>
    </main>
  );
}
