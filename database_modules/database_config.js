const Sequelize = require("sequelize");

// CREATING NEW DB



const sequelize = new Sequelize("fisval_revisited_2", "root", "", {
    dialect:"mysql",
    host:"localhost",
});

// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: 'path/to/database.sqlite'
//   });


// LOADING EXISTING DB (to fix)
// const sequelize = new Sequelize({
//     dialect: 'mysql',
//     storage: 'path/to/database.sql'
//   });


module.exports = sequelize;