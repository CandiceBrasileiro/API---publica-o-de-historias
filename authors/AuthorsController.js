const express = require("express");
const router = express.Router();
const Sequelize  = require('sequelize');
const connection = require('../database/database');
const Author = require('./Author');

router.get("/authors", (req, res) => {
  Author.findAll({ raw: true })
    .then((authors) => {
      res.json(authors);
      res.statusCode = 200;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Não foi possível recuperar os dados.",
      });
    });
});

router.get("/authors/:id", (req, res) => {
  var id = req.params.id;
  Author.findByPk(id)
    .then((data) => {
      if (data) {
        res.statusCode = 200;
        res.json(data);
      } else {
        res.status(404).send({
          message: `Não foi possível encontrar um autor com o id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro ao buscar o autor com o id=" + id,
      });
    });
});

router.post("/authors/", (req, res) => {

  var nm_autor = req.body.nm_autor; 
  var nu_cpf = req.body.nu_cpf; 
  var dt_nascimento = req.body.dt_nascimento;
  var dt_cadastro = req.body.dt_cadastr;
  var dt_desligamento = req.body.dt_desligamento;
  var dt_ultima_atualizacao = req.body.dt_ultima_atualizacao;

  Author.create({
    nm_autor:  nm_autor,
    nu_cpf: nu_cpf,  
    dt_nascimento: dt_nascimento, 
    dt_cadastro: dt_cadastro, 
    dt_desligamento: dt_desligamento, 
    dt_ultima_atualizacao: dt_ultima_atualizacao
  }).then((data) => {
      res.statusCode = 200;
      res.json(data);
  }).catch((err) => {
    res.status(500).send({
      message: "Erro ao enviar dados"
    })
  })
})

router.delete("/authors/:id", (req, res) => {
  let id_d = req.params.id;
console.log(id_d)
  Author.findByPk(id_d)
      .then((data) => {
        Author.destroy({
          where: {
            id_autor: id_d,
          },
        }).then(() => {
          res
            .status(200)
            .send({ message: `O autor ${id_d} foi excluído com sucesso` });
        });
      })
      .catch(() => {
        res
          .status(500)
          .send({ message: `Não foi possível excluir o autor ${id_d}` });
      });
    });

module.exports = router;