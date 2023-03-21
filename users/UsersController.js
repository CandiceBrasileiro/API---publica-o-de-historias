const express = require("express");
const router = express.Router();
const Sequelize = require('sequelize');
const connection = require('../database/database');
const User = require('./User');

router.get("/users", (req, res) => {
  User.findAll ({
    raw: true
  }).then((users) => {
    res.json(users);
    res.statusCode = 200;
  }).catch((err) => {
    res.status(500).send({
      message: err.message || "Não foi possível recuperar os dados."
    });
  });
});

router.get("/users/:id", (req, res)=>{
  var id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if(data){
        res.statusCode = 200;
        res.json(data);
      }else{
        res.status(404).send({
          message: `Não foi possível encontrar o usuário com o id=${id}.`
        })
      }
    }).catch((err) => {
      res.status(500).send({
        message: "Erro ao buscar o usuário com o id=" + id,
      });
    });
});

router.get("/users/email/:email", (req, res) => {
  var email = req.params.email;
  console.log(email, "dasdasdas")
  User.findOne({
    where: {
      email:email
    }, 
      raw: true
  }
  ).then((data) => {
    res.statusCode = 200;
          res.json(data);
  }).catch((err) => {
    res.status(500).send({
      message: "Erro ao enviar dados"
    })
  })
})

router.post("/user/", (req, res) => {
  var email = req.body.email;
  var password = req.body.senha;
  var data = new Date();

  User.create({
    email: email,
    senha: password,
    dt_cadastro:  data.toISOString().split('T')[0],
    dt_atualizacao:  data.toISOString().split('T')[0],
    in_ativo: 1
  }).then((data) => {
    res.statusCode = 200;
    res.json(data);
  }).catch((err) => {
    res.status(500).send({
    message: "Erro ao enviar dados"
    })
  })
})

router.put("/users/:id", (req, res) => {
  var id = req.params.id;
  console.log(id)
  var password = req.body.senha;
  var lastUpdate = req.body.dt_atualizacao;

  User.update(
    {
      senha: password,
      dt_atualizacao: lastUpdate,
    }, {
      where: {
        id_usuario: id
      }
    }
  ).then((data) => {
    console.log(data)
    res
      .statusCode = 200
      .json(data)
  }).catch((err) => {
    res
      .status(500)
      .send({message: err})
  })
})



module.exports = router;