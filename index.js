const express = require("express");
const app = express();
const connection = require("./database/database");
const bodyParser = require("body-parser");

// model de autores
const authorsController = require("./authors/AuthorsController");

const Author = require("./authors/Author");
const Book = require("./books/book");

//Body parser
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

//DATABASE
connection
    .authenticate()
    .then(()=> {
      console.log('Conexão feita com banco de dados')
    })
    .catch((msgErro) => {
      console.log(msgErro);      
    })

    app.use("/", authorsController );

    app.get("/", (req, res) => {
      res.send("primeiro get");
    })


app.listen(8080, () => {
  console.log("API rodando!")
})