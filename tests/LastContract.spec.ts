import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { LastContract } from '../build/LastContract/LastContract_LastContract';
import '@ton/test-utils';


describe('LastContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let user: SandboxContract<TreasuryContract>;
    let contract: SandboxContract<LastContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        deployer = await blockchain.treasury('deployer');
        user = await blockchain.treasury('user');

        contract = blockchain.openContract(await LastContract.fromInit());

        const deployResult = await contract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: contract.address,
            deploy: true,
            success: true,
        });
    });

    it('should add stake', async () => {
        const res = await contract.send(
            user.getSender(),
            {
                value: toNano('5.1'), // 1 TON стейк + небольшой запас
            },
            {
                $$type: 'AddStake',
                amount: 5n,
            }
        );

        expect(res.transactions).toHaveTransaction({
            from: user.address,
            to: contract.address,
            success: true,
        });

        // проверяем, что stake сохранился
        const st = await contract.getUserStake(user.address);
        expect(st?.toString()).toBe('5');
    });

    it('should withdraw by admin', async () => {
        // сначала застейкаем
        await contract.send(
            user.getSender(),
            { value: toNano('2') },
            { $$type: 'AddStake', amount: 2n }
        );

        // выводим как админ (deployer)
        const res = await contract.send(
            deployer.getSender(),
            { value: toNano('0.1') },
            {
                $$type: 'Withdraw',
                amount: 1n,
                target: user.address,
            }
        );

        expect(res.transactions).toHaveTransaction({
            from: contract.address,
            to: user.address,
            success: true,
        });
    });

    it('should drain balance by admin', async () => {
        // застейкаем
        await contract.send(
            user.getSender(),
            { value: toNano('3') },
            { $$type: 'AddStake', amount: 3n }
        );

        const res = await contract.send(
            deployer.getSender(),
            { value: toNano('0.05') },
            { $$type: 'Drain', target: deployer.address }
        );

        expect(res.transactions).toHaveTransaction({
            from: contract.address,
            to: deployer.address,
            success: true,
        });
    });

    it('should withdraw amount safely', async () => {
        // застейкаем
        await contract.send(
            user.getSender(),
            { value: toNano('5') },
            { $$type: 'AddStake', amount: 5n }
        );

        const res = await contract.send(
            deployer.getSender(),
            { value: toNano('0.05') },
            { $$type: 'WithdrawAmount', amount: toNano('2') }
        );

        expect(res.transactions).toHaveTransaction({
            from: contract.address,
            to: deployer.address,
            success: true,
        });
    });

    it('should change admin', async () => {
        await contract.send(
            deployer.getSender(),
            { value: toNano('0.05') },
            { $$type: 'SetAdmin', newAdmin: user.address }
        );

        const newAdmin = await contract.getAdmin();
        expect(newAdmin.equals(user.address)).toBe(true);
    });
});
