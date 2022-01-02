const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ContractWorkOrderItem', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idworkorder: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'ContractWorkOrderItem',
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
                name: "contract_work_order",
                using: "BTREE",
                fields: [
                    { name: "idworkorder" },
                ]
            },
        ]
    });
};
