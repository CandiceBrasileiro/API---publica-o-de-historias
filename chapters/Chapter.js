const Sequelize = require('sequelize');
const connection = require('../database/database');
const Book = require("../books/book");

const Chapter = connection.define('tb_capitulos', {
  id_capitulo: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  id_livro: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  n_capitulo: {
    type: Sequelize.SMALLINT,
  },
  nm_titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  te_texto: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  dt_cadastro: {
    type: Sequelize.DATE,
    allowNull:false
  },
  dt_ultima_atualizacao: {
    type: Sequelize.DATE,
    allowNull: false
  }
},
  {
    modelName: "Chapter",
    tableName: "tb_capitulos",
    createdAt: "dt_cadastro",
    updatedAt: "dt_ultima_atualizacao",
    underscore: true,
  }
)

Book.hasMany(Chapter, {
  foreignKey: 'id_livro',
})

module.exports = Chapter;