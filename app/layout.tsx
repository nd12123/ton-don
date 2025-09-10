// app/layout.tsx
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
//import Header from "@/components/header";

import ClientProviders from "@/components/ClientProviders";
//import TonDebugReset from "@/components/TonDebugReset";
import { Inter } from 'next/font/google';
// app/layout.tsx
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.tld"), // поменяй
  title: {
    default: "TON Stake",
    template: "%s · TON Stake",
  },
  description: "Stake TON easily & securely. Earn passive income with TON.",
  keywords: ["TON", "staking", "crypto", "DeFi", "Toncoin"],
  icons: {
    icon: [
      { url: "/favicon.ico" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }], //favicon?
    shortcut: ["/favicon.ico"]
  },
  openGraph: { //noIdea
    type: "website",
    url: "https://your-domain.tld",
    siteName: "TON Stake",
    title: "Stake TON easily & securely",
    description: "Our AI finds the most profitable nodes for staking.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TON Stake" }],
  },
  manifest: "/site.webmanifest",
  //themeColor: "#0B1028", //unsupported&
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1028",
  colorScheme: "dark"
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400','500','700'],
});
/* */


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-inter min-h-screen flex flex-col overflow-x-hidden`}> 
        <ThemeProviderWrapper>

          <ClientProviders>
                 {/* <TonDebugReset /> удалить после подтверждения, что шум ушёл */}

            <Toaster position="top-right" />
            <main className="flex-grow">{children}</main>
          </ClientProviders>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}


/*
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
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400','500','700'],
});


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
          ${inter.variable} font-inter
          bg-page-noise bg-repeat bg-fixed
        min-h-screen
         text-text-primary
         dark:text-text-dark
        flex flex-col
        overflow-x-hidden
        `}
        suppressHydrationWarning
      >
<div
    className="absolute inset-0 pointer-events-none"
    style={{ 
    }}
  />
        <ThemeProviderWrapper>
          <TonProviderWrapper>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: { borderRadius: '0.5rem', padding: '0.75rem', fontSize: '0.9rem' },
                success: { iconTheme: { primary: '#10B981', secondary: '#ffffff' } },
                error:   { iconTheme: { primary: '#EF4444', secondary: '#ffffff' } },
              }}
            />
            <main className="flex-grow">{children}</main>
          </TonProviderWrapper>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
  */
