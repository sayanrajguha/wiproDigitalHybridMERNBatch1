// var JWTStrategy = require('passport-jwt').Strategy;
// var ExtractJWT = require('passport-jwt').ExtractJwt;
// var User = require('../models/user');
// var config = require('./config');

// module.exports = function(passport) {
//   var opts = {};
//   opts.jwtFromRequest = ExtractJWT.fromAuthHeader();
//   opts.secretOrKey = config.secret;

//   passport.use(new JWTStrategy(opts, function(jwt_payload, done) {
//     User.findOne({username : jwt_payload._doc.username}, function(err, user) {
//       if(err) {
//         return done(err, false);
//       }
//       if(user) {
//         done(null,user);
//       } else {
//         done(null,false);
//       }
//     });
//   }));
// }
