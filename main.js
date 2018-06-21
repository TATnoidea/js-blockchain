const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index; // block位于chain的位置
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  // 计算block的hash
  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
  }

  mainBlock(difficulty) {

  }
}

class BlockChain {
  // 构造函数实例化blockchain
  constructor() {
    this.chain = [this.createGenesis()];
  }
  // 创建chain的每一个第一个block
  createGenesis() {
    return new Block(0, '01/01/2017', 'Genesis block', '0')
  }
  // 获取最新的block
  latestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.latestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    newBlock.index = this.latestBlock().index + 1;
    this.chain.push(newBlock);
  }

  checkValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

let jsChain = new BlockChain();
jsChain.addBlock(new Block("6/20/2018", { amount: 5 }));
jsChain.addBlock(new Block("6/21/2018", { amount: 10 }));

console.log(JSON.stringify(jsChain, null, 4));
console.log('Is blockchain valid? ' + jsChain.checkValid());
