
import "@stdlib/deploy";
import "@stdlib/ownable";

message AddStake {
    amount: Int as uint32;
}
message Withdraw {
    amount: Int as uint32;
    target: Address;
}

message SetAdmin {
    newAdmin: Address;
}
message(0x4dfc3641) WithdrawAmount {
    amount: Int as uint128;
    //target: Address;
}

message Drain {
    target: Address;
}


contract LastContract with Deployable, Ownable {
    totalStaked: Int; // as uint128
    admin: Address;
    balance: Int;
    owner: Address;

    mapStakes: map<Address, Int>; 

    init(){
        self.totalStaked = 0;
        self.balance = 0;
        self.mapStakes = emptyMap();
        self.admin = sender();
        self.owner = sender();
        //self.admin = 'EQBGhqLAZseEqRXz4ByFPTGV7SVMlI4hrbs-Sps_Xzx01x8G'; //example
    }



    receive(msg: AddStake) {
        let user: Address = sender();
        //let stakeAmount: Int = msg.amount;
        
        require(msg.amount > 0, "Nothing to stake");
        //require(msg.amount * 1000000000 < context().value, "Mismatch stake");
        require(context().value >= msg.amount * ton("1"), "Mismatch stake");

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
        self.mapStakes.set(user, current + msg.amount);//stakeAmount); 
        self.totalStaked += msg.amount;//stakeAmount;
        self.balance += msg.amount;//stakeAmount;
        //cashback(sender());
    }

    receive(msg: Withdraw) {
    require(sender() == self.admin, "Only admin");

    // резерв под хранение/комиссии (подбери под себя; 0.02 TON — с запасом)
    let reserveNano: Int = ton("0.02");

    // сколько контракт реально может отправить в ТОН
    let spendableTon: Int = (myBalance() - reserveNano) / ton("1");
    let amountTon: Int = min(msg.amount, max(spendableTon, 0));

    // и по учёту стейков тоже нельзя уйти в минус
    require(self.balance >= amountTon, "We're bunkrupt");
    require(amountTon > 0, "Insufficient balance");

    self.balance -= amountTon;

    send(SendParameters{
        to: msg.target,
        bounce: true,
        value: amountTon * ton("1"),   // ТОН -> нанотоны
        mode: 0                        // фиксированная отправка
    });
}

    // Эмердженси-дрейн: сливаем всё на admin
    receive(msg: Drain) {
        require(sender() == self.owner, "Only admin");
        //let amount = self.balance  * 1000000000- context().value - self.minTonForStorage; //much less than 0
        //let amount = self.balance - 1;
        send(SendParameters{
            to:    sender(),
            value: 0,//amount,
            bounce: true,
            mode:  SendRemainingBalance + SendIgnoreErrors //SendRemainingValue
        });
        self.balance = 0;
        self.reply("drained".asComment())
    }

    
// безопасный частичный вывод (ТОН) с резервом на хранение (только админ)
    receive(msg: WithdrawAmount) {
        require(sender() == self.admin, "Only admin");

        // небольшой резерв в нанотонах
        let reserveNano: Int = ton("0.02");

        // сколько реально можем вывести в ТОН
        let spendableTon: Int = (myBalance() - reserveNano) / ton("1");
        let amountTon: Int = min(msg.amount, max(spendableTon, 0));
        require(amountTon > 0, "Insufficient balance");

        // учёт в ТОН
        require(self.balance >= amountTon, "We're bunkrupt");
        self.balance -= amountTon;

        // отправка в нанотонах
        send(SendParameters{
            to: sender(),
            bounce: true,
            value: amountTon * ton("1"),
            mode: 0
        });

        self.reply("withdrawn".asComment());
    }



// Изменить администратора может только текущий admin
    receive(msg: SetAdmin) {
        require(sender() == self.admin || sender() == self.owner, "Only admin/owner");
        self.admin = msg.newAdmin;
    }

    get fun admin(): Address{
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
    
/*
    receive(msg: Withdraw) {
        require(sender() == self.admin, "Only admin");
        require(self.balance >= msg.amount, "We're bunkrupt");
        self.balance -= msg.amount;
        send(SendParameters{
            to: msg.target,
            value: msg.amount,
            mode: 0, //SendRemainingValue + SendIgnoreErrors,
            //body: //Deposit{amount: msg.amount}.toCell()
        });
    }
    //bounced(){}
    */

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
}
