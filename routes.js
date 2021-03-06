// var config = require('./db-config.js');

// read .env file config
require('dotenv').config();

// Code below for testing in production

var config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
}

var randToken = require('rand-token');
var bcrypt = require('bcrypt');
var sgMail = require('@sendgrid/mail');
const nodemailer = require("nodemailer");

// configure sendgrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var mysql = require('mysql');

var domain = 'https://www.collectivecause.org';
// var domain = "http://localhost:3000";

const saltRounds = 12;

config.connectionLimit = 10;
var connection = mysql.createPool(config);

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.dreamhost.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.DH_USER, // generated ethereal user
    pass: process.env.DH_PASS, // generated ethereal password
  },
});

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
      return res.send({status: 'fail', message: 'Email already in use'});
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

              // send email sendgrid
              /*
              var msg = {
                to: email,
                from: {
                  email: 'no-reply@collectivecause.org',
                  name: 'Collective Cause'
                },
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
                */

                var emailTextBody = "Welcome to Collective Cause! Visit this link (" + confirmUrl + ") to activate your account. We're thrilled to have you, and we can't wait see your ideas. If you ever want to say hi or give us some feedback, feel free to reach out to us at team@collectivecause.org. \n \n Best, \n Kevin \n Collective Cause \n Philadelphia, PA \n team@collectivecause.org"
                var emailHtmlBody = "Welcome to Collective Cause! Visit this <a href=" + confirmUrl + ">link</a> to activate your account. We're thrilled to have you, and we can't wait to see your ideas. If you ever want to say hi or give us some feedback, feel free to reach out to us at team@collectivecause.org. <br> <br> Best, <br> Kevin <br> Collective Cause <br> Philadelphia, PA <br> team@collectivecause.org"

                // send mail with defined transport object
               transporter.sendMail({
                 from: '"Collective Cause" <team@collectivecause.org>', // sender address
                 to: email, // list of receivers
                 subject: "Account Activation", // Subject line
                 text: emailTextBody, // plain text body
                 html: emailHtmlBody, // html body
               }, function(error, info) {
                 if (error) {
                   console.log(error);
                   return res.send({status: 'fail'})
                 } else {
                   return res.send({status: 'success'})
                 }
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
            // var msg = {
            //   to: email,
            //   from: {
            //     email: 'no-reply@collectivecause.org',
            //     name: 'Collective Cause'
            //   },
            //   subject: 'Password Reset',
            //   text: resetUrl,
            //   html: '<a href="' + resetUrl + '">Reset password</a>'
            // }
            //
            // sgMail
            //   .send(msg)
            //   .then(() => {
            //     res.send({status: 'success', message: 'success'});
            //   }, error => {
            //     console.log(error);
            //     res.send({status: 'fail', message: 'error sending email'});
            //   });

            var emailTextBody = "Oh no! You forgot your password. But don't worry - we got your back. Reset your password at this link (" + resetUrl + ") and get back out there. \n \n Best, \n Kevin \n Collective Cause \n Philadelphia, PA \n team@collectivecause.org";
            var emailHtmlBody = "Oh no! You forgot your password. But don't worry - we got your back. Reset your password <a href=" + resetUrl + ">here</a> and get back out there. <br> <br> Best, <br> Kevin <br> Collective Cause <br> Philadelphia, PA <br> team@collectivecause.org";

            // send mail with defined transport object
           transporter.sendMail({
             from: '"Collective Cause" <team@collectivecause.org>', // sender address
             to: email, // list of receivers
             subject: "Reset Password", // Subject line
             text: emailTextBody, // plain text body
             html: emailHtmlBody, // html body
           }, function(error, info) {
             if (error) {
               console.log(error);
               return res.send({status: 'fail'})
             } else {
               return res.send({status: 'success'})
             }
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
          return res.send({status: 'fail', message: 'token expired'})
        } else {
          bcrypt.compare(token, dbToken, function(err, result) {
            if (result) {
              return res.send({status: 'success', message: 'valid token', time: dbTime})
            } else {
              return res.send({status: 'fail', message: 'invalid token'})
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
      return res.send({status: 'fail'});
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
            return res.send({status: 'fail'});
          }
          else {
            return res.send({status: 'success'})
          }
        });
      });

    }
  });

}

