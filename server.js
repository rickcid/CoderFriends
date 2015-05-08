var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var GitHubApi = require('github');
var dotenv  = require('dotenv').load();


//--APP DEFINITION--//
var app = express();

//--GITHUB API INSTANCE--//
var github = new GitHubApi({
  version: "3.0.0"
});

//--BODY PARSER MIDDLEWARE---//
app.use(bodyParser.json());

//--SESSION MIDDLEWARE--//
app.use(session({
  secret: 'f85499!03kljljljgjhjgjg56h@^jh12',
  saveUninitialized: false,
  resave: true
}));

//--STATIC FOLDER MIDDLEWARE--//
app.use(express.static(__dirname+'/public'));

//--PASSPORT INITIALIZATION--//
app.use(passport.initialize());
app.use(passport.session());

//--GITHUB AUTHORIZATION--//
var requireAuth = function(req, res, next) {
  //console.log("is Authed?", req.user);
  if (!req.isAuthenticated()) {
    return res.status(403).end(); //or res.redirect('/'); ,takes to login
  }
  return next();
};

//--PASSPORT SERIALIZATION--//
passport.serializeUser(function(user, done) {
  done(null, user)
})
passport.deserializeUser(function(obj, done) {
  done(null, obj)
})


//--GITHUB STRATEGY--// !!(ask about difference in variables passed from solution)
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID, 
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:9999/auth/github/callback"
  },
  function(token, tokenSecret, profile, done) {
    return done(null, profile);
  }
));



//---ENDPOINTS---//

//--Github Authorization route--//
app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', passport.authenticate('github', {
  successRedirect: '/#/home',
  failureRedirect: '/'
}));

//--Get Profile--//
app.get('/api/github/following', requireAuth, function(req, res) {
  github.user.getFollowingFromUser({
    user: req.user.username
  }, function(err, response) {
    //console.log(JSON.stringify(response));
    res.json(response)
  })
})

//--Get Friend Activity--//
app.get('/api/github/:username/activity', requireAuth, function(req, res) {
  github.events.getFromUser({
    user: req.params.username
  }, function(err,response) {
    console.log('UserName Events from Server:', response);
    res.json(response)
  })
})


//---CONNECTIONS----//
var port = 9999;

app.listen(port, function() {
  console.log('Listening on port: ', port);
});

