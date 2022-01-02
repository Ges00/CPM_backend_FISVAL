const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ProductionOrder', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idmbom: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        idworkorder: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idpurchaseorder: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        idorderitem: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        prodSatus: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        qtySched: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {
        sequelize,
        tableName: 'ProductionOrder',
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
                name: "make_internal",
                using: "BTREE",
                fields: [
                    { name: "idmbom" },
                ]
            },
            {
                name: "PO_supplire_work",
                using: "BTREE",
                fields: [
                    { name: "idworkorder" },
                ]
            },
            {
                name: "PO_supplire_purchase",
                using: "BTREE",
                fields: [
                    { name: "idpurchaseorder" },
                ]
            },
            {
                name: "PO_owner",
                using: "BTREE",
                fields: [
                    { name: "idorderitem" },
                ]
            },
        ]
    });
};
