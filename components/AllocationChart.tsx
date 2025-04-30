"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "Investors", value: 90 },
  { name: "Maintenance", value: 5 },
  { name: "Marketing", value: 5 },
];

const COLORS = ["#3B82F6", "#6B7280", "#FBBF24"];

export default function AllocationChart() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-center mb-6">Fund Allocation</h2>
      <div className="max-w-2xl mx-auto h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="50%"
              outerRadius="80%"
              paddingAngle={2}
              label={({ name, percent }) =>
                `${name}: ${(percent! * 100).toFixed(0)}%`
              }
            >
              {data.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{ fontSize: "0.9rem", marginTop: 16 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
