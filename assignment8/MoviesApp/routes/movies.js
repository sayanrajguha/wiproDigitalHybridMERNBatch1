var express = require('express');
var fs = require('fs');
var Movie = require('../models/movie');
var config = require('../config');
var router = express.Router();
var response = {};
var imagePath = process.env.PWD + '/public/images-poster/';

router.use(function(req,res,next) {
  console.log('Middleware router called. Resetting response value');
  response = {};
  next();
});

/************* GET ALL RECORDS ***********/
router.get('/', function(req,res) {
  console.log('/movies get route called. Fetching all records..');
  // Movie.find(function(err,movies) {
  //   if(err) {
  //     console.log('Error occurred : ' + err);
  //     response.statusCode = '500';
  //     response.message = 'ERROR : '+err;
  //     res.json(response);
  //   }
  //   console.log('succesfully fetched all records');
  //   response.statusCode = '200';
  //   response.message='SUCCESS';
  //   response.movies = movies;
  //   res.json(response);
  // });
  Movie.paginate({},{page : 1, limit : config.defaultPageLimit}, function(err,result) {
    // console.log('Docs : '+result.docs);
    // console.log('Total : '+result.total);
    // console.log('Limit : '+result.limit);
    // console.log('Page : '+result.page);
    // console.log('Pages : '+result.pages);
    if(err) {
        console.log('Error occurred : ' + err);
        response.statusCode = '500';
        response.message = 'ERROR : '+err;
        res.json(response);
      }
      console.log('succesfully fetched all records');
      response.statusCode = '200';
      response.message='SUCCESS';
      response.movies = result.docs;
      response.totalRecords = result.total;
      response.currentPage = result.page
      res.json(response);
  });
});

/************* GET ALL RECORDS WITH PAGINATION ***********/
router.get('/page/:pageNo', function(req,res) {
  console.log('/movies get-pagination route called. Fetching all records for page number : '+req.params.pageNo);

  Movie.paginate({},{page : req.params.pageNo, limit : config.pageLimit}, function(err,result) {
    if(err) {
        console.log('Error occurred : ' + err);
        response.statusCode = '500';
        response.message = 'ERROR : '+err;
        res.json(response);
      }
      console.log('succesfully fetched records');
      response.statusCode = '200';
      response.message='SUCCESS';
      response.movies = result.docs;
      response.totalRecords = result.total;
      response.recordsPerPage = result.limit;
      response.currentPage = result.page;
      response.numberOfPages = result.pages;
      res.json(response);
  });
});

/*********** GET 1 RECORD **************/
router.get('/:movieID',function(req,res) {
  console.log('/:movieID get route called. Fetchind record with ID : ' + req.params.movieID);
  Movie.findById(req.params.movieID, function(err,movie) {
    if(err) {
      console.log('Error occurred : ' + err);
      response.statusCode = '500';
      response.message = 'ERROR : '+err;
      res.json(response);
    }
    console.log('succesfully fetched record');
    response.statusCode = '200';
    response.message='SUCCESS';
    response.movie = movie;
    res.json(response);
  });
});

/*********** CREATE RECORD **************/
router.post('/',function(req,res) {
  console.log('/movies post route called. Add movie processing start...');
  var movie = new Movie(req.body);
  movie.save(function(err,movie) {
    if(err) {
      console.log('Error occurred : ' + err);
      response.statusCode = '500';
      response.message = 'ERROR : '+err;
      res.json(response);
    }
    console.log('succesfully inserted new record');
    response.statusCode = '200';
    response.message='SUCCESS';
    response._id = movie._id;
    res.json(response);
  });
});

/*********** UPDATE RECORD **************/
router.put('/:movieID',function(req,res) {
  var flag = false;
  var posterPath = '';
  console.log('/:movieID put route called. Updating record with ID : '+req.params.movieID);
  Movie.findById(req.params.movieID, function(err,movie) {
    if(err) {
      console.log('ERROR : ' + err);
      response.statusCode = '500';
      response.message = 'Error occurred : '+err;
      res.json(response);
    }
    console.log('movie with id found');
    if(movie.Poster != '' && movie.Poster !== req.body.Poster) {
      console.log('poster changed');
      flag = true;
      posterPath = imagePath + movie.Poster;
    } else {
      flag = false;
    }
    movie.Poster = req.body.Poster;
    movie.Title = req.body.Title;
    movie.Year = req.body.Year;
    movie.Language = req.body.Language;
    movie.Genre = req.body.Genre;
    movie.Director = req.body.Director;
    movie.Writer = req.body.Writer;
    movie.Actors = req.body.Actors;
    movie.Plot = req.body.Plot;
    movie.Released = req.body.Released;
    movie.Runtime = req.body.Runtime;
    movie.imdbRating = req.body.imdbRating;
    movie.Awards = req.body.Awards;

    movie.save(function(err,movie) {
      if(err) {
        console.log('Error occurred : ' + err);
        response.statusCode = '500';
        response.message = 'ERROR : '+err;
        res.json(response);
      }
      console.log('succesfully updated record');

      if(flag == true && fs.existsSync(posterPath)) {
        console.log(posterPath + '  File exists. Removing...');
        fs.unlinkSync(posterPath);
      }
      response.statusCode = '200';
      response.message='SUCCESS';
      response._id = movie._id;
      res.json(response);
    });
  });
});

/*********** DELETE RECORD **************/
router.delete('/:movieID',function(req,res) {
  console.log('/movies delete route called. Processing delete movie with ID : ' + req.params.movieID);
  Movie.findOneAndRemove({
    _id : req.params.movieID
  }, function(err, movie) {
      if(err) {
        console.log('Error occurred : ' + err);
        response.statusCode = '500';
        response.message = 'ERROR : '+err;
        res.json(response);
      }
      console.log('succesfully deleted record');
      response.statusCode = '200';
      response.message='SUCCESS';
      // console.log(movie);
      var posterPath = imagePath + movie.Poster
      console.log(posterPath);
      //remove poster image
      if(fs.existsSync(imagePath + movie.Poster)) {
        console.log((imagePath + movie.Poster) + '  File exists. Removing...');
        fs.unlinkSync(imagePath + movie.Poster);
      }
      res.json(response);
  });
});

module.exports = router;
