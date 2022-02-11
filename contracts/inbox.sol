pragma solidity ^0.8.11;

contract Inbox {
    string public message;

    constructor(string memory initMsg) {
        message = initMsg;
    }

    function setMessage(string memory newMsg) public {
        message = newMsg;
    }
}
