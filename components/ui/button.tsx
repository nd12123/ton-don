import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
//import { cn } from "@/lib/utils"; // можешь удалить этот импорт, если не используешь clsx/cn

export function Button({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  className?: string;
}) {
  return (
    <button
      {...props}
      className={`
        bg-blue-500 hover:bg-blue-600 transition
        text-white font-semibold py-2 px-4 rounded-xl
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className || ""}
      `}
    >
      {children}
    </button>
  );
}
