const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('PartcodeMbom', {
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
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'PartcodeMbom',
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
                name: "part_of_e",
                using: "BTREE",
                fields: [
                    { name: "idebom" },
                ]
            },
            {
                name: "part_of_m",
                using: "BTREE",
                fields: [
                    { name: "idmbom" },
                ]
            },
        ]
    });
};
