const passport = require('passport')
const passportLocal = require("passport-local");
const knex = require('../db/knex');
const bcrypt = require('bcrypt');

passport.use(new passportLocal.Strategy({
  usernameField: 'user[username]',
  passwordField: 'user[password]',
  passReqToCallback : true
},(req, username, password, done) =>{
    knex('users').where({username}).first().then((user) =>{
      if (!user) {
        return done(null, false);
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done (null, false);
      }
      else {
        return done(null, user);
      }
    }).catch((err) => {
      return done(err)
    })
  }
));

passport.serializeUser((user, done) =>{
  done(null, user.id);
});

passport.deserializeUser((id, done) =>{
  knex('users').where({id}).first()
    .then((user) =>{
      done(null, user);
    }).catch((err) =>{
      done(err,null);
    });
});

module.exports = passport;
