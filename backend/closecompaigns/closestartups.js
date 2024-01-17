const express = require("express");
const router = express.Router();
const connection = require("../database.js");
const { verifyToken } = require("../middleware/investor.js");

// Define routes
router.get("/close/startups", (req, res) => {
  connection.query(
    "SELECT * FROM startups WHERE is_deleted = 1",
    (error, results) => {
      if (error) throw error;
        res.status(200).send({ success: true, result: results });
    }
  );
});

router.get("/available/startups", (req, res) => {
  connection.query(
    "SELECT * FROM startups WHERE is_deleted = 0",
    (error, results) => {
      if (error) throw error;
      // Check if startup profile is active based on end date
      const currentDate = new Date();
      results.forEach((result) => {
        const endDate = new Date(result.end_date);
        if (endDate < currentDate) {
          result.is_deleted = 1;
          // Update is_deleted column in the database
          connection.query(
            "UPDATE startups SET is_deleted = 1 WHERE id = ?",
            [result.id],
            (error, results) => {
              if (error) throw error;
            }
          );
        }
      });
      const verifiedStartups = results.filter(
        (startup) => startup.status === "verified"
      );
      setTimeout(() => {
        res.status(200).send({ success: true, result: verifiedStartups });
      }, 2000);
    }
  );
});

module.exports = router;
