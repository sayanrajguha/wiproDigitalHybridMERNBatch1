var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var config = require('../config/config');
var Schema = mongoose.Schema;
var Comment = require('./comment');

var BlogSchema = new Schema({
  title : String,
  body : String,
  author : String,
  comments : [Comment],
  date : {
            type : Date,
            default : Date.now()
  },
  hidden : {
            type : Boolean,
            default : false
  },
  meta : {
            likes : Number,
            tags : [String],
            category : [String]
  },
  poster : {
            isURL : Boolean,
            path : String
  }
});
BlogSchema.plugin(mongoosePaginate);

var Blog = module.exports = mongoose.model('Blog',BlogSchema);

module.exports.createBlogPost = function(newBlogPost, callback) {
  newBlogPost.save(callback);
}

module.exports.getAllBlogPosts = function(page, callback) {
  Blog.paginate({hidden : false},{page : page, sort : {date : -1}, limit : config.pageLimit}, callback);
}

module.exports.getBlogsByUser = function(username, page, callback) {
  Blog.paginate({author : username},{page : page, sort : {date : -1}, limit : config.pageLimit}, callback);
}

module.exports.updateBlogPost = function(blogID,newBlogPost,callback) {
  Blog.findById(blogID, function(err,blog) {
    if(err) throw err;
    console.log('blog with id found');
    blog.title = newBlogPost.title;
    blog.body = newBlogPost.body;
    blog.author = newBlogPost.author;
    blog.comments = newBlogPost.comments;
    blog.date = newBlogPost.date;
    blog.hidden = newBlogPost.hidden;
    blog.meta = newBlogPost.meta;
    blog.poster = newBlogPost.poster;

    blog.save(callback);
  });
}

module.exports.deleteBlogPosts = function(postID,callback) {
  Blog.remove({ _id : postID },callback);
}

module.exports.getBlogById = function(blogID, callback) {
  Blog.findById(blogID, callback);
}
