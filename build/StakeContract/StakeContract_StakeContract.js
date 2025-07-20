"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadVarAddress = exports.storeVarAddress = exports.dictValueParserStdAddress = exports.storeTupleStdAddress = exports.loadGetterTupleStdAddress = exports.loadTupleStdAddress = exports.loadStdAddress = exports.storeStdAddress = exports.dictValueParserDeployParameters = exports.storeTupleDeployParameters = exports.loadGetterTupleDeployParameters = exports.loadTupleDeployParameters = exports.loadDeployParameters = exports.storeDeployParameters = exports.dictValueParserMessageParameters = exports.storeTupleMessageParameters = exports.loadGetterTupleMessageParameters = exports.loadTupleMessageParameters = exports.loadMessageParameters = exports.storeMessageParameters = exports.dictValueParserSendParameters = exports.storeTupleSendParameters = exports.loadGetterTupleSendParameters = exports.loadTupleSendParameters = exports.loadSendParameters = exports.storeSendParameters = exports.dictValueParserContext = exports.storeTupleContext = exports.loadGetterTupleContext = exports.loadTupleContext = exports.loadContext = exports.storeContext = exports.dictValueParserStateInit = exports.storeTupleStateInit = exports.loadGetterTupleStateInit = exports.loadTupleStateInit = exports.loadStateInit = exports.storeStateInit = exports.dictValueParserSignedBundle = exports.storeTupleSignedBundle = exports.loadGetterTupleSignedBundle = exports.loadTupleSignedBundle = exports.loadSignedBundle = exports.storeSignedBundle = exports.dictValueParserDataSize = exports.storeTupleDataSize = exports.loadGetterTupleDataSize = exports.loadTupleDataSize = exports.loadDataSize = exports.storeDataSize = void 0;
exports.loadGetterTupleDrain = exports.loadTupleDrain = exports.loadDrain = exports.storeDrain = exports.dictValueParserSetAdmin = exports.storeTupleSetAdmin = exports.loadGetterTupleSetAdmin = exports.loadTupleSetAdmin = exports.loadSetAdmin = exports.storeSetAdmin = exports.dictValueParserWithdraw = exports.storeTupleWithdraw = exports.loadGetterTupleWithdraw = exports.loadTupleWithdraw = exports.loadWithdraw = exports.storeWithdraw = exports.dictValueParserAddStake = exports.storeTupleAddStake = exports.loadGetterTupleAddStake = exports.loadTupleAddStake = exports.loadAddStake = exports.storeAddStake = exports.dictValueParserFactoryDeploy = exports.storeTupleFactoryDeploy = exports.loadGetterTupleFactoryDeploy = exports.loadTupleFactoryDeploy = exports.loadFactoryDeploy = exports.storeFactoryDeploy = exports.dictValueParserDeployOk = exports.storeTupleDeployOk = exports.loadGetterTupleDeployOk = exports.loadTupleDeployOk = exports.loadDeployOk = exports.storeDeployOk = exports.dictValueParserDeploy = exports.storeTupleDeploy = exports.loadGetterTupleDeploy = exports.loadTupleDeploy = exports.loadDeploy = exports.storeDeploy = exports.dictValueParserBasechainAddress = exports.storeTupleBasechainAddress = exports.loadGetterTupleBasechainAddress = exports.loadTupleBasechainAddress = exports.loadBasechainAddress = exports.storeBasechainAddress = exports.dictValueParserVarAddress = exports.storeTupleVarAddress = exports.loadGetterTupleVarAddress = exports.loadTupleVarAddress = void 0;
exports.StakeContract = exports.StakeContract_getterMapping = exports.StakeContract_errors_backward = exports.StakeContract_errors = exports.dictValueParserStakeContract$Data = exports.storeTupleStakeContract$Data = exports.loadGetterTupleStakeContract$Data = exports.loadTupleStakeContract$Data = exports.loadStakeContract$Data = exports.storeStakeContract$Data = exports.dictValueParserDrain = exports.storeTupleDrain = void 0;
const core_1 = require("@ton/core");
function storeDataSize(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}
exports.storeDataSize = storeDataSize;
function loadDataSize(slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize', cells: _cells, bits: _bits, refs: _refs };
}
exports.loadDataSize = loadDataSize;
function loadTupleDataSize(source) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize', cells: _cells, bits: _bits, refs: _refs };
}
exports.loadTupleDataSize = loadTupleDataSize;
function loadGetterTupleDataSize(source) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize', cells: _cells, bits: _bits, refs: _refs };
}
exports.loadGetterTupleDataSize = loadGetterTupleDataSize;
function storeTupleDataSize(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}
exports.storeTupleDataSize = storeTupleDataSize;
function dictValueParserDataSize() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    };
}
exports.dictValueParserDataSize = dictValueParserDataSize;
function storeSignedBundle(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeBuffer(src.signature);
        b_0.storeBuilder(src.signedData.asBuilder());
    };
}
exports.storeSignedBundle = storeSignedBundle;
function loadSignedBundle(slice) {
    const sc_0 = slice;
    const _signature = sc_0.loadBuffer(64);
    const _signedData = sc_0;
    return { $$type: 'SignedBundle', signature: _signature, signedData: _signedData };
}
exports.loadSignedBundle = loadSignedBundle;
function loadTupleSignedBundle(source) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle', signature: _signature, signedData: _signedData };
}
exports.loadTupleSignedBundle = loadTupleSignedBundle;
function loadGetterTupleSignedBundle(source) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle', signature: _signature, signedData: _signedData };
}
exports.loadGetterTupleSignedBundle = loadGetterTupleSignedBundle;
function storeTupleSignedBundle(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.signedData.asCell());
    return builder.build();
}
exports.storeTupleSignedBundle = storeTupleSignedBundle;
function dictValueParserSignedBundle() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSignedBundle(src)).endCell());
        },
        parse: (src) => {
            return loadSignedBundle(src.loadRef().beginParse());
        }
    };
}
exports.dictValueParserSignedBundle = dictValueParserSignedBundle;
function storeStateInit(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}
exports.storeStateInit = storeStateInit;
function loadStateInit(slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit', code: _code, data: _data };
}
exports.loadStateInit = loadStateInit;
function loadTupleStateInit(source) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit', code: _code, data: _data };
}
exports.loadTupleStateInit = loadTupleStateInit;
function loadGetterTupleStateInit(source) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit', code: _code, data: _data };
}
exports.loadGetterTupleStateInit = loadGetterTupleStateInit;
function storeTupleStateInit(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}
exports.storeTupleStateInit = storeTupleStateInit;
function dictValueParserStateInit() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    };
}
exports.dictValueParserStateInit = dictValueParserStateInit;
function storeContext(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}
exports.storeContext = storeContext;
function loadContext(slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context', bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}
exports.loadContext = loadContext;
function loadTupleContext(source) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context', bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}
exports.loadTupleContext = loadTupleContext;
function loadGetterTupleContext(source) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context', bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}
exports.loadGetterTupleContext = loadGetterTupleContext;
function storeTupleContext(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}
exports.storeTupleContext = storeTupleContext;
function dictValueParserContext() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    };
}
exports.dictValueParserContext = dictValueParserContext;
function storeSendParameters(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        }
        else {
            b_0.storeBit(false);
        }
        if (src.code !== null && src.code !== undefined) {
            b_0.storeBit(true).storeRef(src.code);
        }
        else {
            b_0.storeBit(false);
        }
        if (src.data !== null && src.data !== undefined) {
            b_0.storeBit(true).storeRef(src.data);
        }
        else {
            b_0.storeBit(false);
        }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}
