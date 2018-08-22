var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
// chat page
router.get('/chat', function(req, res, next) {
  if(req.user){
    res.render('common/chat', { title: 'CHatApp' });
  }else{
    res.redirect('/login');
  }
});

router.get('/login', function (req, res, next) {
    res.render('user/login');
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
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
  console.log(req.body.username);
  console.log(req.body.email);
  user.save(function(err) {
    req.logIn(user, function(err) {
      console.log(user)
      res.redirect('/');
    });
  });
});


router.get('/forgot', function(req, res) {
  res.render('user/forgot', {
    user: req.user
  });
});


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


// passport.use(new LocalStrategy(function(username, password, done) {
//   User.findOne({ username: username }, function(err, user) {
//     if (err) return done(err);
//     if (!user) return done(null, false, { message: 'Incorrect username.' });
//     user.comparePassword(password, function(err, isMatch) {
//       if (isMatch) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//     });
//   });
// }));

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });


// UserSchema.pre('save', function(next) {
//   var user = this;
//   var SALT_FACTOR = 5;

//   if (!user.isModified('password')) return next();

//   bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
//     if (err) return next(err);

//     bcrypt.hash(user.password, salt, null, function(err, hash) {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
// });

// UserSchema.methods.comparePassword = function(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };



  module.exports = router;