var express = require('express');
var fs = require('fs');
var Blog = require('../../../models/blog');
var config = require('../../../config/config');
var passport = require('passport');
var router = express.Router();
var response = {};

router.use(function(req,res,next) {
  response = {};
  next();
});

router.route('/getAll').get(function(req,res) { // get latest blogs from all users
  Blog.getAllBlogPosts(1, function(err,result) {
    if(err) {
      console.log(err);
      response = {
          statusCode : 500,
          message : 'Internal Server Error',
          error : err
      };
    } else {
      response = result;
    }
    res.json(response);
  });
});

router.route('/')

  .get(passport.authenticate('jwt', {session : false}), function(req,res) { //returns blogs created by the particular user
    Blog.getBlogsByUser(req.user.username, 1, function(err, result) {
      if(err) {
        console.log(err);
        response = {
            statusCode : 500,
            message : 'Internal Server Error',
            error : err
        };
      } else {
        response = result;
      }
      // console.log('Docs : '+result.docs);
      // console.log('Total : '+result.total);
      // console.log('Limit : '+result.limit);
      // console.log('Page : '+result.page);
      // console.log('Pages : '+result.pages);
      res.json(response);
    });
  })

  .post(passport.authenticate('jwt', {session : false}), function(req,res) { //creates a blog for a particular user
    console.log('Creating blog for username : ' + req.user.username);
    var newBlog = new Blog({
      title : req.body.title,
      body : req.body.body,
      author : req.user.username,
      comments : [],
      date : Date.now(),
      // date : new Date(req.body.date),
      hidden : req.body.hidden,
      meta : {
        likes : 0,
        tags : req.body.tags.split(','),
        category : req.body.category.split(',')
      },
      poster : {
        isURL : true,
        path : req.body.posterPath
      }
    });
    Blog.createBlogPost(newBlog, function(err) {
      if(err) {
        console.log(err);
        response = {
          statusCode : 500,
          message : 'Error creating blog',
          error : err
        };
      } else {
        response = {
          statusCode : 200,
          message : 'Blog created successfully'
        }
      }

      res.json(response);
    });

  });

router.route('/action/:blogID')

  .get(function(req,res) {    //Like - Unlike blog post
    Blog.findById(req.params.blogID, function(err,blog) {
      if(err) {
        console.log(err);
        response = {
            statusCode : 500,
            message : 'Internal Server Error',
            error : err
        };
      } else if(blog && blog.hidden == false) {
        response = blog;
      } else if(blog == null || blog.hidden == true) {
        response = {
          statusCode : 400,
          message : 'Blog not found.',
          error : 'BLOG-DOES-NOT-EXIST'
        };
      }
      res.json(response);
    });
  })

  .post(passport.authenticate('jwt', {session : false}), function(req,res) {   // user's Comment on the blog
    Blog.findById(req.params.blogID, function(err,blog) {
      if(err) {
        console.log(err);
        response = {
            statusCode : 500,
            message : 'Internal Server Error',
            error : err
        };
        res.json(response);
      } else {
        var comment = {
          body : req.body.commentBody,
          author : req.user.username,
          date : Date.now()
        };
        blog.comments.push(comment);
        Blog.updateBlogPost(req.params.blogID, blog, function(err, blog) {
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
              message : 'Comment added successfully'
            }
          }
          res.json(response);
        });
      }
    });
  })

  .put(passport.authenticate('jwt', {session : false}), function(req,res) {    //update user's own blog post
    Blog.findById(req.params.blogID, function(err,blog) {
      if(err) {
        console.log(err);
        response = {
            statusCode : 500,
            message : 'Internal Server Error',
            error : err
        };
        res.json(response);
      } else if(blog.author == req.user.username) {
        blog.title = req.body.title;
        blog.body = req.body.body;
        blog.hidden = req.body.hidden;
        blog.meta.tags = req.body.tags.split(',');
        blog.meta.category = req.body.category.split(',');
        blog.poster.posterPath = req.body.posterPath;
        Blog.updateBlogPost(req.params.blogID, blog, function(err, blog) {
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
              message : 'Blog updated successfully'
            }
          }
          res.json(response);
        });
      } else {
        res.status(401).send('Unauthorized');
      }
    });
  })

  .delete(passport.authenticate('jwt', {session : false}), function(req,res) { // delete user's own blog post
  Blog.findById(req.params.blogID, function(err,blog) {
    if(err) {
      console.log(err);
      response = {
          statusCode : 500,
          message : 'Internal Server Error',
          error : err
      };
      res.json(response);
    } else if(blog.author == req.user.username) {
      Blog.deleteBlogPosts(req.params.blogID, function(err,blog) {
          if(err) {
            console.log(err);
            response = {
                statusCode : 500,
                message : 'Internal Server Error',
                error : err
            };
          } else {
            console.log('delete successful');
            response = {
                statusCode : 200,
                message : 'Blog deleted successfully'
            };
          }
          res.json(response);
        });

    } else {
      res.status(401).send('Unauthorized');
    }
  });
  })



module.exports = router;
