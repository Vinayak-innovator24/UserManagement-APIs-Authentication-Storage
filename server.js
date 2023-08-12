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

var notifyServer = app.listen(process.env.PORT,
  process.env.NODE_SERVER_IP || '127.0.0.1',
  function() {
    console.log('server listening on address ' + notifyServer.address().address + ':' + notifyServer.address().port)
    console.log('server listening on port ' + notifyServer.address().port)
  })

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
})