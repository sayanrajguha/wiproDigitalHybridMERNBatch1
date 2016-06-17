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

router.route('/user/:username')

  .get(function(req,res) {  //get user profile
    console.log('Get route on /user/username for getting user invoked.');
    User.getUserByUsername(req.params.username, function(err,user) {
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
          message : 'User not found.',
          error : 'USER-DOES-NOT-EXIST'
        };

        res.json(response);
      } else {
        response = {
          statusCode : 200,
          user : user
        };
        res.json(response);
      }
    });
  })

  .post(function(req,res) {   //change user password
    console.log('Post route on /user/username for changing user password invoked.');
    User.getUserByUsername(req.params.username, function(err,user) {
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
          message : 'User not found.',
          error : 'USER-DOES-NOT-EXIST'
        };

        res.json(response);
      } else {
        User.comparePassword(req.body.oldPassword, user.password, function(err, isMatch) {
          if(err) {
            response = {
              statusCode : 500,
              message : 'Internal server error',
              error : err
            };
            res.json(response);
          } else if(!isMatch) {
            response = {
              statusCode : 400,
              message : 'Old Password incorrect',
              error : 'PASSWORD-MISMATCH'
            };
            res.json(response);
          } else {
            console.log('Old password matched. Proceeding with password change');
            User.changePassword(req.params.username, req.body.newPassword, function(err, user) {
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
                  message : 'User not found.',
                  error : 'USER-DOES-NOT-EXIST'
                };

                res.json(response);
              } else {
                response = {
                  statusCode : 200,
                  message : 'Password changed successfully'
                };
                res.json(response);
              }
            });
          }
        });
      }
    });
  })

  .put(function(req,res) {    //update user profile
    console.log('Put route on /user/username for updating user invoked.');
    var newUser = new User(req.body);
    User.updateUser(req.params.username, newUser, function(err,user) {
      if(err) {
        console.log(err);
        response = {
            statusCode : 500,
            message : 'Internal Server Error',
            error : err
        };
      } else {
        response = {
          statusCode : 200,
          message : 'User updated successfully'
        };
      }
      res.json(response);
    })
  })

  .delete(function(req,res) { //delete user profile
    console.log('Put route on /user/username for deleting user invoked.');
    User.deleteUser(req.params.username, function(err, user) {
      if(err) {
          response = {
            statusCode : 500,
            message : 'Fetching user failed',
            error : err
          };
          res.json(response);
      }
      else if(user.hasOwnProperty('result') && user.result.hasOwnProperty('n') && user.result.n == 0) {
        response = {
          statusCode : 400,
          message : 'User not found.',
          error : 'USER-DOES-NOT-EXIST'
        };
        res.json(response);
      } else {
        response = {
          statusCode : 200,
          message : 'User profile deleted successfully'
        };
        res.json(response);
      }
    });
  });

router.route('/login')
  .post(function(req,res) {
    console.log('post route on /api/users/login invoked.');
    User.getUserByUsername(req.body.username, function(err,user) {
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
              username : user.username,
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
      var username = req.body.username;
      var fName = req.body.firstName;
      var lName = req.body.lastName;
      var email = req.body.email;
      var dob = req.body.dob;
      // if(req.body.dob != undefined && req.body.dob != null && req.body.dob.trim() != '') {
      //     dob = new Date(req.body.dob);
      // }
      var contact = req.body.contact;
      var socialMeta = {
        fb : req.body.fb,
        twitter : req.body.twitter,
        linkedin : req.body.linkedin
      };
      var password1 = req.body.password;
      var password2 = req.body.confPassword;
      if(fName == undefined || fName == '' || email == undefined || email == '' || password1 == undefined || password1 == '') {
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
          username : username,
          firstName : fName,
          lastName : lName,
          email : email,
          password : password1,
          dob : dob,
          contact : contact,
          socialMeta : socialMeta
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
