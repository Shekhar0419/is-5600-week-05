// db.js
const mongoose = require('mongoose');

/**
 * In this lab we connect to the MongoDB instance running in Codespaces
 * via docker-compose. In a real app you’d probably use MongoDB Atlas.
 */
mongoose.connect(
  process.env.MONGODB_URI ||
    'mongodb://root:example@localhost:27017/?authSource=admin',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose;
