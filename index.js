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
