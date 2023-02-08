const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// Express Server

const app = express();

// Database connection

dbConnection();

// Public Directory

app.use( express.static('public'));

// CORS 
app.use( cors() );

// Body Read and Parse

app.use( express.json() );

// Routes 

app.use( '/api/auth', require('./routes/auth') );

app.use('/api/data', require('./routes/data'));

app.use('/api/stats', require('./routes/stats'));

app.listen( process.env.PORT, () => {
    console.log(`Server is running in server ${ process.env.PORT }`);
} )