const Sequelize = require('sequelize');
const connection = require('../database/database');

const User = connection.define('tb_usuario', {
  id_usuario: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dt_cadastro: {
    type: Sequelize.DATE,
    allowNull:false
  },
  dt_atualizacao: {
    type: Sequelize.DATE,
    allowNull: false
  },
  in_ativo: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  modelName: "User",
  tableName: "tb_usuario",
  createdAt: "dt_cadastro",
  updatedAt: "dt_atualizacao",
  underscore: true,
});

module.exports = User;