var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var index = require('./api/routes/index/index');
var movies = require('./api/routes/movies/movies');
var users = require('./api/routes/users/users');
var config = require('./config/config');
var app = express();

var port = process.env.PORT || 8080,
publicDir = '../Client/dist',
fs = require('fs');
// view engine setup
app.set('views', publicDir);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(publicDir + '/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(publicDir));

app.use(passport.initialize());

mongoose.connect(config.mongoDbUrl);

require('./config/passport')(passport);

app.use('/', index);
// app.use('/api/movies', movies);
app.use('/api/users', users);


// app.post('/uploadImage', function(req,res) {
//   console.log('Upload route called...');
//   var multiparty = require('multiparty');
//   var form = new multiparty.Form();
//
//   form.parse(req, function(err,fields,files) {
//     console.log('Parsing...');
//     var img = files.images[0];
//     console.log('Reading file... : '+img.originalFilename);
//     fs.readFile(img.path, function(err,data) {
//       console.log('Read file...');
//       var generatedName = generateName(img.originalFilename);
//       console.log('Generated Name : ' + generatedName);
//       var path = publicDir + '/images-poster/'+generatedName;
//       console.log('Writing file...');
//       fs.writeFile(path,data, function(error) {
//         if(error) {
//           console.log(error);
//           res.send('error');
//         }
//         console.log('File Write Completed!');
//         res.send(generatedName);
//       })
//
//     });
//
//   });
//
// });

app.use(function(request,response) {
  var data = '<h3>404 - Not Found</h3>';
  response.writeHead(404,{'Content-Type' : 'text/html'});
  response.end(data);
});

var server = app.listen(port, function() {
  console.log('Server started on port : ' + server.address().port);
});

// function generateName(name) {
// var text = name,
// name = "",
// ext = "";
// var splittedText = text.split('.');
// var generatedText = Math.floor(Math.random()*16777215).toString(16);
// for(var i=0;i<splittedText.length;i++) {
// 	if(i == splittedText.length-1) {
// 		ext = splittedText[i];
// 	} else {
// 		name += (splittedText[i] + '.');
// 	}
// }
// text = generatedText + '_' + name + ext;
// return text;
// }
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handlers
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;
