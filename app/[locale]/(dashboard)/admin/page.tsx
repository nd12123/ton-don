"use client";
import { Jetton } from "@/components/Jetton";
import { Button } from "@/components/ui/button";

import { FlexBoxCol, FlexBoxRow } from "../../../../components/styled/styled";
import { CHAIN, useTonWallet } from "@tonconnect/ui-react" //TonConnectButton
//import { useTonConnect } from "@/lib/ton/useTonConnect";

import { Address } from "@ton/core";

import { RequireAdmin } from "@/components/RequireAdmin"
import AdminStakesTable from "@/components/AdminStakesTable";

export default function AdminPage(){
      const wallet = useTonWallet()

    return(
        <RequireAdmin>
                <FlexBoxCol>
                  <FlexBoxRow>
                    {/*<TonConnectButton/>*/}
                    <Button>
            {wallet?.account?.chain === CHAIN.MAINNET ? "mainnet"
              : wallet?.account?.chain === CHAIN.TESTNET ? "testnet"
              : "N/A"}
                    </Button>
                    <Button>
                      {wallet
                          ? Address.parse(wallet.account.address).toString()
                        : "N/A"}
                    </Button>
                  </FlexBoxRow>
                  <Jetton />
    <main className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">Admin · Stakes</h1>
      <AdminStakesTable />
    </main>
                  {/*<StakePanel />*/}
                </FlexBoxCol>
        </RequireAdmin>
    )
}