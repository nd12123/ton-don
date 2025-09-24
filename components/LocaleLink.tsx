// components/LocaleLink.tsx
"use client";

import Link from "next/link";
import { useMemo, type ComponentProps } from "react";
import { useCurrentLocale } from "@/i18n/useLocale";
import { withLocale } from "@/i18n/locale";

// Берём пропсы прямо из Link → children на месте
type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export default function LocaleLink({ href, ...rest }: Props) {
  const locale = useCurrentLocale();
  const h = useMemo(() => withLocale(href, locale), [href, locale]);
  return <Link href={h} {...rest} />;
}
