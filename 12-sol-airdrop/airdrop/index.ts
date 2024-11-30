import {Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";

export const airdrop = async (address: PublicKey, amount: number) => {

    const publicKey = new PublicKey(address);
    const connection = new Connection("http://localhost:8899", "confirmed");
    const signature = await connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(signature);

}

// airdrop("vJVrZh7zeC8ZSjMxMw8dfqmDeBczyCwTEFbGZ22bvyf", 20);