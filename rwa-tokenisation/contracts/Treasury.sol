// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./RWAToken.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract Treasury is AccessControl, ReentrancyGuard, Pausable {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    RWAToken public immutable token;
    uint256 public rate;

    error InvalidDeposit();
    error InsufficientBalance();

    event Deposit(address indexed user, uint256 ethAmount, uint256 tokensMinted);
    event Withdraw(address indexed admin, uint256 amount);
    event RateUpdated(uint256 newRate);

    constructor(address _token, uint256 _rate, address admin) {
        token = RWAToken(_token);
        rate = _rate;

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ADMIN_ROLE, admin);
    }

    receive() external payable {
        deposit();
    }

    function deposit() public payable nonReentrant whenNotPaused {
        if (msg.value == 0) revert InvalidDeposit();

        uint256 tokensToMint = msg.value * rate;
        token.mint(msg.sender, tokensToMint);

        emit Deposit(msg.sender, msg.value, tokensToMint);
    }

    function withdraw(uint256 amount) external nonReentrant onlyRole(ADMIN_ROLE) {
        if (address(this).balance < amount) revert InsufficientBalance();

        (bool success,) = msg.sender.call{value: amount}("");
        require(success, "ETH transfer failed");

        emit Withdraw(msg.sender, amount);
    }

    function setRate(uint256 newRate) external onlyRole(ADMIN_ROLE) {
        rate = newRate;
        emit RateUpdated(newRate);
    }

    function pause() external onlyRole(ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(ADMIN_ROLE) {
        _unpause();
    }

    function previewDeposit(uint256 amount) external view returns (uint256) {
        return amount * rate;
    }
}
