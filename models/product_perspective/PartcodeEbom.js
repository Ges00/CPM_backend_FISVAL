const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('PartcodeEbom', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idebom: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'PartcodeEbom',
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
                name: "part_of",
                using: "BTREE",
                fields: [
                    { name: "idebom" },
                ]
            },
        ]
    });
};