exports.storeSendParameters = storeSendParameters;
function loadSendParameters(slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters', mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}
exports.loadSendParameters = loadSendParameters;
function loadTupleSendParameters(source) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters', mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}
exports.loadTupleSendParameters = loadTupleSendParameters;
function loadGetterTupleSendParameters(source) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters', mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}
exports.loadGetterTupleSendParameters = loadGetterTupleSendParameters;
function storeTupleSendParameters(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}
exports.storeTupleSendParameters = storeTupleSendParameters;
function dictValueParserSendParameters() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    };
}
exports.dictValueParserSendParameters = dictValueParserSendParameters;
function storeMessageParameters(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        }
        else {
            b_0.storeBit(false);
        }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}
exports.storeMessageParameters = storeMessageParameters;
function loadMessageParameters(slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters', mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}
exports.loadMessageParameters = loadMessageParameters;
function loadTupleMessageParameters(source) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters', mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}
exports.loadTupleMessageParameters = loadTupleMessageParameters;
function loadGetterTupleMessageParameters(source) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters', mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}
exports.loadGetterTupleMessageParameters = loadGetterTupleMessageParameters;
function storeTupleMessageParameters(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}
exports.storeTupleMessageParameters = storeTupleMessageParameters;
function dictValueParserMessageParameters() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    };
}
exports.dictValueParserMessageParameters = dictValueParserMessageParameters;
function storeDeployParameters(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        }
        else {
            b_0.storeBit(false);
        }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}
