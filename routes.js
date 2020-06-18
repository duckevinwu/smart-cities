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

var domain = 'https://intense-hollows-59794.herokuapp.com';
// var domain = "http://localhost:3000";

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

// --------------- REGISTER USER -----------------------
function saveRegisterToken(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  // check if user with that email exists
  var existsQuery = `
    SELECT *
    FROM User
    WHERE email = ?;
  `;
  connection.query(existsQuery, [email],  function(err, rows, fields) {
    if (err) {
      console.log(err);
      return;
    }
    if (rows.length) {
      // user already exists
      return res.send({status: 'fail', message: 'user already exists'});
    } else {
      var currTime = Date.now().toString();
      var token = randToken.generate(16);

      // hash token
      bcrypt.hash(token, saltRounds, function(err, tokenHash) {
        // hash password
        bcrypt.hash(password, saltRounds, function(err, pwHash) {
          // save into db
          var query = `
            INSERT INTO Confirmation (email, password, token, time)
            VALUES (?, ?, ?, ?);
          `;
          connection.query(query, [email, pwHash, tokenHash, currTime], function(err, rows, fields) {
            if (err) console.log(err);
            else {

              var confirmUrl = domain + '/confirmation/' + email + '/' + token;

              // send email
              var msg = {
                to: email,
                from: 'thecollectivecause@gmail.com',
                subject: 'Activate Account',
                text: confirmUrl,
                html: '<a href="' + confirmUrl + '">Activate Account</a>'
              }

              sgMail
                .send(msg)
                .then(() => {
                  res.send({status: 'success', message: 'success'});
                }, error => {
                  console.log(error);
                  res.send({status: 'fail', message: 'error sending email'});
                });

            }
          });
        });
      });

    }
  });
}

function checkRegisterToken(req, res) {
  var email = req.params.email;
  var token = req.params.token;

  var query = `
    SELECT time, token, password
    FROM Confirmation
    WHERE email = ? AND time = (
      SELECT MAX(time)
      FROM Confirmation
      WHERE email = ?
    );
  `;
  connection.query(query, [email, email], function(err, rows, fields) {
    if (err) console.log(err);
    else {
      // tuple doesn't exist
      if (!rows.length) {
        res.send({status: 'fail', message: 'not valid'})
      } else {
        var dbTime = rows[0].time;
        var dbToken = rows[0].token;
        var dbPassword = rows[0].password;

        var prevTime = parseInt(dbTime);
        var currTime = parseInt(Date.now().toString());

        var elapsedTimeMins = ((currTime - prevTime) / 1000) / 60;

        if (elapsedTimeMins > 120) {
          res.send({status: 'fail', message: 'token expired'})
        } else {
          bcrypt.compare(token, dbToken, function(err, result) {
            if (result) {
              // save user into db
              var insertQuery = `
                INSERT INTO User (email, password)
                VALUES (?, ?);
              `;
              connection.query(insertQuery, [email, dbPassword], function(err, rows, fields) {
                if (err) {
                  return res.send({status: 'fail', message: 'error creating account'});
                } else {
                  return res.send({status: 'success', message: 'account created'});
                }
              })

            } else {
              res.send({status: 'fail', message: 'invalid token'})
            }
          })
        }

      }
    }
  });
}



// --------------- RESET PASSWORD ----------------------
function saveToken(req, res) {
  var email = req.body.email;

  // check if user with that email exists
  var existsQuery = `
    SELECT *
    FROM User
    WHERE email = ?;
  `;
  connection.query(existsQuery, [email],  function(err, rows, fields) {
    if (err) {
      console.log(err);
      return;
    }
    if (!rows.length) {
      // user doesn't exist
      return res.send({status: 'fail', message: `user doesn't exist`});
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
                res.send({status: 'success', message: 'success'});
              }, error => {
                console.log(error);
                res.send({status: 'fail', message: 'error sending email'});
              });

          }
        });
      });

    }
  });
}

function checkToken(req, res) {
  var email = req.params.email;
  var token = req.params.token;

  var query = `
    SELECT time, token
    FROM Password
    WHERE email = ? AND used = 'f' AND time = (
      SELECT MAX(time)
      FROM Password
      WHERE email = ? AND used = 'f'
    );
  `;
  connection.query(query, [email, email], function(err, rows, fields) {
    if (err) console.log(err);
    else {
      // tuple doesn't exist
      if (!rows.length) {
        res.send({status: 'fail', message: 'not valid'})
      } else {
        var dbTime = rows[0].time;
        var dbToken = rows[0].token;

        var prevTime = parseInt(dbTime);
        var currTime = parseInt(Date.now().toString());

        var elapsedTimeMins = ((currTime - prevTime) / 1000) / 60;

        if (elapsedTimeMins > 120) {
          res.send({status: 'fail', message: 'token expired'})
        } else {
          bcrypt.compare(token, dbToken, function(err, result) {
            if (result) {
              res.send({status: 'success', message: 'valid token', time: dbTime})
            } else {
              res.send({status: 'fail', message: 'invalid token'})
            }
          })
        }

      }
    }
  });
}

function updatePassword(req, res) {
  var email = req.body.email;
  var newPassword = req.body.newPassword;
  var time = req.body.time;

  // update previous record in Password table
  var statusQuery = `
    UPDATE Password
    SET used = 't'
    WHERE email = ? AND time = ?
  `;
  connection.query(statusQuery, [email, time], function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.sent({status: 'fail'});
    }
    else {
      // hash password
      bcrypt.hash(newPassword, saltRounds, function(err, hash) {
        // udate password
        var passwordQuery = `
          Update User
          SET password = ?
          WHERE email = ?
        `;
        connection.query(passwordQuery, [hash, email], function(err, rows, fields) {
          if (err) {
            console.log(err);
            res.send({status: 'fail'});
          }
          else {
            res.send({status: 'success'})
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
  saveToken: saveToken,
  checkToken: checkToken,
  updatePassword: updatePassword,
  saveRegisterToken: saveRegisterToken,
  checkRegisterToken: checkRegisterToken
}
