import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { StakeContract } from '../build/StakeContract/StakeContract_StakeContract';
import '@ton/test-utils';

describe('StakeContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let stakeContract: SandboxContract<StakeContract>;

    //let admin: Address;
    beforeEach(async () => {
        blockchain = await Blockchain.create();
        
        stakeContract = blockchain.openContract(await StakeContract.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await stakeContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 1n,
            },
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: stakeContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and stakeContract are ready to use
    });


    it('should recieve a stake, return a stake by sender address, return all stakes', async () => {
        const totalValueBefore = await stakeContract.getTotalStaked();
        console.log("before all", totalValueBefore);

        await stakeContract.send(deployer.getSender(), {
            value: toNano('3.1')
        },
        {
            $$type: 'AddStake',
            amount: 3n,
            //queryId: ''
        })
        const totalValueAfter = await stakeContract.getTotalStaked();

        console.log("counter before/after", totalValueBefore, totalValueAfter);
        expect(totalValueBefore).toBeLessThan(totalValueAfter)    
        
        //return a stake by sender address
        const stake = await stakeContract.getUserStake(deployer.address)
        expect(stake)
        console.log(' Address ', deployer.address, 'Stake ', stake)
        
        //return all stakes
        let stakesMap = await stakeContract.getAllStakes()
        console.log('all stakes: ', stakesMap)
        expect(stakesMap)

        
        const balanceStart = await stakeContract.getBalance();

        await stakeContract.send(deployer.getSender(), { //const res = 
            value: toNano('0.2')
        },
        {
            $$type: 'Withdraw',
            amount: 1n,
            target: deployer.address
        })
        const balanceEnd = await stakeContract.getBalance();
        //const balanceCompany = await company.getBalance();
        console.log(balanceStart, balanceEnd) //res, balanceCompany)
        
        const start = await stakeContract.getBalance();
/*
        console.log('balance before drain', start)

        await stakeContract.send(deployer.getSender(), {
            value: toNano('0.2')
        }, "drain")
*/
        const inbetween = await stakeContract.getBalance();
        console.log('balance inbetween', inbetween)

await stakeContract.send(deployer.getSender(), {
            value: toNano('6.1')
        },
        {
            $$type: 'AddStake',
            amount: 6n,
            //queryId: ''
        })

/**/
await stakeContract.send(deployer.getSender(), {
            value: toNano('0.2')
        },
        {
            $$type: 'Drain',
            target: deployer.address
        }) 
        

        
        const end = await stakeContract.getBalance();
        console.log(start, end) //res, balanceCompany)
    });

     it('should return current admin and update after SetAdmin', async () => {
    // initially admin should be the deployer (sender in init)
    const adminBefore = await stakeContract.getContractAdmin();
    console.log('be4', adminBefore)
    //expect(adminBefore.equals(deployer.address)).toBe(true);

    // create a new treasury to act as next admin
    const nextAdmin = await blockchain.treasury('nextAdmin');

    // call SetAdmin from current admin (deployer)
    await stakeContract.send(
      deployer.getSender(),
      { value: toNano('0.05') },
      { $$type: 'SetAdmin', newAdmin: nextAdmin.address },
    );

    // verify that getAdmin returns the new admin address
    const adminAfter = await stakeContract.getContractAdmin();
    expect(adminAfter.equals(nextAdmin.address)).toBe(true);
  });


    it('should Withdraw, than drain', async () => {
        await stakeContract.send(deployer.getSender(), {
            value: toNano('6.1')
        },
        {
            $$type: 'AddStake',
            amount: 6n,
            //queryId: ''
        })
        const balanceStart = await stakeContract.getBalance();
        console.log('balance before withdraw', balanceStart)


        const res = await stakeContract.send(deployer.getSender(), {
            value: toNano('0.2')
        },
        {
            $$type: 'Withdraw',
            amount: 3n,
            target: deployer.address
        })
        const balanceEnd = await stakeContract.getBalance();
        //const balanceCompany = await company.getBalance();
        console.log(balanceStart, balanceEnd) //res, balanceCompany)

        //expect(balanceCompany).toEqual(balanceFundStart - balanceFundEnd);

    });
});

/*
  it('should recieve a stake AI method', async () => {
    const totalValueBefore = await stakeContract.getTotalStaked();

        await stakeContract.send(deployer.getSender(), {
            value: toNano('0.2')
        },
        {
            $$type: 'StakeAI',
            amount: 3n,
            //queryId: ''
        })
        const totalValueAfter = await stakeContract.getTotalStaked();

        console.log("counter before/after", totalValueBefore, totalValueAfter);
        expect(totalValueBefore).toBeLessThan(totalValueAfter)    
        
    });
*/