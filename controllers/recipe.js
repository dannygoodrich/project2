var express = require('express');
var router = express.Router();
const axios = require('axios'); 

var db = require('../models');

// var fridge = db.fridge.findAll({
//     where: { id: req.user.id },
//     include: [db.fridge]
// });



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


// router.get('/recipes', function(req, res) {
//     db.user.findOne({
//         where: { id: req.user.id },
//         include: [db.recipe, db.fridge]
//     }).then(function() {
//         db.recipe.findAll({
//             where: { userid: req.user.id }
//         }).then(function() {
//             db.fridge.findAll({
//                 where: {userId: req.user.id}
//             }).then(function(recipes, fridges) {
//                 console.log('⛈');
//                 res.render('recipes', { data: { food: recipes, pantry: fridges }});
//             })
// //{ food: recpes })
//         })

//     });
// });




// get pantry page that has a user's ingredients(their fridge)
router.get('/food', function(req, res) {
    db.user.findOne({
        where: { id: req.user.id },
        include: [db.fridge]
    }).then(function() {
        db.fridge.findAll({
            where: { userId: req.user.id }
        }).then(function(fridge) {
            console.log('🔥');
            res.render('pantry', {data: { apple: fridge }});
        });
    });
});




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
            res.redirect('/recipe/recipes');
        })
    })
})

{/* <div>
    <% data.pantry.forEach(function(fridge) { %>
        <p><%= fridge.ingredients %></p>
    <% }) %>
</div> */}

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

// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const recipe = sequelize.define('recipe', {
//     name: DataTypes.STRING,
//     link: DataTypes.STRING,
//     ingredients: DataTypes.STRING,
//     userid: DataTypes.INTEGER
//   }, {});
//   recipe.associate = function(models) {
//     // associations can be defined here
//     models.recipe.belongsToMany(models.user, {
//       through: 'recipesusers'
//     });
//   };
//   return recipe;
// };


// 'use strict';
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.createTable('recipes', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       name: {
//         type: Sequelize.STRING
//       },
//       link: {
//         type: Sequelize.STRING
//       },
//       ingredients: {
//         type: Sequelize.STRING
//       },
//       userid: {
//         type: Sequelize.INTEGER
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.dropTable('recipes');
//   }
// };