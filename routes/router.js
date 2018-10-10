var express = require('express');
var router = express.Router();
var User = require('../models/useraccount.js');


router.get('/adminLogin', function (req, res, next) {
    res.render('user/adminLogin');
  });
router.get('/userLogin', function (req, res, next) {
    res.render('user/userLogin');
  });


router.get('/layout', function (req, res, next) {
  res.render('layout');
});

router.get('/contact', function (req, res, next) {
  res.render('contact');
});

router.get('/about', function (req, res, next) {
  res.render('about');
});




router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err)
    if (!user) {
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.redirect('/');
    });
  })(req, res, next);
});


router.get('/register', function (req, res, next) {
    res.render('user/register');
  });

router.post('/register', function(req, res) {
  var user = new User({
      name: req.body.username,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
  console.log(req.body.username);
  console.log(req.body.email);
  user.save(function(err) {
    req.logIn(user, function(err) {
      console.log(user)
      res.redirect('#');
    });
  });
});


// router.get('/forgot', function(req, res) {
//   res.render('user/forgot', {
//     user: req.user
//   });
// });


// router.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });


module.exports ='router';
