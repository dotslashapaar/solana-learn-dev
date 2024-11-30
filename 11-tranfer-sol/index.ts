import {  SystemProgram, Connection, PublicKey, Keypair, Transaction, LAMPORTS_PER_SOL, sendAndConfirmRawTransaction, } from "@solana/web3.js";
import { airdrop } from "../airdrop";
import { showBalance } from "../show_balance";

// export const transferSol = async (from: Keypair , to: PublicKey, amount: number) => {
//     const connection = new Connection("http://localhost:8899", "confirmed");
//     const transaction = new Transaction();

//     const instruction = SystemProgram.transfer({
//         fromPubkey: from.publicKey,
//         toPubkey: to,
//         lamports: LAMPORTS_PER_SOL * amount
//     });

//     const serializedTransaction = transaction.serialize();
//     const serializedTransactionBuffer = Buffer.from(serializedTransaction);

//     transaction.add(instruction);
//     await sendAndConfirmRawTransaction(connection, serializedTransactionBuffer,[
//         from
//     ])

//     console.log("Done");
// }

// import { Connection, PublicKey, Keypair, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
// import { airdrop } from "../airdrop";
// import { showBalance } from "../show_balance";



export const transferSol = async (from: Keypair, to: PublicKey, amount: number) => {
    const connection = new Connection("http://localhost:8899", "confirmed");   
  
  
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: from.publicKey,
          toPubkey: to,
          lamports: LAMPORTS_PER_SOL * amount   
  
        })
      );
  
      const serializedTransaction = transaction.serialize();
      const serializedTransactionBuffer = Buffer.from(serializedTransaction);
  
      const signature = await connection.sendRawTransaction(serializedTransactionBuffer);
      await connection.confirmTransaction(signature);
  
      console.log("Transaction confirmed:", signature);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  }

const secret = Uint8Array.from([130,124,66,248,143,202,73,227,50,96,252,148,168,149,200,108,45,227,99,59,104,192,39,230,76,244,197,109,83,152,89,219,57,229,93,161,124,192,75,153,100,178,245,210,238,230,65,30,132,195,200,52,47,111,172,14,246,83,59,27,114,167,17,239]);
const fromKeyPair = Keypair.fromSecretKey(secret);
const toPublicKey = new PublicKey("vJVrZh7zeC8ZSjMxMw8dfqmDeBczyCwTEFbGZ22bvyf");

(async()=>{
    await airdrop(fromKeyPair.publicKey, 4000);
    const initialBalance = await showBalance(fromKeyPair.publicKey);
    console.log(`Initial balance of from wallet is ${initialBalance}`)
    const initialBalanceTo = await showBalance(toPublicKey);
    console.log(`Initial balance of from wallet is ${initialBalanceTo}`);

    await transferSol(fromKeyPair, toPublicKey, 2);

    const initialBalance2 = await showBalance(fromKeyPair.publicKey);
    console.log(`Post balance of from wallet is ${initialBalance2}`)
    const initialBalanceTo2 = await showBalance(toPublicKey);
    console.log(`Post balance of from wallet is ${initialBalanceTo2}`);

})()
