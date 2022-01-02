const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ProductionPhaseExecution', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idproductionphase: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idworkcenter: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        idexecutionresource: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        queueTimeBefore: { 
            type: DataTypes.TIME,
            allowNull: false
        },
        setUpTime: { 
            type: DataTypes.TIME,
            allowNull: false
        },
        processTime: { 
            type: DataTypes.TIME,
            allowNull: false
        },
        processPerQty: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        transProcessTime: { 
            type: DataTypes.TIME,
            allowNull: false
        },
        queueTimeAfter: { 
            type: DataTypes.TIME,
            allowNull: false
        },
        toHours: { 
            type: DataTypes.TIME,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'ProductionPhaseExecution',
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
                name: "production_phase",
                using: "BTREE",
                fields: [
                    { name: "idproductionphase" },
                ]
            },
            {
                name: "work_center",
                using: "BTREE",
                fields: [
                    { name: "idworkcenter" },
                ]
            },
            {
                name: "execution_resource",
                using: "BTREE",
                fields: [
                    { name: "idexecutionresource" },
                ]
            },
        ]
    });
};
