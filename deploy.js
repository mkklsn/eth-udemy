const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "cake duck print cage online curve chief reform worry magnet erode episode",
  "https://rinkeby.infura.io/v3/dfe4bd3791eb415699278cd589970074"
);

const web3 = new Web3(provider);

module.exports = {
  web3,
};

const deploy = async () => {
  const accts = await web3.eth.getAccounts();

  console.log("Deploying contract from:" + accts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: ["Hi init msg"],
    })
    .send({ from: accts[0], gas: 1000000 });

  console.log("Deployed contract address:" + result.options.address);
};

deploy();
