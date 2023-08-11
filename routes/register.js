const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

// Import database configuration
const dbConfig = require('../config/db');

// Create a pool using the imported configuration
const pool = new Pool(dbConfig);

// importing errorHandler function
const errorHandler = require('../handler/errorHandler');

router.post('/', async (req, res) => {
  // Registration logic here
    const { username, email, password, full_name, age, gender } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Basic validation
        if (!username || !email || !hashedPassword || !full_name || !age || !gender) {
        return res.status(400).json({
            status: 'error',
            code: 'INVALID_REQUEST',
            message: 'Invalid request. Please provide all required fields: username, email, password, full_name.',
        });
        }

        // Insert user into the database
        const query = 'INSERT INTO users (username, email, password, full_name, age, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
        const result = await pool.query(query, [username, email, hashedPassword, full_name, age, gender]);
        const user_id = result.rows[0].id;

        res.status(201).json({
        status: 'success',
        message: 'User successfully registered!',
        data: {
            user_id,
            username,
            email,
            full_name,
            age,
            gender,
        },
        });
    } catch (error) {
        errorHandler(res, error);   //Using errorHandler funtion
    }
});

module.exports = router;