exports.storeDeployParameters = storeDeployParameters;
function loadDeployParameters(slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters', mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}
exports.loadDeployParameters = loadDeployParameters;
function loadTupleDeployParameters(source) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters', mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}
exports.loadTupleDeployParameters = loadTupleDeployParameters;
function loadGetterTupleDeployParameters(source) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters', mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}
exports.loadGetterTupleDeployParameters = loadGetterTupleDeployParameters;
function storeTupleDeployParameters(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}
exports.storeTupleDeployParameters = storeTupleDeployParameters;
function dictValueParserDeployParameters() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    };
}
exports.dictValueParserDeployParameters = dictValueParserDeployParameters;
function storeStdAddress(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}
exports.storeStdAddress = storeStdAddress;
function loadStdAddress(slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress', workchain: _workchain, address: _address };
}
exports.loadStdAddress = loadStdAddress;
function loadTupleStdAddress(source) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress', workchain: _workchain, address: _address };
}
exports.loadTupleStdAddress = loadTupleStdAddress;
function loadGetterTupleStdAddress(source) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress', workchain: _workchain, address: _address };
}
exports.loadGetterTupleStdAddress = loadGetterTupleStdAddress;
function storeTupleStdAddress(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}
exports.storeTupleStdAddress = storeTupleStdAddress;
function dictValueParserStdAddress() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    };
}
exports.dictValueParserStdAddress = dictValueParserStdAddress;
function storeVarAddress(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}
exports.storeVarAddress = storeVarAddress;
function loadVarAddress(slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress', workchain: _workchain, address: _address };
}
exports.loadVarAddress = loadVarAddress;
function loadTupleVarAddress(source) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress', workchain: _workchain, address: _address };
}
exports.loadTupleVarAddress = loadTupleVarAddress;
function loadGetterTupleVarAddress(source) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress', workchain: _workchain, address: _address };
}
exports.loadGetterTupleVarAddress = loadGetterTupleVarAddress;
function storeTupleVarAddress(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}
exports.storeTupleVarAddress = storeTupleVarAddress;
function dictValueParserVarAddress() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    };
}
exports.dictValueParserVarAddress = dictValueParserVarAddress;
function storeBasechainAddress(src) {
    return (builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) {
            b_0.storeBit(true).storeInt(src.hash, 257);
        }
        else {
            b_0.storeBit(false);
        }
    };
}
exports.storeBasechainAddress = storeBasechainAddress;
function loadBasechainAddress(slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress', hash: _hash };
}
exports.loadBasechainAddress = loadBasechainAddress;
function loadTupleBasechainAddress(source) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress', hash: _hash };
}
exports.loadTupleBasechainAddress = loadTupleBasechainAddress;
function loadGetterTupleBasechainAddress(source) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress', hash: _hash };
}
exports.loadGetterTupleBasechainAddress = loadGetterTupleBasechainAddress;
function storeTupleBasechainAddress(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}
exports.storeTupleBasechainAddress = storeTupleBasechainAddress;
function dictValueParserBasechainAddress() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    };
}
exports.dictValueParserBasechainAddress = dictValueParserBasechainAddress;
function storeDeploy(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}
exports.storeDeploy = storeDeploy;
function loadDeploy(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy', queryId: _queryId };
}
exports.loadDeploy = loadDeploy;
function loadTupleDeploy(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy', queryId: _queryId };
}
exports.loadTupleDeploy = loadTupleDeploy;
function loadGetterTupleDeploy(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy', queryId: _queryId };
}
exports.loadGetterTupleDeploy = loadGetterTupleDeploy;
function storeTupleDeploy(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}
exports.storeTupleDeploy = storeTupleDeploy;
function dictValueParserDeploy() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    };
}
exports.dictValueParserDeploy = dictValueParserDeploy;
function storeDeployOk(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}
exports.storeDeployOk = storeDeployOk;
function loadDeployOk(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk', queryId: _queryId };
}
exports.loadDeployOk = loadDeployOk;
function loadTupleDeployOk(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk', queryId: _queryId };
}
exports.loadTupleDeployOk = loadTupleDeployOk;
function loadGetterTupleDeployOk(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk', queryId: _queryId };
}
exports.loadGetterTupleDeployOk = loadGetterTupleDeployOk;
function storeTupleDeployOk(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}
exports.storeTupleDeployOk = storeTupleDeployOk;
function dictValueParserDeployOk() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    };
}
exports.dictValueParserDeployOk = dictValueParserDeployOk;
function storeFactoryDeploy(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}
exports.storeFactoryDeploy = storeFactoryDeploy;
function loadFactoryDeploy(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy', queryId: _queryId, cashback: _cashback };
}
exports.loadFactoryDeploy = loadFactoryDeploy;
function loadTupleFactoryDeploy(source) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy', queryId: _queryId, cashback: _cashback };
}
exports.loadTupleFactoryDeploy = loadTupleFactoryDeploy;
function loadGetterTupleFactoryDeploy(source) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy', queryId: _queryId, cashback: _cashback };
}
exports.loadGetterTupleFactoryDeploy = loadGetterTupleFactoryDeploy;
function storeTupleFactoryDeploy(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}
exports.storeTupleFactoryDeploy = storeTupleFactoryDeploy;
function dictValueParserFactoryDeploy() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    };
}
exports.dictValueParserFactoryDeploy = dictValueParserFactoryDeploy;
function storeAddStake(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(3218476420, 32);
        b_0.storeUint(src.amount, 32);
    };
}
exports.storeAddStake = storeAddStake;
function loadAddStake(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3218476420) {
        throw Error('Invalid prefix');
    }
    const _amount = sc_0.loadUintBig(32);
    return { $$type: 'AddStake', amount: _amount };
}
exports.loadAddStake = loadAddStake;
function loadTupleAddStake(source) {
    const _amount = source.readBigNumber();
    return { $$type: 'AddStake', amount: _amount };
}
exports.loadTupleAddStake = loadTupleAddStake;
function loadGetterTupleAddStake(source) {
    const _amount = source.readBigNumber();
    return { $$type: 'AddStake', amount: _amount };
}
exports.loadGetterTupleAddStake = loadGetterTupleAddStake;
function storeTupleAddStake(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}
exports.storeTupleAddStake = storeTupleAddStake;
function dictValueParserAddStake() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeAddStake(src)).endCell());
        },
        parse: (src) => {
            return loadAddStake(src.loadRef().beginParse());
        }
    };
}
exports.dictValueParserAddStake = dictValueParserAddStake;
function storeWithdraw(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(728460677, 32);
        b_0.storeUint(src.amount, 32);
        b_0.storeAddress(src.target);
    };
}
exports.storeWithdraw = storeWithdraw;
function loadWithdraw(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 728460677) {
        throw Error('Invalid prefix');
    }
    const _amount = sc_0.loadUintBig(32);
    const _target = sc_0.loadAddress();
    return { $$type: 'Withdraw', amount: _amount, target: _target };
}
exports.loadWithdraw = loadWithdraw;
function loadTupleWithdraw(source) {
    const _amount = source.readBigNumber();
    const _target = source.readAddress();
    return { $$type: 'Withdraw', amount: _amount, target: _target };
}
exports.loadTupleWithdraw = loadTupleWithdraw;
function loadGetterTupleWithdraw(source) {
    const _amount = source.readBigNumber();
    const _target = source.readAddress();
    return { $$type: 'Withdraw', amount: _amount, target: _target };
}
exports.loadGetterTupleWithdraw = loadGetterTupleWithdraw;
function storeTupleWithdraw(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.target);
    return builder.build();
}
exports.storeTupleWithdraw = storeTupleWithdraw;
function dictValueParserWithdraw() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    };
}
exports.dictValueParserWithdraw = dictValueParserWithdraw;
function storeSetAdmin(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2713466466, 32);
        b_0.storeAddress(src.newAdmin);
    };
}
exports.storeSetAdmin = storeSetAdmin;
function loadSetAdmin(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2713466466) {
        throw Error('Invalid prefix');
    }
    const _newAdmin = sc_0.loadAddress();
    return { $$type: 'SetAdmin', newAdmin: _newAdmin };
}
exports.loadSetAdmin = loadSetAdmin;
function loadTupleSetAdmin(source) {
    const _newAdmin = source.readAddress();
    return { $$type: 'SetAdmin', newAdmin: _newAdmin };
}
exports.loadTupleSetAdmin = loadTupleSetAdmin;
function loadGetterTupleSetAdmin(source) {
    const _newAdmin = source.readAddress();
    return { $$type: 'SetAdmin', newAdmin: _newAdmin };
}
exports.loadGetterTupleSetAdmin = loadGetterTupleSetAdmin;
function storeTupleSetAdmin(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeAddress(source.newAdmin);
    return builder.build();
}
exports.storeTupleSetAdmin = storeTupleSetAdmin;
function dictValueParserSetAdmin() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSetAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadSetAdmin(src.loadRef().beginParse());
        }
    };
}
exports.dictValueParserSetAdmin = dictValueParserSetAdmin;
function storeDrain(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(1344675936, 32);
        b_0.storeAddress(src.target);
    };
}
exports.storeDrain = storeDrain;
function loadDrain(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1344675936) {
        throw Error('Invalid prefix');
    }
    const _target = sc_0.loadAddress();
    return { $$type: 'Drain', target: _target };
}
exports.loadDrain = loadDrain;
function loadTupleDrain(source) {
    const _target = source.readAddress();
    return { $$type: 'Drain', target: _target };
}
exports.loadTupleDrain = loadTupleDrain;
function loadGetterTupleDrain(source) {
    const _target = source.readAddress();
    return { $$type: 'Drain', target: _target };
}
exports.loadGetterTupleDrain = loadGetterTupleDrain;
function storeTupleDrain(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeAddress(source.target);
    return builder.build();
}
exports.storeTupleDrain = storeTupleDrain;
function dictValueParserDrain() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDrain(src)).endCell());
        },
        parse: (src) => {
            return loadDrain(src.loadRef().beginParse());
        }
    };
}
exports.dictValueParserDrain = dictValueParserDrain;
function storeStakeContract$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.totalStaked, 257);
        b_0.storeAddress(src.admin);
        b_0.storeInt(src.balance, 257);
        b_0.storeDict(src.mapStakes, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(257));
    };
}
exports.storeStakeContract$Data = storeStakeContract$Data;
function loadStakeContract$Data(slice) {
    const sc_0 = slice;
    const _totalStaked = sc_0.loadIntBig(257);
    const _admin = sc_0.loadAddress();
    const _balance = sc_0.loadIntBig(257);
    const _mapStakes = core_1.Dictionary.load(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(257), sc_0);
    return { $$type: 'StakeContract$Data', totalStaked: _totalStaked, admin: _admin, balance: _balance, mapStakes: _mapStakes };
}
exports.loadStakeContract$Data = loadStakeContract$Data;
function loadTupleStakeContract$Data(source) {
    const _totalStaked = source.readBigNumber();
    const _admin = source.readAddress();
    const _balance = source.readBigNumber();
    const _mapStakes = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'StakeContract$Data', totalStaked: _totalStaked, admin: _admin, balance: _balance, mapStakes: _mapStakes };
}
exports.loadTupleStakeContract$Data = loadTupleStakeContract$Data;
function loadGetterTupleStakeContract$Data(source) {
    const _totalStaked = source.readBigNumber();
    const _admin = source.readAddress();
    const _balance = source.readBigNumber();
    const _mapStakes = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'StakeContract$Data', totalStaked: _totalStaked, admin: _admin, balance: _balance, mapStakes: _mapStakes };
}
exports.loadGetterTupleStakeContract$Data = loadGetterTupleStakeContract$Data;
function storeTupleStakeContract$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.totalStaked);
    builder.writeAddress(source.admin);
    builder.writeNumber(source.balance);
    builder.writeCell(source.mapStakes.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.mapStakes, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}
