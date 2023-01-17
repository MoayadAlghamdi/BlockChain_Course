const { createHash } = require('crypto');

class Block{
    Index
    Time_Stamp
    Previous_Hash
    Hash
    Data
    Nonce
    Height

    constructor(index,data,previous_hash,nonce,height){
        this.Index = index;
        this.Hash = this.HashFunction(data);
        this.Data = data;
        this.Previous_Hash = previous_hash;
        this.Nonce = nonce;
        this.Height = height;
        this.Time_Stamp = new Date();
    }
     HashFunction() {
        return createHash('sha256').update(this.Index+this.Nonce+this.Data+this.Previce_Hash).digest('hex');
    }
    /*
    HashFunction(previous_hash) {
        return createHash('sha256').update(previous_hash).digest('hex'); 
    }*/
    
}
var block = new Block(96422,"Saleh -> Moayad 1.5 BTC","e3cc006d0e089cc0d9bc21ba5a09857984ee2d226dcb552c0f608a7869b8133b",4059,677350);
var block2 = new Block(96423,"Moayad -> Sultan 0.7 BTC","70b768161b417ff81d17ec5d0ede3ecc90b95f7c7c6490cfd41b83af687e2b25",5287,785412);

console.log(block);
console.log(block2);
