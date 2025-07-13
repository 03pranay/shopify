const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedin');
const productModel = require('../models/product-model');
router.get('/', (req, res) => {
  const error = req.flash('error');  
  res.render('index', { error, isLoggedin: false });  
});



router.get('/shop', isLoggedin, async  (req, res) => {
    let products = await productModel.find()  
    res.render('shop', { products });
})

module.exports = router;