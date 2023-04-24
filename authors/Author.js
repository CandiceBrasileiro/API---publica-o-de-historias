const Sequelize  = require('sequelize');
const connection = require('../database/database');
const User = require('../users/User');

const Author = connection.define('tb_autores', {
  id_autor: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nm_autor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nu_cpf: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dt_nascimento: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  dt_cadastro: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  dt_desligamento: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  dt_ultima_atualizacao: {
    type: Sequelize.DATE,
    allowNull: false,
  }},
{
  modelName: "Author",
  tableName: "tb_autores",
  createdAt: "dt_cadastro",
  updatedAt: "dt_ultima_atualizacao",
  underscore: true,
})

User.hasOne(Author, {
  foreignKey: 'id_usuario',
});

Author.sync({force: false}).then(()=>{});

module.exports = Author;