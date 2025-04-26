"use client";
import GetStartedButton from "@/components/GetStartedButton";

export default function Hero() {
  return (
    <section
      style={{
        backgroundImage: `url("/images/hero-bg.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative flex flex-col items-center justify-center
                 text-center h-[80vh] overflow-hidden"
    >
      {/* затемняющая накладка */}
      <div className="absolute inset-0 bg-black/30" />

      <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold
                     text-white max-w-3xl px-4">
        Stake TON Easily & Securely
      </h1>
      <p className="relative z-10 mt-4 text-lg md:text-xl
                    text-gray-200 max-w-2xl px-4">
        Earn passive rewards by staking your TON tokens with trusted validators.
      </p>

      <div className="relative z-10 mt-8">
        <GetStartedButton />
      </div>
    </section>
  );
}
