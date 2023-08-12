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

router.delete('/:key', verifyToken, async (req, res) => {
  // delete key-value pair logic here
    const key = req.params.key;

  try {
    const deleteQuery = 'DELETE FROM data_store WHERE key = $1';
    const result = await pool.query(deleteQuery, [key]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Key not found.'
      });
    }

    res.status(200).json({
    status: "success",
    message: "Data deleted successfully"
    });
    
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;