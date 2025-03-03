const passport = require("passport");
const strategy = require("passport-google-oauth20").Strategy;
const User = require("./model/user");
const {getAllUsers, getUser, addUser, updateUser} = require("./database/mysql")

const Client_ID = "571276805410-o1acfnkgfb0icmffki4ngt3pulnajkmo.apps.googleusercontent.com";
const Secret = "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";
const CallBackURL = "http://localhost:5000/api/auth/google/callback";

var users = [];

passport.use(new strategy({
    clientID: Client_ID,
    clientSecret: Secret,
    callbackURL: CallBackURL,
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, cb) => {
    const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        googleId: profile.id,
    }
    
    var user = new User(profile.id, `${profile.name.givenName} ${profile.name.familyName}`, profile.emails[0].value);

    var cur = users.find(u => u.googleId === profile.id);
    if(!cur)
        cur = await getUserFromDB(profile.id);
    if(cur && (cur.fullName !== user.fullname || cur.email !== user.email))
    {
        users = users.filter(item => item.googleId !== user.googleId);
        users.push(user)
        updateUser(user.googleId, user.fullname, user.email);
    }
    else if(!cur)
    {
        users.push(user);
        addUser(user.googleId, user.fullname, user.email);
    }
    

    if(user) return cb(null, user);
}));


passport.serializeUser((user, cb) => {
    console.log("Serializing user:", user);
    cb(null, user.googleId);
});

passport.deserializeUser(async (id, cb) => {
    var cur = users.find(u => u.googleId === id);
    if(!cur)
        cur = await getUserFromDB(id);

    console.log("DeSerialized user", cur);
    if(cur) 
        cb(null, cur);
    else 
        cb("can't deserialized user, not found.", null);
});
  
const getUserFromDB = async function(id) {
    const user = await getUser(id);
    
    if(user)
        return new User(user.googleId, user.fullname, user.email);
}