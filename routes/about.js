var express = require('express');
var router = express.Router();


// get home page request
router.get('/', function(req, res){
    res.render('about');
});


module.exports = router;