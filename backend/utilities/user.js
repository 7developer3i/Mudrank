const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const connection = require("../database.js");

// Register a new user
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query =
    "INSERT INTO user (username, email, password, role) VALUES (?, ?, ?, ?)";
  connection.query(
    query,
    [username, email, hashedPassword, role],
    (error, results) => {
      if (error) {
        res
          .status(500)
          .json({ message: "An error occurred while registering the user." });
      } else {
        res.status(201).json({ message: "User registered successfully." });
      }
    }
  );
});

// Authenticate a user and generate a JWT token
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM user WHERE email = ?";
  connection.query(query, [email], async (error, results) => {
    if (error) {
      res
        .status(500)
        .json({ message: "An error occurred while authenticating the user." });
    } else if (results.length === 0) {
      res.status(401).json({ message: "Invalid email or password." });
    } else {
      const user = results[0];
      if (user.role == "customer") {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          const token = jwt.sign({ userId: user.id }, "your-secret-key", {
            expiresIn: "1h",
          });
          // res.status(200).json({ message: 'Authentication successful.', token: token, userid:user.id });
          const sql = "SELECT * FROM startups WHERE user_id = ?";
          connection.query(sql, [user.id], (err, results) => {
            if (err) throw err;
            if (results[0]) {
              const sql = "SELECT * FROM startup_highlights WHERE startup_id = ?";
              connection.query(sql, [results[0].id], (err, result) => {
                if (err) throw err;
                res.status(200).json({
                  message: "Authentication successful.",
                  token: token,
                  userid: user.id,
                  results,
                  highlights: result,
                });
              });
            } else {
              res.status(200).json({
                message: "Authentication successful.",
                token: token,
                userid: user.id,
              });
            }
          });
        } else {
          res.status(401).json({ message: "Invalid email or password." });
        };
      } else {
        res.status(400).send({
          success: false,
          error: "No one except customer can login", status: 400
        })
      }
    }
  })
});


router.put("/change-password/:id", async (req, res) => {
  const userId = req.params.id
  const { newPassword } = req.body;
  console.log("nnnn", newPassword);

  // Hash the new password
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password in the database
  const updatePasswordQuery = "UPDATE user SET password = ? WHERE id = ?";
  connection.query(updatePasswordQuery, [hashedNewPassword, userId], (updateError) => {
    if (updateError) {
      return res.status(500).json({ message: "An error occurred while updating password." });
    }

    res.status(200).json({ status: 200, message: "Password updated successfully." });
  });
});


const saltRounds = 10;
const plainPassword = "tamli";

// router.post("/superadmin", (req, res) => {
//   res.clearCookie("admintoken");
//   try {
//     const { email, password } = req.body;
//     const query = "SELECT * FROM user WHERE email = ?";
//     connection.query(query, email, (err, results) => {
//       if (err) {
//         console.error("Error fetching data from MySQL database:", err);
//         res.status(500).send("Error fetching data from MySQL database");
//       } else if (results.length === 0) {
//         res.status(401).send("Invalid email or password");
//       } else {
//         const superadmin = results[0];
//         if (superadmin.role === "superadmin") {
//           bcrypt.compare(password, superadmin.password, (err, result) => {
//             if (err) {
//               console.error("Error comparing password hashes:", err);
//               res.status(500).send("Error comparing password hashes");
//             } else if (result) {
//               // Passwords match, so the superadmin is authenticated
//               // Generate a JWT token and send it back to the client
//             //   const token = jwt.sign(
//             //     { id: superadmin.id },
//             //     "superadmin-secret"
//             //   );
//             //   res.cookie("admintoken", token, { httpOnly: true });
//             //   res.status(200).json({
//             //     success: true,
//             //     token,
//             //     message: "Welcome Into Your Dashboard",
//             //   });
//             } else {
//               res.status(401).send("Invalid email or password");
//             }
//           });
//         } else {
//           res
//             .status(400)
//             .json({ success: false, message: "You have not permission" });
//         }
//       }
//     });
//   } catch (error) {
//     res.status(500).send({ success: false, message: "Internal Server Error" });
//   }
// });

router.post("/superadmin", (req, res) => {
  try {
    const { email, password } = req.body;
    const query = "SELECT * FROM user WHERE email = ?";
    connection.query(query, email, (err, results) => {
      if (err) {
        console.error("Error fetching data from MySQL database:", err);
        res.status(500).send("Error fetching data from MySQL database");
      } else if (results.length === 0) {
        res.status(401).send("Invalid email or password");
      } else {
        const superadmin = results[0];
        if (superadmin.role === "superadmin" || superadmin.role === "admin") {
          bcrypt.compare(password, superadmin.password, (err, result) => {
            if (err) {
              console.error("Error comparing password hashes:", err);
              res.status(500).send("Error comparing password hashes");
            } else if (result) {
              const token = jwt.sign(
                { id: superadmin.id },
                "superadmin-secret"
              );
              const query = "UPDATE user SET token = ? WHERE id = ?";
              connection.query(query, [token, superadmin.id], (err, result) => {
                if (err) {
                  console.error("Error deleting blog: ", err);
                  res.status(500).json({ error: "Failed to delete blog" });
                  return;
                }
                res.status(200).json({
                  success: true,
                  token,
                  message: "Welcome Into Your Dashboard",
                  AdminId: superadmin.id,
                  name: superadmin.username,
                  role: superadmin.role
                });
              });
            } else {
              res.status(401).send("Invalid email or password");
            }
          });
        } else {
          res
            .status(400)
            .json({ success: false, message: "You have not permission" });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
