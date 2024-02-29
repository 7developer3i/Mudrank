// SolanaTransfer.js

import React, { useState } from 'react';
import { Connection, Transaction, sendAndConfirmTransaction, SystemProgram, Account, PublicKey } from '@solana/web3.js';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import QRCode from 'qrcode.react';

const SolanaTransfer = () => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');

  const handlePayment = async () => {
    try {
      // Create a connection to the Solana network
      const connection = new Connection('https://api.mainnet-beta.solana.com');

      // Replace with your Solana wallet private key
      const privateKey = '4QehXGxszDt5nYL4ZzJWtjhkQCvWxf2xdTxoJ3CPuainkWLc3HwUwkdzCZJwz6cqY4mDCceSFY9EMPJxnP4mRaSp';

      // Create a Solana keypair
      const wallet = new Account(Buffer.from(privateKey, 'hex'));

      // Get the public key of the recipient
      const recipientPublicKey = new PublicKey(recipientAddress);

      // Create a token transfer transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: recipientPublicKey,
          lamports: amount * 1000000000, 
        })
      );

      // Sign and send the transaction
      await sendAndConfirmTransaction(connection, transaction, [wallet]);

      const qrData = JSON.stringify({
        recipientAddress,
        amount,
        privateKey,
      });

      setQrCodeData(qrData);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Recipient Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter recipient address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handlePayment}>
              Generate QR Code
            </Button>
          </Form>
        </Col>
        <Col>
          {!qrCodeData && (
            <div>
              <h5>Scan this QR code with your Solana wallet:</h5>
              <QRCode value={qrCodeData} />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SolanaTransfer;
