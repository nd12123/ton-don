// components/Footer.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Пути к логотипам и иконкам (поменяйте, если у вас другие пути)
import logoSvg from "@/assets/Footer/Ton image.png";       // ваш логотип TONStake.ai
import certikBadge from "@/assets/Main/bottom audited by certik.svg"; // иконка «Audited by Certik»
import supportIcon from "@/assets/Footer/Support.svg"; // иконка на кнопке «Support»
import telegramIcon from "@/assets/Footer/telegram.svg"; // иконка Telegram

type FooterProps = {
  className?: string;
};

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`bg-[#081028] text-white ${className}`}>
      {/* 1) CTA-блок «Start investing now!» сверху футера */}
      <StartInvesting className="mb-16" />

      {/* 2) Нижняя навигация */}
      <div className="border-t border-[#1F2A44] pt-10 pb-6">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Левая часть: логотип + Certik */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Image src={logoSvg} alt="TONStake.ai" width={32} height={32} />
              <span className="text-xl font-semibold">TON Stake Ai</span>
            </div>
            <div className="h-6 border-l border-[#1F2A44]" />
            <div className="flex items-center gap-2 bg-[#0A1329] px-3 py-1 rounded-lg">
              <Image
                src={certikBadge}
                alt="Audited by Certik"
                width={100}
                height={40}
              />
              <span className="text-sm text-[#A0B0D8]">Audited by Certik</span>
            </div>
          </div>

          {/* Средняя часть: навигационные ссылки */}
          <nav className="flex flex-wrap gap-8 text-[#A0B0D8]">
            <Link href="staking" className="hover:text-white transition-colors">
              Staking
            </Link>
            <Link href="history" className="hover:text-white transition-colors">
              History
            </Link>
            <Link
              href="profile"
              className="hover:text-white transition-colors"
            >
              Profile
            </Link>
            <Link href="faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Правая часть: Support + Telegram */}
          <div className="flex items-center ">
            <Link
            href="support"
              className="
                inline-flex items-center justify-center
                bg-[#0A1329] hover:bg-[#1F2A44]
                rounded-lg p-3
                transition-colors duration-200
              "
            >
              <Image
                src={supportIcon}
                alt="Support"
                width={150}
                height={75}
              />
            </Link>
            <Link
              href="https://t.me/YourTelegramChannel" // замените на реальную ссылку
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center justify-center
                bg-[#0A1329] hover:bg-[#1F2A44]
                rounded-lg p-3
                transition-colors duration-200
              "
            >
              <Image
                src={telegramIcon}
                alt="Telegram"
                width={75}
                height={75}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* 3) Копирайт и ссылки на условия */}
      <div className="border-t border-[#1F2A44] mt-6 pt-6 pb-4">
        <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-4 text-sm text-[#A0B0D8]">
          <p>© 2025 Orbi Ton | All Rights Reserved</p>
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="hover:text-white transition-colors"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Не забудьте импортировать StartInvesting в этом файле
import StartInvesting from "./StartInvesting";


/*
import { Mail, MessageCircle, HelpCircle } from "lucide-react";

export default function Footer() {
    return (
      <footer className="
      py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto gap-2">
          <span>&copy; {new Date().getFullYear()} TON Stake. Все права защищены.</span>
          <div className="flex gap-4 items-center text-gray-600">
  <a href="mailto:support@tonstake.app" className="hover:text-blue-600 flex items-center gap-1">
    <Mail size={16} />
    Поддержка
  </a>
  <a href="https://t.me/tonstake" target="_blank" className="hover:text-blue-600 flex items-center gap-1">
    <MessageCircle size={16} />
    Telegram
  </a>
  <a href="/faq" className="hover:text-blue-600 flex items-center gap-1">
    <HelpCircle size={16} />
    FAQ
  </a>
</div>

        </div>
      </footer>
    );
  }
  */