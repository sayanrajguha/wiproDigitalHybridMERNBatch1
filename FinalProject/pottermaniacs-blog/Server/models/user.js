var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var bcrypt = require('bcryptjs');
var config = require('../config/config');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email : {
    type : String,
    required : true,
    unique : true
  },
  firstName : {
    type : String,
    required : true
  },
  lastName : {
    type : String
  },
  password : {
    type : String,
    required : true
  }
});

var User = module.exports = mongoose.model('User',UserSchema);

module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    if(err) callback(error,null);
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      if(err) callback(error,null);
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}
module.exports.getUserByEmail = function(email, callback) {
  var query = {email : email};
  User.findOne(query,callback);
}
module.exports.comparePassword = function(userPassword, hash, callback) {
  bcrypt.compare(userPassword, hash, function(err, isMatch) {
    if(err) callback(err,false);
    callback(null,isMatch);
  })
}
