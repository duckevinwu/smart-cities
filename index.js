const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

// passport config
require('./config/passport')(passport);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/* ---- (Dashboard) ---- */
// The route localhost:8081/people is registered to the function
// routes.getAllPeople, specified in routes.js.
app.get('/people', routes.getAllPeople);

/* ---- Part 2 (FindFriends) ---- */
// TODO: (2) - Add route '/friends/:login' for the functionality of FindFriends page
app.get('/friends/:login', routes.getFriends); // Hint: Replace () => {} with the appropriate route handler in routes.js.

// Register

/* ----------- email confirmation registration ----------------*/
app.post('/register', routes.saveRegisterToken);
app.get('/activate/:email/:token', routes.checkRegisterToken);

/* ----------- no email confirmation registration -------------*/
/*
app.post('/register', function(req, res, next) {
  passport.authenticate('local-register', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.status(401).send({ message: info.message} );
    }
    req.login(user, function(err){
      if(err){
        return next(err);
      }
      return res.status(200).send({ success : true, message : 'authentication succeeded' });
    });
  })(req, res, next);
});
*/

// Login
app.post('/api/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send({message: info.message});
    }
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.status(200).send({message: 'authentication suceeded'});
    });
  }) (req, res, next);
});

// Logout
app.get('/logout', function(req, res) {
  req.logout();
  return res.status(200).send();
});

// check if user is authenticated
app.get('/auth/isAuthenticated', function(req, res) {
  if (req.isAuthenticated()) {
    return res.status(200).send({ authenticated: 'true', userId: req.user.user_id});
  }
  return res.status(401).send({ authenticated: 'false'})
});

// check if user is an admin
app.get('/auth/isAdmin', function(req, res) {
  if (req.isAuthenticated()) {
    // if admin flag is true
    if (req.user.admin === 1) {
      return res.send({authenticated: 'true'});
    }
  }
  return res.send({authenticated: 'false'});
});

// check if user is correct one in query
app.get('/auth/isCorrectUser/:id', function(req, res) {

  var urlId = parseInt(req.params.id);

  if (req.isAuthenticated()) {
    // if url id is equal to the logged in user's id
    if (req.user.user_id === urlId) {
      return res.send({authenticated: 'true'});
    }
  }
  return res.send({authenticated: 'false'});
});

// navbar authentication
app.get('/auth/navbarAuthentication', function(req, res) {
  if (req.isAuthenticated()) {
    // if admin flag is true
    if (req.user.admin === 1) {
      return res.send({authenticated: true, admin: true});
    } else {
      return res.send({authenticated: true, admin: false});
    }
  }
  return res.send({authenticated: false});
});

//---------------------FORGOT PASSWORD--------------------
app.post('/forgotpassword', routes.saveToken);
app.get('/reset/:email/:token', routes.checkToken);
app.post('/reset', routes.updatePassword);

//--------------------CREATE CHALLENGE--------------------
app.post('/api/createchallenge', routes.createChallenge);

// -----------------GET CREATED CHALLENGES ---------------
app.get('/api/mychallenges', routes.getMyChallenges);

// ----------------- GET ALL CHALLENGES ------------------
app.get('/api/allchallenges', routes.getAllChallenges);

// ----------------- GET CHALLENGE DETAILS ---------------
app.get('/api/challengedetails/:id', routes.getChallengeDetails);

// ------------------ CREATE IDEA -------------------------
app.post('/api/createidea', routes.createIdea);

// ------------------ CREATE PROPOSAL ---------------------
app.post('/api/createproposal', routes.createProposal);

// ------------------ CHECK CHALLENGE OWNER ---------------
app.get('/api/challengeowner/:challenge_id', routes.isChallengeOwner);

// ------------------ GET IDEAS --------------------------
app.get('/api/ideas/:challengeid', routes.getIdeas);

// ------------------ GET PROPOSALS --------------------------
app.get('/api/proposals/:challengeid', routes.getProposals);

// ------------------ GET USER IDEAS --------------------------
app.get('/api/userideas', routes.getUserIdeas);

// ------------------ GET NUMBER OF IDEAS ---------------------
app.get('/api/numideas', routes.getNumIdeas);

// ------------------ GET NUMBER OF PROPOSALS -----------------
app.get('/api/numproposals', routes.getNumProposals);

// ------------------ GET IDEA DETAILS -------------------------
app.get('/api/ideadetails/:ideaid', routes.getIdeaDetails);

// ------------------ UPDATE IDEA STATUS -----------------------
app.post('/api/updateidea', routes.updateIdeaStatus);

// ----------------- GET SELECTED IDEAS ------------------------
app.post('/api/selectedideas', routes.getSelectedIdeas);

// Connects React app with Express server in production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


// set port
const port = process.env.PORT || 8081;
app.listen(port);

console.log(`Listening on ${port}`);
