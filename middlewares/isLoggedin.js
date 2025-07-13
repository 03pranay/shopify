const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');
module.exports = async function (req, res, next) {
    if(!req.cookies.token) {
        req.flash('error', 'You must be logged in to access this page');
        return res.redirect('/');
    }
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        const user = await userModel.findOne({email : decoded.email}).select('-password'); // Exclude password from user object  
        req.user = user; //  to request object
        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/');
        }
        req.user = user; // Attach user to request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        req.flash('error', 'Invalid token');
        res.redirect('/');
    }
}