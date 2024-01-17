const express = require("express");
const router = express.Router();
const connection = require("../database.js");

// Get all investors
router.get("/investors", (req, res) => {
  const query = "SELECT * FROM investor_users WHERE id = 10";
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching investors: ", err);
      res.status(500).json({ error: "Failed to fetch investors" });
      return;
    }

    if (result[0].token === req.query.token) {
      const queryInvestor = "SELECT * FROM investor";
      connection.query(queryInvestor, (err, results) => {
        if (err) {
          console.error("Error fetching investors: ", err);
          res.status(500).json({ error: "Failed to fetch investors" });
          return;
        }
        setTimeout(() => {
          res.json(results);
        }, 1000);
      });
    } else {
      res.status(401).json({ error: "missing token" });
    }
  });
});

// Get a specific investor by ID
router.get("/investors/:id", (req, res) => {
  const investorId = req.params.id;
  const query = "SELECT * FROM investor WHERE id = ?";
  connection.query(query, [investorId], (err, results) => {
    if (err) {
      console.error("Error fetching investor: ", err);
      res.status(500).json({ error: "Failed to fetch investor" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Investor not found" });
      return;
    }
    res.json(results[0]);
  });
});

// Create a new investor
router.post("/investors", (req, res) => {
  const query = "SELECT * FROM investor_users WHERE id = ?";
  connection.query(query, [req.query.id], (err, result) => {
    if (err) {
      console.error("Error fetching investors: ", err);
      res.status(500).json({ error: "Failed to fetch investors" });
      return;
    }
    console.log(result);

    if (result[0].token === req.query.token) {
      const investor = req.body;
      const currentDate = new Date().toISOString();
      investor.created_date = currentDate;
      investor.updated_date = currentDate;
      investor.is_deleted = 0;
      investor.kyc_verified = 0;
      investor.status = "completed";
      console.log(investor);

      const query = "INSERT INTO investor SET ?";
      connection.query(query, investor, (err, result) => {
        if (err) {
          console.error("Error creating investor: ", err);
          res.status(500).json({ error: "Failed to create investor" });
          return;
        }
        res.json({
          message: "Investor created successfully",
          id: result.insertId,
        });
      });
    }
  });
});

// Update an existing investor
router.put("/investors/:id", (req, res) => {
  const query = "SELECT * FROM investor_users WHERE id = 10";
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching investors: ", err);
      res.status(500).json({ error: "Failed to fetch investors" });
      return;
    }

    if (result[0].token === req.query.token) {
      const investorId = req.params.id;
      const { phone_number, address } = req.body;
      const currentDate = new Date();
      const updated_date = currentDate;

      //check if number aleeady exist or not
      const checknumberquery = "SELECT * FROM investor WHERE phone_number = ?";
      connection.query(checknumberquery, [phone_number], (err, results) => {
        if (err) {
          console.error("Error executing MySQL query:", err);
          // Handle the error accordingly
        } else {
          if (results.length > 0) {
            console.log(results);
            console.log("Number exists in the database");
            res
              .status(400)
              .send({ success: false, message: "number already exist" });
            // Perform necessary actions when the number exists
          } else {
            console.log("Number does not exist in the database");
            const query =
              "UPDATE investor SET phone_number = ?, address = ?, updated_date = ? WHERE id = ?";
            connection.query(
              query,
              [phone_number, address, updated_date, investorId],
              (err, result) => {
                if (err) {
                  console.error("Error updating investor: ", err);
                  res.status(500).json({ error: "Failed to update investor" });
                  return;
                }
                res
                  .status(200)
                  .json({ message: "Investor updated successfully" });
              }
            );
          }
        }
      });
    }
  });
});

// Soft Delete an existing investor by setting is_deleted = 1
router.delete("/investors/:id", (req, res) => {
  const query = "SELECT * FROM investor_users WHERE id = 10";
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching investors: ", err);
      res.status(500).json({ error: "Failed to fetch investors" });
      return;
    }

    if (result[0].token === req.query.token) {
      const investorId = req.params.id;
      const query = "UPDATE investor_users SET is_deleted = 1 WHERE id = ?";
      connection.query(query, [investorId], (err) => {
        if (err) {
          console.error("Error soft deleting investor: ", err);
          res.status(500).json({ error: "Failed to delete investor" });
          return;
        }
        res.json({ message: "Investor deleted successfully" });
      });
    }
  });
});

