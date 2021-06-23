const express = require('express');
const hpp = require('hpp');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const headers = require('./src/routes/middleware/headers');
const errorHandler = require('./src/routes/middleware/errorHandler');
const validate = require('./src/routes/middleware/validate');
const stocks = require('./src/routes/stocks');

app.use(helmet());
app.use(hpp());
app.use(cors());
app.use(morgan('combined'));

// Routes
app.use('/api/stocks', validate, stocks);

// Set response headers.
app.use(headers.setResponseHeaders);

// Error handling middleware.
app.use(errorHandler.notFound);
app.use(errorHandler.genericErrorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log('app listening');
});
