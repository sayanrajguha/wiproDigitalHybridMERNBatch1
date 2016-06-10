var express = require('express');
var imdbObj = require('node-movie');
var omdb = require('omdb');
var fs = require('fs');
var Movie = require('../../../models/movie');
var config = require('../../../config');
var router = express.Router();
var response = {};

router.use(function(req,res,next) {
  response = {};
  next();
});

router.route('/')

  .get(function(req,res) {      // get all movies
    Movie.getAllMovies(function(err,result) {
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
    })
  })

  .post(function(req,res) {
    var obj = req.body;     // add a movie
    if(obj._id == 0){
      delete obj._id;
    }
    var newMovie = new Movie(obj);
    Movie.createMovie(newMovie, function(err, movie) {
      if(err) {
        console.log(err);
        response = {
            statusCode : 500,
            message : 'Internal Server Error',
            error : err
        };
      } else {
          response = movie;
      }
      res.json(response);
    })
  })

  .delete(function(req,res) { //delete movie with id
    console.log(req.query.movieID);

    var listOfIDs = [];
    if(req.query.movieID instanceof Array) {
      listOfIDs = req.query.movieID;
    } else {
      listOfIDs.push(req.query.movieID);
    }
    Movie.deleteMovie(listOfIDs, function(err,movie) {
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
              message : 'SUCCESS'
          };
        }
        res.json(response);
      });
  });

router.route('/:movieID')

  .get(function(req,res) {  // Get movie with id
    Movie.getMovieById(req.params.movieID, function(err,movie) {
      if(err) {
        console.log(err);
        response = {
            statusCode : 500,
            message : 'Internal Server Error',
            error : err
        };
      } else {
        response = movie;
      }
      res.json(response);
    });
  })

  .put(function(req,res) {  //update movie with id
    console.log('Inside updateWithID PUT');
    var newMovie = new Movie(req.body);
    Movie.updateMovie(req.params.movieID, newMovie, function(err, movie) {
      if(err) {
        console.log(err);
        response = {
            statusCode : 500,
            message : 'Internal Server Error',
            error : err
        };
      } else {
        response = movie;
      }
      res.json(response);
    });
  })

router.route('/imdb/:Title')

  .get(function(req,res) {
    console.log('Inside get route of IMDB Fecth... Title : ' + req.params.Title);
    omdb.search(req.params.Title, function(err,movies) {
      if(err) {
        console.log(err);
        response = {
            statusCode : 500,
            message : 'Internal Server Error',
            error : err
        };
      } else {
          var resultList = [];
          if(movies == undefined || movies == null) {
            resultList = [];
          }
          else {
            if(movies.length > 10) {
              movies = movies.splice(0,10);
            }
            movies.forEach(function(movie) {
              resultList.push(movie.title);
            });
          }
          response = {
            list : resultList
          }
          res.json(response);
        }
    });
  })

  .post(function(req,res) {
    imdbObj(req.params.Title, function (err, data) {
      if(err) {
        console.log(err);
        response = {
            statusCode : 500,
            message : 'Internal Server Error',
            error : err
        };
      } else {
          response = data;
      }
      res.json(response);
    });
  });

module.exports = router;
