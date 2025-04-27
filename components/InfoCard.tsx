'use client';

import { LucideIcon } from "lucide-react";

export function InfoCard({
    title,
    value,
    Icon,
  }: {
    title: string;
    value: string;
    Icon: LucideIcon;
  }) {
    return (
      <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-md text-center flex flex-col items-center">
        <Icon size={32} className="text-blue-500 mb-2" />
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className="text-xl font-bold mt-1 text-blue-600">{value}</p>
      </div>
    );
  }