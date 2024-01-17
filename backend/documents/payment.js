require("dotenv").config();
const router = require("express").Router();
const db = require("../database.js");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

// razopay payment
router.post("/create-upi-payment", async (req, res) => {
  const { amount, currency, receipt } = req.body;

  try {
    // Check if the provided amount is at least 1 INR
    if (amount < 1) {
      return res
        .status(400)
        .json({ error: "Amount must be at least INR 1.00" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert amount to paise
      currency: currency,
      receipt: receipt,
      payment_capture: 1, // Auto-capture payment
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to handle Razorpay payment callback
router.post("/razorpay-callback", (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    user_id,
  } = req.body;

  // Save payment information in the database
  const query = `INSERT INTO payment (user_id, razorpay_order_id, razorpay_payment_id, razorpay_signature, payment_status, payment_timestamp) VALUES (?, ?, ?, ?, 'valid', NOW())`;
  const values = [
    user_id,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  ];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error("Error saving payment:", error);
      res.status(500).json({ success: false, message: "Erro saving payment" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "Payment received successfully" });
    }
  });
});

module.exports = router;
