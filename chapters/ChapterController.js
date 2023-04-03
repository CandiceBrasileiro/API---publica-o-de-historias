const express = require("express");
const router = express.Router();
const Sequelize  = require('sequelize');
const connection = require('../database/database');
const Chapter = require('./Chapter');


router.get("/chapters", (req, res) => {
  Chapter.findAll ({
    raw: true
  }).then((chapters) => {
    res.json(chapters);
    res.statusCode = 200;
  }).catch((err) => {
    res.status(500).send({
      message: err.message || "Não foi possível recuperar os dados."
    });
  })
});

router.get("/chapters/:id", (req, res) => {
  var id = req.params.id;
  Chapter.findByPk(id)
    .then((data) => {
      if(data){
        res.statusCode = 200;
        res.json(data);
      } else {
        res.status(404).send({
        message: `Não foi possível encontrar o capítulo com o id=${id}.`
      })
    }
    }).catch((err) => {
      res.status(500)
      .send({
        message: "Erro ao buscar o capítulo com o id=" + id,
      });
    })
})

router.post("/chapter/", (req, res) => {

  var title = req.body.nm_titulo;
  var fullText = req.body.te_texto;
  var data = new Date();

  Chapter.create({
    nm_titulo: title,
    te_texto: fullText,
    dt_cadastro: data.toISOString().split('T')[0],
    dt_ultima_atualizacao: data.toISOString().split('T')[0]
  }).then((data)=>{
    res.statusCode = 200;
    res.json(data);
  }).catch((err) => {
    res.status(500).send({
      message: "Erro ao enviar dados"
    });
  });
  });

  router.delete("/chapter/:id", (req, res) => {
    var id = req.params.id;
  Chapter.findByPk(id)
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

  router.put("/chapter/:id", (req, res) => {

    var id = req.params.id;
    var title = req.body.nm_titulo;
    var fullText = req.body.te_texto;
    var data = new Date();

    Chapter.update(
      {
        nm_titulo: title,
        te_texto: fullText,
        dt_ultima_atualizacao: data.toISOString().split('T')[0]
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

router.get("/chapters/author/:id", (req, res) => {
  var id = req.params.id;

  Chapter.findAll({
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