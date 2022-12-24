import BigNumber from "bignumber.js";
const Web3 = require("web3");
const ERC20_API = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_newOwnerCandidate", "type": "address" }], "name": "requestOwnershipTransfer", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "isMinting", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "mint", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "acceptOwnership", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "newOwnerCandidate", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_tokenAddress", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "transferAnyERC20Token", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "endMinting", "outputs": [], "payable": false, "type": "function" }, { "anonymous": false, "inputs": [], "name": "MintingEnded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_by", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }], "name": "OwnershipRequested", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }];
const ETH = new BigNumber(10 ** 18);
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const getTokenBalance = async (address: string, token: string, decimals: number): Promise<BigNumber> => {
  const tokenContract = new web3.eth.Contract(ERC20_API, token);
  const balance = await tokenContract.methods.balanceOf(address).call();
  return new BigNumber(balance).div(10 ** decimals);
};

const getBalance = async (address: string): Promise<BigNumber> => {
  return new BigNumber(await web3.eth.getBalance(address)).div(ETH);
};

interface Device {
  description: string;
  addresses: string[];
}

interface Token {
  symbol: string;
  address: string;
  decimals: number;
}

const DEVICES: Device[] = require("../addresses-eth.json");
const TOKENS: Token[] = require("../tokens-eth.json");

const main = async () => {
  for (let i = 0; i < DEVICES.length; ++i) {
    const device = DEVICES[i];

    console.log(device.description);

    for (let j = 0; j < device.addresses.length; ++j) {
      const address = device.addresses[j];
      console.log(`  ${address}`);
      console.log("    ETH:", (await getBalance(address)).toFormat());

      for (let k = 0; k < TOKENS.length; ++k) {
        const token = TOKENS[k];
        console.log(`    ${token.symbol}:`, (await getTokenBalance(address, token.address, token.decimals)).toFormat());
      }

      console.log("");
    }
  }
};

main();
