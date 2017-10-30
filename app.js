const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const pug = require('pug');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const validator = require('express-validator');
const flash = require('connect-flash');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const async = require('async');
const path = require('path');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/week8', { useMongoClient: true });
const db = mongoose.connection;

//mongo error
db.on('error', console.error.bind(console,'connection error:'));

//config
require('./config/passport');

//view engin using pug
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// MIDDLEWERE
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(flash());
app.use(validator());
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  secret: "Thisismytestkey",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: db})
}));

// ROUTES
require('./routes/front')(app);
require('./routes/user')(app, passport);
require('./routes/insert')(app, path);
require('./routes/home')(app);
require('./routes/clients')(app, path, async);
require('./routes/images')(app, path, async);


// error handler
app.use(function(req, res, next) {
  const err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen('8080', function(){
  console.log('listening on port 8080...');
})
