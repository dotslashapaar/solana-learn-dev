import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { airdrop } from "../airdrop";

export const showBalance = async (publicKey: PublicKey) => {
    const connection = new Connection("http://localhost:8899", "confirmed");
    const response = await connection.getAccountInfo(publicKey);
    return response.lamports * LAMPORTS_PER_SOL;
}

// (async()=> {
//     const publicKey = "vJVrZh7zeC8ZSjMxMw8dfqmDeBczyCwTEFbGZ22bvyf";
//     const balance = await showBalance(new PublicKey(publicKey));
//     console.log(`The balance of the key ${publicKey} is ${balance}`);
//     await airdrop(publicKey, 500);
//     const updateBalance = await showBalance(new PublicKey(publicKey));
//     console.log(`Updated balance is ${updateBalance}`);
// })() 