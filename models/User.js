const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {type: String, unique: true},
  password: String,
  updated: {type: Date, default: Date.now},
  archived: {type: Boolean, default: false},
  googleId: String,
  facebookId: String
})

module.exports = function(conn) {
  return conn.model("User", userSchema)
}
