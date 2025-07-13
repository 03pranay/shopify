const jwt = require('jsonwebtoken');
const generateToken = (user) => {
    return jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);   //process.env.JWT_KEY this will take secret key from env file

}
module.exports = { generateToken };