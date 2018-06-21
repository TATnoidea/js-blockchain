const SHA256 = REQUIRE('crypto-js/sha256');

class Block {
  constructor (timestamp, data) {
    this.index = 0; // block位于chain的位置
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = '0';
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