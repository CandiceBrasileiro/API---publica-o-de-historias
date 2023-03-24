const express = require("express");
const app = express();
const connection = require("./database/database");
const bodyParser = require("body-parser");
const session = require("express-session");

// model de autores
const authorsController = require("./authors/AuthorsController");
const BooksController = require("./books/BooksController");
const UsersController = require("./users/UsersController");
const ChapterController = require("./chapters/ChapterController.js");

// Sessiomn
app.use(session({
  secret: "qualquercoisa", cookie: { maxAge: 3000000 }
}))

const Author = require("./authors/Author");
const Book = require("./books/Book");
const User = require("./users/User");
const Chapter = require("./chapters/Chapter");

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
    app.use("/", BooksController );
    app.use("/", UsersController );
    app.use("/", ChapterController );

    app.get("/", (req, res) => {
      res.send("primeiro get");
    })


app.listen(8080, () => {
  console.log("API rodando!")
})