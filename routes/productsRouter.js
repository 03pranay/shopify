const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');

router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const { price, name, discount, bgcolor, panelcolor, textcolor } = req.body;

    await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });

    req.flash('success', 'Product created successfully');
    res.redirect('/owners/admin');
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
