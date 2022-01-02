const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ProductionPhase', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idproductionphase: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        idproductionorder: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        oprNum: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        oprId: { // non è il suo stesso id?
            type: DataTypes.INTEGER,
            allowNull: false
        },
        oprName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        oprNumNext: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        oprFinished: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'ProductionPhase',
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
                name: "subphase_of",
                using: "BTREE",
                fields: [
                    { name: "idproductionphase" },
                ]
            },
            {
                name: "production_order",
                using: "BTREE",
                fields: [
                    { name: "idproductionorder" },
                ]
            },
        ]
    });
};
