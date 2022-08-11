const bcrypt = require("bcryptjs");

const User = require("../model/userModel");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5001/auth/google/callback",
      // passReqToCallback: true,
    },
    async function (accessToken, refreshToken, profile, done) {
      let user = profile._json;

      const userAlreadyAxist = await User.findOne({
        name: user.name,
        email: user.email,
        photo: user.picture,
      }).select("+password");

      if (userAlreadyAxist) {
        await bcrypt.compare(
          user.sub,
          userAlreadyAxist.password,
          function (err, result) {
            if (err) {
              console.log("Bcrypt compareda error chiqdi");
            }
          }
        );
        profile.userId = userAlreadyAxist._id;
      } else {
        const user1 = User({
          name: user.name,
          email: user.email,
          password: user.sub,
          passwordConfirm: user.sub,
        });

        await user1.save();
        profile.userId = user1._id;
      }

      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

module.exports = passport;
