"use client";

import { Address } from "@ton/core";
import { useStakeContract } from "@/lib/ton/useContract";
import { useTonConnect } from "@/lib/ton/useTonConnect";
import { useState, useMemo } from "react";
import { Card, FlexBoxCol, FlexBoxRow, Button, Ellipsis } from "./styled/styled";

// ✂️ адрес вида EQ... / 0:... в короткий вид
function shortAddr(s?: string | null, head = 6, tail = 6) {
  if (!s) return "";
  const str = String(s);
  if (str.length <= head + tail + 3) return str;
  return `${str.slice(0, head)}…${str.slice(-tail)}`;
}

// безопасный парс адреса (если прилетит friendly/raw)
function safeAddrString(a?: string | null): string {
  if (!a) return "";
  try {
    return Address.parse(a).toString(); // raw 0:…; если хочешь friendly — parseFriendly + .toString()
  } catch {
    return a;
  }
}

export function Jetton() {
  const { wallet, connected } = useTonConnect();
  const {
    contractAddress,
    totalStaked,
    userStake,
    stakeTon,
    withdrawTarget,
    withdrawAmount,
    drain,
    owner,
  } = useStakeContract();

  const [amount, setAmount] = useState(0);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [target, setTarget] = useState("");

  // готовим полные/короткие строки один раз за рендер
  const walletFull = useMemo(() => (wallet ? safeAddrString(wallet) : ""), [wallet]);
  const walletShort = useMemo(() => shortAddr(walletFull), [walletFull]);

  const contractFull = useMemo(
    () => (contractAddress ? safeAddrString(contractAddress) : ""),
    [contractAddress]
  );
  const contractShort = useMemo(() => shortAddr(contractFull), [contractFull]);

  const ownerFull = useMemo(() => (owner ? safeAddrString(owner) : ""), [owner]);
  const ownerShort = useMemo(() => shortAddr(ownerFull), [ownerFull]);

  return (
    // ограничиваем ширину карточки на мобиле, чтобы длинные строки не растягивали вьюпорт
    <div className="w-full max-w-[600px] sm:max-w-none overflow-hidden">
      <Card title="Contract">
        <FlexBoxCol className="min-w-0">
          <h3 className="text-white/90 mb-2">Smart Contract</h3>

          {/* Каждая строка умеет ужиматься */}
          <FlexBoxRow className="min-w-0">
            <strong className="shrink-0 mr-2">Your Wallet:</strong>
            <Ellipsis className="min-w-0 max-w-full overflow-hidden">
              {/* короткий на мобиле */}
              <span className="sm:hidden font-mono">{walletShort || "Loading..."}</span>
              {/* полный на ≥sm */}
              <span className="hidden sm:inline font-mono">
                {walletFull || "Loading..."}
              </span>
            </Ellipsis>
          </FlexBoxRow>

          <FlexBoxRow className="min-w-0">
            <strong className="shrink-0 mr-2">Contract Address:</strong>
            <Ellipsis className="min-w-0 max-w-full overflow-hidden">
              <span className="sm:hidden font-mono">
                {contractShort || "Loading..."}
              </span>
              <span className="hidden sm:inline font-mono">
                {contractFull || "Loading..."}
              </span>
            </Ellipsis>
          </FlexBoxRow>

          <FlexBoxRow className="min-w-0">
            <strong className="shrink-0 mr-2">Owner Address:</strong>
            <Ellipsis className="min-w-0 max-w-full overflow-hidden">
              <span className="sm:hidden font-mono">{ownerShort || "Loading..."}</span>
              <span className="hidden sm:inline font-mono">
                {ownerFull || "Loading..."}
              </span>
            </Ellipsis>
          </FlexBoxRow>

          <FlexBoxRow className="min-w-0">
            <strong className="shrink-0 mr-2">Total Staked:</strong>
            <Ellipsis className="min-w-0 max-w-full overflow-hidden">
              {totalStaked.toString()}
            </Ellipsis>
          </FlexBoxRow>

          <FlexBoxRow className="min-w-0">
            <strong className="shrink-0 mr-2">Your Stake:</strong>
            <Ellipsis className="min-w-0 max-w-full overflow-hidden">
              {userStake.toString()}
            </Ellipsis>
          </FlexBoxRow>

          {/* нижняя панель управления: тоже не даём расползаться */}
          <FlexBoxRow className="min-w-0">
            <div className="w-full max-w-[520px] sm:max-w-none p-4 sm:p-6 bg-white text-black rounded shadow space-y-4 overflow-hidden">
              <h2 className="text-lg sm:text-xl font-semibold">Стейкинг</h2>
              <p className="truncate">Общий стейк: {totalStaked.toString()} TON</p>
              <p className="truncate">Ваш стейк: {userStake.toString()} TON</p>

              <div className="flex gap-2">
                <input
                  type="number"
                  min={1}
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(Number(e.target.value))}
                  className="border p-1 rounded w-24"
                />
                <button
                  className="bg-green-500 text-white px-3 rounded disabled:opacity-50"
                  disabled={stakeAmount <= 0}
                  onClick={() => stakeTon(stakeAmount)}
                >
                  Stake
                </button>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="border p-1 rounded w-24"
                />
                <input
                  type="text"
                  placeholder="Адрес для Withdraw"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="border p-1 rounded flex-1 min-w-0"
                />
                <button
                  className="bg-red-500 text-white px-3 rounded disabled:opacity-50"
                  disabled={amount <= 0 || target === ""}
                  onClick={() => withdrawTarget(amount, target)}
                >
                  Withdraw
                </button>
              </div>
            </div>
          </FlexBoxRow>
        </FlexBoxCol>
      </Card>
    </div>
  );
}


{/** 
        <FlexBoxRow>
          <Button
            disabled={!connected}
            style={{ backgroundColor: '#0070f3', color: '#fff' }}
            onClick={() => stakeTon(1)}
          >
            Stake 1 TON
          </Button>
        </FlexBoxRow>

        <FlexBoxRow>
          <Button
            disabled={!connected } //|| userStake === 0n
            style={{ backgroundColor: '#e00', color: '#fff' }}
            onClick={() => withdrawAmount(1)} //0QAmQUOW2aGZb8uGmDd8fhhcs7u5NpzzmybooQo46PzGleIL 
          >
            Withdraw Stake
          </Button>
        </FlexBoxRow>

        <FlexBoxRow>
          <Button
            disabled={!connected } //|| userStake === 0n
            style={{ backgroundColor: '#e00', color: '#fff' }}
            onClick={() => drain("EQAmQUOW2aGZb8uGmDd8fhhcs7u5NpzzmybooQo46PzGlQRE")} //0QAmQUOW2aGZb8uGmDd8fhhcs7u5NpzzmybooQo46PzGleIL 
          >
            Drain
          </Button>
        </FlexBoxRow>


        <FlexBoxRow>
          <Button
            disabled={!connected}
            style={{ backgroundColor: '#ffa500', color: '#000' }}
            onClick={() => deploy()}
          >
            Deploy Contract
          </Button>
        </FlexBoxRow>*/}