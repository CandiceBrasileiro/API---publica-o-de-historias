const express = require("express");
const router = express.Router();
const Sequelize  = require('sequelize');
const connection = require('../database/database');
const Book = require('./Book');
const Author = require('../authors/Author');

router.get("/books", (req, res) => {
  Book.findAll ({
     raw: true })
  .then((books)=> {
    res.json(books);
    res.statusCode = 200;
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Não foi possível recuperar os dados."
    });
  })
});

router.get("/books/:id", (req, res) => {
  var id = req.params.id;
  Book.findByPk(id)
    .then((data) => {
      if(data){
        res.statusCode = 200;
        res.json(data);
      }else{
        res.status(404).send({
          message: `Não foi possível encontrar o livro com o id=${id}.`
        })
      }
    }).catch((err) => {
      res.status(500).send({
        message: "Erro ao buscar o livro com o id=" + id,
      });
    });
});

router.post("/books/", (req, res)=> {
  
  var name = req.body.nm_livro;
  var year = req.body.nu_ano_criacao;
  var lastUpdate = req.body.dt_ultima_atualizacao;
  var id_autor = req.body.id_autor;

Book.create({
  nm_livro: name,
  nu_ano_criacao: year,
  dt_ultima_atualizacao: lastUpdate,
  id_autor: id_autor
}).then((data)=>{
  res.statusCode = 200;
  res.json(data);
}).catch((err) => {
  res.status(500).send({
    message: "Erro ao enviar dados"
  });
});
});

router.delete("/books/:id", (req, res) =>{
  var id = req.params.id;
  Book.findByPk(id)
    .then((data) => {
      Book.destroy({
        where: {
          id_livro: id,
        },
      }).then(()=>{
        res
          .status(200)
          .send({ message: `O livro ${id} foi excluído com sucesso`});
      })
    })
    .catch(()=>{
      res
        .status(500)
        .send({ message: `Não foi possível excluir o livro de id=${id}`})
    })
});

router.put("/books/:id", (req, res)=>{
  var id = req.params.id;
  var name = req.body.nm_livro;
  var year = req.body.nu_ano_criacao;
  var lastUpdate = req.body.dt_ultima_atualizacao;
  var id_autor = req.body.id_autor;

  Book.update(
    {
      nm_livro: name,
      nu_ano_criacao: year,
      dt_ultima_atualizacao: lastUpdate,
      id_autor: id_autor
    }, {
      where: {
        id_livro: id
      }
    }
  ).then((data) => {
    res
      .statusCode = 200
      .json(data)
  }).catch((err) => {
    res
      .status(500)
      .send({message: err})
  })
})
// research for author
router.get("/books/author/:id", (req, res) => {

  var id = req.params.id;

  Book.findAll({
    where: {
      id_autor:id
    }, 
      raw: true
  }).then((data)=>{
    console.log(data)
    res.statusCode = 200;
    res.json(data);
  }).catch((err) => {
    res.status(400).send({
      message: "Erro ao buscar dados"
    });
  });
});

module.exports = router;