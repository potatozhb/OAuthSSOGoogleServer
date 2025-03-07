const express = require("express");
const passport = require("passport");
const { isUserAuthenticated } = require("./authmiddleware")
const {getAllUsers, getUser, addUser, updateUser} = require("./database/mysql")

const router = express.Router();

var successLoginUrl = "http://localhost:3000/login/success";
var errorLoginUrl = "http://localhost:3000/login/error";

if(process.env.NODE_ENV === "production"){
  successLoginUrl = `${process.env.APP_ADDRESS}/login/success`;
  errorLoginUrl = `${process.env.APP_ADDRESS}/login/error`;
}

router.get(
  "/test",
  (req, res) =>{
    try
    {
      addUser("googleId", "fullname", "email@gmail.com");
    }
    catch(err)
    {
      console.log(err);
    }
    res.send(successLoginUrl);
  }
);

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google",{
    failureMessage: "Cannot login to Google, please try again later!",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
  (req, res) => {
    console.log("User: ", req.user);
    res.send("Thank you for signing in!" + req.user.fullname);
  }
);


router.get("/auth/user", isUserAuthenticated, (req, res) => {
  res.json(req.user);
});

module.exports = router;
