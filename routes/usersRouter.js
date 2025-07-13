const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logoutUser} = require('../controllers/authController');
const User = require('../models/user-model');
const Product = require('../models/product-model');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.post('/add-to-cart', async (req, res) => {
  const productId = req.body.productId;
  const userId = req.session.userId;

  try {
    console.log("Trying to add to cart:", { userId, productId });

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found");
      req.flash('error', 'User not found');
      return res.redirect('/shop');
    }

    user.cart.push(productId); 
    await user.save();

    console.log("Product added to cart successfully");
    req.flash('success', 'Item added to cart!');
    res.redirect('/shop'); 
  } catch (err) {
    console.error("❌ Error while adding to cart:", err);
    req.flash('error', 'Something went wrong while adding to cart');
    res.redirect('/shop');
  }
});


router.get('/cart', async (req, res) => {
  const userId = req.session.userId;

  try {
    const user = await User.findById(userId).populate('cart');

    if (!user) {
      return res.redirect('/login');
    }

    const cartItems = user.cart;

    const totalMRP = cartItems.reduce((sum, item) => sum + item.price, 0);
    const totalDiscount = cartItems.reduce((sum, item) => sum + (item.discount || 0), 0);

    res.render('cart', {
      cartItems,
      totalMRP,
      totalDiscount
    });

  } catch (err) {
    console.error("Error loading cart:", err);
    res.status(500).send("Something went wrong");
  }
});

router.post('/remove-from-cart', async (req, res) => {
  const { productId } = req.body;
  const userId = req.session.userId;

  try {
    await User.findByIdAndUpdate(userId, {
      $pull: { cart: productId }
    });
    res.redirect('/cart');
  } catch (err) {
    res.status(500).send('Error removing from cart');
  }
});




module.exports = router;