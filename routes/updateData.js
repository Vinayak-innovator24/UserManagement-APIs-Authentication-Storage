const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // JSON Web Token library
const { Pool } = require('pg');

// Import database configuration
const dbConfig = require('../config/db');

// Create a pool using the imported configuration
const pool = require('../config/pool.js');

// importing errorHandler function
const errorHandler = require('../handler/errorHandler');
// importing verifyToken function
const verifyToken = require('../middlewares/authMiddleware');

router.put('/:key', verifyToken, async (req, res) => {
  // update value logic here
    const key = req.params.key;
    const { value } = req.body;

    try {
        const updateQuery = 'UPDATE data_store SET value = $1 WHERE key = $2';
        const result = await pool.query(updateQuery, [value, key]);

        if (result.rowCount === 0) {
            // console.log(result.rows.length);
            return res.status(404).json({
                status: 'error',
                message: 'Key not found.'
            });
        }

        res.status(200).json({
        status: "success",
        message: "Data updated successfully"
        });
        
    } catch (error) {
        errorHandler(res, error);
    }
});

module.exports = router;