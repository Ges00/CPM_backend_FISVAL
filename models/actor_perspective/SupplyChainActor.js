const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('SupplyChainActor', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idsupply: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        idactorclient: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'SupplyChainActor',
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
                name: "supplier_of",
                using: "BTREE",
                fields: [
                    { name: "idsupply" },
                ]
            },
            {
                name: "from_actor_to_client",
                using: "BTREE",
                fields: [
                    { name: "idactorclient" },
                ]
            },
        ]
    });
};
