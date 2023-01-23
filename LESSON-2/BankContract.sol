// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;
contract Counter{
    
    struct User{
        uint id;
        address userAddress;
        UserType userType;
    }
        mapping (address => User) public accounts;
        address public owner = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
        mapping (address => uint256) public balances;
        mapping (address => bool) public isAdminType;
        uint256 public counter;

    enum UserType{
        Admin,
        User
    }
    
    constructor() {
        User memory user = User(0,msg.sender,UserType.Admin);
        accounts[msg.sender] = user;
        isAdminType[msg.sender] = true;
    }

    function register() public{
        User memory user = User(counter,msg.sender,UserType.User);
        accounts[msg.sender] = user;
        counter++;
    }
    function makeAdmin(address _address) public{
        accounts[_address].userType = UserType.Admin;
        isAdminType[msg.sender] = true;
    }

    function promoto() public{
        require(isAdminType[msg.sender] == true, "You don't admin.");
        makeAdmin(msg.sender);
    }

    function depositMoney() public payable{
          balances[msg.sender] += msg.value;
    }
    function withDrowMoney(address _address , uint amount) public view returns(uint) {
        require(msg.sender == _address ,"You don't have authraization");
        require(balances[msg.sender]>= amount, "Not enough ether");
        uint balance = address(this).balance;
        balance -= amount;
        return balance ;
    }
    function getBalance() public view returns(uint256){
        return address(this).balance;
    }
}
