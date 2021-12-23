const fs = require('fs');
const HDWalletProvider = require('truffle-hdwallet-provider');
const TruffleContract = require('truffle-contract');
const Web3 = require('web3');

const INFURA_KEY = '4dcf624bca214e6182bf0f247d20c8a4';
const SOLN_VERIFIER_RINKEBY = '0x212d96bD26B531B04Ee878C96F0EeD3966916EB2';
const OWNER_ACCOUNT = '0x2D54e4392aD68D616ce936769ABB00f331379C2F';
const MNEMONIC_METAMASK = 'brass cup famous coconut cheap click cradle know health symptom boost define';

const A = ["0x229c71eddfa39a531684053787c12a10c6235f062196338ade64033fbbae2435", "0x228c8a878ab7de5f13af21346e030a22be10027d2db0b9fdabbd54170c1a553f"];
const B = [["0x17e2908e5f22fe6a3465d9b157233b720dd9ba317a7acb8b859ee5845e69877e", "0x0acf427c079d06be88e0d1f8e7d0dab33b581e2dd5a7a9b2280a66333a236c74"], ["0x1be08b841006f51c806d960234b9fe854f5211ff5126ad7af8116b346f403e4c", "0x07823fbdb15a15a158d3a9adbeeb09c7c28779e8dda34c4deeb4df43bcecb396"]];
const C = ["0x221b26064b666269407f465e4e052cb667cb8f2ac67ba5657309cecfe8214393", "0x251898cf688e0d5ccaf781fe525dbfab5917f0004966d8a51291f5538a441f04"];
const INPUT = ["0x0000000000000000000000000000000000000000000000000000000000000009", "0x0000000000000000000000000000000000000000000000000000000000000001"];

(async () => {
    let provider = new HDWalletProvider(MNEMONIC_METAMASK, `https://rinkeby.infura.io/v3/${INFURA_KEY}`);
    let web3 = new Web3(provider);
    let contractAbi = JSON.parse(fs.readFileSync('../eth-contracts/build/contracts/SolnSquareVerifier.json', 'utf-8'));
    let solnSquareVerifier = TruffleContract(contractAbi);
    solnSquareVerifier.setProvider(provider);

    try {
        this.contract = await solnSquareVerifier.deployed();
    } catch (e) {
        console.log(`Failed to create contract instance...\n${e.message}\nexit program...`);
        process.exit(1);
    }

    let currentTokenSupply;
    try {
        currentTokenSupply = await this.contract.totalSupply();
    } catch (e) {
        console.log(`Failed to get total token supply...\n${e.message}\nexit program...`);
        process.exit(1);
    }
    console.log(`currentTotalSupply: ${currentTokenSupply.toNumber()}`);

    let nextTokenId = parseInt(currentTokenSupply.toNumber()) + 1;
    console.log(`nextTokenId: ${nextTokenId}`);

    try {
        await this.contract.addSolution(A, B, C, INPUT, {from: OWNER_ACCOUNT});
    } catch (e) {
        console.log(`Failed to add the solution...\n${e.message}\nexit program...`);
        process.exit(1);
    }

    try{
        await this.contract.mint(OWNER_ACCOUNT, nextTokenId, {from: OWNER_ACCOUNT});
    } catch (e) {
        console.log(`Failed to mint the token...\n${e.message}\nexit program...`);
        process.exit(1);
    }

    console.log(`TokenId ${nextTokenId} has been minted successfully!!!!`);
    process.exit(0);
})();
