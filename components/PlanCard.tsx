import Image from "next/image";
import GoToStakingButton from "@/components/GoToStakingButton";
import { useRouter } from 'next/navigation';

type PlanCardProps = {
  title: string;
  dailyProfit: number;   // 4 | 7 | 10 (процент в день)
  rangeText: string;     // "1–999 TON" / "2000+ TON"
  iconSrc: string;       // путь к иконке
  isActive: boolean;
  onSelect?: () => void; // выбрать план
};

export default function PlanCard({
  title,
  dailyProfit,
  rangeText,
  iconSrc,
  isActive,
  onSelect,
}: PlanCardProps) {
  const router = useRouter();
  return (
    <div
      // Кликабельной оставим только неактивную карточку
      onClick={!isActive ? onSelect : undefined}
      className={[
        "relative flex flex-col",
        "p-4 md:p-6",
        "rounded-3xl md:rounded-2xl",
        "transition",
        "bg-plan-" + title.toLowerCase(),
        isActive
          ? "border-2 border-sky-400 shadow-[0_8px_32px_rgba(61,212,255,.30)]"
          : "border border-white/20 hover:border-sky-400/60",
        "outline outline-1 outline-offset-[-1px] outline-sky-500/40",
      ].join(" ")}
    >
      {/* Иконка + заголовок */}
<div className="mb-1 md:mb-4 flex flex-col md:flex-row md:items-center">
  <div
    className="
      grid place-items-center
      relative flex-shrink-0
      w-12 h-12 md:w-14 md:h-14
      rounded-s overflow-hidden
      bg-white/5
      border-1 border-sky-400/50
      shadow-[0_6px_24px_rgba(61,212,255,.35)]
      backdrop-blur-[2px]
      md:mr-3
    "
  >
    <Image
      src={iconSrc}
      alt={`${title} icon`}
      fill
      className="object-contain "
    />
  </div>

  {/* заголовок: ниже на мобиле, справа на десктопе */}
  <h3 className="mt-1 md:mt-3 text-[15px] md:text-2xl font-semibold">
    {title}
  </h3>
</div>


      {/* Процент */}
      <div className="flex flex-col pt-0 md:space-y-1 pb-0 md:mb-6">
        <span className="text-[10px] md:text-sm text-gray-300">Your profit</span>
        <div className="md:mt-0.5 flex items-baseline gap-1 md:gap-2">
          <span className="text-xl md:text-3xl font-bold text-accent-200">{dailyProfit}%</span>
          <span className="text-[10px] text-gray-300">Per day</span>
        </div>
      </div>

      {/* Диапазон */}
      <div className="flex flex-col space-y-1 md-0 md:mb-6">
        <span className="text-[12px] md:text-sm text-gray-300">Investments for all time</span>
        <span className="text-sm md:text-base lg:text-xl font-medium text-accent-200">
          {rangeText}
        </span>
      </div>

      {/* Divider */}
<div
  className="w-full border-b my-0.5 md:my-4"
  style={{ borderColor: "rgba(16,95,150,1)" }}
/>

      {/* Кнопка */}{/* CTA */}
<div className="mt-auto flex justify-center">
  {/* Mobile: простая кнопка с текстом */}
  <button
    type="button"
    onClick={onSelect}
    className={`md:hidden h-6 w-full rounded-lg text-sm font-semibold transition
      focus:outline-none focus:ring-2 focus:ring-sky-400/60
      ${isActive
        ? "bg-sky-500 text-white shadow-[0_0_20px_rgba(56,172,234,0.45)]"
        : "bg-white/10 text-sky-200 border border-white/10 hover:bg-white/15"}`}
    aria-pressed={isActive}
  >
    Invest
  </button>

  {/* Desktop: декоративная кнопка как прежде */}
  <button
    type="button"
    onClick={() => (isActive ? router.push('/staking') : onSelect?.())}
    className={`hidden md:block h-8 w-3/4 md:h-12 md:w-3/4 rounded-lg transition bg-center bg-cover md:min-w-[150px]
      ${isActive
        ? "bg-[url('/decorative/btn-select.svg')]"
        : "bg-[url('/decorative/btn.svg')]"}`}
    aria-label={isActive ? "Selected" : "Select plan"}
    aria-pressed={isActive}
  />
</div>

    </div>
  );
}
