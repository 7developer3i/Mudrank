const express = require("express");
const router = express.Router();
const connection = require("../database.js");


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
        callback(new Error('No slot available'));
      } else {
        callback(null);
      }
    });
};

router.post('/book-slot', (req, res) => {
  
    const { startupId, investorId } = req.body;
    bookSlot(startupId, investorId, err => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.json({success:false, message:"Slot booked successfully!"});
      }
    });
});

module.exports = router;
  