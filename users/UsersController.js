const express = require("express");
const router = express.Router();
const Sequelize = require('sequelize');
const connection = require('../database/database');
const User = require('./User');
const bcrypt = require("bcryptjs");
const session = require('express-session')

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
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  console.log(hash, 'dasdasd')
  var day = data.toISOString().split('T')[0];

  User.create({
    email: email,
    senha: hash,
    dt_cadastro: day,
    dt_atualizacao: day,
    in_ativo: 1
  }).then((data) => {
    res.statusCode = 200;
    res.json(data);
  }).catch((err) => {
    res.status(500)
    .send({
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

router.post("/auth/", (req, res) => {

  var email = req.body.email;
  var password = req.body.senha;
  
  User.findOne({where:{email:email}}).then(user => {
    if(user != undefined){
      var correct = bcrypt.compareSync(password, user.senha);
      if(correct){
        req.session.user = {
          id: user.id_usuario,
          email: user.email
        }
        
        res.statusCode = 200;
        res.json(req.session.user);
          
      } else {
        res.status(500)
        console.log("deu ruim")
          
      }
    }
  })
})


module.exports = router;