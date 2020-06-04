const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

exports.User = require('./User')(mongoose)
exports.Product = require('./Product')(mongoose)
