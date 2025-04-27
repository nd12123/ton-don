"use client";

import { ShieldCheck, Activity, Clock } from "lucide-react";

const features = [
  {
    title: "Безопасность",
    icon: <ShieldCheck size={28} className="text-blue-500" />,
    description: "Ваши средства хранятся в безопасных валидаторах.",
  },
  {
    title: "Прозрачность",
    icon: <Activity size={28} className="text-blue-500" />,
    description: "Каждая транзакция полностью прозрачна на блокчейне.",
  },
  {
    title: "Гибкость",
    icon: <Clock size={28} className="text-blue-500" />,
    description: "Настройте срок стейкинга под свои нужды.",
  },
];

export default function WhyUs() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
      {features.map((f) => (
        <div
          key={f.title}
          className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm text-center"
        >
          <div className="flex justify-center mb-4">{f.icon}</div>
          <h4 className="font-semibold mb-2">{f.title}</h4>
          <p className="text-sm text-gray-600">{f.description}</p>
        </div>
      ))}
    </div>
  );
}
