var express = require('express');
var User = require('../../../models/user');
var config = require('../../../config/config');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var router = express.Router();
var response = {};

router.use(function(req,res,next) {
  response = {};
  next();
});



router.route('/dashboard')
  .get(passport.authenticate('jwt', {session : false}), function(req,res) {
    console.log('get route on /api/users/dashboard invoked');
    res.send(req.user._id + ' is logged in...');
  });

router.route('/login')
  .post(function(req,res) {
    console.log('post route on /api/users/login invoked.');
    User.getUserByEmail(req.body.email, function(err,user) {
      if(err) {
          response = {
            statusCode : 500,
            message : 'Fetching user failed',
            error : err
          };

          res.json(response);
      }
      else if(!user) {
        response = {
          statusCode : 400,
          message : 'Login failed. User not found.',
          error : 'USER-DOES-NOT-EXIST'
        };

        res.json(response);
      } else {
        User.comparePassword(req.body.password, user.password, function(err, isMatch) {
          if(isMatch && !err) {
            var token = jwt.sign(user, config.secret, {
              expiresIn : 86400 //in seconds
            });
            response = {
              statusCode : 200,
              message : 'Authentication successful',
              user : user.email,
              token : 'JWT ' + token
            };
          } else {
            response = {
              statusCode : 400,
              message : 'Authentication failed. Password does not match.',
              error : 'AUTH-FAIL'
            };
          }

          res.json(response);
        });
      }
    });
  });

router.route('/register')

    .post(function(req,res) {
      console.log('Post route on /api/users/register invoked');
      var fName = req.body.firstName;
      var lName = req.body.lastName;
      var email = req.body.email;
      var password1 = req.body.password;
      var password2 = req.body.confPassword;
      if(fName == undefined || fName == '' || lName == undefined || lName == ''
      || email == undefined || email == '' || password1 == undefined || password1 == '') {
        response = {
          statusCode : 400,
          message : 'Insufficient Information',
          error : 'INCOMPLETE-DATA'
        };

        res.json(response);
      } else if(password1 !== password2) {
        response = {
          statusCode : 400,
          message : 'Passwords do not match',
          error : 'PASSWORD-MISMATCH'
        };

        res.json(response);
      } else {
        var newUser = new User({
          firstName : fName,
          lastName : lName,
          email : email,
          password : password1
        });
        User.createUser(newUser, function(err) {
          if(err) {
            response = {
              statusCode : 400,
              message : 'User exists. Registration failed.',
              error : 'USER-ALREADY-EXISTS'
            };
          } else {
            response = {
              statusCode : 200,
              message : 'Registration successful'
            }
          }

          res.json(response);
        });
      }
    });


module.exports = router;
