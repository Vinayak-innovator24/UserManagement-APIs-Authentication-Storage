const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Import database configuration
const dbConfig = require('../config/db');

// Create a pool using the imported configuration
const pool = new Pool(dbConfig);

// importing errorHandler function
const errorHandler = require('../handler/errorHandler');
// importing verifyToken function
const verifyToken = require('../middlewares/authMiddleware');

// app.use(['/api/data'], verifyToken);
router.post('/', verifyToken, async (req, res) => {
  // store key-value pair logic here
    const { key, value } = req.body;

  try {
    const userId = req.user.username; // Assuming username is the user identifier

    const query = 'INSERT INTO data_store (user_id, key, value) VALUES ($1, $2, $3)';
    await pool.query(query, [userId, key, value]);

    res.status(201).json({
      status: 'success',
      message: 'Data stored successfully.',
    });
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;