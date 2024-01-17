require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const connection = require("../database.js");

// Function to check if the user has a verified KYC
function checkUserVerifiedKYC(user_id) {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT COUNT(*) AS count FROM kyc_documents WHERE user_id = ? AND status = ?',
      [user_id, 'valid'],
      (error, results) => {
        if (error) {
          console.error('Error checking KYC verification:', error);
          reject(error);
        } else {
          const count = results[0].count;
          resolve(count > 0);
        }
      }
    );
  });
};

let accessToken = process.env.API_KEY;
let tokenExpirationTime = 0;

// Function to obtain or refresh the access token
async function getAccessToken() {
  if (!accessToken || Date.now() >= tokenExpirationTime) {
    try {
      const response = await axios.post(process.env.PANCARD_AUTHORIZE_API, {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
      });
      console.log(response);
      accessToken = response.data.access_token;
      const expiresIn = response.data.expires_in; // Time in seconds for token expiration
      tokenExpirationTime = Date.now() + expiresIn * 1000; // Convert expiresIn to milliseconds and set the token expiration time
    } catch (error) {
      throw new Error('Authorization failed');
    }
  }
  return accessToken;
};

// Helper function to convert date from "DD-MM-YYYY" format to "YYYY-MM-DD" format
function convertDateToMySQLFormat(dateString) {
  const [day, month, year] = dateString.split('-');
  return `${year}-${month}-${day}`;
};

// Route for PAN card verification
router.post('/verify', async (req, res) => {
  const { pancard_number, date_of_birth, user_id } = req.body;

  try {
    // first check pannumber exist or not
    connection.query('SELECT * FROM kyc_documents WHERE pancard_number = ?', [pancard_number], async (selectError, selectResults) => {
      if (selectError) {
        console.error('Error checking PAN number existence:', selectError);
        return res.status(500).json({ success: false, message: 'Verification failed' });
      }

      if (selectResults.length > 0) {
        // PAN number already exists in the database
        return res.status(400).json({ success: false, message: 'PAN number already exists' });
      } else {

        // const token = await getAccessToken();
        const pancardApi = `https://production.deepvue.tech/v1/verification/panbasic?pan_number=${pancard_number}`
        const response = await axios.get(pancardApi, {
          headers: {
            'Authorization': accessToken,
            'x-api-key': 'bb26e7fdef2a4676b0eb2e11e39f862e',
          },
        });
        const { pan, full_name, status } = response.data.data;

        if (response.data.data) {
          // Save the verification details to the database
          connection.query('INSERT INTO kyc_documents (user_id, full_name, date_of_birth, pancard_number, status, created_date, updated_date, is_deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [user_id, full_name, convertDateToMySQLFormat(date_of_birth), pan, status, new Date(), new Date(), false],
            async (error, results) => {
              if (error) {
                console.error('Error saving verification details to the database:', error);
                return res.status(500).json({ success: false, message: 'Verification failed' });
              } else {
                // Check if the user has a verified KYC
                const hasVerifiedKYC = await checkUserVerifiedKYC(user_id);

                // Update kyc_verified column in the investor table
                connection.query(
                  'UPDATE investor SET kyc_verified = ? WHERE user_id = ?',
                  [hasVerifiedKYC ? 1 : 0, user_id],
                  (updateError, updateResults) => {
                    if (updateError) {
                      console.error('Error updating KYC verified status:', updateError);
                    } else {
                    }
                  }
                );
                return res.json({ success: true, data: response.data });
              }
            });
        };

      }

    })
  } catch (error) {
    console.error('Error verifying PAN card:', error);
    return res.status(500).json({ success: false, message: 'Verification failed' });
  }
});

// Edit Route for KYC Document
router.put('/edit/:id', (req, res) => {
  const { full_name, date_of_birth, pancard_number, status } = req.body;
  const { id } = req.params;

  connection.query(
    'UPDATE kyc_documents SET full_name = ?, date_of_birth = ?, pancard_number = ?, status = ?, updated_date = ? WHERE user_id = ?',
    [full_name, convertDateToMySQLFormat(date_of_birth), pancard_number, status, new Date(), id],
    (error, results) => {
      if (error) {
        console.error('Error updating verification details:', error);
        return res.status(500).json({ success: false, message: 'Failed to update verification details' });
      } else {
        console.log('Verification details updated in the database.');
        return res.json({ success: true, message: 'Verification details updated successfully' });
      }
    }
  );
});

// Delete Route for KYC Document
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  connection.query(
    'DELETE FROM kyc_documents WHERE user_id = ?',
    [id],
    (error, results) => {
      if (error) {
        console.error('Error deleting verification details:', error);
        return res.status(500).json({ success: false, message: 'Failed to delete verification details' });
      } else {
        console.log('Verification details deleted from the database.');
        return res.json({ success: true, message: 'Verification details deleted successfully' });
      }
    }
  );
});

// when investor subscribe then  its kyc_varifivation true or false check it
// Find KYC verification status for a specific user
router.get('/status/:user_id', (req, res) => {
  const userId = req.params.user_id;
  const query = 'SELECT kyc_verified FROM investor WHERE user_id = ?';

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const kycVerified = results[0].kyc_verified;
    const message = kycVerified ? 'KYC is verified' : 'KYC is not verified';
    res.json({ success: kycVerified ? true : false, user_id: userId, message });
  });
});

module.exports = router;
