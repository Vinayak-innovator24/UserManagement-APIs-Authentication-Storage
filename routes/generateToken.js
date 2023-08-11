const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // JSON Web Token library
const { Pool } = require('pg');

// Import database configuration
const dbConfig = require('../config/db');

// Create a pool using the imported configuration
const pool = new Pool(dbConfig);

// importing errorHandler function
const errorHandler = require('../handler/errorHandler');

const key = process.env.JWT_SECRET;

// retrieveStoredHashedPassword function definition
async function retrieveStoredHashedPassword(username) {
  try {
    const query = 'SELECT password FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);

    if (result.rows.length === 0) {
      throw new Error('User not found.');
    }

    return result.rows[0].password;
  } catch (error) {
    throw error;
  }
}

router.post('/', async (req, res) => {
  // generate token logic here
    const { username, password } = req.body; // Plain text password received from client

  try {
    // Hash the plain text password before using it
    const hashedPassword = await bcrypt.hash(password, 10);
    // Retrieve the stored hashed password for the provided username from your database
    const storedHashedPassword = await retrieveStoredHashedPassword(username);

    // Compare the received hashed password with the stored hashed password
    const passwordsMatch = await bcrypt.compare(password, storedHashedPassword);

    if (!passwordsMatch) {
      res.status(401).json({
        status: 'error',
        message: 'Authentication failed. Invalid credentials.'
      });
      return;
    }

    // Generate a token
    const accessToken = jwt.sign({ username }, key, { expiresIn: '1h' });

    res.status(200).json({
      status: 'success',
      message: 'Access token generated successfully.',
      data: {
        access_token: accessToken,
        expires_in: 1200
      }
    });
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;