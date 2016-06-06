var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
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

module.exports = mongoose.model('Movie',MovieSchema);
