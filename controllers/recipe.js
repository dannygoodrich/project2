var express = require('express');
var router = express.Router();
const axios = require('axios'); 

var db = require('../models');





router.get('/', function(req, res) {
    var puppyUrl = `http://www.recipepuppy.com/api/?i=${req.query.i}`;
    // Use request to call the API
    axios.get(puppyUrl).then( function(apiResponse) {
      var recipe = apiResponse.data.results;
      console.log(recipe);
    //   console.log(apiResponse);
      res.render('profile', { bubble: recipe });
    })
  });

  router.get('/recipes', function(req, res) {
      res.render('/recipes');
  })















module.exports = router;