import { toNano } from '@ton/core';
import { LastContract } from '../build/LastContract/LastContract_LastContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const lastContract = provider.open(await LastContract.fromInit());

    await lastContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
            {
                $$type: 'Deploy',
                queryId: 1n,
            },
    );

    await provider.waitForDeploy(lastContract.address);

    // run methods on `lastContract`
}
