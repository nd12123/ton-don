// components/InfoCard.tsx
import { LucideIcon } from "lucide-react"; // если нужны иконки

interface InfoCardProps {
  title: string;
  value: string;
  subtitle?: string;
  Icon?: LucideIcon;
}

export function InfoCard({
  title,
  value,
  subtitle,
  Icon,
}: InfoCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-6 rounded-xl shadow">
      {Icon && <Icon className="w-6 h-6 mb-2 text-blue-500" />}
      <h4 className="text-sm text-gray-500 dark:text-gray-400">{title}</h4>
      <p className="text-xl font-bold mt-1">{value}</p>
      {subtitle && (
        <p className="text-sm text-gray-400 dark:text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}
