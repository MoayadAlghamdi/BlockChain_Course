const { createHash } = require('crypto');

class Block{
    Index
    Time_Stamp
    Previous_Hash
    Hash
    Data
    Nonce
    Height

    constructor(data,previous_hash,nonce,height){
        this.Data = data;
        this.Hash = this.HashFunction();
        this.Previous_Hash = previous_hash;
        this.Nonce = nonce;
        this.Height = height;
        this.Time_Stamp = new Date();
        this.Index = 1;
    }
     HashFunction() {
        return createHash('sha256').update(this.Index+this.Nonce+this.Data+this.Previce_Hash).digest('hex');
    }
    
}

class BlockChain {
    ListArray = [];
    constructor(data,previous_hash,nonce,height){
        if(this.ListArray.length == 0){
        this.ListArray.push(new Block(data,previous_hash,0,0));
        }
    }
    addBlock(data,nonce,height){
        this.ListArray.push(new Block(data,this.ListArray[this.ListArray.length-1].Previous_Hash,nonce,height));
        }

    print(){
        return this.ListArray;
    }

    validBlockChain(){
        for(var i = 1 ; i < this.ListArray.length ; i++){
            if(this.ListArray[i].Previous_Hash != this.ListArray[i-1].Previous_Hash){
                return "Invalid";
            }
        }
        return "Valid";
    }

    validBlockChain(){
        for(var i = 1 ; i < this.ListArray.length ; i++){
            if(this.ListArray[i].Previous_Hash != this.ListArray[i-1].Previous_Hash){
                return "Invalid";
            }
        }
        return "Valid";
    }
    
    getCurrentBlcokHeight(){
        for(var i = 0 ; i < this.ListArray.length ; i++){
            console.log("Each Height Block: "+this.ListArray[i].Height);
        }
        console.log("The Height of the Block: "+this.ListArray.length);
    }
    
}
var blockChain = new BlockChain("guiness","N/A",0,0);
console.log(blockChain.addBlock("Saleh -> Moayad 1.5 BTC",4059,677350));
console.log(blockChain.print());
blockChain.getCurrentBlcokHeight();
console.log(blockChain.validBlockChain())
