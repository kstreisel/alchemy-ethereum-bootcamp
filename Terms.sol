// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";

contract Terms {
    address public lawyer;
    address public sales;
    address public customer;
    string public orderTerms;
    uint public expiration; // block.timestamp + deadline
    bool public executed;
    bool public isRedlined;
    Redline public redline;
    

    constructor(address _customer, string memory _orderTerms, uint _expiration) {
        lawyer = 0xdD2FD4581271e230360230F9337D5c0430Bf44C0;
        sales = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
        require(msg.sender == sales, "Only sales is authorized to make an offer!");
        customer = _customer;
        orderTerms = _orderTerms;
        expiration = block.timestamp + _expiration * 1 days;
        executed = false;
        isRedlined = false;
        emit NewOffer(customer, orderTerms, expiration, executed, isRedlined);
    }
    event NewOffer(address customerAddr, string orderTerms, uint expiration, bool executed, bool redlined);

    // ACCEPT OFFER:

    function acceptOffer() external {
        require(msg.sender == customer, "This isn't your offer!");
        require(!executed, "You already accepted!");
        require(block.timestamp <= expiration, "Your offer expired!");
        executed = true;
        emit offerAccepted(customer, orderTerms, expiration, executed, isRedlined);
    }
    event offerAccepted(address customerAddr, string orderTerms, uint expiration, bool executed, bool redlined);

    // REDLINES:

    struct Redline {
        uint nine;
        string ten;
    }
    function offerRedlines(uint _nine, string memory _ten) public {
        require(msg.sender == customer, "That's not your offer!");
        require(!executed, "You already accepted!");
        require(block.timestamp <= expiration, "Your offer expired!");
        redline = Redline(_nine, _ten);
        isRedlined = true;
        emit redlinesOffered(customer, redline.nine, redline.ten, isRedlined);
    }
    event redlinesOffered(address customerAddr, uint nine, string ten, bool redlined);

    // ACCEPT REDLINES:

    function acceptRedlines() external {
        require(msg.sender == lawyer, "You must be an authorized to accept redlines!");
        require(!executed, "This offer was already accepted!");
        require(block.timestamp <= expiration, "This offer expired!");
        require(isRedlined, "No redlines on this offer!");
        executed = true;
        emit RedlinesAccepted(customer, orderTerms, executed);
    }
    event RedlinesAccepted(address indexed customerAddr, string orderTerms, bool executed);

    // GETTERS:
            // note: I couldn't get auto-created getters to work in the front-end, so I added them explicitly

    function getOrder() public view returns(string memory terms){
        return orderTerms;
    }
    function getExp() public view returns(uint exp){
        return expiration;
    }
    function getExecuted() public view returns(bool ex){
        return executed;
    }
    function getRedlined() public view returns(bool red){
        return isRedlined;
    }
    function getNine() public view returns(uint n){
        return redline.nine;
    }
    function getTen() public view returns(string memory t){
        return redline.ten;
    }

   
    // default + admin functions:

    receive() external payable {}
    
    function sendBalance() public payable{
        (bool s, ) = lawyer.call{ value: address(this).balance }("");
        require(s);
    }
} 