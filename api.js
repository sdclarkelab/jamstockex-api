const express = require('express');
const hpp = require('hpp');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const responseMiddleware = require('./src/middleware/response');
const errorHandler = require('./src/middleware/errorHandler');
const validateMiddleware = require('./src/middleware/validate');
const v1StocksRouter = require('./src/v1/routes/stocks');
const v2StocksRouter = require('./src/v2/routes/stocks');

app.use(helmet()); // Help secure api using headers.
app.use(hpp()); // Protect against HTTP param pollution attack.
app.use(cors());
app.use(morgan('combined'));

// Validate routes
app.use(validateMiddleware);

// Routes
app.use('/api/v1/stocks', v1StocksRouter);
app.use('/api/v2/stocks', v2StocksRouter);

// Update response.
app.use(responseMiddleware.setResponseHeaders);

// Error handling middleware.
app.use(errorHandler.notFound);
app.use(errorHandler.genericErrorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log('app listening');
});
