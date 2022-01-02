const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('SupplyChainClient', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idactorclient: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
        
    }, {
        sequelize,
        tableName: 'SupplyChainClient',
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
                name: "from_client_to_actor",
                using: "BTREE",
                fields: [
                    { name: "idactorclient" },
                ]
            },
        ]
    });
};
