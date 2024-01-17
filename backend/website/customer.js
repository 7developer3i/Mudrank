// const express = require("express");
// const router = express.Router();
// const connection = require("../database");


// dashboard customer = investor + investor_users joint routes

// router.get('/investors/:id', (req, res) => {
//     const investorId = req.params.id;
  
//     const query = `
//       SELECT investor.full_name, investor.phone_number, investor.status, investor_users.email, investor_users.updated_at
//       FROM investor
//       JOIN investor_users ON investor.user_id = investor_users.id
//       WHERE investor.id = ?;
//     `;
  
//     connection.query(query, [investorId], (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
  
//       if (results.length === 0) {
//         return res.status(404).json({ error: 'Investor not found' });
//       }
  
//       const investorData = results[0];
//       res.json(investorData);
//     });
//   });

