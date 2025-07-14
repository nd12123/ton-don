import React from 'react';
import { Wallet } from 'lucide-react';

export default function ConnectWalletButton() {
  return (
    <button
      type="button"
      className="
        relative flex items-center justify-center
        w-52 h-11
        rounded-xl
        bg-[radial-gradient(ellipse_179.05%_152.88%_at_74.38%_155.56%,_#3DD4FF_0%,_#0098EA_100%)]
        outline outline-1 outline-offset-[-1px] outline-sky-400
        overflow-hidden
        transition-transform
        hover:scale-105
        focus:ring-2 focus:ring-sky-400 focus:outline-none
      "
    >
      <Wallet className="w-4 h-4 text-white mr-2" />
      <span className="text-white text-lg font-semibold font-['Inter'] leading-tight">
        Connect Wallet
      </span>
    </button>
  );
}
