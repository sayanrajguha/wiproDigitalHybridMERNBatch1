var express = require('express'),
    fs = require('fs'),
    parser = require('body-parser'),
    app = express(),
    port = process.env.PORT || 8080,
    publicDir = require('path').join(__dirname,'/public');


console.log('Public directory : ' + publicDir);
var filePath = publicDir + '/json/movies.json';
var file = [];

app.use(parser.urlencoded({extended : true}));
app.use(express.static(publicDir));

// app.get('/viewFile', function(req,res) {
//   res.json(file);
// });
app.get('/getFile', function(req,res) {
  console.log('getting file');
  try {
  file = require(filePath);
  res.json(file);
} catch(e) {
  console.log('Error occured or empty file.');
  res.json({});
}
});
app.post('/addMovie', function(req,res) {
  // console.log(req.body);
  addData(req.body);
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end('success');
});
app.post('/updateMovie', function(req,res) {
  // console.log(req.body);
  updateData(req.body);
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end('success');
});
app.post('/deleteMovie', function(req,res) {
  // console.log(req.body);
  console.log('Delete route called');
  deleteData(req.body.index);
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end('success');
});
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

function addData(data) {
  file.push(data);
  console.log('Writing to file...');
  fs.writeFile(filePath, JSON.stringify(file,null,2), function(err) {
      if(err) {
          console.log(err);
      }
      console.log('Completed!');
  });
}
function updateData(data) {
  var position = -1;
  console.log('updateData called...');
  file.forEach(function(item,index) {
    if(item.id == data.id) {
      console.log('Found at ' + index);
      position = index;
    }
  });
  if(position > -1) {
    file[position] = data;
    console.log('Writing to file...');
    fs.writeFile(filePath, JSON.stringify(file,null,2), function(err) {
        if(err) {
            console.log(err);
        }
        console.log('Completed!');
    });
  }
}
function deleteData(index) {
  console.log(index);
  file.splice(parseInt(index),1);
  console.log('Deletion complete. Writing to file...');
  fs.writeFile(filePath, JSON.stringify(file,null,2), function(err) {
      if(err) {
          console.log(err);
      }
      console.log('Completed!');
  });
}

module.exports = app;
