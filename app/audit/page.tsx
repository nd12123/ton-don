// app/audit/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security Audit | TON Stake",
  description: "Certik audit (PDF)",
  robots: { index: false, follow: false },
};

export default function AuditPage() {
  const pdfHref = "/docs/CertiK_TONStake_Liquid_Staking_Protocol.pdf";
  return (
    <main className="min-h-screen text-white">
      <section className="w-full max-w-[1400px] mx-auto px-2 sm:px-3 md:px-4 py-4 md:py-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Security Audit</h1>
        <p className="text-gray-300 mb-4 md:mb-5">
          Below is the audit report. You can also{" "}
          <Link href={pdfHref} target="_blank" className="text-sky-400 underline">
            open the PDF in a new tab
          </Link>{" "}
          or download it.
        </p>

        {/* Почти во всю ширину, без скругления на мобайле */}
        <div className="w-full overflow-hidden ring-1 ring-white/10 bg-black/10 rounded-none md:rounded-xl">
          <object data={pdfHref} type="application/pdf" className="w-full h-[80vh]">
            <iframe src={pdfHref} className="w-full h-[80vh]" />
          </object>
        </div>

        <div className="mt-4 md:mt-5">
          <Link
            href={pdfHref}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-sky-600 hover:bg-sky-500 transition"
          >
            Download PDF
            <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-90">
              <path fill="currentColor" d="M5 20h14v-2H5v2Zm7-3l5-5h-3V4h-4v8H7l5 5Z" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
