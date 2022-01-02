const Sequelize = require('sequelize');
//const bcrypt = require("bycryptjs");

module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define('User', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idsupplychainactor: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        nome: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        cognome: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'User',
        timestamps: false,
        freezeTableName: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                ]
            },
            {
                name: "supplychainactor",
                using: "BTREE",
                fields: [
                    { name: "idsupplychainactor" },
                ]
            },
        ]
    });

    // usefull functions for authentication
    // Compared to the hashed password stored in the database
//   Utente.prototype.validPassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
//   };

//   // Before a User is created hash the password
//   Utente.beforeCreate(user => {
//     user.password = bcrypt.hashSync(
//       user.password, 
//       bcrypt.genSaltSync(10), 
//       null);
//   });

  return User;
};
