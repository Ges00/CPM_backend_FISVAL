'use strict'; //??

const Seq = require('sequelize');

const config_type = 'revisited'; //or develompent
const env = process.env.NODE_ENV || config_type;
const config = require(__dirname + '/../config/config.json')[env];
var initModels = require("./init-db-models");

let sequelize;
if (config.use_env_variable) { //what is env variable?
  sequelize = new Seq(process.env[config.use_env_variable], config);
} else {
  sequelize = new Seq(config.database, config.username, config.password, config);
}


var db = initModels(sequelize);
db.sequelize = sequelize;
// db.sequelize
//   .sync({
//     force: true
//   })
//   .then(function () {
//     db.Product.create({
//       articolo: "ARTICOLO TEST",
//       progetto: "PROGETTO TEST",
//       approvatore: "APPROVATORE TEST",
//       ultimo_agg: new Date(),
//       mod_da: "STUFFO TEST",
//       // external keys necessarie
//       iddetails: 1,
//       idebom: 1,
//       idmbom: 1
//     })
//   })


//db.Seq = Seq;

//console.log(db.sequelize);
//console.log(db.Sequelize);

module.exports = db;
