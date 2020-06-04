const express = require('express');
const router = express.Router();
var createError = require('http-errors');
require('dotenv').config();

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var User = require('../models').User;

// Configure the Facebook strategy for use by Passport.
passport.use(new FacebookStrategy({
    clientID: process.env['FACEBOOK_APP_ID'],
    clientSecret: process.env['FACEBOOK_APP_CLIENT_SECRET'],
    callbackURL: "/oauth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  async function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    // console.log("Facebook user profile", profile);
    try {
      var userDataObj = profile._json
      console.log("Facebook userDataObj", userDataObj);
      var existed_user = await User.findOne({email: userDataObj.email})
      if (existed_user) {
        if(existed_user.facebookId === userDataObj.id) {console.log("Login with facebook success!"); return cb(null, existed_user)}
        else throw(createError(403, "Email has been registered !"))
      }
      else{
        var newUser = new User({
          email: userDataObj.email,
          name: userDataObj.name,
          facebookId: userDataObj.id
        })
        await newUser.save()
        return cb(null, newUser)
      }
    } catch (e) {
      return cb(e, false)
    }
    // return cb(null, profile);
  }
));

// Configure the Google strategy for use by Passport.
passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: "/oauth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    // console.log("profile", profile);
    try {
      var userDataObj = profile._json
      console.log("2. Google userDataObj", userDataObj);
      var existed_user = await User.findOne({email: userDataObj.email});
      if (existed_user) {
        if (existed_user.googleId === userDataObj.sub) {console.log("Login with google success!");return cb(null, existed_user)}
        else throw createError(403, "Email has been registered !");
      }
      else{
        var newUser = new User({
          email: userDataObj.email,
          name: userDataObj.name,
          googleId: userDataObj.sub
        })
        await newUser.save()
        return cb(null, newUser)
      }
    } catch (e) {
      return cb(e, false)
    }
  }
));
//
passport.serializeUser(function(user, cb) {
  console.log("3. serializeUser");
  // console.log("serializeUser: user", user);
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  console.log("1. deserializeUser");
  // console.log("deserializeUser: obj", obj);
  cb(null, obj);
});

// Initialize Passport and restore authentication state, if any, from the
// session.
router.use(passport.initialize());
router.use(passport.session());
//

router.get('/login/facebook', passport.authenticate('facebook'))
router.get('/oauth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    // req.session.provider = 'facebook';
    res.redirect('/');
  });

//
router.get('/login/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}), function(req, res) {
  console.log("req.user", req.user);
  res.json(req.user)
})
router.get('/oauth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    // req.session.provider = 'google';
    // console.log("req.query", req.query);
    // var authorization_code = req.query.code;
    res.redirect('/');
  });
//
router.get('/oauth/logout',
  function(req, res) {
    req.session.destroy(function(err) {
      res.redirect('/');
    });
  });

router.use(function(err, req, res, next) {
  var statusCode = err.status || 500
  res.status(statusCode).send({ error: err.message });
})

module.exports = router
