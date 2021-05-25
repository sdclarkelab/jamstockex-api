const express = require('express');

const app = express();

const headers = require('./src/routes/middleware/headers');
const errorHandler = require('./src/routes/middleware/errorHandler');
const auth = require('./src/routes/middleware/auth');
const stocks = require('./src/routes/stocks');

// Error handling middleware.
app.use('/', errorHandler);

// Set response headers middleware.
app.use('/api', headers);

// Validate the api middleware.
app.use('/api', auth);

// Routes
app.use('/api/stocks', stocks);

app.listen(process.env.PORT || 5000, () => {
  console.log('app listening');
});
