// app/[locale]/privacy/page.tsx
//"use client";

import React from "react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen text-white">
      <section className="container mx-auto px-4 py-10 md:py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-sm text-white/60 mb-8">Last updated: 2025-01-01</p>

        <div className="prose prose-invert max-w-none">
          <h2>1. Overview</h2>
          <p>
            This Privacy Policy explains what information we (the “Service”) collect and how we use
            it. We aim to collect the minimum necessary to operate the Service.
          </p>

          <h2>2. Data We Process</h2>
          <ul>
            <li>
              <strong>Public wallet data:</strong> addresses, balances, and transactions available
              on public blockchains.
            </li>
            <li>
              <strong>Technical logs:</strong> basic diagnostics (e.g., request time, errors) to
              keep the Service reliable.
            </li>
            <li>
              <strong>Support messages:</strong> if you contact us, we process the data you provide
              (e.g., email, message content) to respond.
            </li>
          </ul>

          <h2>3. What We Don’t Collect</h2>
          <p>
            We do not collect private keys, seed phrases, or any credentials that could control your
            wallet. Never share these with anyone.
          </p>

          <h2>4. Cookies & Analytics</h2>
          <p>
            We may use minimal cookies or privacy-respecting analytics to understand usage and
            improve the Service. You can block cookies in your browser settings.
          </p>

          <h2>5. How We Use Data</h2>
          <ul>
            <li>Provide and maintain the Service;</li>
            <li>Improve performance, reliability, and security;</li>
            <li>Respond to support requests;</li>
            <li>Comply with legal obligations where applicable.</li>
          </ul>

          <h2>6. Sharing</h2>
          <p>
            We do not sell your personal data. We may share limited data with infrastructure
            providers (e.g., hosting, monitoring) solely to operate the Service, under appropriate
            safeguards.
          </p>

          <h2>7. International Transfers</h2>
          <p>
            Data may be processed in jurisdictions different from yours. We take reasonable measures
            to protect data during transfer.
          </p>

          <h2>8. Security</h2>
          <p>
            We use reasonable technical and organizational measures. However, no online service can
            guarantee absolute security.
          </p>

          <h2>9. Your Rights</h2>
          <p>
            Subject to applicable law, you may request access, correction, or deletion of your
            support data. For blockchain data, please note it is public and immutable.
          </p>

          <h2>10. Changes</h2>
          <p>
            We may update this Policy from time to time by publishing a new version here. Continued
            use indicates acceptance.
          </p>

          <h2>11. Contact</h2>
          <p>
            Questions about this Policy:{" "}
            <a href="mailto:support@example.com">support@example.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}

export const revalidate = 86400;
