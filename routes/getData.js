const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Import database configuration
const dbConfig = require('../config/db');

// Create a pool using the imported configuration
const pool = require('../config/pool.js');

// importing errorHandler function
const errorHandler = require('../handler/errorHandler');
// importing verifyToken function
const verifyToken = require('../middlewares/authMiddleware');

router.get('/:key', verifyToken, async (req, res) => {
  // get key-value pair logic here
    const key = req.params.key;
    try {
        const query = 'SELECT value FROM data_store WHERE key = $1';
        const result = await pool.query(query, [key]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Key not found.'
            });
        }

        const value = result.rows[0].value;
        res.status(200).json({
            status: "success",
            data: {
            key: key,
            value: value
            }
        });
    } catch (error) {
        errorHandler(res, error);
    }
});

module.exports = router;