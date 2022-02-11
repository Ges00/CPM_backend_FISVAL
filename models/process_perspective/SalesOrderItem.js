const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('SalesOrderItem', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idsalesorder: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        itemId: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        itemName: { 
            type: DataTypes.STRING(255),
            allowNull: false
        },
        // modifica schema ER
        idproduct:{
            type: DataTypes.INTEGER,
            allowNull: true

        }
    }, {
        sequelize,
        tableName: 'SalesOrderItem',
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
                name: "sales_order",
                using: "BTREE",
                fields: [
                    { name: "idsalesorder" },
                ]
            },
            {
                name: "product",
                using: "BTREE",
                fields: [
                    { name: "idproduct" },
                ]
            },
        ]
    });
};
