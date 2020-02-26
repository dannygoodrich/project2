var express = require('express');
var router = express.Router();
const axios = require('axios'); 

var db = require('../models');





router.get('/', function(req, res) {
    var puppyUrl = `http://www.recipepuppy.com/api/?i=${req.query.i}`;
    // Use request to call the API
    axios.get(puppyUrl).then( function(apiResponse) {
      var recipe = apiResponse.data.results;
    //   console.log(recipe);
    //   console.log(apiResponse);
      res.render('results', { bubble: recipe });
    }).catch(err => {
        console.log(err);
        res.send('error');
  });
});

router.get('/recipes', function(req, res) {
    db.user.findOne({
        where: { id: req.user.id },
        include: [db.recipe]
    }).then(function() {
        db.recipe.findAll({
            where: { userid: req.user.id }
        }).then(function(recipes) {
            console.log('⛈');
          res.render('recipes', { food: recipes });

    })

    });
});

router.get('/food', function(req, res) {
    db.fridge.findAll()
})




// router.post('/', function(req, res) {
//     db.recipe.create({
//         name: req.body.name,
//         link: req.body.link,
//         ingredients: req.body.ingredients,
//         userid: 2
//     }).then(function(recipes){
//         console.log('🌈');
//         res.redirect('/recipe/recipes');
//     }).then(([recipe, wasCreated]) => {
//         user.addRecipe(recipe);
//     }).catch(err => {
//         console.log(err);
//         res.send('error');
//     })
// });

// call user table, db user.findOne where {id:rew.user.id}, include: [db.recipe]
// .then(function(user) {
//     then create recipe  
//         then madeRecipe.addRecipes(user)
//         then function(madeRecipe)
//         madeRecipe(user)
// })

router.post('/', function(req, res) {
    db.user.findOne({
        where: { id: req.user.id},
        include: [db.recipe]
    }).then(function(user) {
        console.log(req.user.Id);
        console.log('🌍')
        db.recipe.create({
            name: req.body.name,
            link: req.body.link,
            ingredients: req.body.ingredients,
            userid: req.user.id
        })
        // .then(function(madeRecipe) {
        //     madeRecipe.addRecipe(user)
        .then(function() {
            res.redirect('/recipe/recipes');

        })
        // })
    })
})








module.exports = router;