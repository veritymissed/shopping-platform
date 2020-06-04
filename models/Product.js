const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: String,
  price: {type: Number, default: 0}
})

module.exports = function(conn) {
  return conn.model("Product", productSchema)
}
