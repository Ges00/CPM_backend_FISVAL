var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy (login with a username & password)
passport.use(new LocalStrategy(
  {
    // Field name specified (as default in this case)
    usernameField: "username",
    passwordField: "password"
  },
  function (username, password, done) {
    // When a user tries to sign in this code runs
    db.Utente.findOne({
      where: {
        username: username
      }
    }).then(function (dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        console.log("\nUtente non trovato!");
        return done(null, false, {
          message: "Utente non trovato!"
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        console.log("\nPassword non corretta");
        return done(null, false, {
          message: "Password non corretta!"
        });
      }
      console.log("\nLogin " + dbUser.username + " success!");
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;