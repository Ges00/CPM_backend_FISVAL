const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('WorkCenter', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idworkcenter: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        wrkCtrGroupId: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'WorkCenter',
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
                name: "composed_of",
                using: "BTREE",
                fields: [
                    { name: "idworkcenter" },
                ]
            },
        ]
    });
};
