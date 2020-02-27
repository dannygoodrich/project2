'use strict';
module.exports = (sequelize, DataTypes) => {
  const fridge = sequelize.define('fridge', {
    ingredients: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  fridge.associate = function(models) {
    // associations can be defined here
    models.fridge.belongsTo(models.user);
  };
  return fridge;
};