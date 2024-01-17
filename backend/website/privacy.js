const express = require("express");
const router = express.Router();
const connection = require("../database");
const multer = require("multer");
const nodemailer = require("nodemailer");
const axios = require("axios"); // Import axios
const rateLimit = require("express-rate-limit");
const investorController = require("./privacyFunction");
const bcrypt = require("bcrypt");
const { Connection, clusterApiUrl, PublicKey, Transaction, sendAndConfirmTransaction, SystemProgram } = require('@solana/web3.js');
const QRCode = require('qrcode');




const network = 'devnet'; // or 'testnet' or 'mainnet'
const connectiontwo = new Connection(clusterApiUrl(network));



const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 50 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

// Next Time Will Be Use This Type Routes Ok aavi rite bdhi Api kr devani che

// Next Time Will Be Use This Type Routes Ok

router.get("/test", async (req, res) => {
  try {
    const test = await investorController.fetchInvestorData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.error || "Internal Server Error" });
  }
});

// Next Time Will Be Use This Type Routes Ok

router.use("/about", apiLimiter);
router.use("/privacy", apiLimiter);
router.use("/startup", apiLimiter);
router.use("/fundraising", apiLimiter);
router.use("/browse", apiLimiter);
router.use("/faq", apiLimiter);
router.use("/freq", apiLimiter);
router.use("/footer_data", apiLimiter);
router.use("footerdata", apiLimiter);
router.use("/raise", apiLimiter);
router.use("/mission", apiLimiter);
router.use("/curated", apiLimiter);
router.use("/imagedata", apiLimiter);

// const mysql = require('mysql2');
// const db = require("db")

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service provider
  auth: {
    user: "33front.end@gmail.com", // Your email address
    pass: "fpyq cwyw uire zspl", // Your email password
  },
});

router.post("/email", (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: "33front.end@gmail.com", // Sender's email address
    to: to,
    subject: subject, // Email subject
    text: text, // Email body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
      res.status(500).json({ error: "Error sending email" });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: "Email sent successfully" });
    }
  });
});

const upload = multer({ storage });

