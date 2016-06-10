var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var config = require('../config');
var Schema = mongoose.Schema;


var MovieSchema = new Schema({
  Poster: String,
  Title: String,
  Year: Number,
  Language: String,
  Genre: String,
  Director: String,
  Writer:  String,
  Actors: String,
  Plot: String,
  Released: String,
  Runtime: String,
  imdbRating: {
    type : Number,
    min : 0,
    max : 10
  },
  Awards: String
});
MovieSchema.plugin(mongoosePaginate);

var Movie = module.exports = mongoose.model('Movie',MovieSchema);

module.exports.createMovie = function(newMovie, callback) {
  newMovie.save(callback);
}

module.exports.getAllMovies = function(callback) {
  Movie.paginate({},{page : 1, limit : config.defaultPageLimit}, callback);
}

module.exports.updateMovie = function(movieID,newMovie,callback) {
  Movie.findById(movieID, function(err,movie) {
    if(err) throw err;
    console.log('movie with id found');

    movie.Poster = newMovie.Poster;
    movie.Title = newMovie.Title;
    movie.Year = newMovie.Year;
    movie.Language = newMovie.Language;
    movie.Genre = newMovie.Genre;
    movie.Director = newMovie.Director;
    movie.Writer = newMovie.Writer;
    movie.Actors = newMovie.Actors;
    movie.Plot = newMovie.Plot;
    movie.Released = newMovie.Released;
    movie.Runtime = newMovie.Runtime;
    movie.imdbRating = newMovie.imdbRating;
    movie.Awards = newMovie.Awards;

    movie.save(callback);
  });
}

module.exports.deleteMovie = function(movieIDs,callback) {
  Movie.remove({ _id: { $in: movieIDs } },callback);
}

module.exports.getMovieById = function(movieID, callback) {
  Movie.findById(movieID, callback);
}

module.exports.findMovieFromIMDB = function() {

}
