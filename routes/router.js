var express = require('express');
var router = express.Router();
var User = require('../models/useraccount');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');


router.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));


router.get('/adminLogin', function (req, res, next) {
    res.render('user/adminLogin');
  });



router.get('/layout', function (req, res, next) {
  res.render('layout');
});

router.get('/layout_booking', function (req, res, next) {
  res.render('layout_booking');
});

router.get('/contact', function (req, res, next) {
  res.render('contact');
});

router.get('/about', function (req, res, next) {
  res.render('about');
});

// User Login form
router.get('/userLogin', function (req, res) {
  res.render('user/userLogin', { 
    user: req.user
    
  });
});

router.post('/userLogin',
  passport.authenticate('local', { successRedirect: '/booking',failureRedirect: '/userLogin',
  // function(req,res){
  //   res.redirect('/booking')
  // }
})
);

router.get('/booking', function(req, res, next) {
  if(req.user){
    res.render('booking', { user : req.user });
  }else{
    res.redirect('/userLogin');
  }
});

router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
  req.logout();
});



// Register Form
router.get('/register', function (req, res) {
    res.render('user/register');
  });

router.post('/register',function(req,res){
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2
  // Validation
   req.checkBody('name','Name is required').notEmpty();
   req.checkBody('email','Email is required').notEmpty();
   req.checkBody('email','Email is required').isEmail();
   req.checkBody('username','Username is required').notEmpty();
   req.checkBody('password','Password is required').notEmpty();
   req.checkBody('password2','Passwords do not match').equals(req.body.password);
   var errors = req.validationErrors();
   if(errors){
     res.render('user/register', {
       errors:errors
     });
    } else {
      var newUser = new User({
        name: name,
        email: email,
        username: username,
        password: password

      });
      User.createUser(newUser,function(err,user){
        if(err) throw err;
        console.log(user);

      });
      req.flash('success_msg', "You are registered and can now login");
      res.redirect('./userLogin');

    }

});



passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username,function(err,user){
      if(err) throw err;
      if(!user){
        return done(null,false,{message: 'Unknown User'});
      }
      User.comparePassword(password,user.password,function(err,isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null,user);

        } else {
          return done(null,false, {message: 'Invalid password'});
        }
      });

    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});








module.exports = router;
