'use strict';
module.exports = (sequelize, DataTypes) => {
  const recipe = sequelize.define('recipe', {
    name: DataTypes.STRING,
    pic: DataTypes.STRING,
    link: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    userid: DataTypes.INTEGER
  }, {});
  recipe.associate = function(models) {
    // associations can be defined here
    models.recipe.belongsToMany(models.user, {
             through: 'recipesusers'
           });
  };
  return recipe;
};