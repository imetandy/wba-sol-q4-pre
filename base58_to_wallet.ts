import bs58 from "bs58";
import wallet from "./dev-wallet.json";

const x = new Uint8Array(wallet);
console.log("Wallet: " + x);
const bytes = Uint8Array.from(x);
const address = bs58.encode(bytes);
console.log("Address: " + address);

