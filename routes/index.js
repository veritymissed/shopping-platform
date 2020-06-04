const express = require('express');
const router = express.Router()

const products = require('./products');
const user = require('./user');
// const shops = require('./shops');

router.use(products)
router.use(user)
// router.use(shops)

module.exports = router
