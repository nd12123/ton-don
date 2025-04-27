"use client";

import { useMemo, useState, useEffect } from "react";
import { useStakeStore } from "@/lib/store";
import { InfoCard } from "@/components/InfoCard";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/ui/table";
import { motion } from "framer-motion";
import { Clock, Trophy } from "lucide-react";
import AllocationChart from "@/components/AllocationChart";
import Skeleton from "@/components/ui/Skeleton";


export default function ProfilePage() {
  const history = useStakeStore((s) => s.history);

  const [chartLoading, setChartLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setChartLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);


  const totalStaked = useMemo(
    () => history.reduce((sum, item) => sum + item.amount, 0),
    [history]
  );
  const totalRewards = useMemo(
    () =>
      history
        .filter((h) => h.status === "Completed")
        .reduce((sum, item) => sum + (item.reward || 0), 0),
    [history]
  );

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
        <InfoCard
          title="Всего застейкано"
          value={`${totalStaked} TON`}
          Icon={Clock}
        />
        <InfoCard
          title="Награды получены"
          value={`${totalRewards.toFixed(2)} TON`}
          Icon={Trophy}
        />
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
              {history.map((h) => (
                <Tr key={h.id}>
                  <Td>{h.validator}</Td>
                  <Td>{h.amount} TON</Td>
                  <Td>{h.date}</Td>
                  <Td
                    className={
                      h.status === "Active" ? "text-green-600" : "text-gray-500"
                    }
                  >
                    {h.status === "Active" ? "Активен" : "Завершён"}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </section>

      {/* Диаграмма с skeleton */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-4">Распределение фонда</h2>
              {chartLoading ? <Skeleton style={{ width: "100%", height: "16rem" }} /> : <AllocationChart />}
            </section>
    </main>
  );
}
