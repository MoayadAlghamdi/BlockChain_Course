const { createHash } = require('crypto');

class Block {
    constructor(data) {
        this.Index = 0;
        //this.Time_Stamp = new Date();
        this.Data = data;
        this.Hash = this.HashFunction();
        this.Previous_Hash = ""; // previous block's hash
        this.Nonce = 0; // set nonce zero and incrementing in mine function over and over again until the hash matches the one we need.
        this.Height = 0;
    }
    HashFunction() {
        // return the hash that contain from 
        return createHash('sha256').update(this.Index + this.Nonce + this.Data + this.Previce_Hash + this.Time_Stamp ).digest('hex');
    }

    mine(difficulty) {
        //It will loops until our hash starts with 0 with length of difficulty.
        while (!this.Hash.startsWith(Array(difficulty + 1).join("0"))) {
            // We increases our nonce so that we can get a whole different hash.
            this.Nonce++;
            // Update our new hash with the new nonce value.
            this.Hash = this.HashFunction();
        }
    }

}

class BlockChain {
    blockchainList = [];
    difficulty = 0;
    constructor() {
    this.blockchainList.push(this.getGenesisBlock());
    }
    
    getGenesisBlock(){
        return new Block("Genesis");
    }

    // adding a new block to the blockchain and execute the mining 
    addBlock(block) {
        block.Index = this.getLastBlock().Index + 1;
        block.Previous_Hash = this.getLastBlock().Hash;
        block.Hash = block.HashFunction();
        block.Height = this.getLastBlock().Height + 1;
        this.difficulty = this.difficulty+1;
        block.mine(this.difficulty);
        this.blockchainList.push(block);
    }
    // get the last block in blockchain
    getLastBlock() {
        return this.blockchainList[this.blockchainList.length - 1];
    }
    // print the blockchain
    print() {
            return this.blockchainList;
    }
    // check here if the blockchain does not change at any block
    isBlockChainValid() {
            this.Found = "Valid";
            for (var i = 1; i < this.blockchainList.length; i++) {
                if (this.blockchainList[i].Previous_Hash != this.blockchainList[i - 1].Hash){
                    this.Found = "Invalid";
                }
            }
            return this.Found;
        }
        
    //check here if the block does not change
    isBlockValid() {
        this.Found = "There is no block has been changed";
        for (var i = 1; i < this.blockchainList.length; i++) {
            if(this.blockchainList[i].Hash != this.blockchainList[i].HashFunction()){
                this.Found = "\nInvalid Because The Block Index("+i+") Has been changed";
            }
        }l
       if (this.blockchainList[0].Hash != this.getGenesisBlock().Hash){
        return "Invalid";
        }
        return this.Found;
    }

    // get the current height of each block and get the height of blockblockchainList
    getBlcokChainHeight() {
        console.log("The Height of the BlockChain is: " + this.blockchainList.length);
    }

}
//  generate random data from the alpha 
function randomData(length) {
    var result = '';
    var characters = '123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var blockChain = new BlockChain();
var randomBlockChainLength = Math.floor(Math.random() * 3)+1;

for (var i = 0; i < randomBlockChainLength; i++) {
    var data = randomData(35)
    blockChain.addBlock(new Block(data));
}

console.log(blockChain.print());
console.log("");
blockChain.getBlcokChainHeight();
console.log("\n"+blockChain.isBlockValid());
console.log("\nThe BlockChain is : " + blockChain.isBlockChainValid());
