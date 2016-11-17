var express = require("express");
var crypto = require("crypto");
var router = express.Router();

var userModel = require('../models/user.js');

router.get('/', function(req, res) {
    res.render('pages/index');
});

router.post('/login', function(req, res) {
  // login logic
});

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
});

router.post('/register', function(req, res) {
  console.log(req.body);
  var hash = crypto.createHmac('sha256', req.body.password).digest('hex');
  console.log(hash);
  userModel.create(req.body.username, hash, function(err, user) {
    if(err) {
      console.log(err);
      if(err.code == "ER_DUP_ENTRY") {
        res.locals.msg = "This username already exists";
      }else{
        res.locals.msg = "Something wen't wrong";
      }
      res.render('pages/index');
    }else{
      console.log(user);
      res.locals.msg = "User registered";
      res.render('pages/index');
    }
  });

});

router.get('/userlist', function(req, res) {
  userModel.getAll(function(err, result) {
    if(err) {
      console.log(err);
      process.exit(1);
    }else{
      console.log(result);
      res.locals.userlist = result;
      res.render('pages/userlist');
    }
  });
});

module.exports = router;
