// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MerkleRootContract {
    bytes32 public merkleRoot;
    address public owner;

    constructor(bytes32 _initialMerkleRoot) {
        merkleRoot = _initialMerkleRoot;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }

    function updateMerkleRoot(bytes32 _newMerkleRoot) public onlyOwner {
        merkleRoot = _newMerkleRoot;
    }

    function getMerkleRoot() public view returns (bytes32) {
        return merkleRoot;
    }
}

// contract Address : 0x7bd15e203bf364a80cc231c4072fdaf2d1482003