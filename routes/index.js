const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedin');
const productModel = require('../models/product-model');
router.get('/', (req, res) => {
  const error = req.flash('error');  // ✅ must be named `error`
  res.render('index', { error, isLoggedin: false });  // ✅ passed to EJS
});



router.get('/shop', isLoggedin, async  (req, res) => {
    let products = await productModel.find()  // This route is protected by isLoggedin middleware
    res.render('shop', { products });
})

module.exports = router;