// app/[locale]/terms/page.tsx
//"use client";

import React from "react";

export default function TermsPage() {
  return (
    <main className="min-h-screen text-white">
      <section className="container mx-auto px-4 py-10 md:py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-sm text-white/60 mb-8">Last updated: 2025-01-01</p>

        <div className="prose prose-invert max-w-none">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using this website and related services (the “Service”), you agree to be
            bound by these Terms of Service (“Terms”). If you do not agree, do not use the Service.
          </p>

          <h2>2. Eligibility & Wallet</h2>
          <p>
            You are solely responsible for the security of your wallet and private keys. We do not
            custody funds and cannot recover lost keys or transactions.
          </p>

          <h2>3. No Financial Advice</h2>
          <p>
            The Service is provided for informational and utility purposes only and does not
            constitute financial, investment, legal, or tax advice. You are solely responsible for
            your decisions.
          </p>

          <h2>4. Risks & No Warranty</h2>
          <p>
            On-chain operations carry risks, including but not limited to market volatility, smart
            contract bugs, validator slashing, and network outages. THE SERVICE IS PROVIDED “AS IS”
            AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES; NOR FOR ANY LOSS OF
            PROFITS, CRYPTO ASSETS, DATA, OR GOODWILL; NOR FOR NETWORK, VALIDATOR, OR WALLET
            FAILURES.
          </p>

          <h2>6. Fees</h2>
          <p>
            You may incur network (“gas”) fees and third-party fees. We are not responsible for such
            fees and do not control them.
          </p>

          <h2>7. Prohibited Use</h2>
          <p>
            You agree not to use the Service for illegal activities or in violation of applicable
            laws and regulations.
          </p>

          <h2>8. Third-Party Services</h2>
          <p>
            The Service may integrate third-party protocols or links. We do not control and are not
            responsible for third-party content, terms, or security.
          </p>

          <h2>9. Changes</h2>
          <p>
            We may modify these Terms at any time by posting an updated version. Continued use
            constitutes acceptance.
          </p>

          <h2>10. Contact</h2>
          <p>
            If you have questions about these Terms, contact us at{" "}
            <a href="mailto:support@example.com">support@ton-stake.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}

// (опционально) если пользуешь ISR — страница будет пересобираться раз в сутки
export const revalidate = 86400;
