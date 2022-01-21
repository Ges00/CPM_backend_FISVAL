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
        },
        m_b: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        liv: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pos: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        um: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        qta: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        descrizione: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        fan: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        pos_pr: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        progetto_stock: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        note: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        seriale: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        primario: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
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
