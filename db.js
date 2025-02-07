const Sequelize = require('sequelize');
let sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './tmp/database.db'
  });
  
module.exports = sequelize;