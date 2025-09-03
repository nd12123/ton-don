import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 768) {
  // чтобы меньше мигало на клиенте
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    // сразу выставим текущее значение
    setIsMobile(mql.matches);

    // нормальный путь
    if ("addEventListener" in mql) {
      mql.addEventListener("change", handler);
    } else {
      // старые Safari
      (mql as any).addListener?.(handler);
    }

    return () => {
      if ("removeEventListener" in mql) {
        mql.removeEventListener("change", handler);
      } else {
        (mql as any).removeListener?.(handler);
      }
    };
  }, [breakpoint]);

  return isMobile;
}
