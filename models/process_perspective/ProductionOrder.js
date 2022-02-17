const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ProductionOrder', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idmbom: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        idworkorder: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idpurchaseorder: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        idorderitem: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        prodStatus: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        qtySched: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // prodId: {
        //     type: DataTypes.STRING(255),
        //     allowNull: false
        // },
        // itemId: {
        //     type: DataTypes.STRING(255),
        //     allowNull: false
        // },
        // itemName: {
        //     type: DataTypes.STRING(255),
        //     allowNull: false
        // },
        // projId: {
        //     type: DataTypes.STRING(255),
        //     allowNull: false
        // },
        // oprNum: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // oprId: {
        //     type: DataTypes.STRING(255),
        //     allowNull: false
        // },
        // oprName: {
        //     type: DataTypes.STRING(255),
        //     allowNull: false
        // },
        // oprNumNext: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // oprFinished: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // // controllare se possibile salvare il dato con tipo TIME 
        // queueTimeBefore: {
        //     type: DataTypes.STRING(255),
        //     allowNull: false
        // },
        // setupTime: {
        //     type: DataTypes.STRING(255),
        //     allowNull: false
        // },
        // processTime: {
        //     type: DataTypes.STRING(255),
        //     allowNull: false
        // },
        // processPerQty: {
        //     type: DataTypes.STRING(255),
        //     allowNull: false
        // },
        // transPTime: {
        //     type: DataTypes.STRING(255),
        //     allowNull: false
        // },
        // queueTimeAfter: {
        //     type: DataTypes.STRING(255),
        //     allowNull: false
        // },
        // toHours: {
        //     type: DataTypes.STRING(255),
        //     allowNull: false
        // },
        // wrkGroupId: {
        //     type: DataTypes.STRING(255),
        //     allowNull: false
        // },
        // // controllare formato data
        // projectDeliveryDate: {
        //     type: DataTypes.STRING(255),
        //     allowNull: false
        // },
        // // controllare formato data
        // vendorArrivalDate: {
        //     type: DataTypes.STRING(255),
        //     allowNull: false
        // },
        // vendorName: {
        //     type: DataTypes.STRING(255),
        //     allowNull: false
        // },
        // isExternal: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
    }, {
        sequelize,
        tableName: 'ProductionOrder',
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
                name: "make_internal",
                using: "BTREE",
                fields: [
                    { name: "idmbom" },
                ]
            },
            {
                name: "PO_supplire_work",
                using: "BTREE",
                fields: [
                    { name: "idworkorder" },
                ]
            },
            {
                name: "PO_supplire_purchase",
                using: "BTREE",
                fields: [
                    { name: "idpurchaseorder" },
                ]
            },
            {
                name: "PO_owner",
                using: "BTREE",
                fields: [
                    { name: "idorderitem" },
                ]
            },
        ]
    });
};
