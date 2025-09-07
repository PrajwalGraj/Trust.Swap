// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HTLC {
    event Locked(address indexed sender, address indexed receiver, uint256 amount, bytes32 hashlock, uint256 timelock);
    event Claimed(address indexed receiver, bytes32 secret);
    event Refunded(address indexed sender);
    address public sender;
    address public receiver;
    bytes32 public hashlock;
    uint256 public timelock;
    uint256 public amount;
    bool public claimed;
    bytes32 public secret;

    constructor(address _receiver, bytes32 _hashlock, uint256 _timelock) payable {
        sender = msg.sender;
        receiver = _receiver;
        hashlock = _hashlock;
        timelock = _timelock;
        amount = msg.value;
        claimed = false;
        emit Locked(sender, receiver, amount, hashlock, timelock);
    }

    // Claim funds by providing the secret
    function claim(bytes32 _secret) external {
        require(msg.sender == receiver, "Not receiver");
        require(!claimed, "Already claimed");
        require(block.timestamp < timelock, "Timelock expired");
        require(sha256(abi.encodePacked(_secret)) == hashlock, "Invalid secret");
        claimed = true;
        secret = _secret;
        payable(receiver).transfer(amount);
        emit Claimed(receiver, _secret);
    }

    // Refund funds to sender after timelock
    function refund() external {
        require(msg.sender == sender, "Not sender");
        require(!claimed, "Already claimed");
        require(block.timestamp >= timelock, "Timelock not expired");
        claimed = true;
        payable(sender).transfer(amount);
        emit Refunded(sender);
    }
}
// Inline comments provided for hackathon explanation.
