var config = require('../db-config.js');

var mysql = require('mysql');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')

config.connectionLimit = 10;
var connection = mysql.createPool(config);

const saltRounds = 10;

module.exports = function(passport) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.email);
  });

  // used to deserialize the user
  passport.deserializeUser(function(email, done) {
      connection.query("SELECT * FROM Person WHERE login = ? ",[email], function(err, rows){
          done(err, rows[0]);
      });
  });

  // Register
  passport.use(
    'local-register',
    new LocalStrategy({
      usernameField: 'email'
    },
    function(email, password, done) {

      //testing
      console.log(email);
      console.log(password);

      // match user
      var query = `
        SELECT *
        FROM Person
        WHERE login = ?;
      `;
      connection.query(query, [email], function(err, rows, fields) {
        if (err) {
          console.log(err);
          return done(err);
        }
        if (rows.length) {
          // email found in db (user already exists)
          return done(null, false, { message: 'user already exists'});
        } else {
          //register user

          // hash password
          bcrypt.hash(password, saltRounds, function(err, hash) {
              // Store hash in your password DB.
              var newUser = {
                email: email,
                password: hash,
                birthyear: 2020
              }

              var insertQuery = `
                INSERT INTO Person (login, name, birthyear)
                VALUES (?, ?, ?);
              `;
              connection.query(insertQuery, [newUser.email, newUser.password, newUser.birthyear], function(err, rows, fields) {
                if (err) console.log(err);
                else {
                  return done(null, newUser);
                }
              });

          });

        }
      });

    }
  )
  );

}
