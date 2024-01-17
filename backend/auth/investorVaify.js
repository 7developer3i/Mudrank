require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const connection = require("../database");
const speakeasy = require("speakeasy");

const twilioClient = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTHTOKEN
);
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Nexmo = require("nexmo");
const nexmo = new Nexmo({
  apiKey: "6e760c38",
  apiSecret: "knEZx3HxmEhZAh5X",
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTP = (phoneNumber, otp) => {
  return new Promise((resolve, reject) => {
    nexmo.message.sendSms(
      "8320848666",
      "+918320848666",
      `Your OTP is: ${otp}`,
      (err, responseData) => {
        if (err) {
          console.error("Error sending OTP:", err);
          reject(err);
        } else {
          resolve(responseData);
        }
      }
    );
  });
};

router.post("/send-otp", (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const otp = generateOTP();

  sendOTP(phoneNumber, otp)
    .then(() => {
      res.json({ success: true, message: "OTP sent successfully", });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, message: "Error sending OTP", });
    });
});

// sent otp in mail

const generateOTPEmail = () => {
  return speakeasy.totp({
    secret: speakeasy.generateSecret().base32,
    step: 60, // OTP changes every 60 seconds
  });
};

const sendOTPEmail = async (email, otp) => {
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "33front.end@gmail.com", // Replace with your Gmail email
      pass: "fpyqcwywuirezspl", // Replace with your Gmail password
    },
  });

  // Email content
  const mailOptions = {
    from: "33front.end@gmail.com", // Replace with your Gmail email
    to: email,
    subject: "Your OTP for authentication",
    text: `Your OTP is: ${otp}`,
  };

  // Send email
  const result = await transporter.sendMail(mailOptions);
  console.log("Email sent:", result);
};

// API endpoint to send OTP
router.post("/sendtwo-otp", (req, res) => {
  const { email } = req.body;

  // Validate the email (you might want to use a more sophisticated validation method)
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  // Generate OTP and send email
  const otp = generateOTPEmail();
  sendOTPEmail(email, otp);

  return res.status(200).json({ message: "OTP sent in mail successfully" });
});

// Route for user signup and OTP verification (number)
router.post("/signup", async (req, res) => {
  const { email, phone_number } = req.body;
  const otp = generateOTP(); // Function to generate a 6-digit OTP
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP expiry time: 5 minutes from now

  try {
    // Check if email or phone number already exists in the database
    const userExists = await checkUserExists(email, phone_number);
    if (userExists) {
      if (email) {
        connection.query(
          "UPDATE investor_users SET email = ?, otp = ?, otp_expiry = ? WHERE phone_number = ?",
          [email, otp, otpExpiry, phone_number],
          (error, results) => {
            if (error) {
              console.error("Error saving user details:", error);
              return res
                .status(500)
                .json({ success: false, message: "Failed to create user" });
            } else {
              // Send the OTP to the user's email
              sendOTPByEmail(email, otp, res); // Function to send OTP via email
              return res.status(200).json({
                success: true,
                message:
                  "User created, please verify with OTP sent to your email",
              });
            }
          }
        );
      } else {
        return res
          .status(200)
          .json({ success: false, message: "User already exists" });
      }
    } else {
      connection.query(
        "INSERT INTO investor_users (phone_number, otp, otp_expiry) VALUES (?, ?, ?)",
        [phone_number, otp, otpExpiry],
        (error, results) => {
          if (error) {
            console.error("Error saving user details:", error);
            return res
              .status(500)
              .json({ success: false, message: "Failed to create user" });
          } else {
            // Send the OTP to the user's phone number (using Twilio or any other service)
            // console.log(results.insertId);
            const genratedUserId = results.insertId
            sendOTPByPhone(phone_number, otp, res, genratedUserId); // Function to send OTP via SMS
            // return res.json({
            //   success: true,
            //   message:
            //     "User created, please verify with OTP sent to your phone",
            //   data: results[0],
            // });
          }
        }
      );
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ success: false, message: "Signup failed" });
  }
});

