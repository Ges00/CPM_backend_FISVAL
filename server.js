const express = require("express");
const sessione = require("express-session");
const bodyParser = require("body-parser");
var passport = require("./config/passport");

const PORT = 4000;

// let db = require("./models");
// fare il require di una cartella corrisponde ad eseguire il require sul file 
// index all'interno della stessa, perciò in questo caso viene inizializzato il DB

let app = express();
app.set('view engine', 'ejs')

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static("public"));

// // usage session
// app.use(sessione({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

//require("./routes/api-routes.js")(app);


// ROUTES DEFINITION
const userRouter = require("./routes/services")


// connettersi al database prima di richiamare le rotte

app.use("/services", userRouter)

//app.use("/serv2", userRouter)

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});




//app.listen(PORT)