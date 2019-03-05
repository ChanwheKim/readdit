const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => { // 에러 핸들링 ( 케치 )
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, user, done) => {
      const existingUser = await User.findOne({ googleId: user.id }); // 에러 핸들링

      if (existingUser) {
        done(null, existingUser);
        return;
      }

      const newUser = await new User({ googleId: user.id }).save(); // 에러 핸들링
      done(null, newUser);
    }
  )
);
