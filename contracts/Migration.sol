// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Migrations {
    address public owner;
    uint public last_completed_migration;

    constructor(address _owner) {
        require(_owner != address(0), "Owner address is invalid"); // Ensure a valid owner address
        owner = _owner;
    }

    function setCompleted(uint completed) public {
        require(msg.sender == owner, "Only owner can set completed.");
        last_completed_migration = completed;
    }
}
