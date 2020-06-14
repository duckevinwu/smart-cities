// var config = require('./db-config.js');

// read .env file config
require('dotenv').config();

// Code below for testing in production

var config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
}

var randToken = require('rand-token');
var bcrypt = require('bcrypt');
var sgMail = require('@sendgrid/mail');

// configure sendgrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var mysql = require('mysql');

var domain = 'http://localhost:3000';

const saltRounds = 12;

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

/* ---- (Dashboard) ---- */
function getAllPeople(req, res) {
  var query = `
    SELECT login, name, birthyear
    FROM Person;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Part 2 (FindFriends) ---- */
function getFriends(req, res) {
  var inputLogin = req.params.login;

  // TODO: (3) - Edit query below
  var query = `
    SELECT f.friend, p.name
    FROM Friends f JOIN Person p ON f.friend=p.login
    WHERE f.login='${inputLogin}'
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

// --------------- RESET PASSWORD ----------------------
function saveToken(req, res) {
  var email = req.body.email;

  // check if user with that email exists
  var existsQuery = `
    SELECT *
    FROM Person
    WHERE login = ?;
  `;
  connection.query(existsQuery, [email],  function(err, rows, fields) {
    if (err) {
      console.log(err);
      return;
    }
    if (!rows.length) {
      // user doesn't exist
      return res.send({message: `user doesn't exist`});
    } else {
      var currTime = Date.now().toString();
      var token = randToken.generate(16);
      var isUsed = 'f';

      bcrypt.hash(token, saltRounds, function(err, hash) {
        // save into db
        var query = `
          INSERT INTO Password (email, token, time, used)
          VALUES (?, ?, ?, ?);
        `;
        connection.query(query, [email, hash, currTime, isUsed], function(err, rows, fields) {
          if (err) console.log(err);
          else {

            var resetUrl = domain + '/resetpassword/' + email + '/' + token;

            // send email
            var msg = {
              to: email,
              from: 'thecollectivecause@gmail.com',
              subject: 'Password Reset',
              text: resetUrl,
              html: '<a href="' + resetUrl + '">Reset password</a>'
            }

            sgMail
              .send(msg)
              .then(() => {
                res.send({message: 'success'});
              }, error => {
                console.log(error);
                res.send({message: 'error sending email'});
              });

          }
        });
      });

    }
  });


}

// The exported functions, which can be accessed in index.js.
module.exports = {
  getAllPeople: getAllPeople,
  getFriends: getFriends,
  saveToken: saveToken
}
