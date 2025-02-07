const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
 
const Empresa = sequelize.define('empresa', {
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
 
module.exports = Empresa;