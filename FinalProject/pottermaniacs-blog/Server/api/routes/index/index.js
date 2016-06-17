var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
  //res.json({message : 'App running fine. Default root served...'});
});

router.get('/logout', function(req,res) {
  console.log('Logout GET route invoked');
  req.logOut();
  res.json({
    statusCode : 200,
    message : 'successfully logged out'
  });
});

module.exports = router;