// Route for OTP verification
router.post("/verify-otp", async (req, res) => {
  const { email, phone_number, otp } = req.body;

  // Check if the provided email or phone number exists in the database
  connection.query(
    "SELECT * FROM investor_users WHERE email = ? OR phone_number = ?",
    [email, phone_number],
    (error, results) => {
      if (error) {
        console.error("Error retrieving user details:", error);
        return res
          .status(500)
          .json({ success: false, message: "Failed to verify OTP" });
      }

      // Check if user exists in the database
      if (results.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      // Retrieve the user's stored OTP and OTP expiry time from the database
      const storedOTP = results[0].otp;
      const otpExpiry = results[0].otp_expiry;

      // Check if the OTP has expired
      if (Date.now() > new Date(otpExpiry).getTime()) {
        return res
          .status(400)
          .json({ success: false, message: "OTP has expired" });
      }

      // Check if the provided OTP matches the stored OTP
      if (otp === storedOTP) {
        // For example, you can update the 'kyc_verified' column to true for the user in the investor_users table
        connection.query(
          "UPDATE investor_users SET verified = ?, is_logged_out = ? WHERE  phone_number = ? OR email = ?",
          [true, false, phone_number, email],
          async (error, results) => {
            if (error) {
              console.error("Error updating user status:", error);
              return res
                .status(500)
                .json({ success: false, message: "Failed to verify OTP" });
            } else {
              const token = jwt.sign(
                { mobileNumber: phone_number },
                process.env.TOKEN_SECRET_KEY
              );
              const investoreData = await getInvestorData(
                phone_number,
                email,
                otp, token
              );
              return res.json({
                success: true,
                message: "OTP verified successfully",
                data: investoreData.result,
                token: token
              });
            }
          }
        );
      } else {
        return res.status(400).json({ success: false, message: "Invalid OTP" });
      }
    }
  );
});

// Route for user logout
router.post("/logout", (req, res) => {
  const { email, phone_number } = req.body;

  // Clear the 'token' cookie
  res.clearCookie("token");

  // Check if the provided email or phone number exists in the database
  connection.query(
    "SELECT * FROM investor_users WHERE email = ? OR phone_number = ?",
    [email, phone_number],
    (error, results) => {
      if (error) {
        console.error("Error retrieving user details:", error);
        return res
          .status(500)
          .json({ success: false, message: "Failed to logout" });
      }

      // Check if user exists in the database
      if (results.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      // Update the 'is_logged_out' flag to true
      connection.query(
        "UPDATE investor_users SET is_logged_out = ? WHERE email = ? OR phone_number = ?",
        [true, email, phone_number],
        (error, results) => {
          if (error) {
            console.error("Error updating user status:", error);
            return res
              .status(500)
              .json({ success: false, message: "Failed to logout" });
          }

          return res.json({
            success: true,
            message: "User logged out successfully",
          });
        }
      );
    }
  );
});

// Route for resending OTP to the user's mobile number (email, number)  -- LOGOIN ROUTES
router.post("/resend-otp", async (req, res) => {
  const { email, phone_number } = req.body;
  console.log("reqqq", req.body);
  const otp = generateOTP(); // Function to generate a new 6-digit OTP
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP expiry time: 5 minutes from now
  const query =
    "SELECT * FROM investor_users WHERE email = ? OR phone_number = ?";
  connection.query(query, [email, phone_number], async (error, results) => {
    if (error) {
      console.error("Error checking user existence:", error);
    } else {
      if (results[0]?.role == "investor") {
        try {
          // Check if the provided email or phone number exists in the database
          const userExists = await checkUserExists(email, phone_number);
          if (!userExists) {
            return res
              .status(404)
              .json({ success: false, message: "User not found" });
          }

          // Update the user's OTP and OTP expiry in the database
          connection.query(
            "UPDATE investor_users SET otp = ?, otp_expiry = ? WHERE email = ? OR phone_number = ?",
            [otp, otpExpiry, email, phone_number],
            async (error, results) => {
              if (error) {
                console.error("Error updating OTP details:", error);
                return res
                  .status(500)
                  .json({ success: false, message: "Failed to resend OTP" });
              }
              // Send the new OTP to the user's phone number (using Twilio or any other service)
              await sendOTPByPhone(phone_number, otp, res); // Function to send OTP via SMS
              // return res.json({ success: true, message: "OTP resent successfully" });
            }
          );
        } catch (error) {
          console.error("Error resending OTP:", error);
          return res
            .status(500)
            .json({ success: false, message: "Failed to resend OTP" });
        }
      } else {
        res.status(400).send({
          success: false,
          error: "No one except investors can login", status: 400
        })
      }
    }
  });
});

router.post("/resendtwo-otp", async (req, res) => {
  const { email, phone_number } = req.body;
  console.log("opopopop", req.body);
  const otp = generateOTP(); // Function to generate a new 6-digit OTP
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP expiry time: 5 minutes from now
  const query =
    "SELECT * FROM investor_users WHERE email = ? OR phone_number = ?";
  connection.query(query, [email, phone_number], async (error, results) => {
    if (error) {
      console.error("Error checking user existence:", error);
    } else {
      console.log(results[0], "rrrr");
      if (results[0].role == "investor") {
        try {
          // Check if the provided email or phone number exists in the database
          const userExists = await checkUserExists(email, phone_number);
          if (!userExists) {
            return res
              .status(404)
              .json({ success: false, message: "User not found" });
          }

          // Update the user's OTP and OTP expiry in the database
          connection.query(
            "UPDATE investor_users SET otp = ?, otp_expiry = ? WHERE email = ? OR phone_number = ?",
            [otp, otpExpiry, email, phone_number],
            (error, results) => {
              if (error) {
                console.error("Error updating OTP details:", error);
                return res
                  .status(500)
                  .json({ success: false, message: "Failed to resend OTP" });
              }
              // Send the new OTP to the user's phone number (using Twilio or any other service)
              sendOTPEmail(email, otp); // Function to send OTP via Email
              return res.json({ success: true, message: "OTP resent successfully", results });
            }
          );
        } catch (error) {
          console.error("Error resending OTP:", error);
          return res
            .status(500)
            .json({ success: false, message: "Failed to resend OTP" });
        }

      } else {
        res.status(400).send({
          success: false,
          error: "No one except investors can login", status: 400
        })
      }
    }
  });
})

async function getInvestorData(phone_number, email, otp, token) {

  try {
    const queryResult = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM investor_users WHERE email = ? OR phone_number = ?",
        [email, phone_number],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            connection.query(
              "UPDATE investor_users SET token = ? WHERE email = ? OR phone_number = ?",
              [token, email, phone_number],
              (error, results) => {
                if (error) {
                  console.error("missing token", error);
                  reject({ success: false, message: "Failed to resend OTP" });
                }
                // sendOTPEmail(email, otp); // Function to send OTP via Email
                resolve(result);
              }
            );
          }
        }
      );
    });
    console.log(queryResult, "test");

    if (queryResult.length > 0) {
      // res.cookie('accessToken', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }); // Set the token as a cookie with a max age of 24 hours and HTTP-only flag
      return {
        success: true,
        message: "Phone number exists",
        result: queryResult[0]
      };
      // Do something if phone number exists
    } else {
      console.log("Phone number does not exist in the database");
      // Do something if phone number does not exist
      return {
        success: false,
        error: "Phone number does not exist in the database",
      };
    }
  } catch (error) {
    console.error("An error occurred while querying the database:", error);
    res.status(500).send({
      success: false,
      error: "An error occurred while querying the database",
    });
  }
}

