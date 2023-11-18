import { Connection, Keypair, SystemProgram, PublicKey } from "@solana/web3.js"
import { Program, Wallet, AnchorProvider, Address } from "@project-serum/anchor"
import { WbaPrereq, IDL } from "./programs/wba_prereq";
import wallet from "./wba-wallet.json"

// import keypair from the wallet
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
// create devnet connection
const connection = new Connection("https://api.devnet.solana.com");
// github
const github = Buffer.from("imetandy", "utf-8");

// anchor provider
const provider = new AnchorProvider(connection, new Wallet(keypair), {
    commitment: "confirmed"
});

// create our program
const program = new Program<WbaPrereq>(IDL,"HC2oqz2p6DEWfrahenqdq2moUcga9c9biqRBcdK3XKU1" as Address, provider);

// Create PDA for our enrollment account
const enrollment_seeds = [Buffer.from("prereq"),
keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);

(async () => {
    try {
        const txhash = await program.methods.complete(github).accounts({
            signer: keypair.publicKey,
            prereq: enrollment_key,
            systemProgram: SystemProgram.programId
        }).signers([
            keypair
        ]).rpc();
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();