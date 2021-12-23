const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config();

const infuraKey = process.env.INFURA_KEY;
const mnemonic = process.env.MNEMONIC;
const mnemonic_metamask = process.env.MNEMONIC_METAMASK;

module.exports = {
  networks: {

    // deploy to ganache
    development: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "http://127.0.0.1:8545/", 0, 50);
      },
      network_id: '*',
      gas: 6000000
    },

    // deploy to rinkeby
    rinkeby: {
        provider: () => new HDWalletProvider(mnemonic_metamask, `https://rinkeby.infura.io/v3/${infuraKey}`),
        network_id: 4,
        gas: 6000000, // rinkeby has a lower block limit than mainnet
        gasPrice: 10000000000
    }
  },
  compilers: {
    solc: {
        version: "0.5.0"
    }
  }
}
