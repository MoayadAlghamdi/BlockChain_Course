const { createHash } = require('crypto');

class Block{
    constructor(data){
        this.Index = 0;
        this.Time_Stamp = new Date();
        this.Data = data;
        this.Hash = this.HashFunction();
        this.Previous_Hash = ""; // previous block's hash
        this.Nonce = 0; // set nonce zero and incrementing in mine function over and over again until the hash matches the one we need.
        this.Height = 0;
    }
     HashFunction() {
        // return the hash that contain from 
        return createHash('sha256').update(this.Index+this.Nonce+this.Data+this.Previce_Hash).digest('hex');
    }

    mine(difficulty) {
        // Basically, it loops until our hash starts with 0...000 with length of <difficulty>.
        while (!this.Hash.startsWith(Array(difficulty + 1).join("0"))) {
            // We increases our nonce so that we can get a whole different hash.
            this.Nonce++;
            // Update our new hash with the new nonce value.
            this.Hash = this.HashFunction();
        }
    }
    
}

class BlockChain {
    chain = [];
    difficulty = 1;
    constructor(data){
        if(this.chain.length == 0){
        this.chain.push(new Block(data));
        }
    }

    addBlock(block){
        block.Index = this.getLastBlock().Index+1;
        block.Previous_Hash = this.getLastBlock().Hash;
        block.Hash = block.HashFunction();
        block.Height = this.getLastBlock().Height+1;
        block.mine(this.difficulty);
        this.chain.push(block);
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    print(){
        return this.chain;
    }   
    // check here if the blockchain does not change at any block
    isBlockChainValid(){
        this.Found = "Invalid";
        for(var i = 1 ; i < this.chain.length ; i++){
            if(this.chain[i].Previous_Hash != this.chain[i-1].Previous_Hash){
                this.Found = "Valid";
            }
        }
        return this.Found;
    }
    // check here if the block does not change
    isBlockValid(){
        this.Found = "Invalid";
        for(var i = 1 ; i < this.chain.length ; i++){
            if(this.chain[i].Previous_Hash != this.chain[i-1].Previous_Hash){
                this.Found = "Valid";
            }
        }
        return this.Found;
    }
    
     // get the current height of each block and get the height of blockchain
    getCurrentBlcokHeight(){
        for(var i = 0 ; i < this.chain.length ; i++){
            console.log("Block Index("+i+"): "+this.chain[i].Height);
        }
        console.log("\nThe Height of the Block: "+this.chain.length);
    }
    
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var blockChain = new BlockChain("Genesis");
for(var i = 0 ; i < 7 ; i++){
var randomText = makeid(35)
blockChain.addBlock(new Block(randomText));
}
console.log(blockChain.print());
console.log("");
blockChain.getCurrentBlcokHeight();
console.log("\nThe BlockChain is : "+blockChain.isBlockChainValid());
