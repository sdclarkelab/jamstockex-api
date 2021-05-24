const express = require('express');

const app = express();

const headers = require('./lib/routes/middleware/headers');
const errorHandler = require('./lib/routes/middleware/errorHandler');
const auth = require('./lib/routes/middleware/auth');
const stocks = require('./lib/routes/stocksRouter');

require('dotenv').config();

// Error handling.
app.use('/', errorHandler);

// Set response headers.
app.use('/api', headers);

// Validate the api.
app.use('/api', auth);

// Routes
app.use('/api/stocks', stocks);

app.listen(process.env.PORT || 5000, () => {
  console.log('app listening');
});