// Route to get profile data by user_id
router.get("/profile/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const queryResult = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM investor WHERE user_id = ?",
        [user_id],
        (error, result, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });

    if (queryResult.length > 0) {
      // User profile found
      const profileData = queryResult[0];
      res.status(200).json({
        success: true,
        profileData,
      });
    } else {
      // User profile not found
      res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }
  } catch (error) {
    console.error("An error occurred while querying the database:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while querying the database",
    });
  }
});

router.put("/profile/update", async (req, res) => {
  const { user_id, email, OTP } = req.body;
  const otp = generateOTP(); // Function to generate a new 6-digit OTP
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP expiry time: 5 minutes from now

  if (!OTP) {
    // Update the user's OTP and OTP expiry in the database
    connection.query(
      "UPDATE investor_users SET otp = ?, otp_expiry = ? WHERE id = ?",
      [otp, otpExpiry, user_id],
      (error, results) => {
        if (error) {
          console.error("Error updating OTP details:", error);
          return res
            .status(500)
            .json({ success: false, message: "Failed to resend OTP" });
        }
        // Send the new OTP to the user's phone number (using Twilio or any other service)
        sendOTPEmail(email, otp); // Function to send OTP via SMS
        return res.json({ success: true, message: "OTP resent successfully" });
      }
    );
  } else {
    try {
      const updateEmailQuery = `
    UPDATE investor_users
    SET email = ?
    WHERE id = ?`;
      connection.query(updateEmailQuery, [email, user_id], (err, results) => {
        if (err) {
          console.error("Error updating email:", err);
          return;
        }
        res
          .status(200)
          .send({ success: true, message: "Email updated successfully" });
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "not updated field ",
      });
    }
  }
});

// Function to check if the user with the given email or phone number already exists
function checkUserExists(email, phone_number) {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT COUNT(*) AS count FROM investor_users WHERE email = ? OR phone_number = ?";
    connection.query(query, [email, phone_number], (error, results) => {
      if (error) {
        console.error("Error checking user existence:", error);
        reject(error);
      } else {
        const count = results[0].count;
        console.log("ererrer", results);
        resolve(count > 0);
      }
    });
  });
};

// Function to send the OTP to the user via email or SMS (using Twilio or any other service)
function sendOTPByPhone(phone_number, otp, res, genratedUserId) {
  // Implement code here to send the OTP via email or SMS
  sendOTP(phone_number, otp)
    .then(() => {
      res.json({ success: true, message: "OTP sent successfully", userid: genratedUserId });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, message: "Error sending OTP" });
    });
};

