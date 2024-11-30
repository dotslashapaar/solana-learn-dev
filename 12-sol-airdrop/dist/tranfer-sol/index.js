"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferSol = void 0;
const web3_js_1 = require("@solana/web3.js");
const airdrop_1 = require("../airdrop");
const show_balance_1 = require("../show_balance");
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
const transferSol = (from, to, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = new web3_js_1.Connection("http://localhost:8899", "confirmed");
    try {
        const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: web3_js_1.LAMPORTS_PER_SOL * amount
        }));
        const serializedTransaction = transaction.serialize();
        const serializedTransactionBuffer = Buffer.from(serializedTransaction);
        const signature = yield connection.sendRawTransaction(serializedTransactionBuffer);
        yield connection.confirmTransaction(signature);
        console.log("Transaction confirmed:", signature);
    }
    catch (error) {
        console.error("Error sending transaction:", error);
    }
});
exports.transferSol = transferSol;
const secret = Uint8Array.from([130, 124, 66, 248, 143, 202, 73, 227, 50, 96, 252, 148, 168, 149, 200, 108, 45, 227, 99, 59, 104, 192, 39, 230, 76, 244, 197, 109, 83, 152, 89, 219, 57, 229, 93, 161, 124, 192, 75, 153, 100, 178, 245, 210, 238, 230, 65, 30, 132, 195, 200, 52, 47, 111, 172, 14, 246, 83, 59, 27, 114, 167, 17, 239]);
const fromKeyPair = web3_js_1.Keypair.fromSecretKey(secret);
const toPublicKey = new web3_js_1.PublicKey("vJVrZh7zeC8ZSjMxMw8dfqmDeBczyCwTEFbGZ22bvyf");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, airdrop_1.airdrop)(fromKeyPair.publicKey, 4000);
    const initialBalance = yield (0, show_balance_1.showBalance)(fromKeyPair.publicKey);
    console.log(`Initial balance of from wallet is ${initialBalance}`);
    const initialBalanceTo = yield (0, show_balance_1.showBalance)(toPublicKey);
    console.log(`Initial balance of from wallet is ${initialBalanceTo}`);
    yield (0, exports.transferSol)(fromKeyPair, toPublicKey, 2);
    const initialBalance2 = yield (0, show_balance_1.showBalance)(fromKeyPair.publicKey);
    console.log(`Post balance of from wallet is ${initialBalance2}`);
    const initialBalanceTo2 = yield (0, show_balance_1.showBalance)(toPublicKey);
    console.log(`Post balance of from wallet is ${initialBalanceTo2}`);
}))();
//# sourceMappingURL=index.js.map