// Route to save investment data
router.post("/investments", (req, res) => {
  const query = "SELECT * FROM investor_users WHERE id = 10";
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching investors: ", err);
      res.status(500).json({ error: "Failed to fetch investors" });
      return;
    }

    if (result[0].token === req.query.token) {
      const { investorId, startupId, amount } = req.body;
      const investmentDate = new Date(); // Current date and time
      const currentDate = new Date(); // Current date and time
      const insertQuery = `
    INSERT INTO investment (investor_id, startup_id, amount, investment_date, created_date, updated_date, is_deleted, status)
    VALUES (?, ?, ?, ?, NOW(), ?, false, 'Booked')
  `;
      try {
        const query = "SELECT * FROM investor WHERE user_id = ?";
        connection.query(query, investorId, (err, results) => {
          if (err) {
            console.error("Error fetching investor: ", err);
            res.status(500).json({ error: "Failed to fetch investor" });
            return;
          }
          if (results.length === 0) {
            res.status(404).json({ error: "Investor not found" });
            return;
          }
          if (results[0]) {
            bookSlot(startupId, results[0].id, (err) => {
              if (err) {
                res
                  .status(400)
                  .send({ success: false, message: `${err.message}` });
              } else {
                connection.query(
                  insertQuery,
                  [
                    results[0].id,
                    startupId,
                    amount,
                    investmentDate,
                    currentDate,
                  ],
                  (error, result) => {
                    if (error) {
                      console.error("Error inserting investment data:", error);
                      res
                        .status(500)
                        .json({ error: "Failed to save investment data" });
                    } else {
                      res.status(201).json({
                        success: true,
                        message: "Slot booked successfully!",
                      });
                    }
                  }
                );
              }
            });
          } else {
            res.json({ success: false, message: "Investor not found" });
          }
        });
      } catch (error) {
        res.status(500).json({ success: false, message: "server error" });
      }
    }
  });
});

function bookSlot(startupId, investorId, callback) {
  const sql = `
    UPDATE startups
    SET slot_available = slot_available - 1,
        subscribers = CONCAT(subscribers, '${investorId},')
    WHERE id = ${startupId} AND slot_available > 0
  `;
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else if (result.affectedRows === 0) {
      callback(new Error("No slot available"));
    } else {
      callback(null);
    }
  });
}

// Retrieve investment All data from startusp and investor table join
router.get("/investments/details", async (req, res) => {
  const query = "SELECT * FROM investor_users WHERE id = 10";
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching investors: ", err);
      res.status(500).json({ error: "Failed to fetch investors" });
      return;
    }

    if (result[0].token === req.query.token) {
      const query = `SELECT 
  investment.id,
  investment.investor_id,
  investment.startup_id,
  investment.amount,
  investment.investment_date,
  investment.is_deleted,
  investment.status,
  startups.img_url,
  startups.company_email,
  startups.company_name,
  investor.full_name,
  investor.phone_number
   FROM investment
   JOIN startups ON investment.startup_id = startups.id
  JOIN investor ON investment.investor_id = investor.id
`;
      try {
        connection.query(query, (error, results) => {
          if (error) {
            console.error("Error fetching investment data:", error);
            res
              .status(500)
              .json({ success: false, message: "Internal Server Error" });
            return;
          }
          res.status(200).json({ success: true, result: results });
        });
      } catch (error) {
        console.error("Error fetching investment data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  });
});

//Pagination
router.get("/investments", (req, res) => {
  const query = "SELECT * FROM investor_users WHERE id = 10";
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching investors: ", err);
      res.status(500).json({ error: "Failed to fetch investors" });
      return;
    }

    if (result[0].token === req.query.token) {
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
      const pageSize = 10; // Number of records per page
      const offset = (page - 1) * pageSize;

      const query = `
  SELECT 
  investment.id,
  investment.investor_id,
  investment.startup_id,
  investment.amount,
  investment.investment_date,
  investment.is_deleted,
  investment.status,
  startups.img_url,
  startups.company_email,
  startups.company_name,
  investor.full_name,
  investor.phone_number
   FROM investment
   JOIN startups ON investment.startup_id = startups.id
  JOIN investor ON investment.investor_id = investor.id
    LIMIT ${pageSize}
    OFFSET ${offset}
  `;

      try {
        connection.query(query, (error, results) => {
          if (error) {
            console.error("Error fetching investment data:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }
          if (results.length > 0) {
            res.status(200).json({ success: true, data: results });
          } else {
            res.status(200).json({
              succes: false,
              data: results,
              message: "No data Display",
            });
          }
        });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, error: "Internal server error" });
      }
    }
  });
});

// Route to update investment amount
router.put("/investments/:id", (req, res) => {
  const query = "SELECT * FROM investor_users WHERE id = 10";
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching investors: ", err);
      res.status(500).json({ error: "Failed to fetch investors" });
      return;
    }

    if (result[0].token === req.query.token) {
      const investmentId = req.params.id;
      const { amount } = req.body;
      const updatedDate = new Date(); // Current date and time

      const updateQuery = `
    UPDATE investment
    SET amount = ?, updated_date = NOW()
    WHERE id = ?
  `;

      connection.query(updateQuery, [amount, investmentId], (error, result) => {
        if (error) {
          console.error("Error updating investment amount:", error);
          res.status(500).json({ error: "Failed to update investment amount" });
        } else if (result.affectedRows === 0) {
          res.status(404).json({ error: "Investment not found" });
        } else {
          console.log("Successfully updated investment amount:", result);
          res.json({ message: "Investment amount updated successfully" });
        }
      });
    }
  });
});

