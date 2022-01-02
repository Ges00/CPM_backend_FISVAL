const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('SalesOrder', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idactor: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        idclient: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        vendorArrivalDate: { 
            type: DataTypes.DATE,
            allowNull: true
        },
        projId: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        projDeliveryDate: { 
            type: DataTypes.DATE,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'SalesOrder',
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
                name: "supply_chain_actor",
                using: "BTREE",
                fields: [
                    { name: "idactor" },
                ]
            },
            {
                name: "supply_chain_client",
                using: "BTREE",
                fields: [
                    { name: "idclient" },
                ]
            },
        ]
    });
};
