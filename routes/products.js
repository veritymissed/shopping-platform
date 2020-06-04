var createError = require('http-errors');
const express = require('express');
var router = express.Router();

var Product = require('../models').Product;

//Get proudcts
router.get('/products', async (req, res) => {
  try {
    var products = await Product.find({})
    console.log("products", products);
    res.json(products)
  } catch (e) {

  } finally {
    return
  }
});

//Get one product
router.get('/product/:product_id', (req, res) => {
  return
});

module.exports = router;
