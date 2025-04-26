// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

//import Footer from "@/components/Footer";
import TonProviderWrapper from "@/components/TonProviderWrapper";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";

import Layout from "@/components/MobileLayout";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TON Stake",
  description: "Stake your TON securely and earn rewards",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body
        className={`
          flex flex-col min-h-screen
          bg-white text-black
          dark:bg-gray-900 dark:text-gray-100
          ${geistSans.variable} ${geistMono.variable}
        `}
        suppressHydrationWarning
      >
        <ThemeProviderWrapper>
          <TonProviderWrapper>
          <Layout>
            <main className="flex-grow">{children}</main>
            </Layout>
          </TonProviderWrapper>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