// ------------------------ CREATE CHALLENGE ------------------------
function createChallenge(req, res) {

  var challengeInfo = req.body.challengeInfo;
  var userId = req.user.user_id;

  var name = challengeInfo.name;
  var tagline = challengeInfo.tagline;
  var start = challengeInfo.startDateString;
  var end = challengeInfo.endDateString;
  var reward = challengeInfo.reward;
  var brief = challengeInfo.brief;
  var description = challengeInfo.description;
  var assets = challengeInfo.assets;
  var imgUrl = challengeInfo.imageUrl;
  var logoUrl = challengeInfo.logoUrl;
  var color = challengeInfo.color;
  var resources = challengeInfo.resources;
  var eligibility = challengeInfo.eligibility;
  var contact = challengeInfo.contact;
  var prize = challengeInfo.prize;
  var submission = challengeInfo.submission;

  // if user id doesn't exist, don't create challenge
  if (!userId) {
    return res.send({status: 'fail', message: 'not logged in'});
  } else {
    // save challenge into database
    var insertQuery = `
      INSERT INTO Challenge (name, owner, start, end, reward, tagline, brief, description, assets, prize, submission, imgurl, logourl, color, resources, eligibility, contact)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    connection.query(insertQuery, [name, userId, start, end, reward, tagline, brief, description, assets, prize, submission, imgUrl, logoUrl, color, resources, eligibility, contact], function(err, rows, fields) {
      if (err) {
        console.log(err);
        return res.send({status: 'fail'});
      } else {
        return res.send({status: 'success'});
      }
    });
  }
}

// ------------------------ EDIT CHALLENGE ------------------------
function editChallenge(req, res) {

  var challengeInfo = req.body.challengeInfo;
  var userId = req.user.user_id;

  var challengeId = challengeInfo.id;
  var name = challengeInfo.name;
  var tagline = challengeInfo.tagline;
  var start = challengeInfo.startDateString;
  var end = challengeInfo.endDateString;
  var reward = challengeInfo.reward;
  var brief = challengeInfo.brief;
  var description = challengeInfo.description;
  var assets = challengeInfo.assets;
  var imgUrl = challengeInfo.imageUrl;
  var logoUrl = challengeInfo.logoUrl;
  var color = challengeInfo.color;
  var resources = challengeInfo.resources;
  var eligibility = challengeInfo.eligibility;
  var contact = challengeInfo.contact;
  var prize = challengeInfo.prize;
  var submission = challengeInfo.submission;

  // if user id doesn't exist, don't create challenge
  if (!userId) {
    return res.send({status: 'fail', message: 'not logged in'});
  } else {
    // save challenge into database
    var insertQuery = `
      UPDATE Challenge
      SET name = ?, start = ?, end = ?, reward = ?, tagline = ?, brief = ?, description = ?, prize = ?, submission = ?, imgurl = ?, logourl = ?, color = ?, resources = ?, contact = ?
      WHERE challenge_id = ? AND owner = ?
    `;
    connection.query(insertQuery, [name, start, end, reward, tagline, brief, description, prize, submission, imgUrl, logoUrl, color, resources, contact, challengeId, userId], function(err, rows, fields) {
      if (err) {
        console.log(err);
        return res.send({status: 'fail'});
      } else {
        return res.send({status: 'success'});
      }
    });
  }
}
// ----------------------- CHALLENGE OWNER EDIT --------------------------
function isChallengeOwnerEdit(req, res) {

  if (!req.user) {
    return res.send({status: 'fail', message: 'not logged in'});
  }

  var challengeId = req.params.challengeid;
  var userId = req.user.user_id;

  if (!userId) {
    return res.send({status: 'fail', message: 'not logged in'});
  } else {
    // get challenge owner from db
    var query = `
      SELECT *
      FROM Challenge
      WHERE challenge_id = ?
    `;
    connection.query(query, [challengeId], function(err, rows, fields) {
      if (err) {
        console.log(err);
        return res.send({status: 'fail'});
      } else {
        if (userId === rows[0].owner) {
          return res.send({status: 'success', challenge: rows[0]});
        } else {
          return res.send({status: 'fail', message: 'not owner of challenge'});
        }
      }
    });
  }
}

// ----------------------- GET CREATED CHALLENGES --------------------
function getMyChallenges(req, res) {
  var userId = req.user.user_id;

  // if user isn't signed in, don't retrieve anything
  if (!userId) {
    return res.send({status: 'fail', message: 'not logged in'});
  } else {
    // get challenges owned by the current user
    var query = `
    WITH SumTemp AS (
      SELECT challenge, COUNT(*) AS sum
      FROM Solving
      GROUP BY challenge
    )
    SELECT c.challenge_id, c.name, c.tagline, c.start, c.end, c.reward, c.color, IFNULL(st.sum, 0) AS sum
    FROM Challenge c LEFT JOIN SumTemp st ON c.challenge_id = st.challenge
    WHERE c.owner = ?
    `;
    connection.query(query, [userId], function(err, rows, fields) {
      if (err) {
        console.log(err);
        return res.send({status: 'fail'});
      } else {
        return res.send({status: 'success', challenges: rows});
      }
    });
  }
}

// -------------------- GET ALL CHALLENGES -------------------
function getAllChallenges(req, res) {
  var query = `
  WITH SumTemp AS (
    SELECT challenge, COUNT(*) AS sum
    FROM Solving
    GROUP BY challenge
  )
  SELECT c.challenge_id, c.name, c.tagline, c.start, c.end, c.reward, c.imgurl, c.logourl, c.color, IFNULL(st.sum, 0) AS sum
  FROM Challenge c LEFT JOIN SumTemp st ON c.challenge_id = st.challenge
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log(err);
      return res.send({status: 'fail'});
    } else {
      return res.send({status: 'success', challenges: rows});
    }
  });
}

