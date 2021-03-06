var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var routes = require('./routes/router');


var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Express validator
app.use(expressValidator({
  errorFormatter:function(param,msg,value){
      var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;
    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    } 
    return{
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

//Global vars
app.use(function(req,res,next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Passpot init
app.use(passport.initialize());
app.use(passport.session());

//set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


app.use('/',routes);
app.get('/', function(req, res){
  res.render('./index');
});





// // passport config
// var Account = require('./models/useraccount');
// passport.use(new LocalStrategy(Account.authenticate()));
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost/airline_reservation_system', (err) => {
  if(!err){
    console.log('MongoDB connection succeeded.');
  }else{
    console.log('Error in DB Connection : ' + JSON.stringify(err, undefined, 2));
  }
});



// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log('Server started on port '+app.get('port'));
});


 
/* Custom Usage ends here */

module.exports = app;

  