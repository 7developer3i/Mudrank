require("dotenv").config();
const express = require("express");
const router = express.Router();
const connection = require("../database.js");

// Route to create a new startup and verify it through a superadmin
router.post("/startup", (req, res) => {

  try {
    const startup = {
      user_id: req.body.user_id,
      customer_name: req.body.customer_name,
      company_name: req.body.companyName,
      company_email: req.body.companyEmail,
      address: req.body.address,
      contact_info: req.body.contactInfo,
      investment_goal: req.body.investmentGoal,
      description: req.body.description,
      video_url: req.body.videoUrl,
      img_url: req.body.imgurl,
      logo_url: req.body.logourl,
      end_date: req.body.enddate,
      funding_time_limit: req.body.fundingtimelimit,
      discount: req.body.discount,
      valuation_cap: req.body.valuationCap,
      target: req.body.target,
      created_at: new Date(),
      updated_date: new Date(),
    };

    // // Insert new startup into database
    connection.query("INSERT INTO startups SET ?", startup, (err, result) => {
      if (err) throw err;
      console.log(`New startup with ID ${result.insertId} created`);
      if (result) {
        res.status(200).send({ success: true, startupId: result.insertId });
      }
    });
    // res.status(200).send({ success: true, message:'New startup inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});

// Route to verify a startup through a superadmin
router.post("/startup/:id/verify", (req, res) => {
  const startupId = req.params.id;

  // Update startup in database to mark as verified
  connection.query(
    "UPDATE startups SET  updated_date = ?, status = ? WHERE id = ?",
    [new Date(), "verified", startupId],
    (err, result) => {
      if (err) throw err;
      console.log(`Startup with ID ${startupId} verified by superadmin`);
      res.status(200).send({
        success: true,
        message: `Startup with ID ${startupId} verified by superadmin`,
      });
    }
  );
});

router.get("/admin-startup-data", (req, res) => {
  try {
    const sql = "SELECT * FROM startups";
     connection.query(sql, (err, result) => {
      if (err) throw err;
      if (result) {
        setTimeout(() => {
          res.status(200).send({ success: true, result });
        }, 2000);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});

// Update an existing startup

router.put("/api/startups/:id", (req, res) => {
  const startup = {
    user_id: req.body.user_id,
    customer_name: req.body.customerName,
    company_name: req.body.companyName,
    company_email: req.body.companyEmail,
    address: req.body.address,
    contact_info: req.body.contactInfo,
    investment_goal: req.body.investment_goal,
    description: req.body.description,
    video_url: req.body.videoUrl,
    img_url: req.body.imgurl,
    logo_url: req.body.logourl,
    end_date: req.body.enddate,
    funding_time_limit: req.body.fundingtimelimit,
    discount: req.body.discount,
    valuation_cap: req.body.valuationCap,
    target: req.body.target,
    // created_at: new Date(),
    updated_date: new Date(),
  };
  const id = req.params.id;

  const currentDate = new Date(); // Get the current date
  const targetDate = new Date(startup.end_date); // Create a Date object for the target date

  // Check is_deleted 1 or 0
  const sql = "SELECT is_deleted, end_date FROM startups WHERE id = ?";
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error executing the query:", err);
      return;
    }
    const isDeleted = results[0].is_deleted;
    if (isDeleted === 1 && targetDate > currentDate) {
      // Update isDeleted to 0
      const updateSql = 'UPDATE startups SET is_deleted = 0 WHERE id = ?';
      connection.query(updateSql, [id], (err, updateResult) => {
        if (err) {
          console.error('Error updating the record:', err);
          return;
        }
        console.log(`isDeleted value updated to 0 for id ${id}`);
      });
    } 
  });

  connection.query(
    "UPDATE startups SET user_id=?, customer_name=?, company_name=?, company_email=?, address=?, contact_info=?, investment_goal=?, description=?, img_url = ?, logo_url=?, end_date=?, funding_time_limit=?, discount=?, valuation_cap=?, target=?, updated_date=?, video_url = ? WHERE id=?",
    [
      startup.user_id,
      startup.customer_name,
      startup.company_name,
      startup.company_email,
      startup.address,
      startup.contact_info,
      startup.investment_goal,
      startup.description,
      startup.img_url,
      startup.logo_url,
      startup.end_date,
      startup.funding_time_limit,
      startup.discount,
      startup.valuation_cap,
      startup.target,
      startup.updated_date,
      startup.video_url,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log("Error updating startup:", err);
        res
          .status(500)
          .json({ error: "An error occurred while updating the startup." });
      } else {
        res.status(200).json({ message: "Startup updated successfully." });
      }
    }
  );

  const high_light = req.body.high_light;
  const highlight_string = JSON.stringify(high_light);
  const startup_id = req.body.startupId;

  const highlight =
    "UPDATE startup_highlights SET startup_id = ?, highlight = ? WHERE id = ?";
  connection.query(
    highlight,
    [id, highlight_string, startup_id],
    (err, result) => {
      if (err) throw err;
    }
  );
});

//Route of Startup_HighLights
router.post("/startup-highlight", (req, res) => {
  const startupId = req.body.user_id;
  const highlights = req.body.highlight;
  const insertQuery =
    "INSERT INTO startup_highlights (startup_id, highlight) VALUES (?, ?)";
  const highlightString = JSON.stringify(highlights);
  connection.query(insertQuery, [startupId, highlightString], (err, result) => {
    if (err) throw err;
    console.log("Highlight added successfully!");
  });

  res
    .status(200)
    .send({ success: true, message: "Highlight added successfully!" });
});

router.get("/fetch-startup-highlight", (req, res) => {
  try {
    const sql = "SELECT * FROM startup_highlights";
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).send({ success: true, result });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
