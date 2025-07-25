const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');
module.exports = async function (req, res, next) {
    if(!req.cookies.token) {
        req.flash('error', 'You must be logged in to access this page');
        return res.redirect('/');
    }
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        const user = await userModel.findOne({email : decoded.email}).select('-password');   
        req.user = user; 
        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/');
        }
        req.user = user; 
        next(); 
    } catch (err) {
        req.flash('error', 'Invalid token');
        res.redirect('/');
    }
}