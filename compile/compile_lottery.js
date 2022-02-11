const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "../contracts", "lottery.sol");
const source = fs.readFileSync(inboxPath, "utf-8");

const input = {
  language: "Solidity",
  sources: {
    [inboxPath]: {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

module.exports = {
  abi: output.contracts[[inboxPath]]["Lottery"].abi,
  bytecode: output.contracts[[inboxPath]]["Lottery"].evm.bytecode.object,
};
