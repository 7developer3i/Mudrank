require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const connection = require("../database.js");

let accessToken = process.env.API_KEY;

// Route to save bank details
router.post('/bank-details', async (req, res) => {
    const { user_id, ifsc_code, account_number, bank_name } = req.body;

    const bankDetailsApi = `https://production.deepvue.tech/v1/verification/bankaccount?account_number=${account_number}&ifsc=${ifsc_code}`;
    try {
        // first check pannumber exist or not
        connection.query('SELECT * FROM bank_details WHERE account_number = ? AND ifsc_code = ?', [account_number, ifsc_code], async (selectError, selectResults) => {
            if (selectError)     {
                console.error('Error checking bank account existence:', selectError);
                return res.status(500).json({ success: false, message: 'Verification failed' });
            }

            if (selectResults.length > 0) {
                // PAN number already exists in the database
                return res.status(400).json({ success: false, message: 'Account number already exists' });
            } else {
                const fetchBankExist = await axios.get(bankDetailsApi, {
                    headers: {
                        'Authorization': accessToken,
                        'x-api-key': 'bb26e7fdef2a4676b0eb2e11e39f862e',
                    },
                });

                if (fetchBankExist.data.data.account_exists) {
                    if (fetchBankExist.data.code === 200) {
                        const insertQuery = `INSERT INTO bank_details (user_id, ifsc_code, account_number, account_holder_name, bank_name) VALUES (?, ?, ?, ?, ?)`;
                        connection.query(insertQuery, [user_id, ifsc_code, account_number, fetchBankExist.data.data.name_at_bank, bank_name], (err, result) => {
                            if (err) {
                                console.error('Error saving bank details:', err);
                                res.status(500).json({ message: 'Error saving bank details' });
                            } else {
                                res.json({ message: fetchBankExist.data.data.message });
                            }
                        });
                    }
                } else {
                    res.status(400).json({ success: false, message: 'Bank account does not exist' });
                }
            }
        })
    } catch (error) {
        console.error('Error fetching bank account verification:', error);
        res.status(500).json({ message: 'Error fetching bank account verification' });
    }
});

// Route to update bank details
router.put('/bank-details/:id', async (req, res) => {
    const bankId = req.params.id;
    const { ifsc_code, account_number, bank_name } = req.body;
    // ... (extract ifsc_code, account_number, bank_name from req.body)

    const bankDetailsApi = `https://production.deepvue.tech/v1/verification/bankaccount?account_number=${account_number}&ifsc=${ifsc_code}`;
    try {
        // first check pannumber exist or not
        connection.query('SELECT * FROM bank_details WHERE account_number = ? AND ifsc_code = ?', [account_number, ifsc_code], async (selectError, selectResults) => {
            if (selectError) {
                console.error('Error checking bank account existence:', selectError);
                return res.status(500).json({ success: false, message: 'Verification failed' });
            }

            if (selectResults.length > 0) {
                // PAN number already exists in the database
                return res.status(400).json({ success: false, message: 'Account number already exists' });
            } else {
                const fetchBankExist = await axios.get(bankDetailsApi, {
                    headers: {
                        'Authorization': accessToken,
                        'x-api-key': 'bb26e7fdef2a4676b0eb2e11e39f862e',
                    },
                });

                if (fetchBankExist.data.data.account_exists) {
                    const updateQuery = `
                UPDATE bank_details
                SET ifsc_code = ?, account_number = ?, bank_name = ?, account_holder_name = ?
                WHERE id = ?
            `;

                    connection.query(updateQuery, [ifsc_code, account_number, bank_name, fetchBankExist.data.data.name_at_bank, bankId], (err, result) => {
                        if (err) {
                            console.error('Error updating bank details:', err);
                            res.status(500).json({ message: 'Error updating bank details' });
                        } else {
                            res.json({ message: 'Bank details updated successfully' });
                        }
                    });
                } else {
                    res.status(400).json({ success: false, message: 'Bank account does not exist' });
                }
            }
        })
    } catch (error) {
        console.error('Error fetching bank account verification:', error);
        res.status(500).json({ message: 'Error fetching bank account verification' });
    }
});

// Route to get bank details for a specific user
router.get('/bank-details/:userId', (req, res) => {
    const userId = req.params.userId;

    const selectQuery = `
        SELECT *
        FROM bank_details
        WHERE user_id = ? AND is_deleted = ?
    `;

    connection.query(selectQuery, [userId, false], (err, results) => {
        if (err) {
            console.error('Error retrieving bank details:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Bank details not found for the specified user' });
            } else {
                res.status(200).json(results);
            }
        }
    });
});

// Route to delete bank details
router.delete('/bank-details/:id', (req, res) => {
    const bankId = req.params.id;

    const deleteQuery = `
        UPDATE bank_details
        SET is_deleted = ?
        WHERE user_id = ?
    `;

    connection.query(deleteQuery, [true, bankId], (err, result) => {
        if (err) {
            console.error('Error deleting bank details:', err);
            res.status(500).json({ message: 'Error deleting bank details' });
        } else {
            res.json({ message: 'Bank details deleted successfully' });
        }
    });
});

module.exports = router;