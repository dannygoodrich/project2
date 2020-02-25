'use strict';
module.exports = (sequelize, DataTypes) => {
  const fridge = sequelize.define('fridge', {
    ingredient: DataTypes.STRING,
    userid: DataTypes.INTEGER
  }, {});
  fridge.associate = function(models) {
    // associations can be defined here
    models.fridge.belongsTo(models.user);
  };
  return fridge;
};






/* <h2><%= user.name %></h2>

<% bubble.forEach(function(puppy) { %>
    <h2><%= puppy.name %></h2>

<form action="/recipes" method="post">
    <button type="submit">add to MyRecipes</button>
</form>

<% }) %> */