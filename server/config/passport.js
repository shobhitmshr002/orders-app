const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const constants = require("../config/constants");
const User = require("../models/user");
const config = require("./config");

const localLogin = new LocalStrategy({
    usernameField: "email"
}, async (email, password, done) => {
    let user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
        return done(null, false, { error: constants.errorMessages.LOGIN_ERROR});
    }
    user = user.toObject();
    delete user.hashedPassword;
    done(null, user);
});

const jwtLogin = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}, async (payload, done) => {
    let user = await User.findById(payload._id);
    if (!user) {
        return done(null, false);
    }
    user = user.toObject();
    delete user.hashedPassword;
    done(null, user);
});

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(jwtLogin);
passport.use(localLogin);

module.exports = passport;
