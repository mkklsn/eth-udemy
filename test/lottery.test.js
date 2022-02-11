const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { abi, bytecode } = require("../compile/compile_lottery");

let accts, lotteryContract;

beforeEach(async () => {
  accts = await web3.eth.getAccounts();

  lotteryContract = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ from: accts[0], gas: 1000000 });
});

describe("Lottery", () => {
  it("deploys a lottery contract", async () => {
    assert.ok(
      lotteryContract.options.address,
      "Contract address is not valid."
    );
  });

  it("sets the manager property", async () => {
    const manager = await lotteryContract.methods.manager().call();
    assert.equal(manager, accts[0], "Contract manager property is not valid.");
  });

  it("adds a player when enter function is invoked", async () => {
    await lotteryContract.methods.enter().send({ from: accts[1] });

    let expectedPlayers = [accts[1]];

    const currentPlayers = await lotteryContract.methods.getPlayers().call();

    assert.equal(
      currentPlayers.length,
      expectedPlayers.length,
      "Players count is not correct."
    );
    for (let i = 0; i < currentPlayers.length; i++) {
      assert.equal(
        currentPlayers[i],
        expectedPlayers[i],
        `Actual player address ${
          currentPlayers[i]
        } is not equal to expected address ${expectedPlayers[i + 1]}`
      );
    }
  });

  //   it("sends contract balance to winner address", async () => {
  //       await lotteryContract.methods.enter().send({ from: accts[1] });
  //       await lotteryContract.methods.enter().send({from: })
  //   });
});
