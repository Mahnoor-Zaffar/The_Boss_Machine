const express = require('express');
const path = require('path');
const app = express();

module.exports = app;

// Add middleware for handling CORS requests from index.html
const cors = require('cors');
app.use(cors());

// Add middware for parsing request bodies here:
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Serve static assets from the public/ directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

// Serve index.html for all other routes (SPA front-end)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
