const Sequelize = require('sequelize');
const connection = require('../database/database');
const Author = require('../authors/Author');

const Book = connection.define('tb_livros', {
  id_livro: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nm_livro: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nu_ano_criacao: {
    type: Sequelize.INTEGER,
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
})

// Book.belongsTo(Author);
Author.hasMany(Book, {
  foreignKey: 'fk_autor',
});

module.exports = Book;