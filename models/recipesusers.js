'use strict';
module.exports = (sequelize, DataTypes) => {
  const recipesusers = sequelize.define('recipesusers', {
    userId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER
  }, {});
  recipesusers.associate = function(models) {
    // associations can be defined here
  };
  return recipesusers;
};