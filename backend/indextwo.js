import solanaweb3 from "@solana/web3.js";
import bs58 from "bs58";

const connection = new solanaweb3.Connection("https://api.devnet.solana.com");

const senderWallet = solanaweb3.Keypair.fromSecretKey(
  bs58.decode(
    "3wEPRLwcAEVpdd39iugcLwzTXBrxrnMkroScEydXiEW6kYJsAy1rEMB7A1RGanvVBfE87P49VoNB834PezxRHw4j"
  )
);

const receiverWallet = solanaweb3.Keypair.fromSecretKey(
  bs58.decode(
    "3D6MduBjSxysVA8HviK9fzLCfEhVaQh7ZP9HPP82Ny9592BFkH5QVp4YJgEQ7TiVaAVG9XTyDiqZBUoKKAVNN8hu"
  )
);

(async () => {
  let senderBalance = await connection.getBalance(senderWallet.publicKey);
  let receiverBalance = await connection.getBalance(receiverWallet.publicKey);

  console.log(
    `Sender balance: ${senderBalance / solanaweb3.LAMPORTS_PER_SOL} SOL`
  );
  console.log(
    `Receiver balance: ${receiverBalance / solanaweb3.LAMPORTS_PER_SOL} SOL`
  );
})();

// (async () => {
//   let txhash = await connection.requestAirdrop(senderWallet.publicKey, 1e9);
//   console.log(`txhash: ${txhash}`);
// }) ();

(async()=>{
    let transaction = new solanaweb3.Transaction().add(
        solanaweb3.SystemProgram.transfer({
            fromPubkey:senderWallet.publicKey,
            toPubkey:receiverWallet.publicKey,
            lamports:2 * solanaweb3.LAMPORTS_PER_SOL,
        })
    )
transaction.feePayer = senderWallet.publicKey;
let transactionhash = await connection.sendTransaction(transaction,[senderWallet,receiverWallet])
console.log(transactionhash,"uuuu");
})()