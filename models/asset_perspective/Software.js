const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Software', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idresource: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'Software',
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
                name: "sw_resource",
                using: "BTREE",
                fields: [
                    { name: "idresource" },
                ]
            },
        ]
    });
};
