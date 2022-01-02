// const Sequelize = require('sequelize');
console.log('Connection has been established successfully.');

const sequelize = require("./database_modules/database_config");

let initModels = require("./models/init-db-models");
let db = initModels(sequelize);

//db.sequelize = sequelize;
//db.Sequelize = Sequelize;


try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.log("--------------------------------------------");
    console.error('Unable to connect to the database:', error);
  }

sequelize
    .sync()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log("--------------------------------------------");
        console.log(err);
        console.log("--------------------------------------------");
    });




