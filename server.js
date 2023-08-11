const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());

const registerRoute = require('./routes/register');
const generateRoute = require('./routes/generateToken');
const storeRoute = require('./routes/storeData');
const getRoute = require('./routes/getData');
const updateRoute = require('./routes/updateData');
const deleteRoute = require('./routes/deleteData');

// User registration endpoint
app.use('/api/register', registerRoute);
// Generate access token endpoint
app.use('/api/token', generateRoute);
// Storing the key-value pairs.
app.use('/api/data', storeRoute);
// Retrieving the value associated with a specific key.
app.use('/api/data', getRoute);
// Updating the value associated with a specific key.
app.use('/api/data', updateRoute);
// Delete a key-value pair from the database
app.use('/api/data', deleteRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
