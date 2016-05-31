var express = require('express');
var router = express.Router();
// var pwd = require('path').join(__dirname),
var dbPath = process.env.PWD + '/db',
publicDir = process.env.PWD + '/public',
fs = require('fs');


var filePath = dbPath + '/movies.json';
var file = [];

router.get('/getFile', function(req,res) {
  console.log('getting file');
  try {
  // file = require(filePath);
  fs.readFile(filePath, function(err,data) {
    if(err) {
      throw err;
    }
    console.log('File read success. Sending back!');
    // console.log(JSON.parse(data));
    try {
    res.json(JSON.parse(data));
  }catch(er) {
    console.log('Error occurred');
    res.json({});
  }
  });
  // res.json(file);
} catch(e) {
  console.log('Error occured or empty file : '+e);
  res.json({});
}
});
router.post('/addMovie', function(req,res) {
  // console.log(req.body);
  addData(req.body);
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end('success');
});
router.post('/updateMovie', function(req,res) {
  console.log();
  updateData(req.body);
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end('success');
});
router.post('/deleteMovie', function(req,res) {
  // console.log(req.body);
  console.log('Delete route called');
  deleteData(req.body.index);
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end('success');
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
module.exports = router;
