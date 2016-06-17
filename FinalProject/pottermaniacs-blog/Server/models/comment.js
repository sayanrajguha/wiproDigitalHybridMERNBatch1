var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
  body : String,
  author : String,
  date : Date
});
module.exports = Comment;
