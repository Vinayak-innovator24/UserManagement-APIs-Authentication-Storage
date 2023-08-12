const { Pool } = require('pg');
const dbConfig = require('./db');
const pool = new Pool(dbConfig);
const result = async() => {
    await pool.query(`DROP TABLE IF EXISTS data_store`)
    await pool.query(`DROP TABLE IF EXISTS users`)
    await pool.query(`CREATE TABLE data_store ( id serial PRIMARY KEY, user_id VARCHAR(255) NOT NULL, key VARCHAR(255) NOT NULL, value TEXT )`)
    await pool.query(`CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        age INT NOT NULL,
        gender VARCHAR(10) NOT NULL
      )
    `)
};
result().then(() => console.log('connected'));
module.exports = pool;