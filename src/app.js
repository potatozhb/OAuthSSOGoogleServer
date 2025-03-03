const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

require("./passportGoogleSso");
const passport = require("passport");
const apiRouter = require('./loginAPI');  // Import the API router

const app = express();

app.use(cookieSession({
  name: 'zhb sso session',                 // Name of the cookie
  keys: ['zhb_secret_key'],       // Secret key(s) to sign the cookie (can be an array of keys)
  maxAge: 24 * 60 * 60 * 1000     // Cookie expiration time (24 hours in milliseconds)
}));

// Middleware to parse incoming request bodies
app.use(bodyParser.json());  // For parsing application/json
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

app.get("/", (req, res) => {
    res.end("hello world");
});

module.exports = app;
