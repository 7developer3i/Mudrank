// import solanaweb3 from "@solana/web3.js";
// import bs58 from "bs58";

// const connection = new solanaweb3.Connection("https://api.devnet.solana.com");

// const senderWallet = solanaweb3.Keypair.fromSecretKey(
//   bs58.decode(
//     "3wEPRLwcAEVpdd39iugcLwzTXBrxrnMkroScEydXiEW6kYJsAy1rEMB7A1RGanvVBfE87P49VoNB834PezxRHw4j"
//   )
// );

// const receiverWallet = solanaweb3.Keypair.fromSecretKey(
//   bs58.decode(
//     "3D6MduBjSxysVA8HviK9fzLCfEhVaQh7ZP9HPP82Ny9592BFkH5QVp4YJgEQ7TiVaAVG9XTyDiqZBUoKKAVNN8hu"
//   )
// );

// (async () => {
//   let senderBalance = await connection.getBalance(senderWallet.publicKey);
//   let receiverBalance = await connection.getBalance(receiverWallet.publicKey);

//   console.log(
//     `Sender balance: ${senderBalance / solanaweb3.LAMPORTS_PER_SOL} SOL`
//   );
//   console.log(
//     `Receiver balance: ${receiverBalance / solanaweb3.LAMPORTS_PER_SOL} SOL`
//   );
// })();

// // (async () => {
// //   let txhash = await connection.requestAirdrop(senderWallet.publicKey, 1e9);
// //   console.log(`txhash: ${txhash}`);
// // }) ();

// (async()=>{
//     let transaction = new solanaweb3.Transaction().add(
//         solanaweb3.SystemProgram.transfer({
//             fromPubkey:senderWallet.publicKey,
//             toPubkey:receiverWallet.publicKey,
//             lamports:2 * solanaweb3.LAMPORTS_PER_SOL,
//         })
//     )
// transaction.feePayer = senderWallet.publicKey;
// let transactionhash = await connection.sendTransaction(transaction,[senderWallet,receiverWallet])
// console.log(transactionhash,"uuuu");
// })()


const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { recoverPersonalSignature } = require('eth-sig-util');
const { bufferToHex } = require('ethereumjs-util');

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const nonceList = {};

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const generateNonce = (walletAddress) => {
  const nonce = String(Math.floor(Math.random() * 10000));
  nonceList[walletAddress] = nonce;
  return nonce;
};

indexRouter.get('/nonce', (req, res) => {
  const { walletAddress } = req.query;
  const nonce = generateNonce(walletAddress);
  res.send({ nonce });
});

indexRouter.get('/verify', (req, res) => {
  const { walletAddress, signedNonce } = req.query;
  const nonce = nonceList[walletAddress];

  try {
    const hexNonce = bufferToHex(Buffer.from(nonce, 'utf8'));
    const retrievedAddress = recoverPersonalSignature({
      data: hexNonce,
      sig: signedNonce,
    });

    if (walletAddress === retrievedAddress) {
      return res.cookie('walletAddress', walletAddress).send({ success: true });
    }
    throw false;
  } catch (err) {
    return res.send({ success: false });
  }
});

indexRouter.get('/check', (req, res) => {
  const { walletAddress } = req.cookies;
  if (walletAddress) {
    return res.send({ success: true, walletAddress });
  }
  return res.send({ success: false });
});

indexRouter.get('/logout', (req, res) => {
  res.clearCookie('walletAddress');
  res.send({ success: true });
});

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Application started on port ${port}`);
});
