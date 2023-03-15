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
      message: err.message || "Não foi possível recuerar os dados."
    });
  })
})


module.exports = router;