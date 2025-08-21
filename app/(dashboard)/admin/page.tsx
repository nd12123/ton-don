"use client";
import { Jetton } from "@/components/Jetton";
import { Button } from "@/components/ui/button";

import { FlexBoxCol, FlexBoxRow } from "../../../components/styled/styled";
import { CHAIN, useTonWallet } from "@tonconnect/ui-react" //TonConnectButton
//import { useTonConnect } from "@/lib/ton/useTonConnect";

import { Address } from "@ton/core";

import { RequireAdmin } from "@/components/RequireAdmin"

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
                  {/*<StakePanel />*/}
                </FlexBoxCol>
        </RequireAdmin>
    )
}