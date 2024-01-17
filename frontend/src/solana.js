// import React, { useEffect, useState } from 'react';
// import QRCode from 'qrcode.react';
// import solanaweb3 from "@solana/web3.js";
// import bs58 from "bs58";

// const Solana = () => {
//   const [transactionHash, setTransactionHash] = useState('');

//   const generateTransaction = async () => {
//     const connection = new solanaweb3.Connection("https://api.devnet.solana.com");

//     const senderWallet = solanaweb3.Keypair.fromSecretKey(
//       bs58.decode(
//         "3wEPRLwcAEVpdd39iugcLwzTXBrxrnMkroScEydXiEW6kYJsAy1rEMB7A1RGanvVBfE87P49VoNB834PezxRHw4j"
//       )
//     );

//     const receiverWallet = solanaweb3.Keypair.fromSecretKey(
//       bs58.decode(
//         "3D6MduBjSxysVA8HviK9fzLCfEhVaQh7ZP9HPP82Ny9592BFkH5QVp4YJgEQ7TiVaAVG9XTyDiqZBUoKKAVNN8hu"
//       )
//     );

//     let transaction = new solanaweb3.Transaction().add(
//       solanaweb3.SystemProgram.transfer({
//         fromPubkey: senderWallet.publicKey,
//         toPubkey: receiverWallet.publicKey,
//         lamports: 2 * solanaweb3.LAMPORTS_PER_SOL,
//       })
//     );
//     transaction.feePayer = senderWallet.publicKey;

//     try {
//       const signature = await connection.sendTransaction(transaction, [senderWallet, receiverWallet]);
//       console.log(`Transaction sent: ${signature}`);
//       setTransactionHash(signature);
//     } catch (error) {
//       console.error('Error sending transaction', error);
//     }
//   };

//   useEffect(() => {
//     generateTransaction();
//   }, []); // Run once on component mount

//   return (
//     <div>
//       <h1>Solana Transaction QR Code</h1>
//       {transactionHash && (
//         <>
//           <p>Transaction Hash: {transactionHash}</p>
//           <QRCode value={transactionHash} />
//         </>
//       )}
//     </div>
//   );
// };

// export default Solana;