router.post("/upload/:id", upload.single("files"), (req, res) => {
  const id = req.params.id; // Extract the ID from the URL parameter

  try {
    const updateQuery = "UPDATE startup_table SET Image = ? WHERE id = ?";

    connection.query(updateQuery, [req.file.path, id], (error, results) => {
      if (error) {
        console.error("Error updating data: " + error);
        res.status(500).json({ error: "Error updating data" });
      } else {
        console.log("Updated the record with ID: " + id);
        res.status(200).json({ message: "File Uploaded Successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// privacy routes

router.post("/privacy", async (req, res) => {
  try {
    const test = await investorController.fetchcreatePrivacyData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/privacy", async (req, res) => {
  try {
    const test = await investorController.fetchPrivacyData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.error || "Internal Server Error" });
  }
});

router.put("/privacy/:id", async (req, res) => {
  try {
    const test = await investorController.fetcheditPrivacyData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/privacy/:id", async (req, res) => {
  try {
    const test = await investorController.fetchDeletePrivacyData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// about routes

router.post("/about", upload.single("files"), async (req, res) => {
  try {
    const test = await investorController.fetchcreateaboutData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/about", async (req, res) => {
  try {
    const test = await investorController.fetchaboutData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/about", upload.single("files"), async (req, res) => {
  try {
    const test = await investorController.fetcheditaboutData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/about/:id", async (req, res) => {
  try {
    const test = await investorController.fetchdeleteaboutData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// completed startups routes

router.post("/startup", upload.single("files"), async (req, res) => {
  try {
    const test = await investorController.fetchcreateStartupData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/startup", async (req, res) => {
  try {
    const test = await investorController.fetchStartupData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/startup", upload.single("files"), async (req, res) => {
  try {
    const test = await investorController.fetcheditStartupData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/startup/:id", async (req, res) => {
  try {
    const test = await investorController.fetchdeleteStartupData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// fundraising routes
router.get("/fundraising", async (req, res) => {
  try {
    const test = await investorController.fetchfundraisingData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/fundraising", upload.single("files"), async (req, res) => {
  try {
    const test = await investorController.fetchcreatefundraisingData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/fundraising", upload.single("files"), async (req, res) => {
  try {
    const test = await investorController.fetcheditfundraisingData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/fundraising/:id", async (req, res) => {
  try {
    const test = await investorController.fetchDeletefundraisingData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Browse By Topics Routes

router.post("/browse", (req, res) => {
  const data = req.body;
  const query = "SELECT * FROM user WHERE id = ?";
  connection.query(query, [data.adminid], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch investors" });
    }
    if (result[0].token == data.token) {
      const insertQuery = `INSERT INTO browse_Table (describe_item, title, created_date, is_deleted, status) VALUES (?, ?, NOW(), ?, ?)`;
      connection.query(
        insertQuery,
        [data.describe_item, data.title, 0, "Active"],
        (error, results) => {
          if (error) {
            console.error("Error inserting data: " + error);
            res.status(500).json({ error: "Error inserting data" });
          } else {
            if (results.insertId) {
              const insertQuery = `INSERT INTO frequently_table (browse_id, question, answer, created_date, is_deleted, status) VALUES (?, ?, ?, NOW(), ?, ?)`;
              connection.query(
                insertQuery,
                [results.insertId, data.question, data.answer, 0, "Active"],
                (error, result) => {
                  if (error) {
                    console.error("Error inserting data: " + error);
                    res.status(500).json({ error: "Error inserting data" });
                  } else {
                    res.status(200).json({ message: "Inserted a record" });
                  }
                }
              );
            }
          }
        }
      );
    } else {
      res.status(400).json({ message: "missing token" });
    }
  });
});

router.get("/card/:id", (req, res) => {
  const cardId = req.params.id;

  // Create a SQL query to fetch data from both tables where browse_id matches the cardId
  const query = `
    SELECT b.*, f.question, f.answer
    FROM browse_Table b
    LEFT JOIN frequently_table f ON b.id = f.browse_id
    WHERE b.id = ?;
  `;

  connection.query(query, [cardId], (error, results) => {
    if (error) {
      console.error("Error fetching data: " + error);
      res.status(500).json({ error: "Error fetching data" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Card not found" });
    } else {
      const cardData = results[0]; // Assuming that there's only one matching record
      res.status(200).json(cardData);
    }
  });
});

router.put("/card/:id", (req, res) => {
  const cardId = req.params.id;
  const data = req.body;

  // Start a database transaction
  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction: " + err);
      res.status(500).json({ error: "Error starting transaction" });
      return;
    }

    // Update the browse_Table
    const updateBrowseQuery = `
      UPDATE browse_Table
      SET describe_item = ?, title = ?
      WHERE id = ?;
    `;

    connection.query(
      updateBrowseQuery,
      [data.describe_item, data.title, cardId],
      (error, browseResult) => {
        if (error) {
          connection.rollback(() => {
            console.error("Error updating browse_Table: " + error);
            res.status(500).json({ error: "Error updating browse_Table" });
          });
        } else {
          // Update the frequently_table
          const updateFrequentlyQuery = `
            UPDATE frequently_table
            SET question = ?, answer = ?
            WHERE browse_id = ?;
          `;

          connection.query(
            updateFrequentlyQuery,
            [data.question, data.answer, cardId],
            (error, frequentlyResult) => {
              if (error) {
                connection.rollback(() => {
                  console.error("Error updating frequently_table: " + error);
                  res
                    .status(500)
                    .json({ error: "Error updating frequently_table" });
                });
              } else {
                // Commit the transaction if both updates are successful
                connection.commit((err) => {
                  if (err) {
                    connection.rollback(() => {
                      console.error("Error committing transaction: " + err);
                      res
                        .status(500)
                        .json({ error: "Error committing transaction" });
                    });
                  } else {
                    console.log("Transaction successfully completed.");
                    res
                      .status(200)
                      .json({ message: "Record updated successfully" });
                  }
                });
              }
            }
          );
        }
      }
    );
  });
});

router.delete("/browse/:id", (req, res) => {
  console.log(req.query, req.params);
  const query = "SELECT * FROM user WHERE id = ?";
  connection.query(query, [req.query.adminid], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch investors" });
      return;
    }
    const cardId = req.params.id;

    if (result[0].token == req.query.token) {
      connection.beginTransaction((err) => {
        if (err) {
          console.error("Error starting transaction: " + err);
          res.status(500).json({ error: "Error starting transaction" });
          return;
        }

        // Delete the record from browse_Table (describe_item and title)
        const deleteBrowseQuery = "DELETE FROM browse_Table WHERE id = ?";

        connection.query(deleteBrowseQuery, [cardId], (error, browseResult) => {
          if (error) {
            connection.rollback(() => {
              console.error("Error deleting describe_item and title: " + error);
              res
                .status(500)
                .json({ error: "Error deleting describe_item and title" });
            });
          } else {
            // Commit the transaction if the deletion is successful
            // connection.commit((err) => {
            //   if (err) {
            //     connection.rollback(() => {
            //       console.error("Error committing transaction: " + err);
            //       res
            //         .status(500)
            //         .json({ error: "Error committing transaction" });
            //     });
            //   } else {
            //     console.log("Transaction successfully completed.");
            //     res.status(200).json({
            //       message: "Describe_item and title deleted successfully",
            //     });
            //   }
            // });
            const deleteQuery =
              "DELETE FROM frequently_table WHERE browse_id = ?";
            connection.query(deleteQuery, [cardId], (error, results) => {
              if (error) {
                console.error("Error deleting data: " + error);
                res.status(500).json({ error: "Error deleting data" });
              } else {
                if (results.affectedRows === 0) {
                  res.status(404).json({ error: "Record not found" });
                } else {
                  res
                    .status(200)
                    .json({ message: "Deleted the four items in record" });
                }
              }
            });
          }
        });
      });
    } else {
      res.status(400).json({ message: "missing token" });
    }
  });
});

router.delete("/question/:id", (req, res) => {
  const cardId = req.params.id;

  // Start a database transaction
  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction: " + err);
      res.status(500).json({ error: "Error starting transaction" });
      return;
    }

    // Delete the records from frequently_table (question and answer)
    const deleteFrequentlyQuery =
      "DELETE FROM frequently_table WHERE browse_id = ?";

    connection.query(
      deleteFrequentlyQuery,
      [cardId],
      (error, frequentlyResult) => {
        if (error) {
          connection.rollback(() => {
            console.error("Error deleting question and answer: " + error);
            res
              .status(500)
              .json({ error: "Error deleting question and answer" });
          });
        } else {
          // Commit the transaction if the deletion is successful
          connection.commit((err) => {
            if (err) {
              connection.rollback(() => {
                console.error("Error committing transaction: " + err);
                res.status(500).json({ error: "Error committing transaction" });
              });
            } else {
              console.log("Transaction successfully completed.");
              res
                .status(200)
                .json({ message: "Question and answer deleted successfully" });
            }
          });
        }
      }
    );
  });
});

router.get("/browse", async (req, res) => {
  try {
    const test = await investorController.fetchbrowseData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/browse/:id", async (req, res) => {
  try {
    const test = await investorController.fetcheditbrowseData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// FAQ Section Routes

router.post("/faq", async (req, res) => {
  try {
    const test = await investorController.fetchcreatefaqData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/faq", async (req, res) => {
  try {
    const test = await investorController.fetchfaqData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/faq/:id", async (req, res) => {
  try {
    const test = await investorController.fetcheditfaqData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/faq/:id", async (req, res) => {
  try {
    const test = await investorController.fetchdeletefaqData(req, res);
    //
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Frequently Asked Question section

router.post("/freq", async (req, res) => {
  try {
    const test = await investorController.fetchcreatefreqData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/freq", async (req, res) => {
  try {
    const test = await investorController.fetchfreqData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/freq/:id", async (req, res) => {
  try {
    const test = await investorController.fetcheditfreqData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/freq/:id", async (req, res) => {
  try {
    const test = await investorController.fetchdeletefreqData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  Footer route
router.post("/footer_data", async (req, res) => {
  try {
    const test = await investorController.fetchcreatefooterData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/footer_data", async (req, res) => {
  try {
    const test = await investorController.fetchfooterData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/footerdata/:id", async (req, res) => {
  try {
    const test = await investorController.fetcheditfooterData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/footerdata/:id", async (req, res) => {
  try {
    const test = await investorController.fetchdeletefooterData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// About Page Data

router.post("/sendHtmlAndSave", async (req, res) => {
  try {
    const test = await investorController.fetchcreatesendhtmlData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/sendHtmlAndSave", async (req, res) => {
  try {
    const test = await investorController.fetchsendhtmlData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/sendHtmlAndSave/:id", async (req, res) => {
  try {
    const test = await investorController.fetcheditsendhtmlData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Raise table routes
router.post("/raise", upload.single("files"), (req, res) => {
  try {
    const formData = req.body;
    console.log(req.body, "ffff");
    const insertQuery = `
      INSERT INTO raise_table (
        your_name,
        registered_company_name,
        company_email,
        website,
        company_linkedin,
        founder_linkedin,
        previous_fundraising,
        product_description,
        traction_description,
        revenue_description,
        team_size,
        community_round_reason,
        mudrank_fit_description,
        existing_commitments,
        private_round_interest,
        pitch_file
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      formData.name,
      formData.companyname,
      formData.companyemail,
      formData.website[0],
      formData.linkedin,
      formData.linkedinurl,
      formData.fundraisingrounds,
      formData.product,
      formData.traction,
      formData.revenue,
      formData.team,
      formData.Communityround,
      formData.rightfit,
      formData.commitments,
      formData.privateRoundInterest,
      req.file.path,
    ];

    if (formData.companyemail) {
      const mailOptions = {
        from: "deepjpatel33@gmail.com",
        to: formData.companyemail,
        subject: "Welcome to Our Company",
        text: "Thank you for registering with our company. We are excited to have you on board!,",
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: " + error);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          console.log("Email sent: " + info.response);
          res
            .status(200)
            .json({ message: "Data inserted successfully. Email sent." });
        }
      });
    }

    connection.query(insertQuery, values, (err, results) => {
      if (err) {
        console.error("Error inserting data into the database: " + err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Data inserted successfully");
        res.status(200).json({ message: "Data inserted successfully" });
      }
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/raise", (req, res) => {
  try {
    const selectQuery = "SELECT * FROM raise_table";

    connection.query(selectQuery, (err, results) => {
      if (err) {
        console.error("Error fetching data from the database: " + err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Data retrieved successfully");
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.put("/raise/:id", (req, res) => {
  try {
    const applicationId = req.params.id;
    const updateData = req.body;

    const updateQuery = "UPDATE raise_table SET ? WHERE id = ?";

    connection.query(
      updateQuery,
      [updateData, applicationId],
      (err, results) => {
        if (err) {
          console.error("Error updating data in the database: " + err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          console.log("Data updated successfully");
          res.status(200).json({ message: "Data updated successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.delete("/raise/:id", (req, res) => {
  try {
    const id = req.params.id;

    const deleteQuery = "DELETE FROM raise_table WHERE id = ?";
    connection.query(deleteQuery, [id], (error, results) => {
      if (error) {
        console.error("Error deleting data: " + error);
        res.status(500).json({ error: "Error deleting data" });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).json({ error: "Record not found" });
        } else {
          console.log("Deleted the record with ID: " + id);
          res.status(200).json({ message: "Deleted the record" });
        }
      }
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// mission page data
router.post("/mission", async (req, res) => {
  try {
    const test = await investorController.fechcreatemissionData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/mission", async (req, res) => {
  try {
    const test = await investorController.fetchmissionData(req, res);
    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/mission/:id", async (req, res) => {
  try {
    const test = await investorController.fetcheditmissionData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// curated page route
router.post("/curated", async (req, res) => {
  try {
    const test = await investorController.fetchcreatecuratedData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/curated", async (req, res) => {
  try {
    const test = await investorController.fetchcuratedData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/curated/:id", async (req, res) => {
  try {
    const test = await investorController.fetcheditcuatedData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/curated/:id", async (req, res) => {
  try {
    const test = await investorController.fetchdeletecuratedData(req, res);

    res.status(test.status).json(test.data || { message: test.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/imagedata", upload.single("files"), (req, res) => {
  try {
    const data = req.body;
    console.log(req.file, "data...");
    const insertQuery =
      "INSERT INTO imagetwo_table (image_data, created_at) VALUES (?, NOW())";

    // Execute the query
    connection.query(insertQuery, [req.file.path], (error, results) => {
      if (error) {
        console.error("Error inserting data: " + error);
        res.status(500).json({ error: "Error inserting data" });
      } else {
        console.log("Inserted a record with ID: " + results.insertId);
        res.status(200).json({ message: "Inserted a record" });
      }
    });
  } catch (error) {
    console.error("Error in POST /imagedata: " + error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/imagedata", (req, res) => {
  try {
    connection.query("SELECT * FROM imagetwo_table", (err, results, fields) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "An error occurred" });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error("Error in GET /imagedata: " + error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// dashboard customer = investor + investor_users joint routes

router.get("/Customers", (req, res) => {
  if (req.query.adminid) {
    const query = "SELECT * FROM user WHERE id = ?";
    connection.query(query, [req.query.adminid], (err, result) => {
      if (err) {
        reject({ status: 500, error: "Failed to fetch investors" });
        return;
      }

      if (result[0] && result[0].token == req.query.token) {
        const query = `
    SELECT investor.full_name, investor.phone_number, investor.status, investor_users.email, investor_users.updated_at,investor_users.is_logged_out
    FROM investor
    JOIN investor_users ON investor.user_id = investor_users.id;
  `;

        connection.query(query, (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          if (results.length === 0) {
            return res.status(404).json({ error: "No investors found" });
          }

          res.json(results);
        });
      } else {
        res.json({ status: 400, error: "Missing token or adminId" });
      }
    });
  }
});

// customer count or length get route
router.get("/Customerscount", (req, res) => {
  const query = `
    SELECT COUNT(*) AS customerCount
    FROM investor
    JOIN investor_users ON investor.user_id = investor_users.id;
  `;

  connection.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const customerCount = result[0].customerCount;

    res.json({ customerCount });
  });
});

// dashboard payment = investor + payment

router.get("/paymentData", (req, res) => {
  if (req.query.adminid) {
    const query = "SELECT * FROM user WHERE id = ?";
    connection.query(query, [req.query.adminid], (err, result) => {
      if (err) {
        reject({ status: 500, error: "Failed to fetch investors" });
        return;
      }

      if (result[0] && result[0].token == req.query.token) {
        const query = `
  SELECT investor.full_name, investor.phone_number,investor.created_date, payment.payment_status, payment.payment_timestamp
  FROM investor
  INNER JOIN payment ON investor.user_id = payment.user_id
  `;

        connection.query(query, (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          if (results.length === 0) {
            return res.status(404).json({ error: "No investors found" });
          }

          res.json(results);
        });
      } else {
        res.json({ status: 400, message: "missing Token or adminId" });
      }
    });
  }
});

router.get("/KycData", (req, res) => {
  if (req.query.adminid) {
    const query = "SELECT * FROM user WHERE id = ?";
    connection.query(query, [req.query.adminid], (err, result) => {
      if (err) {
        reject({ status: 500, error: "Failed to fetch investors" });
        return;
      }

      if (result[0] && result[0].token == req.query.token) {
        const query = `
  SELECT investor.full_name, investor.phone_number,kyc_documents.created_date, kyc_documents.date_of_birth, kyc_documents.full_name,kyc_documents.pancard_number,kyc_documents.status
  FROM investor
  INNER JOIN kyc_documents ON investor.user_id = kyc_documents.user_id
  `;

        connection.query(query, (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          if (results.length === 0) {
            return res.status(404).json({ error: "No investors found" });
          }

          res.json(results);
        });
      } else {
        res.json({ status: 400, message: "missing token or adminId" });
      }
    });
  }
});

router.get("/bankData", (req, res) => {
  if (req.query.adminid) {
    const query = "SELECT * FROM user WHERE id = ?";
    connection.query(query, [req.query.adminid], (err, result) => {
      if (err) {
        reject({ status: 500, error: "Failed to fetch investors" });
        return;
      }

      if (result[0] && result[0].token == req.query.token) {
        const query = `
  SELECT investor.full_name, investor.phone_number,investor.status,bank_details.ifsc_code, bank_details.account_number, bank_details.account_holder_name,bank_details.bank_name,bank_details.created_date
  FROM investor
  INNER JOIN bank_details ON investor.user_id = bank_details.user_id
  `;

        connection.query(query, (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          if (results.length === 0) {
            return res.status(404).json({ error: "No investors found" });
          }

          res.json(results);
        });
      } else {
        res.json({ status: 400, message: "missing token or adminId" });
      }
    });
  }
});

// investor Route
router.get("/Investors", (req, res) => {
  if (req.query.adminid) {
    const query = "SELECT * FROM user WHERE id = ?";
    connection.query(query, [req.query.adminid], (err, result) => {
      if (err) {
        reject({ status: 500, error: "Failed to fetch investors" });
        return;
      }

      if (result[0] && result[0].token == req.query.token) {
        const query = `
  SELECT
    investor.full_name,
    investor.user_id,
    investor.status,
    investor_users.email,
    investor_users.phone_number,
    investor_users.role,
    investor_users.created_at
  FROM
    investor
    JOIN investor_users ON investor.user_id = investor_users.id
  WHERE
    investor_users.is_deleted = 0;
`;

        connection.query(query, (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          if (results.length === 0) {
            return res.status(404).json({ error: "No investors found" });
          }

          res.json(results);
        });
      } else {
        res.json({ status: 400, message: "missing token or adminId" });
      }
    });
  }
});

// post route add customerData
router.post("/addInvestor", (req, res) => {
  const {
    full_name,
    phone_number,
    address,
    city,
    state,
    country,
    postal_code,
    email, // Add email to the request payload
  } = req.body;

  if (req.query.adminid) {
    const query = "SELECT * FROM user WHERE id = ?";
    connection.query(query, [req.query.adminid], (err, result) => {
      if (err) {
        reject({ status: 500, error: "Failed to fetch investors" });
        return;
      }

      if (result[0] && result[0].token == req.query.token) {
        console.log(req.body, "wwwwww");

        const insertUserQuery = `
          INSERT INTO investor_users (email, phone_number)
          VALUES (?, ?)
        `;

        connection.query(
          insertUserQuery,
          [email, phone_number],
          (err, result) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json({ error: "Error inserting into investor_users table" });
            }

            const user_id = result.insertId;
            console.log(result);

            // Insert data into investor table using the obtained user_id
            const insertInvestorQuery = `
            INSERT INTO investor (user_id, full_name, phone_number, address, city, state, country, postal_code, created_date, status, is_deleted, kyc_verified)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), "pending", 0, 1)
          `;

            connection.query(
              insertInvestorQuery,
              [
                user_id,
                full_name,
                phone_number,
                address,
                city,
                state,
                country,
                postal_code,
              ],
              (err) => {
                if (err) {
                  console.error(err);
                  return res
                    .status(500)
                    .json({ error: "Error inserting into investor table" });
                }

                res
                  .status(200)
                  .json({ status: 200, message: "Data added successfully" });
              }
            );
          }
        );
      } else {
        res.json({ status: 400, message: "missing token or adminId" });
      }
    });
  } else {
    res.json({ status: 400, message: "missing token or adminId" });
  }
});

// user get route
router.get("/user", (req, res) => {
  const selectQuery = "SELECT username FROM user";
  connection.query(selectQuery, (err, results) => {
    if (err) {
      res.json({ status: 500, error: "Error retrieving data" });
    } else {
      res.json({ status: 200, data: results });
    }
  });
});

// user table get route for all fields
router.get("/userData", (req, res) => {
  const selectQuery = "SELECT * FROM user WHERE is_deleted = 0";
  connection.query(selectQuery, (err, results) => {
    if (err) {
      res.json({ status: 500, error: "Error retrieving data" });
    } else {
      res.json({ status: 200, data: results });
    }
  });
});

// user table post route
router.post("/api/users", async (req, res) => {
  try {
    const { username, email, role, password } = req.body;

    // Check if the email already exists in the database
    const checkEmailQuery =
      "SELECT COUNT(*) as count FROM user WHERE email = ?";
    connection.query(
      checkEmailQuery,
      [email],
      async (checkErr, checkResult) => {
        if (checkErr) {
          console.error("Error checking email:", checkErr);
          res.status(500).json({ message: "Internal Server Error" });
          return;
        }

        const emailCount = checkResult[0].count;

        if (emailCount > 0) {
          // Email already exists, return an error response
          res
            .status(400)
            .json({ status: 400, message: "Email already in use" });
          return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUserQuery =
          "INSERT INTO user (username, email, role, password) VALUES (?, ?, ?, ?)";
        connection.query(
          insertUserQuery,
          [username, email, role, hashedPassword],
          (insertErr, result) => {
            if (insertErr) {
              console.error("Error inserting user:", insertErr);
              res.status(500).json({ message: "Internal Server Error" });
              return;
            }
            console.log("User inserted successfully:", result);
            res.status(201).json({
              status: 200,
              message: "User created successfully",
              result,
            });
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// user table edit route
router.put("/updateRole", (req, res) => {
  // const userId = req.params.email;
  const { role, email } = req.body;

  // Validate if role is provided in the request body
  if (!role) {
    return res.status(400).json({ error: "Missing 'role' in the request body" });
  }

  // Update the role in both 'user' and 'investor_users' tables
  const updateUserRoleQuery = "UPDATE user SET role = ? WHERE email = ?";
  const updateInvestorRoleQuery = "UPDATE investor_users SET role = ? WHERE email = ?";

  // Perform the role update in the 'user' table
  connection.query(updateUserRoleQuery, [role, email], (updateUserErr, userResult) => {
    if (updateUserErr) {
      console.error(updateUserErr);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Check if the user was found and updated in the 'user' table
    if (userResult.affectedRows === 0) {
      // If not found, try updating in the 'investor_users' table
      connection.query(updateInvestorRoleQuery, [role, email], (updateInvestorErr, investorResult) => {
        if (updateInvestorErr) {
          console.error(updateInvestorErr);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        // Check if the user was found and updated in the 'investor_users' table
        if (investorResult.affectedRows === 0) {
          return res.status(404).json({ error: "User or investor not found or role not updated" });
        }

        res.json({ status: 200, message: "User role updated successfully" });
      });
    } else {
      res.json({ status: 200, message: "User role updated successfully" });
    }
  });
});

// investment + investor + investor_users table
router.get("/userinvestment", (req, res) => {
  
  const query = `
  SELECT 
    investment.investor_id,
    investment.startup_id,
    startups.company_name, -- Add company_name from startups table
    SUM(investment.amount) as total_amount,
    investment.created_date,
    investment.status,
    investor.full_name,
    investor_users.email
  FROM investment
  JOIN investor ON investment.investor_id = investor.id
  JOIN investor_users ON investor.user_id = investor_users.id
  JOIN startups ON investment.startup_id = startups.id -- Add JOIN for startups table
  GROUP BY investment.investor_id, investment.startup_id;
`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No investors found" });
    }

    res.json(results);
  });
});

//total amount in investment route
router.get("/totalAmount", (req, res) => {
  const query = "SELECT SUM(amount) AS totalAmount FROM investment";

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Internal Server Error" });
      throw error;
    }

    const totalAmount = results[0].totalAmount;
    res.json({ totalAmount });
  });
});

// startup data post route
router.post("/combined-api", upload.array("files"), (req, res) => {
  try {
    const startupData = {
      user_id: req.body.user_id,
      customer_name: req.body.customer_name,
      company_name: req.body.company_name,
      company_email: req.body.company_email,
      address: req.body.address,
      contact_info: req.body.contact_info,
      investment_goal: req.body.investment_goal,
      description: req.body.description,
      video_url: req.body.video_url,
      img_url: req.body.img_url,
      logo_url: req.body.logo_url,
      end_date: req.body.enddate,
      funding_time_limit: req.body.funding_time_limit,
      discount: req.body.discount,
      valuation_cap: req.body.valuation_cap,
      target: req.body.target,
      created_at: new Date(),
      updated_date: new Date(),
    };

    const highlights = req.body.highlight;
    const filesArray = req.files;
    connection.beginTransaction((err) => {
      if (err) throw err;
      connection.query(
        "INSERT INTO startups SET ?",
        startupData,
        (err, result) => {
          if (err) {
            return connection.rollback(() => {
              throw err;
            });
          }

          const startup_id = result.insertId;

          const insertDocumentsQuery =
            "INSERT INTO startup_documents (document_type, file_name, file_path, startup_id, created_date, updated_date, status) VALUES ?";
          const documentType = req.body.documentType
          const documentTypeArray = JSON.parse(documentType);

          const values = filesArray.map((file, index) => {
            const originalname = file.originalname;
            const filePath = file.path;

            return [
              documentTypeArray[index],
              originalname,
              filePath,
              startup_id,
              new Date().toISOString().slice(0, 19).replace("T", " "),
              new Date().toISOString().slice(0, 19).replace("T", " "),
              "verified",
            ];
          });

          connection.query(insertDocumentsQuery, [values], (err) => {
            if (err) {
              return connection.rollback(() => {
                throw err;
              });
            }

            const insertHighlightQuery =
              "INSERT INTO startup_highlights (startup_id, highlight) VALUES (?, ?)";
            const highlightString = JSON.stringify(highlights);

            connection.query(
              insertHighlightQuery,
              [startup_id, highlightString],
              (err, result) => {
                if (err) {
                  return connection.rollback(() => {
                    throw err;
                  });
                }

                connection.commit((err) => {
                  if (err) {
                    return connection.rollback(() => {
                      throw err;
                    });
                  }

                  console.log("Transaction Complete.");
                  res.status(200).send({
                    success: true,
                    message: "Data inserted successfully",
                    startupId: startup_id,
                    status: 200
                  });
                });
              }
            );
          });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});

// is deleted admin

router.put("/updateInvestorUser", (req, res) => {
  const email = req.body.email;
  console.log(req.body);
  const updateQuery = `
    UPDATE investor_users
    SET is_deleted = 1
    WHERE email = ?;
  `;
  const updateQuery1 = `
    UPDATE user
    SET is_deleted = 1
    WHERE email = ?;
  `;

  // Execute the UPDATE query
  connection.query(updateQuery, [email], (error, results, fields) => {
    if (error) {
      console.error("Error executing UPDATE query:", error);
    }
    // Execute the UPDATE query
    connection.query(updateQuery1, [email], (error, results, fields) => {
      if (error) {
        console.error("Error executing UPDATE query:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Updated successfully:", results);
        res.status(200).json({ message: "Updated successfully" });
      }
    });
  });
});

// nominee table routes 
router.post('/nominee', (req, res) => {
  const { id, user_id, name, dob, parentname, relationominee, contact } = req.body.data;
  // console.log(req.body.data,"tttt");
  // console.log(req.body.parent_name);

  // Set server-side values
  const created_date = new Date(); // You might want to format this date according to your needs
  const updated_date = null; // Assuming it's initially null
  const is_deleted = false; // Assuming it's initially false
  const status = 'active'; // Assuming an initial status

  const insertQuery = `
    INSERT INTO nomineetwo_table
    (id, user_id, Name, DateOfBirth, ParentName, Relationship, ContactNumber, created_date, updated_date, is_deleted, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    insertQuery,
    [id, user_id, name, dob, parentname, relationominee, contact, created_date, updated_date, is_deleted, status],
    (err, results) => {
      if (err) {
        console.error('Error inserting into MySQL:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.status(201).json({ id: results.insertId, message: "data add successfully", status: 200 });
    }
  );
});

router.get('/nominee/:id', (req, res) => {
  const userId = req.params.id;

  // Query to retrieve data based on user_id
  const selectQuery = `
    SELECT * FROM nomineetwo_table
    WHERE user_id = ?
  `;

  connection.query(selectQuery, [userId], (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.status(200).json({ data: results });
  });
});

router.put('/nominee/:user_id', (req, res) => {
  const userId = req.params.user_id;
  const { name, dob, parentname, relationominee, contact } = req.body.data;

  // Set server-side values
  const updatedDate = new Date(); // You might want to format this date according to your needs

  // Update query
  const updateQuery = `
    UPDATE nomineetwo_table
    SET
      Name = ?,
      DateOfBirth = ?,
      ParentName = ?,
      Relationship = ?,
      ContactNumber = ?,
      updated_date = ?
    WHERE user_id = ?
  `;

  connection.query(
    updateQuery,
    [name, dob, parentname, relationominee, contact, updatedDate, userId],
    (err, results) => {
      if (err) {
        console.error('Error updating nominee in MySQL:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.status(200).json({ message: 'Nominee updated successfully', status: 200 });
    }
  );
});

// General details route 
router.get("/Generaldetails/:id", (req, res) => {
  const id = req.params.id;

  const query = `
    SELECT investor.full_name, investor.address, investor_users.email, investor_users.phone_number
    FROM investor
    JOIN investor_users ON investor.user_id = investor_users.id
    WHERE investor.user_id = ?;
  `;

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No investors found" });
    }

    res.status(200).json({ data: results });
  });
});

// Route to update user address
router.put('/update-address/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ success: false, message: 'Provide address in the request body' });
    }

    // Update user address in the database
    const updateQuery = `
      UPDATE investor
      SET address = ?
      WHERE user_id = ?;
    `;

    connection.query(
      updateQuery,
      [address, userId],
      (err, results) => {
        if (err) {
          console.error('Error updating nominee in MySQL:', err);
          res.status(500).send('Internal Server Error');
          return;
        }

        res.status(200).json({ message: 'address updated successfully', status: 200 });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// code for solana pay 

router.post('/solana-payment', async (req, res) => {
  const { recipientPublicKey, amount } = req.body;

  try {
    const fromWalletPrivateKey = '4QehXGxszDt5nYL4ZzJWtjhkQCvWxf2xdTxoJ3CPuainkWLc3HwUwkdzCZJwz6cqY4mDCceSFY9EMPJxnP4mRaSp'; // Replace with the private key of the wallet initiating the payment

    const fromWallet = new Account(Buffer.from(fromWalletPrivateKey, 'hex'));
    const recipient = new PublicKey(recipientPublicKey);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromWallet.publicKey,
        toPubkey: recipient,
        lamports: amount * 10 ** 9,
      })
    );

    // Sign and send the transaction
    const signature = await sendAndConfirmTransaction(connectiontwo, transaction, [fromWallet]);

    console.log('Transaction Signature:', signature);

    // Generate Solana payment QR code
    const qrCodeData = `sol:${recipientPublicKey}?amount=${amount}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    res.json({ success: true, signature, qrCode: qrCodeImage });
  } catch (error) {
    console.error('Solana payment error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});




// bank details route 
router.post('/bankdetails/:id', (req, res) => {
  const user_Id = req.params.id
  try {
    const { ifsc_code, account_number, bank_name } = req.body;
    console.log(req.body, "llpppp");

    // Additional fields
    const created_date = new Date();
    const updated_date = new Date();
    const is_deleted = false;

    // Validate required fields
    // if (!user_Id || !ifsc_code || !account_number || !bank_name) {
    //   return res.status(400).json({ error: 'All fields are required.' });
    // }

    // Create a new user object
    const newUser = {
      user_Id,
      ifsc_code,
      account_number,
      account_holder_name: 'Ashokbhai', // Static account holder name
      bank_name,
      created_date,
      updated_date,
      is_deleted
    };

    // Insert the user into the MySQL database
    const query = 'INSERT INTO bank_details SET ?';
    connection.query(query, newUser, (err, results) => {
      if (err) {
        console.error('Error inserting user into MySQL:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Update the newUser object with the inserted user's ID
      newUser.id = results.insertId;

      return res.json({ status: 200, message: "data inserted sucessfully" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/fetchbankdetails/:id', (req, res) => {
  const user_Id = req.params.id;
  try {
    const query = 'SELECT * FROM bank_details WHERE user_Id = ?';

    // Execute the query to retrieve user details
    connection.query(query, [user_Id], (err, results) => {
      if (err) {
        console.error('Error retrieving user details from MySQL:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const user = results[0];
      return res.status(200).json(user);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.put('/updatebankdetails/:id', (req, res) => {
  const user_Id = req.params.id;
  const { ifsc_code, account_number, bank_name } = req.body;


  try {
    const query = 'UPDATE bank_details SET account_number = ?,bank_name = ?,ifsc_code = ? WHERE user_Id = ?';

    // Execute the query to update bank details
    connection.query(query, [account_number, ifsc_code, bank_name, user_Id], (err, results) => {
      if (err) {
        console.error('Error updating bank details in MySQL:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found.' });
      }

      return res.status(200).json({status:200, message: 'Bank details updated successfully.' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
