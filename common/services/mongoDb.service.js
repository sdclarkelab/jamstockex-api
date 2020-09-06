const mongoose = require('mongoose');

let count = 0;

require('dotenv').config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
};

const connectWithRetry = () => {
  console.log('Establishing MongoDB connection ...');

  mongoose.connect(process.env.DB, options).then(() => {
    console.log('MongoDB is connected');
  }).catch((err) => {
    console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', count += 1);
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();
exports.mongoose = mongoose;