exports.storeTupleStakeContract$Data = storeTupleStakeContract$Data;
function dictValueParserStakeContract$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeStakeContract$Data(src)).endCell());
        },
        parse: (src) => {
            return loadStakeContract$Data(src.loadRef().beginParse());
        }
    };
}
exports.dictValueParserStakeContract$Data = dictValueParserStakeContract$Data;
function initStakeContract_init_args(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
async function StakeContract_init() {
    const __code = core_1.Cell.fromHex('b5ee9c724102150100041e000228ff008e88f4a413f4bcf2c80bed5320e303ed43d9010c02027102040153beed476a268690000c709408080eb807d20408080eb807a022a98360a4b98381036fc212cf16d9e3620c03000223020148050a02027506080155a5c7da89a1a400031c25020203ae01f481020203ae01e808aa60d8292e60e040dbf084b3c4aa07b678d88307002e81010b22028101014133f40a6fa19401d70030925b6de20151a581da89a1a400031c25020203ae01f481020203ae01e808aa60d8292e60e040dbf084b3c5b678d883090002210153b74b7da89a1a400031c25020203ae01f481020203ae01e808aa60d8292e60e040dbf084b3c5b678d88300b00022002f430eda2edfb01d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e12810101d700fa40810101d700f40455306c14973070206df84259e205925f05e023d749c21f9130e30d02f90182f0941585dfcf619652420ac6b4b343948496b6be08bf8221d6d533bccb4c38e3a3bae3025f03f2c0820d1402fa03d31f218210bfd60d84ba8eee31d31f30f842218200b75c21c200f2f4813f510382103b9aca00a8f8416f24135f03b913f2f42581010b228101014133f40a6fa19401d70030925b6de2206e92307095206ef2d080e281010b5113a0103712810101216e955b59f4593098c801cf004133f441e25124a05034a001e021110e01fc82102b6b6d85ba8e7331d31ffa403081404df84224c705f2f48148375352bef2f45141a1504480426d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb004003c87f01ca0055305034810101cf00ce810101cf00f400c9ed54db31e0210f04fe821050262060ba8f6a5b22a5f842217f810082036d6d50436d5033c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0013a1884140f8427f705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00e0218210a1bc3662bae3020110111213001600000000647261696e65640036c87f01ca0055305034810101cf00ce810101cf00f400c9ed54db31005a31fa403081404df8425003c70512f2f44003c87f01ca0055305034810101cf00ce810101cf00f400c9ed54db3100ba8210946a98b6ba8e52d33f30c8018210aff90f5758cb1fcb3fc9443012f84270705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c87f01ca0055305034810101cf00ce810101cf00f400c9ed54db31e03300c481404df84223c705f2f4f8427080426d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00027001c87f01ca0055305034810101cf00ce810101cf00f400c9ed5423b5106a');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initStakeContract_init_args({ $$type: 'StakeContract_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
exports.StakeContract_errors = {
    2: { message: "Stack underflow" },
    3: { message: "Stack overflow" },
    4: { message: "Integer overflow" },
    5: { message: "Integer out of expected range" },
    6: { message: "Invalid opcode" },
    7: { message: "Type check error" },
    8: { message: "Cell overflow" },
    9: { message: "Cell underflow" },
    10: { message: "Dictionary error" },
    11: { message: "'Unknown' error" },
    12: { message: "Fatal error" },
    13: { message: "Out of gas error" },
    14: { message: "Virtualization error" },
    32: { message: "Action list is invalid" },
    33: { message: "Action list is too long" },
    34: { message: "Action is invalid or not supported" },
    35: { message: "Invalid source address in outbound message" },
    36: { message: "Invalid destination address in outbound message" },
    37: { message: "Not enough Toncoin" },
    38: { message: "Not enough extra currencies" },
    39: { message: "Outbound message does not fit into a cell after rewriting" },
    40: { message: "Cannot process a message" },
    41: { message: "Library reference is null" },
    42: { message: "Library change action error" },
    43: { message: "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree" },
    50: { message: "Account state size exceeded limits" },
    128: { message: "Null reference exception" },
    129: { message: "Invalid serialization prefix" },
    130: { message: "Invalid incoming message" },
    131: { message: "Constraints error" },
    132: { message: "Access denied" },
    133: { message: "Contract stopped" },
    134: { message: "Invalid argument" },
    135: { message: "Code of a contract was not found" },
    136: { message: "Invalid standard address" },
    138: { message: "Not a basechain address" },
    16209: { message: "Mismatch stake" },
    16461: { message: "Only admin" },
    18487: { message: "We're bunkrupt" },
    46940: { message: "Nothing to stake" },
};
exports.StakeContract_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
    "Mismatch stake": 16209,
    "Only admin": 16461,
    "We're bunkrupt": 18487,
    "Nothing to stake": 46940,
};
const StakeContract_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "SignedBundle", "header": null, "fields": [{ "name": "signature", "type": { "kind": "simple", "type": "fixed-bytes", "optional": false, "format": 64 } }, { "name": "signedData", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "MessageParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "BasechainAddress", "header": null, "fields": [{ "name": "hash", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }] },
    { "name": "Deploy", "header": 2490013878, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "DeployOk", "header": 2952335191, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "FactoryDeploy", "header": 1829761339, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "cashback", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "AddStake", "header": 3218476420, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }] },
    { "name": "Withdraw", "header": 728460677, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }, { "name": "target", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "SetAdmin", "header": 2713466466, "fields": [{ "name": "newAdmin", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "Drain", "header": 1344675936, "fields": [{ "name": "target", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "StakeContract$Data", "header": null, "fields": [{ "name": "totalStaked", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "admin", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "balance", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "mapStakes", "type": { "kind": "dict", "key": "address", "value": "int" } }] },
];
const StakeContract_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "AddStake": 3218476420,
    "Withdraw": 728460677,
    "SetAdmin": 2713466466,
    "Drain": 1344675936,
};
const StakeContract_getters = [
    { "name": "userStake", "methodId": 103651, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "address", "optional": false } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "allStakes", "methodId": 113243, "arguments": [], "returnType": { "kind": "dict", "key": "address", "value": "int" } },
    { "name": "totalStaked", "methodId": 89512, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "balance", "methodId": 104128, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
];
exports.StakeContract_getterMapping = {
    'userStake': 'getUserStake',
    'allStakes': 'getAllStakes',
    'totalStaked': 'getTotalStaked',
    'balance': 'getBalance',
};
const StakeContract_receivers = [
    { "receiver": "internal", "message": { "kind": "typed", "type": "AddStake" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Withdraw" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "drain" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Drain" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "SetAdmin" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Deploy" } },
];
class StakeContract {
    static async init() {
        return await StakeContract_init();
    }
    static async fromInit() {
        const __gen_init = await StakeContract_init();
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new StakeContract(address, __gen_init);
    }
    static fromAddress(address) {
        return new StakeContract(address);
    }
    constructor(address, init) {
        this.abi = {
            types: StakeContract_types,
            getters: StakeContract_getters,
            receivers: StakeContract_receivers,
            errors: exports.StakeContract_errors,
        };
        this.address = address;
        this.init = init;
    }
    async send(provider, via, args, message) {
        let body = null;
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'AddStake') {
            body = (0, core_1.beginCell)().store(storeAddStake(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Withdraw') {
            body = (0, core_1.beginCell)().store(storeWithdraw(message)).endCell();
        }
        if (message === "drain") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Drain') {
            body = (0, core_1.beginCell)().store(storeDrain(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'SetAdmin') {
            body = (0, core_1.beginCell)().store(storeSetAdmin(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Deploy') {
            body = (0, core_1.beginCell)().store(storeDeploy(message)).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getUserStake(provider, key) {
        const builder = new core_1.TupleBuilder();
        builder.writeAddress(key);
        const source = (await provider.get('userStake', builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getAllStakes(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get('allStakes', builder.build())).stack;
        const result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
        return result;
    }
    async getTotalStaked(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get('totalStaked', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getBalance(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get('balance', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
}
exports.StakeContract = StakeContract;
StakeContract.minTonForStorage = 1000000n;
StakeContract.storageReserve = 0n;
StakeContract.errors = exports.StakeContract_errors_backward;
StakeContract.opcodes = StakeContract_opcodes;
