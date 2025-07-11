// app/layout.tsx
import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Toaster} from "react-hot-toast"
//import Footer from "@/components/Footer";
import {TonProviderWrapper} from "@/components/TonProviderWrapper";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
//import Footer from "@/components/Footer"
//import { StarsCluster } from "@/components/ui/Decorative"; <StarsCluster /> 

//const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
//const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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
      /* {`
          container mx-auto px-4 py-10 flex flex-col min-h-screen 
          bg-white text-black
          dark:bg-gray-900 dark:text-gray-100
          ${geistSans.variable} ${geistMono.variable}

          bg-bg-light
        `}*/
        className=" bg-page-noise bg-repeat bg-fixed
        min-h-screen
         text-text-primary
         dark:text-text-dark
        flex flex-col
        overflow-x-hidden
      "
        suppressHydrationWarning
      >
{/* фоновая “точка света” слева, перенести потом */}
<div
    className="absolute inset-0 pointer-events-none"
    style={{ /** позволяет подсветить угло основной страницы, мб нужно для плавности
      background:
        "radial-gradient(ellipse at bottom left, rgba(0,194,255,0.2), transparent 60%)", */
    }}
  />
        <ThemeProviderWrapper>
          <TonProviderWrapper>
            {/* глобальный контейнер для тостов */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: { borderRadius: '0.5rem', padding: '0.75rem', fontSize: '0.9rem' },
                success: { iconTheme: { primary: '#10B981', secondary: '#ffffff' } },
                error:   { iconTheme: { primary: '#EF4444', secondary: '#ffffff' } },
              }}
            />
            {/* menu on the left: 
          <MobileLayout></MobileLayout> */}
            <main className="flex-grow">{children}</main>
          </TonProviderWrapper>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
