const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  age: Number,
  address: String,
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }],
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }],
});
module.exports = mongoose.model('User', userSchema);