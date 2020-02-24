'use strict';
module.exports = (sequelize, DataTypes) => {
  const recipe = sequelize.define('recipe', {
    name: DataTypes.STRING,
    link: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    userid: DataTypes.INTEGER
  }, {});
  recipe.associate = function(models) {
    // associations can be defined here
    models.recipe.belongsTo(models.user);
  };
  return recipe;
};