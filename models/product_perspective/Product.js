const Sequelize = require("sequelize");
//const sequelize = require("../database");

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Product', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idebom: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idmbom: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        iddetails: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idorderitem: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        prodstatus: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        articolo: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        progetto: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        approvatore: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        ultimo_agg: {
            type: DataTypes.DATE,
            allowNull: false
        },
        mod_da: {
            type: DataTypes.STRING(255),
            allowNull: false
        }

    }, {
        sequelize,
        tableName: 'Product',
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
                name: "ebom_partcode",
                using: "BTREE",
                fields: [
                    { name: "idebom" },
                ]
            },
            {
                name: "mbom_partcode",
                using: "BTREE",
                fields: [
                    { name: "idmbom" },
                ]
            },
            {
                name: "product_details",
                using: "BTREE",
                fields: [
                    { name: "iddetails" },
                ]
            },
            {
                name: "sales_order_item",
                using: "BTREE",
                fields: [
                    { name: "idorderitem" },
                ]
            },
        ]
    });
};
