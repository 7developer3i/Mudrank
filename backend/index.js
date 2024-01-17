// require("dotenv").config();
const express = require("express");
const app = express();
const port = 3002;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require("passport");
const bodyParser = require("body-parser");
const Connection = require("./database.js");

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://192.168.1.10:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}

app.use(cors(corsOptions));
app.use("/uploads", express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.json());
app.use("/investor", require("./auth/investorVaify.js"));
app.use("/", require("./auth/googleauth.js"));
app.use("/auth", require("./utilities/user.js"));
app.use("/auth", require("./utilities/startup.js"));
app.use("/auth", require("./documents/index.js"));
app.use("/kyc", require("./documents/kyc.js"));
app.use("/kyc", require("./documents/bankdetails.js"));
app.use("/", require("./documents/payment.js"));
app.use("/", require("./slotbook/slotbook.js"));
app.use("/auth", require("./utilities/investor.js"));
app.use("/", require("./website/homepage.js"));
app.use("/", require("./website/privacy.js"));
// app.use("/",require("./website/customer.js"))
app.use("/", require("./closecompaigns/closestartups.js"));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

app.get("/", (req, res) => {
  res.status(200).send('start backend');
});

app.post("/letter", (req, res) => {
  res.status(200).send({ success: true, result: req.body });
});

app.listen(port, () => {
  console.log(`Server start at http://localhost:${port}`);
});
