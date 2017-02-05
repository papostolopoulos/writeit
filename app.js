var express = require('express'); //Framework for organizing the web application in a MVC architecture on the server size. In this program we use Handlevars for templating
var path = require('path'); //The path module provides utilities for working with file and directory paths.
var favicon = require('serve-favicon');
var logger = require('morgan'); //logger
var cookieParser = require('cookie-parser'); //Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
var bodyParser = require('body-parser'); //extracts the body portion of an incomint request stream and exposes it on req.body (easier to read and interface with)
var expressSession = require('express-session'); //This module helps us create a work session for the user
var methodOverride = require('method-override'); //This module allows us to override the form methods from GET to PUT and DELETE

var index = require('./routes/index');
var users = require('./routes/users');
var articles = require('./routes/articles');
var newarticle = require('./routes/newarticle')
var useraccount = require('./routes/useraccount');
var accountexists = require('./routes/accountexists');
var userpostings = require('./routes/userpostings');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var hbs = require("hbs");
hbs.registerHelper("select", function(selected, options) {
  return options.fn(this).replace(new RegExp('value=\"' + selected + '\"'), '$& selected = "selected"');
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); //logger
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); //sets the request cookies variable
app.use(expressSession({
  secret: 'there can be only one',
  saveUninitialized: true, //Saving the session to a permanent storage like a database. That allows persistent login even when the server goes down. Sp when the server comes back up, the users are still logged in.
  resave: true//Even if nothing changed, go ahead and save it again (when true)
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/', index);
app.use('/users', users);
app.use('/articles', articles);
app.use('/newarticle', newarticle);
app.use('/useraccount', useraccount);
app.use('/accountexists', accountexists);
app.use('/userpostings', userpostings);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
