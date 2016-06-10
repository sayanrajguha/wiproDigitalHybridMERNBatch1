var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
  //res.json({message : 'App running fine. Default root served...'});
});

module.exports = router;
