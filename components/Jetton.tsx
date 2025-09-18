"use client"; //not sure
import { Address } from "@ton/core";
import { useStakeContract } from "@/lib/ton/useContract";
import { useTonConnect } from "@/lib/ton/useTonConnect";
//import { useStakeDeploy } from "@/lib/ton/useStakeDeploy";
import { useState }         from "react";
import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Button,
  Ellipsis,
} from "./styled/styled";

//import {useGetAdmin} from "@/lib/ton/useGetAdmin"

export function Jetton() {
  //const { deploy } = useStakeDeploy();
  const { wallet, connected } = useTonConnect();
  const { contractAddress, totalStaked, userStake, stakeTon, withdrawTarget, withdrawAmount, drain, owner } = useStakeContract(); //admin


  
    const [amount, setAmount] = useState(0);
    const [stakeAmount, setStakeAmount] = useState(0)
    const [target, setTarget] = useState("");
  

  return (
    <Card title="Contract">
      <FlexBoxCol>
        <h3>Smart Contract</h3>

        <FlexBoxRow>
          <strong>Your Wallet:</strong>
          <Ellipsis>
            {wallet ? Address.parse(wallet).toString() : "Loading..."}
          </Ellipsis>
        </FlexBoxRow>

        <FlexBoxRow>
          <strong>Contract Address:</strong>
          <Ellipsis>
            {contractAddress ?? "Loading..."}
          </Ellipsis>
        </FlexBoxRow>

        <FlexBoxRow>
          <strong>Owner Address:</strong>
          <Ellipsis>
                        {owner ? owner.toString() : "Loading..."}
            {/**  {admin ? Address.parse(admin).toString() : "Loading..."} */}
          </Ellipsis>
        </FlexBoxRow>

        <FlexBoxRow>
          <strong>Total Staked:</strong>
          <Ellipsis>
            {totalStaked.toString()}
          </Ellipsis>
        </FlexBoxRow>

        <FlexBoxRow>
          <strong>Your Stake:</strong>
          <Ellipsis>
            {userStake.toString()}
          </Ellipsis>
        </FlexBoxRow>


        <FlexBoxRow>
          
    <div className="p-6 bg-white text-black rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">Стейкинг</h2>
      <p>Общий стейк: {totalStaked.toString()} TON</p>
      <p>Ваш стейк: {userStake.toString()} TON</p>

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

      <div className="flex gap-2">
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
          className="border p-1 rounded flex-1"
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