import bs58 from "bs58";
import promptSync from 'prompt-sync';

var prompt = promptSync();

var address = prompt('enter your wallet:');
const bytes = bs58.decode(address);
console.log(bytes);
console.log(Buffer.from(bytes).toString('hex'));
// input your wallet address string




