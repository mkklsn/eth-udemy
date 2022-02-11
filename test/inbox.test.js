const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { abi, bytecode } = require("../compile/compile_inbox");

let accts, inboxContract;
const INIT_MSG = "Hi init msg";

beforeEach(async () => {
  accts = await web3.eth.getAccounts();

  inboxContract = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: [INIT_MSG],
    })
    .send({ from: accts[0], gas: 1000000 });
});

describe("Inbox", async () => {
  it("deploys an inbox contract", () => {
    assert.ok(inboxContract.options.address, "contract address is not valid.");
  });

  it("sets default message property", async () => {
    const msg = await inboxContract.methods.message().call();

    assert.equal(msg, INIT_MSG, "contract message property value not valid.");
  });

  it("can update message property", async () => {
    const newMsg = "new msg";
    await inboxContract.methods.setMessage(newMsg).send({ from: accts[0] });

    const updatedMsg = await inboxContract.methods.message().call();

    assert.equal(updatedMsg, newMsg, "updated message is not valid.");
  });
});
