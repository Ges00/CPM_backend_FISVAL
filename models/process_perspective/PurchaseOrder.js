const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('PurchaseOrder', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idmbom: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'PurchaseOrder',
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
                name: "buy",
                using: "BTREE",
                fields: [
                    { name: "idmbom" },
                ]
            },
        ]
    });
};
