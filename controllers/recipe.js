var express = require('express');
var router = express.Router();
const axios = require('axios'); 

var db = require('../models');




router.get('/', function(req, res) {
    
    var puppyUrl = `http://www.recipepuppy.com/api/?i=${req.query.i}&q=${req.query.q}`;
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

router.get('/x', function(req, res) {
    db.user.findOne({
        where: { id: req.user.id},
        include: [db.fridge]
    }).then(function(currUser){
        db.fridge.findAll({
            where: { userId: currUser.id }
        }).then(function(currFridge) {
            res.render('search', {data: {user: currUser, items: currFridge}});

        })

    })
});

let customQueryI = "";
let customQueryQ = "";





// get recipes from db
router.get('/recipes', function(req, res) {
    db.user.findOne({
        where: { id: req.user.id },
        include: [db.fridge]
    }).then(function(currUser) {
        console.log(currUser.fridge);
        db.recipe.findAll({
            where: { userid: currUser.id }
        }).then(function(currRecipes) {
            db.fridge.findAll({
                where: {userId: currUser.id}
            }).then(function(currFridge) {

                res.render('recipes', {data: {user: currUser, recipes: currRecipes, items: currFridge}});
            })
                /*
            }).then(function(recipes, fridges) {
                console.log('⛈');
                res.render('recipes', { data: { food: recipes, pantry: fridges }});
                console.log(data.food);
            */
            })
//{ food: recpes })
        })

    });







// get pantry page that has a user's ingredients(their fridge)
router.get('/food', function(req, res) {
    db.user.findOne({
        where: { id: req.user.id },
        include: [db.fridge]
    }).then(function(currUser) {
        db.fridge.findAll({
            where: { userId: currUser.id }
        }).then(function(fridge) {
            console.log('🔥');
            res.render('pantry', {data: { apple: fridge }});
        });
    });
});






// post to Myrecipes
router.post('/', function(req, res) {
    db.user.findOne({
        where: { id: req.user.id},
        include: [db.recipe]
    }).then(function(user) {
        console.log(req.user.Id);
        console.log('🌍')
        db.recipe.create({
            name: req.body.name,
            pic: req.body.pic,
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

// router.get('/fridge', function(req, res) {
//     res.render()
// })

// POST adding ingredients to pantry
router.post('/food', function(req, res) {
    db.user.findOne({
        where: { id: req.user.id},
        include: [db.fridge]
    }).then(function(user) {
        db.fridge.create({
            ingredients: req.body.ingredient,
            userId: req.user.id
        }).then(function() {
            res.redirect('/recipe/food');
        })
    })
})


router.post('/remove', function(req, res) {
    console.log(req.body.value)
    db.recipe.destroy({
        where: {
            name: req.body.name
        }
    }).then(function(del) {
        res.redirect('/recipe/recipes');   
    }).catch(err => {
        console.log(err);
        res.send('error');
    });
});



router.post('/del', function(req, res) {
    db.fridge.destroy({
        where: {
            id: req.body.name
        }
    }).then(function(del) {
        res.redirect('/recipe/recipes');
    }).catch(err => {
        console.log(err);
        res.send('error');
    })
})

module.exports = router;



