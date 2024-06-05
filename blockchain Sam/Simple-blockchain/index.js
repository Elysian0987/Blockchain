import crypto, { createHash } from 'crypto'

class Block{
    constructor(timestamp, index, data, previoushash = '' ){
        this.timestamp = timestamp;
        this.index = index;
        this.data = data;
        this.previoushash = previoushash;
        this.hash = this.createHash();
        this.next = null;
    }

    createHash() {
        return createHash('sha256').update(this.index + this.timestamp + this.previoushash +JSON.stringify(this.data)).digest('hex');
    }
}

// let block = new Block(0, Date.now(), "Genesis Block", '0')
// let block2 = new Block(1, Date.now(), "Genesis Block", '1')

// console.log(block);
// console.log(block2);

class Blockchain {
    constructor() {
        const genesisBlock = this.createGenesiisBlock();
        this.head =genesisBlock;
        this.tail = genesisBlock;
    }

    createGenesiisBlock() {
        return new Block(0, Date.now(), 'Genesis Block', '0');
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.tail.hash;
        newBlock.hash = newBlock.createHash();
        this.tail.next = newBlock;
        this.tail = newBlock;
    }

    printChain() {
        let currentBlock = this.head;
        while(currentBlock != null && currentBlock.next != null) {
            console.log(`Block ${currentBlock.index}: ${currentBlock.hash} -> `);
            currentBlock = currentBlock.next
        }
    }
}

let blockchain = new Blockchain();
blockchain.addBlock(new Block(1, Date.now(), { amount: 4}));
blockchain.addBlock(new Block(2, Date.now(), { amount: 10}));

blockchain.printChain();