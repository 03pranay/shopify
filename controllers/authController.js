 const userModel = require('../models/user-model');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const { generateToken } = require('../utils/generateToken');
 module.exports.registerUser = async function(req, res) {
    try {
        const { email } = req.body;
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            req.flash('error', 'Email already registered');
            return res.redirect('/');
        }

        
    } catch (error) {
        req.flash('error', 'Registration failed');
        return res.redirect('/');
    }
};


module.exports.loginUser = async function(req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        req.flash('error', 'User not found');
        return res.redirect('/');
    }

    bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
            req.flash('error', 'Something went wrong');
            return res.redirect('/');
        }

        if (!result) {
            req.flash('error', 'Invalid password');
            return res.redirect('/');
        }

        const token = generateToken(user);
        res.cookie('token', token);
        req.session.userId = user._id;
        return res.redirect('/shop');
    });
};

module.exports.logoutUser = function(req, res) {
    res.clearCookie("token");
    return res.redirect('/');
}