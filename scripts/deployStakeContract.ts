import { toNano } from '@ton/core';
import { StakeContract } from '../wrappers/StakeContract';

import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const stakeContract = provider.open(await StakeContract.fromInit());

    await stakeContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
            {
                $$type: 'Deploy',
                queryId: 1n,
            },
    );

    await provider.waitForDeploy(stakeContract.address);

    // run methods on `stakeContract`
}

/*
// scripts/deployStakeContract.ts
import { toNano } from '@ton/core';
import { StakeContract } from '../wrappers/StakeContract';
//import { StakeContract } from '../build/StakeContract/StakeContract_StakeContract';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
  // 1) Скомпилировать контракт и сгенерировать TS-обёртку в папке wrappers/
  await compile('StakeContract');

  // 2) Получить отправителя (deployer) из провайдера
  const sender = provider.sender();
  if (!sender.address) {
    throw new Error('Sender address is required');
  }
  console.log('⛽ Using deployer:', sender.address.toString());

  // 3) Открыть контракт, передав в fromInit адрес деплойера
  const stake = provider.open(
    await StakeContract.fromInit() //sender.address
  );

  // 4) Отправить Deploy-сообщение с 0.05 TON
  await stake.send(
    sender,
    { value: toNano('0.05') },
    {
      $$type: 'Deploy',
      queryId: 0n,
    }
  );
  console.log('🚀 Deploy tx sent');

  // 5) Подождать, пока контракт появится в сети
  await provider.waitForDeploy(stake.address);
  console.log('✅ Deployed at:', stake.address.toString());

  // 6) (опционально) вызвать геттер для проверки
  const total = await stake.getTotalStaked();
  console.log('🔢 TotalStaked initial value:', total.toString());
}
*/


/*


// This script uses ts-node to run TypeScript directly under Blueprint

// 1) Register ts-node to compile TS imports on the fly
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: { module: 'commonjs' }
});

// 2) Load environment variables
require('dotenv/config');

// 3) Import TON SDK modules via CommonJS
const { toNano } = require('@ton/core');
const { NetworkProvider } = require('@ton/blueprint');
const { StakeContract } = require('../build/StakeContract/StakeContract_StakeContract');

// 4) Blueprint will call as provider->run(provider)
module.exports.run = async function(provider = NetworkProvider) {
  // Deployer account from env (private key loaded by NetworkProvider)
  const deployer = provider.sender();

  // Instantiate contract (admin = deployer.address)
  const contract = provider.open(
    await StakeContract.fromInit(deployer.address)
  );

  // Reserve 0.05 TON for deploying
  const deployValue = toNano('0.05');

  // Send Deploy transaction
  const { transaction } = await contract.send(
    deployer,
    { value: deployValue },
    { $$type: 'Deploy', queryId: 0n }
  );

  console.log('✅ Contract deployed at:', contract.address.toString());
  console.log('🔖 Transaction ID:', transaction.id);
};

    */