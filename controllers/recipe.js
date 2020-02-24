var express = require('express');
var router = express.Router();
const axios = require('axios'); 

var db = require('../models');





router.get('/profile', function(req, res) {
    var puppyUrl = 'http://www.recipepuppy.com/api/?i=garlic';
    // Use request to call the API
    axios.get(puppyUrl).then( function(apiResponse) {
      var puppy = apiResponse.data.results;
      res.render('index', { bubble: puppy });
    })
  });















module.exports = router;