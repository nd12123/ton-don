pragma ton-solidity >= 0.47.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

contract MyContract {
    uint64 public timestamp;

    constructor() {
        require(tvm.pubkey() != 0, 101);
        tvm.accept();
        timestamp = block.timestamp;
    }

    fallback() external pure {
        // ничего
    }

    receive() external {
        tvm.accept();
        timestamp = block.timestamp;
    }

    function renderHelloWorld() public pure returns (string) {
        return "helloWorld";
    }

    function touch() external {
        require(msg.pubkey() == tvm.pubkey(), 102);
        tvm.accept();
        timestamp = block.timestamp;
    }

    function sendValue(
        address dest,
        uint128 amount,
        bool bounce
    ) public view {
        require(msg.pubkey() == tvm.pubkey(), 102);
        tvm.accept();
        // именно так: amount, потом bounce, потом flags
        dest.transfer(uint16(amount), bounce, uint16(128));
    }
}
