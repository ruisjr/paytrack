const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
 
const CentroCusto = sequelize.define('centro_custo', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
 
module.exports = CentroCusto;