//Get Data inside Two tables Investor and Investor Users
router.get("/investor-profile", (req, res) => {
  const query = "SELECT * FROM investor_users WHERE id = 10";
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching investors: ", err);
      res.status(500).json({ error: "Failed to fetch investors" });
      return;
    }

    if (result[0].token === req.query.token) {
      const query = `
    SELECT investor.full_name, investor.kyc_verified, investor_users.email, investor_users.phone_number, investor_users.is_logged_out, investor_users.is_deleted, investor_users.role, investor_users.id
    FROM investor
    JOIN investor_users ON investor.user_id = inve        stor_users.id
    WHERE investor_users.role = 'investor'
`;
      try {
        connection.query(query, (err, results) => {
          if (err) {
            console.error("Error executing query:", err);
          } else {
            res.status(200).json({ success: true, result: results });
          }
        });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
    }
  });
});

// nominee table routes

// router.post("/nominee", (req, res) => {
//   const query = "SELECT * FROM investor_users WHERE id = 10";
//   connection.query(query, (err, result) => {
//     if (err) {
//       console.error("Error fetching investors: ", err);
//       res.status(500).json({ error: "Failed to fetch investors" });
//       return;
//     }

//     if (result[0].token === req.query.token) {
//       const data = req.body;

//       const insertDataQuery =
//         "INSERT INTO nomineetwo_Table (Name, DateOfBirth, ParentName, Relationship, ContactNumber, created_date, updated_date, is_deleted, status) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), 0, 'pending')";

//       connection.query(
//         insertDataQuery,
//         [
//           data.name,
//           data.dob,
//           data.parentname,
//           data.relationominee,
//           data.contact,
//         ],
//         (err, results) => {
//           if (err) {
//             console.error("Error inserting data: " + err);
//             res.status(500).json({ error: "Error inserting data" });
//           } else {
//             res.status(200).json({ message: "Data inserted successfully" });
//           }
//         }
//       );
//     }
//   });
// });

// router.get("/nominee", (req, res) => {
//   // console.log("reddd", req.query.token);
//   // const query = "SELECT * FROM investor_users WHERE id = 10";
//   // connection.query(query, (err, result) => {
//   //   if (err) {
//   //     console.error("Error fetching investors: ", err);
//   //     res.status(500).json({ error: "Failed to fetch investors" });
//   //     return;
//   //   }

//   //   if (result[0].token === req.query.token) {
//   const selectQuery = "SELECT * FROM nomineetwo_Table";
//   connection.query(selectQuery, (err, results) => {
//     if (err) {
//       console.error("Error retrieving data: " + err);
//       res.status(500).json({ error: "Error retrieving data" });
//     } else {
//       res.status(200).json(results);
//     }
//   });
// })

// router.put("/nominee/:id", (req, res) => {
//   const query = "SELECT * FROM investor_users WHERE id = 10";
//   connection.query(query, (err, result) => {
//     if (err) {
//       console.error("Error fetching investors: ", err);
//       res.status(500).json({ error: "Failed to fetch investors" });
//       return;
//     }

//     if (result[0].token === req.query.token) {
//       const id = req.params.id;
//       const updatedData = req.body;

//       const updateDataQuery =
//         "UPDATE nomineetwo_Table SET Name = ?, DateOfBirth = ?, ParentName = ?, Relationship = ?, ContactNumber = ? WHERE id = ?";

//       connection.query(
//         updateDataQuery,
//         [
//           updatedData.name,
//           updatedData.dob,
//           updatedData.parentname,
//           updatedData.relationominee,
//           updatedData.contact,
//           id,
//         ],
//         (err, results) => {
//           if (err) {
//             console.error("Error updating data: " + err);
//             res.status(500).json({ error: "Error updating data" });
//           } else {
//             if (results.affectedRows > 0) {
//               res.status(200).json({ message: "Data updated successfully" });
//             } else {
//               res.status(404).json({ error: "No data found for update" });
//             }
//           }
//         }
//       );
//     }
//   });
// });

// router.delete("/nominee/:id", (req, res) => {
//   const query = "SELECT * FROM investor_users WHERE id = 10";
//   connection.query(query, (err, result) => {
//     if (err) {
//       console.error("Error fetching investors: ", err);
//       res.status(500).json({ error: "Failed to fetch investors" });
//       return;
//     }

//     if (result[0].token === req.query.token) {
//       const id = req.params.id;

//       const deleteDataQuery = "DELETE FROM nomineetwo_Table WHERE id = ?";
//       connection.query(deleteDataQuery, [id], (err, results) => {
//         if (err) {
//           console.error("Error deleting data: " + err);
//           res.status(500).json({ error: "Error deleting data" });
//         } else {
//           if (results.affectedRows > 0) {
//             res.status(200).json({ message: "Data deleted successfully" });
//           } else {
//             res.status(404).json({ error: "No data found for deletion" });
//           }
//         }
//       });
//     }
//   });
// });

module.exports = router;
