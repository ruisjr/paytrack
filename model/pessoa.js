const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Empresa = require('../model/empresa');
const CentroCusto = require('../model/centro_custo');
 
const Pessoa = sequelize.define('pessoa', {
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sobrenome: {
        type: DataTypes.STRING,
		allowNull: false
    },
    cargo: {
		type: DataTypes.STRING,
		allowNull: true
	},
	matricula: {
		type: DataTypes.STRING,
		allowNull: true
	},
	usuario: {
		type: DataTypes.STRING,
		allowNull: true
	},
	empresa_cnpj: {
		type: DataTypes.STRING,
		allowNull: false,
		references: {
			model: Empresa, // Nome do modelo ao qual a chave estrangeira faz referência
			key: 'cnpj'   // Nome da coluna no modelo referenciado
		}
	},
	cc_id: {
		type: DataTypes.STRING,
		allowNull: true,
		references: {
			model: CentroCusto, // Nome do modelo ao qual a chave estrangeira faz referência
			key: 'id'   // Nome da coluna no modelo referenciado
		}
	}
})

// Definir a associação
Pessoa.belongsTo(Empresa, { foreignKey: 'empresa_cnpj' });
Pessoa.belongsTo(CentroCusto, { foreignKey: 'cc_id' });
Empresa.hasMany(Pessoa, { foreignKey: 'empresa_cnpj' });
CentroCusto.hasMany(Pessoa, { foreignKey: 'cc_id' });

module.exports = Pessoa;