// --------------- GET CHALLENGE DETAILS --------------------
function getChallengeDetails(req, res) {
  var id = req.params.id;

  var query = `
  WITH SumTemp AS (
    SELECT COUNT(*) AS sum
    FROM Solving
    WHERE challenge = ?
  )
  SELECT c.*, st.sum
  FROM Challenge c, SumTemp st
  WHERE challenge_id = ?
  `;
  connection.query(query, [id, id, id], function(err, rows, fields) {
    if (err) {
      console.log(err);
      return res.send({status: 'fail'});
    } else {
      return res.send({status: 'success', challenge: rows});
    }
  });
}

// --------------- CREATE IDEA --------------------------

function createIdea(req, res) {

  if (!req.user) {
    return res.send({status: 'fail', message: 'not logged in'});
  }

  var idea = req.body.idea;

  var userId = req.user.user_id;
  var challengeId = parseInt(req.body.challengeId);
  var content = idea.idea;
  var currTime = parseInt(Date.now().toString());

  // if user id doesn't exist, don't create challenge
  if (!userId) {
    return res.send({status: 'fail', message: 'not logged in'});
  } else {
    // save challenge into database
    var insertQuery = `
      INSERT INTO Idea (creator, challenge, submit_time, content, is_group, team, about_you, interview, other_info)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    connection.query(insertQuery, [userId, challengeId, currTime, content, idea.isGroup, idea.team, idea.aboutYou, idea.interview, idea.otherInfo], function(err, rows, fields) {
      if (err) {
        console.log(err);
        return res.send({status: 'fail'});
      } else {
        return res.send({status: 'success'});
      }
    });
  }
}

// -------------- CREATE PROPOSAL -----------------------
function createProposal(req, res) {
  if (!req.user) {
    return res.send({status: 'fail', message: 'not logged in'});
  }

  var userId = req.user.user_id;
  var challengeId = parseInt(req.body.challengeId);
  var content = req.body.content;
  var currTime = parseInt(Date.now().toString());

  if (!userId) {
    return res.send({status: 'fail', message: 'not logged in'});
  } else {
    // save challenge into database
    var insertQuery = `
      INSERT INTO Proposal (creator, challenge, submit_time, content)
      VALUES (?, ?, ?, ?);
    `;
    connection.query(insertQuery, [userId, challengeId, currTime, content], function(err, rows, fields) {
      if (err) {
        console.log(err);
        return res.send({status: 'fail'});
      } else {
        return res.send({status: 'success'});
      }
    });
  }
}

// --------------- CHECK CHALLENGE OWNER CORRECT -----------
function isChallengeOwner(req, res) {

  if (!req.user) {
    return res.send({status: 'fail', message: 'not logged in'});
  }

  var challengeId = req.params.challenge_id;
  var userId = req.user.user_id;

  if (!userId) {
    return res.send({status: 'fail', message: 'not logged in'});
  } else {
    // get challenge owner from db
    var query = `
      SELECT owner, name, color
      FROM Challenge
      WHERE challenge_id = ?
    `;
    connection.query(query, [challengeId], function(err, rows, fields) {
      if (err) {
        console.log(err);
        return res.send({status: 'fail'});
      } else {
        if (userId === rows[0].owner) {
          return res.send({status: 'success', name: rows[0].name});
        } else {
          return res.send({status: 'fail', message: 'not owner of challenge'});
        }
      }
    });
  }
}

// ------------------- GET IDEAS -----------------------------
function getIdeas(req, res) {
  var challengeId = parseInt(req.params.challengeid);

  var query = `
    WITH temp AS (
      SELECT i.idea_id, i.challenge, i.submit_time, u.email, i.status, u.user_id
      FROM Idea i JOIN User u ON i.creator = u.user_id
      WHERE i.challenge = ?
    )
    SELECT t1.*
    FROM temp t1 LEFT JOIN temp t2 ON t1.user_id = t2.user_id AND t1.submit_time < t2.submit_time
    WHERE t2.idea_id IS NULL
  `;
  connection.query(query, [challengeId], function(err, rows, fields) {
    if (err) {
      console.log(err);
      return res.send({status: 'fail'});
    } else {
      return res.send({status: 'success', ideas: rows});
    }
  });
}

// ------------------- GET IDEAS BY ID-----------------------------
function getSelectedIdeas(req, res) {
  var ids = req.body.ids;

  if (!ids) {
    return res.send({status: 'fail', message: 'no ids'});
  }

  var query = `
    SELECT i.idea_id, i.challenge, i.submit_time, u.email, i.status, i.content, i.is_group, i.team, i.about_you, i.interview, i.other_info
    FROM (SELECT * FROM Idea WHERE idea_id IN (?)) i JOIN User u ON i.creator = u.user_id
  `;
  connection.query(query, [ids], function(err, rows, fields) {
    if (err) {
      console.log(err);
      return res.send({status: 'fail'});
    } else {
      return res.send({status: 'success', ideas: rows});
    }
  });
}

// ------------------- GET PROPOSALS -----------------------------
function getProposals(req, res) {
  var challengeId = parseInt(req.params.challengeid);

  var query = `
    SELECT p.challenge, p.submit_time, u.email
    FROM Proposal p JOIN User u ON p.creator = u.user_id
    WHERE p.challenge = ?
  `;
  connection.query(query, [challengeId], function(err, rows, fields) {
    if (err) {
      console.log(err);
      return res.send({status: 'fail'});
    } else {
      return res.send({status: 'success', proposals: rows});
    }
  });
}

// ------------------ GET USER IDEAS ----------------------
function getUserIdeas(req, res) {
  if (!req.user) {
    return res.send({status: 'fail', message: 'not logged in'})
  }

  var userId = req.user.user_id;

  var query = `
    SELECT i.submit_time, c.name, i.idea_id, c.color, i.status
    FROM Idea i JOIN Challenge c ON i.challenge = c.challenge_id
    WHERE i.creator = ?
  `;
  connection.query(query, [userId], function(err, rows, fields) {
    if (err) {
      console.log(err);
      return res.send({status: 'fail'});
    } else {
      return res.send({status: 'success', ideas: rows});
    }
  });
}


// ----------- get number of ideas ------------------
function getNumIdeas(req, res) {
  if (!req.user) {
    return res.send({status: 'fail', message: 'not logged in'});
  }

  var userId = req.user.user_id;

  var query = `
    SELECT COUNT(*) AS count
    FROM Idea
    WHERE creator = ?
  `;
  connection.query(query, [userId], function(err, rows, fields) {
    if (err) {
      return res.send({status: 'fail'});
    } else {
      return res.send({status: 'success', numIdeas: rows[0].count});
    }
  })
}

// --------------------- get number of proposals ---------------------
function getNumProposals(req, res) {
  if (!req.user) {
    return res.send({status: 'fail', message: 'not logged in'});
  }

  var userId = req.user.user_id;

  var query = `
    SELECT COUNT(*) AS count
    FROM Proposal
    WHERE creator = ?
  `;
  connection.query(query, [userId], function(err, rows, fields) {
    if (err) {
      return res.send({status: 'fail'});
    } else {
      return res.send({status: 'success', numProposals: rows[0].count});
    }
  })
}

// ---------------------get idea details -------------------------------
function getIdeaDetails(req, res) {
  var ideaId = req.params.ideaid;

  var query = `
    SELECT *
    FROM (SELECT * FROM Idea WHERE idea_id = ?) i JOIN User u ON i.creator = u.user_id
  `;
  connection.query(query, [ideaId], function(err, rows, fields) {
    if (err) {
      return res.send({status: 'fail'});
    } else {
      return res.send({status: 'success', ideaDetails: rows[0]});
    }
  })
}

// ------------------ update idea status ---------------------
function updateIdeaStatus(req, res) {
  var id = req.body.id;
  var status = req.body.status;

  var query = `
    UPDATE Idea
    SET status = ?
    WHERE idea_id = ?
  `;

  connection.query(query, [status, id], function(err, rows, fields) {
    if (err) {
      console.log(err);
      return res.send({status: 'fail'})
    } else {
      return res.send({status: 'success'})
    }
  })
}

// --------------- get user info ------------------------------
function getUserInfo(req, res) {
  if (!req.user) {
    return res.send({status: 'fail', message: 'not logged in'});
  }

  var userId = req.user.user_id;

  var query = `
    SELECT *
    FROM User
    WHERE user_id = ?
  `

  connection.query(query, [userId], function(err, rows, fields) {
    if (err) {
      console.log(err);
      return res.send({status: 'fail'})
    } else {
      if (rows.length > 0) {
        return res.send({status: 'success', user: rows[0]})
      } else {
        return res.send({status: 'fail'})
      }
    }
  })
}

// --------------- update user info -------------------------
function updateProfile(req, res) {
  if (!req.user) {
    return res.send({status: 'fail', message: 'not logged in'});
  }

  var userId = req.user.user_id;
  var details = req.body.details;

  var query = `
    UPDATE User
    SET name = ?, phone = ?, title = ?, state = ?, city = ?, bio = ?, logged = ?, education = ?, interests = ?
    WHERE user_id = ?
  `

  connection.query(query, [details.fullName, details.phoneNumber, details.title, details.state, details.city, details.bio, true, details.education, details.interests, userId], function(err, rows, fields) {
    if (err) {
      console.log(err);
      return res.send({status: 'fail'})
    } else {
      return res.send({status: 'success'})
    }
  })
}

// ----------------- become solver ------------------------
function becomeSolver(req, res) {
  if (!req.user) {
    return res.send({status: 'fail', message: 'not logged in'});
  }

  var userId = req.user.user_id;
  var challengeId = req.body.challengeId;

  var query = `
    INSERT INTO Solving (solver, challenge)
    VALUES (?, ?);
  `

  connection.query(query, [userId, challengeId], function(err, rows, fields) {
    if (err) {
      return res.send({status: 'fail'})
    } else {
      return res.send({status: 'success'})
    }
  })
}

// ---------------- is user solver of challenge ------------
function isSolver(req, res) {
  if (!req.user) {
    return res.send({status: 'fail', loggedIn: false});
  }

  var userId = req.user.user_id;
  var challengeId = req.params.challengeid;

  var query = `
    SELECT *
    FROM Solving
    WHERE solver = ? AND challenge = ?
  `;

  connection.query(query, [userId, challengeId], function(err, rows, fields) {
    if (err) {
      return res.send({status: 'fail'})
    } else {
      if (rows[0]) {
        return res.send({status: 'success', isSolver: true, loggedIn: true})
      } else {
        return res.send({status: 'success', isSolver: false, loggedIn: true})
      }
    }
  })

}

// ---------------- get number of actively solving challenges --------
function getASC(req, res) {
  if (!req.user) {
    return res.send({status: 'fail', message: 'not logged in'});
  }

  var userId = req.user.user_id;

  var query = `
    SELECT c.name, c.color, c.challenge_id, c.start, c.end
    FROM (SELECT * FROM Solving WHERE solver = ?) s JOIN Challenge c ON s.challenge = c.challenge_id
  `;
  connection.query(query, [userId], function(err, rows, fields) {
    if (err) {
      return res.send({status: 'fail'});
    } else {
      return res.send({status: 'success', asc: rows, count: rows.length});
    }
  })
}



// The exported functions, which can be accessed in index.js.
module.exports = {
  getAllPeople: getAllPeople,
  getFriends: getFriends,
  saveToken: saveToken,
  checkToken: checkToken,
  updatePassword: updatePassword,
  saveRegisterToken: saveRegisterToken,
  checkRegisterToken: checkRegisterToken,
  createChallenge: createChallenge,
  getMyChallenges: getMyChallenges,
  getAllChallenges: getAllChallenges,
  getChallengeDetails: getChallengeDetails,
  createIdea: createIdea,
  createProposal: createProposal,
  isChallengeOwner: isChallengeOwner,
  getIdeas: getIdeas,
  getProposals: getProposals,
  getUserIdeas: getUserIdeas,
  getNumIdeas: getNumIdeas,
  getNumProposals: getNumProposals,
  getIdeaDetails: getIdeaDetails,
  updateIdeaStatus: updateIdeaStatus,
  getSelectedIdeas: getSelectedIdeas,
  getUserInfo: getUserInfo,
  updateProfile: updateProfile,
  becomeSolver: becomeSolver,
  isSolver: isSolver,
  getASC: getASC,
  editChallenge: editChallenge,
  isChallengeOwnerEdit: isChallengeOwnerEdit
}
