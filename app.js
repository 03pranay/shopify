const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const db = require("./config/mongoose-connection");
const shop = require("./routes/index");
const autoroutes = require('./routes/usersRouter');
const expressSession = require('express-session');   // For session management
const flash = require('connect-flash');   // For flash messages
require('dotenv').config();      // Load environment variables from .env file
app.use(express.json());
app.use(
  expressSession(
    {
      secret: process.env.JWT_KEY,  // Use a secret key from environment variables
      resave: false,  // Don't save session if unmodified
      saveUninitialized: true,  // Create session even if unmodified
    }
  )
);
app.use(flash());  // Initialize flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error');
  next();
});
app.use(express.urlencoded({ extended: true }));     
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use("/owners", ownersRouter);
app.use("/", usersRouter);
app.use("/products", productsRouter);
app.get('/', autoroutes);
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/shop', shop);







app.listen(3000);