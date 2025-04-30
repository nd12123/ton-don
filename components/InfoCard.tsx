'use client';

import { LucideIcon } from "lucide-react";

// components/InfoCard.tsx
export function InfoCard({
  title,
  value,
  Icon,
}: {
  title: string;
  value: string;
  Icon?: LucideIcon;
}) {
  return (
    <div
      className="
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        p-6 rounded-xl shadow-md
        text-center
      "
    >
      {Icon && (
        <Icon
          className="mx-auto mb-2 text-gray-500 dark:text-gray-400"
          size={24}
        />
      )}
      <h4 className="text-sm text-gray-500 dark:text-gray-400">{title}</h4>
      <p className="text-xl font-bold mt-1 text-blue-600 dark:text-blue-400">
        {value}
      </p>
    </div>
  );
}
