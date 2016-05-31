var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var movie = require('./routes/movie');

var app = express();

var port = process.env.PORT || 8080,
publicDir = require('path').join(__dirname,'/public'),
dbPath = require('path').join(__dirname,'/db'),
fs = require('fs');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(publicDir));

app.use('/', routes);
app.use('/movie', movie);

var filePath = dbPath + '/movies.json';
var file = [];

app.post('/uploadImage', function(req,res) {
  console.log('Upload route called...');
  var multiparty = require('multiparty');
  var form = new multiparty.Form();

  form.parse(req, function(err,fields,files) {
    console.log('Parsing...');
    var img = files.images[0];
    console.log('Reading file... : '+img.originalFilename);
    fs.readFile(img.path, function(err,data) {
      console.log('Read file...');
      var path = publicDir + '/images/'+img.originalFilename;
      console.log('Writing file...');
      fs.writeFile(path,data, function(error) {
        if(error) {
          console.log(error);
          res.send('error');
        }
        console.log('File Write Completed!');
        res.send(img.originalFilename);
      })

    });

  });

});

app.use(function(request,response) {
  var data = '<h3>404 - Not Found</h3>';
  response.writeHead(404,{'Content-Type' : 'text/html'});
  response.end(data);
});

var server = app.listen(port, function() {
  console.log('Server started on port : ' + server.address().port);
});

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
