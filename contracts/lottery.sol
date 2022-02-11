pragma solidity ^0.8.11;

contract Lottery {
  address public manager;
  address[] public players;

  constructor() {
    manager = msg.sender;
  }

  function enter() public payable {
    players.push(msg.sender);
  }

  function getPlayers() public view returns (address[] memory) {
    return players;
  }

  function random() private view returns (uint256) {
    return
      uint256(
        keccak256(abi.encodePacked(block.difficulty, block.timestamp, players))
      );
  }

  function pickWinner() public {
    uint256 index = random() % players.length;
    payable(players[index]).transfer(address(this).balance);
  }
}
