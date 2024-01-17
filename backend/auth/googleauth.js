require("dotenv").config();
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const connection = require("../database");
const jwt = require("jsonwebtoken");

//  check google login email exist or not
router.post("/auth-google", async (req, res) => {
  const { email, phone_number } = req.body;

  try {
    // Prepare the SQL query
    const query = "SELECT * FROM investor_users WHERE email = ?";
    // Execute the query with the email parameter
    connection.query(query, [email], (err, results) => {
      if (err) {
        res.status(400).json({ success: false, message: "error login google" });
      }
      if (results[0]) {
        const token = jwt.sign(
          { mobileNumber: results[0].phone_number },
          process.env.TOKEN_SECRET_KEY
        );
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({
          success: true,
          message: "User exists",
          result: results[0],
          token,
        });
      } else {
        res.status(301).json({ success: false, message: "email not found!" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

//Nodemailer to send mail

router.post("/send-otp-gmail", (req, res) => {
  const otp = Math.floor(Math.random() * 900000) + 100000;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "33frontend@gmail.com",
      pass: "tlogrlfalgevwuwy",
    },
  });

  const mailOptions = {
    from: "33frontend@gmail.com",
    to: `${req.body.email}`,
    subject: "One Time Password (OTP)",
    text: `Your OTP is ${otp}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      console.log(`Email sent: ${info.response}`);
      req.session.otp = otp;
      req.session.save();
      console.log(req.session);
      res.sendStatus(200);
    }
  });
});

router.post("/verify-gmail-otp", (req, res) => {
  if (req.body.otp === req.session.otp) {
    res.status(200).send("verify otp");
    req.session.destroy();
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
