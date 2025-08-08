import "@stdlib/deploy";
import "@stdlib/ownable";

message AddStake {
    amount: Int as uint32;
}
message(0x4dfc3641) WithdrawAmount {
    amount: Int as uint128;
    //target: Address;
}

message SetAdmin {
    newAdmin: Address;
}

message Drain {
    target: Address;
}

contract StakeContract with Deployable, Ownable  { //
    totalStaked: Int; // as uint128
    //admin: Address;
    balance: Int;
    owner: Address;
    admin: Address;
    
    const MinTonForStorage: Int = ton("0.03");

    mapStakes: map<Address, Int>; 

    init(){
        self.totalStaked = 0;
        self.balance = 0;
        self.mapStakes = emptyMap();
        //self.admin = sender();
        self.admin = sender();
        self.owner = sender();
        //self.admin = 'EQBGhqLAZseEqRXz4ByFPTGV7SVMlI4hrbs-Sps_Xzx01x8G'; //example
    }



    receive(msg: AddStake) {
        let user: Address = sender();
        let stakeAmount: Int = msg.amount;
        
        require(stakeAmount > 0, "Nothing to stake");
        require(msg.amount * 1000000000 < context().value, "Mismatch stake");
        // Get current stake
        //let current: Int = self.mapStakes.get(sender) 0; //?? 0
        // Получаем опциональный предыдущий стейк
        let prevOpt = self.mapStakes.get(user);
        // Распаковываем nullable Int
        let current: Int = 0;
        if (prevOpt == null) {
            current = 0;
        } else {
            current = prevOpt!!;
        }
        // Update mapping and total
        self.mapStakes.set(user, current + stakeAmount); 
        self.totalStaked += stakeAmount;
        self.balance += stakeAmount;
        cashback(sender());
    }
/*
    receive(msg: Withdraw) {
        //require(sender() == self.admin, "Only admin");
        //require(self.balance >= msg.amount, "We're bunkrupt");
        //self.balance -= msg.amount;
        let amount = msg.amount; // * 1_000_000_000
        send(SendParameters{
            to: sender(),//msg.target,
            value: ton("1"), //amount,// msg.amount,
            bounce: true,
            mode:  SendIgnoreErrors, //SendIgnoreErrors, //SendRemainingValue
            //body: //Deposit{amount: msg.amount}.toCell()
        });
    }
    */

// Безопасный вывод фиксированной суммы
receive(msg: WithdrawAmount) {
    // Минимальный запас на хранение
    let reserve: Int = self.MinTonForStorage;

    // Сколько реально можно потратить
    let spendable: Int = myBalance() - reserve;
    if (spendable < 0) {
        spendable = 0;
    }

    // Фактическая сумма вывода
    let amount: Int = min(msg.amount, spendable);

    require(amount > 0, "Insufficient balance");

    // Отправляем, как в Drain, но с лимитом суммы
    send(SendParameters{
        to: sender(),
        bounce: true,
        value: amount,
        mode: SendRemainingValue + SendIgnoreErrors
    });

    // Обновляем внутренний учёт, если нужен
    self.balance -= amount;

    self.reply("withdrawn".asComment());
}



  //self.reply(("OK withdraw="+amount.toString()).asComment());


        //require(sender() == self.deployer, "Only deployer is allowed to withdraw");
        //let amount: Int = min(msg.amount, myBalance() - context().value - self.MinTonForStorage);
    // посчитать сколько можно безопасно отправить
    /*
    let reserve: Int = self.MinTonForStorage;              // например, 0.01 TON в нанотонах
    let spendable: Int = self.balance - reserve;
    let amount: Int = min(msg.amount, spendable);

    require(amount > 0, "Insufficient balance");
    
        //require(amount > 0, "Insufficient balance");
        send(SendParameters{
            to: sender(), //self.owner
            bounce: true,
            value: amount,
            mode: 0,//SendRemainingValue + SendIgnoreErrors
        });
        self.balance -= amount;
        self.reply("withdrawn".asComment())
        }
        */
    

    // Эмердженси-дрейн: сливаем всё на admin
    receive(msg: Drain) {
        //require(sender() == self.admin, "Only admin");
        //let amount = self.balance  * 1000000000- context().value - self.minTonForStorage; //much less than 0
        let amount = self.balance - 1;
        send(SendParameters{
            to:    sender(),
            value: amount,//amount,
            bounce: true,
            mode:  SendRemainingBalance + SendIgnoreErrors //SendRemainingValue
        });
        self.balance -= amount;
        self.reply("drained".asComment())
    }

    //bounced(){}
    /*
receive("drain"){
    require(sender() == self.admin, "Only admin");
    send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            //body: Deposit{amount: msg.amount}.toCell()
        });
self.balance = 0;
}
*/


// Изменить администратора может только текущий admin
/*
    receive(msg: SetAdmin) {
        require(sender() == self.admin, "Only admin");
        self.admin = msg.newAdmin;
    }
    */

    get fun contractAdmin(): Address{
        return self.admin;
    }

    get fun userStake(key: Address):  Int? {
        return self.mapStakes.get(key);
    }
    get fun allStakes(): map<Address, Int>{
        return self.mapStakes;
    }
    get fun totalStaked(): Int{
        return self.totalStaked;
    }
    get fun balance(): Int{
        return self.balance;
    }
}

/*
Основная логика:
stake() — принимает входящий TON и фиксирует его стейк за юзером.
// accept funds from user and increase stake
receive("stake") {
    let value = msg.value;
    let sender = sender();

    // Get current stake
    let current = self.stakes.get(sender) ?? 0;

    // Update mapping and total
    self.stakes.set(sender, current + value);
    self.totalStaked += value;
}

withdraw() — позволяет юзеру снять ранее застейканные токены. (Withdraw-Admin)
// user initiates withdraw
receive("withdraw") {
    let sender = sender();
    let stake = self.stakes.get(sender) ?? 0;

    require(stake > 0, "Nothing to withdraw");

    // Clear storage and decrease TVL
    self.stakes.set(sender, 0);
    self.totalStaked -= stake;

    // Send back the funds
    send(sender, stake);
}

getUserStake(address) — view-функция, чтобы узнать баланс стейка. (?)
getTotalStake() — view-функция, чтобы показать TVL. (?)

VALID CODE:
message StakeAI {
    amount: Int as uint32;
}

    // Приём любых входящих транзакций без тела — это stake()
    receive(msg: StakeAI) {
        let amount = msg.amount; //value
        require(amount > 0, "Empty stake");

        let user = sender();
        // Получаем опциональный предыдущий стейк
        let prevOpt = self.mapStakes.get(user);
        // Распаковываем nullable Int
        let current: Int = 0;
        if (prevOpt == null) {
            current = 0;
        } else {
            current = prevOpt!!;
        }
        // Калькулируем новый стейк
        let updated = current + amount;
        self.mapStakes.set(user, updated);
        self.totalStaked += amount;
        self.balance += amount;
    }
*/