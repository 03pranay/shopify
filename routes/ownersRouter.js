const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model'); 
if(process.env.NODE_ENV === 'development') {
    router.get('/admin', (req, res) => {
  let success = req.flash('success');
  const product = {}; 
  res.render('createproducts', { success, product });
});
}





console.log(process.env.NODE_ENV);
module.exports = router;