const sendOTPPhoneNumber = async (phoneNumber, otp) => {
  // Implement your logic to send OTP to the provided phone number (e.g., using a SMS gateway)
  console.log(`Sending OTP to ${phoneNumber}: ${otp}`);
};

// code for general details  for email
router.post('/send-otp-email/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Provide email in the request body' });
    }

    // Step 1: Generate and send OTP
    const otp = generateOTP();
    // await sendOTPEmail(email, otp);
    // Update user table with OTP
    const updateQuery = `
      UPDATE investor_users
      SET otp = ?
      WHERE id = ?;
    `;
    connection.query(updateQuery, [otp, userId], (err, result) => {
      if (err) {
       return res.status(400).json({ success: false, message: 'User ID Not Found' });
      }
      console.log('OTP saved and user table updated successfully');
      res.status(200).json({ success: true, message: 'OTP sent successfully' });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


router.post('/verify-otp-email/:userId', async (req, res) => {
  const { email, otp } = req.body;
  const userId = req.params.userId;

  // Step 1: Check if the provided OTP matches for the specific user ID
  connection.query(
    "SELECT * FROM investor_users WHERE id = ? AND otp = ?",
    [userId, otp],
    (error, results) => {
      if (error) {
        console.error("Error retrieving user details:", error);
        return res.status(500).json({ success: false, message: "Failed to verify OTP" });
      }

      // Check if the OTP matches for the specific user ID
      if (results.length === 0) {
        return res.status(401).json({ success: false, message: "Invalid OTP or user not found" });
      }

      // Step 2: Update the email in the database
      connection.query(
        "UPDATE investor_users SET email = ? WHERE id = ?",
        [email, userId],
        (error, updateResults) => {
          if (error) {
            console.error("Error updating email:", error);
            return res.status(500).json({ success: false, message: "Failed to update email" });
          }

          // Check if the email was updated successfully
          if (updateResults.affectedRows > 0) {
            res.json({ status: 200, message: "Email updated successfully" });
          } else {
            res.status(500).json({ success: false, message: "Failed to update email" });
          }
        }
      );
    }
  );
});


// for mobileNumber

router.post('/send-otp-mobile/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
      return res.status(400).json({ success: false, message: 'Provide mobileNumber in the request body' });
    }

    // Step 1: Generate and send OTP
    const otp = generateOTP();

    // Assuming you have a function sendOTPByPhone to send the OTP via SMS
    // try {
    //   await sendOTPByPhone(mobileNumber, otp);
    //   console.log('OTP sent successfully to mobile number:', mobileNumber);
    // } catch (error) {
    //   console.error('Error sending OTP:', error);
    //   return res.status(500).json({ success: false, message: 'Failed to send OTP' });
    // }

    // Step 2: Update user table with OTP
    const updateQuery = 'UPDATE investor_users SET otp = ? WHERE id = ?';

    try {
      // Update user table with OTP
      await connection.query(updateQuery, [otp, userId]);
      console.log('OTP saved and user table updated successfully');
    } catch (error) {
      console.error('Error saving OTP and updating user table:', error);
      return res.status(500).json({ success: false, message: 'Failed to save OTP and update user table' });
    }

    res.status(200).json({ success: true, message: 'OTP sent successfully', otp: otp });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


router.put('/verify-otp-mobile/:userId', async (req, res) => {
  const { phone_number, otp } = req.body;
  const userId = req.params.userId;

  // Step 1: Check if the provided OTP matches for the specific user ID
  connection.query(
    "SELECT * FROM investor_users WHERE id = ? AND otp = ?",
    [userId, otp],
    (error, results) => {
      if (error) {
        console.error("Error retrieving user details:", error);
        return res.status(500).json({ success: false, message: "Failed to verify OTP" });
      }

      // Check if the OTP matches for the specific user ID
      if (results.length === 0) {
        return res.status(401).json({ success: false, message: "Invalid OTP or user not found" });
      }

      // Step 2: Update the email in the database
      connection.query(
        "UPDATE investor_users SET phone_number = ? WHERE id = ?",
        [phone_number, userId],
        (error, updateResults) => {
          if (error) {
            console.error("Error updating mobileNumber:", error);
            return res.status(500).json({ success: false, message: "Failed to update phone_number" });
          }

          // Check if the email was updated successfully
          if (updateResults.affectedRows > 0) {
            res.json({ status: 200, message: "mobileNumber updated successfully" });
          } else {
            res.status(500).json({ success: false, message: "Failed to update phone_number" });
          }
        }
      );
    }
  );
});

module.exports = router;
