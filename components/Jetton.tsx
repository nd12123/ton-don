
import { Address } from "@ton/core";
//import { useJettonContract } from "../hooks/useJettonContract";
import { useStakeContract } from "../lib/ton/useContract";
import { useTonConnect } from "@/lib/ton/useTonConnect";
import { useStakeDeploy } from "@/lib/ton/useStakeDeploy";
import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Button,
  Ellipsis,
} from "./styled/styled";
export function Jetton() {
  const {deploy} = useStakeDeploy()
  const { wallet, connected} = useTonConnect() //connected
  //const {jettonWalletAddress, balance, mint} = useStakeContract()
    //const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

  const  {contractAddress, totalStaked, userStake, stakeScript} =  useStakeContract() // mint,address totalStaked, userStake, stakeTon, withdrawTon

  return (
    <Card title="Contract">
      <FlexBoxCol>
        <h3>Smart-Contract</h3>
        <FlexBoxRow>
          Wallet
          <Ellipsis>{ wallet ? Address.parse(wallet as string).toString() : "Loading..."}</Ellipsis>
        </FlexBoxRow>
        <FlexBoxRow>
          Contract Wallet
          <Ellipsis>{contractAddress ? contractAddress : "Loading..."}</Ellipsis>
        </FlexBoxRow>
                <FlexBoxRow>
          TotalStaked
          <Ellipsis>
     { totalStaked !== undefined
        ? totalStaked.toString()
        : "Loading…"
     }</Ellipsis>
        </FlexBoxRow>

        <FlexBoxRow>
          Balance
          <div>{userStake ?? "Loading..."}</div>
        </FlexBoxRow>
        
        <FlexBoxRow>
        <Button
          disabled={!connected} onClick={() => {
     // здесь React ожидает void, а мы запускаем асинхронную логику
     stakeScript(1);
   }}>
        </Button>
        </FlexBoxRow>
        
        <FlexBoxRow>
        <Button
          disabled={!connected} onClick={deploy}>
        </Button>
        </FlexBoxRow>
        
        {/**
        <Button>
          disabled={!connected} onClick={mint}>
          </FlexBoxCol>Mint jettons
        </Button>
         */}
      </FlexBoxCol>
    </Card>
    
  );
}

/*
  */