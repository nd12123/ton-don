import { Address } from "@ton/core";
import { useStakeContract } from "@/lib/ton/useContract";
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
  const { deploy } = useStakeDeploy();
  const { wallet, connected } = useTonConnect();
  const { contractAddress, totalStaked, userStake, stakeTon, withdrawTon, admin } = useStakeContract();

  return (
    <Card title="Contract">
      <FlexBoxCol>
        <h3>Smart Contract</h3>

        <FlexBoxRow>
          <strong>Wallet:</strong>
          <Ellipsis>
            {wallet ? Address.parse(wallet).toString() : "Loading..."}
          </Ellipsis>
        </FlexBoxRow>

        <FlexBoxRow>
          <strong>Contract:</strong>
          <Ellipsis>
            {contractAddress ?? "Loading..."}
          </Ellipsis>
        </FlexBoxRow>

        <FlexBoxRow>
          <strong>Admin:</strong>
          <Ellipsis>
            {admin ? Address.parse(admin).toString() : "Loading..."}
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
            disabled={!connected || userStake === 0n}
            style={{ backgroundColor: '#e00', color: '#fff' }}
            onClick={() => withdrawTon(1, "0QAmQUOW2aGZb8uGmDd8fhhcs7u5NpzzmybooQo46PzGleIL")}
          >
            Withdraw Stake
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
        </FlexBoxRow>

      </FlexBoxCol>
    </Card>
  );
}
