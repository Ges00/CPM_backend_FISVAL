const express = require('express')
var bodyParser = require("body-parser");
const axios = require('axios')

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }));

let db = require("../models");
//const Product = require('../models/product_perspective/Product');
db.sequelize.sync()

// services home
router.get("/", (req, res) => {
    console.log("services home")
        // rendering home.ejs
    res.render('home', { text: 'welcome to services' })
})

// have to be casted when the db has just being created, to insert all the necessaries 
// records in tables in order to satisfy external key constraints to test all functionalities
router.get("/initializingDB", (req, res) => {
    db.sequelize
        .sync()
        .then(function() {
            db.Product.create({
                id: 1,
                articolo: "ARTICOLO TEST",
                progetto: "PROGETTO TEST",
                approvatore: "APPROVATORE TEST",
                ultimo_agg: new Date(),
                mod_da: "STUFFO TEST",
            })
        })
        .then(function() {
            db.SupplyChainClient.create({
                id: 1,
                // idactorclient null 
            })
        })
        .then(function() {
            db.SalesOrder.create({
                    id: 1,
                    idclient: 1, //ext key
                    vendorArrivalDate: new Date(),
                    projId: 2,
                    projDeliveryDate: new Date()
                })
                .then(function() {
                    db.SalesOrderItem.create({
                        id: 1,
                        idsalesorder: 1, //ext key
                        idproduct: 1, //ext key
                        itemId: 3,
                        itemName: "test item"
                    })
                })
        })
        .then(function() {
            db.PartcodeEbom.create({
                id: 1,
                liv: 1,
                pos: "001",
                um: "nr",
                qta: 1,
                codice: "DAS001048",
                descrizione: "descrizione primo elemento",
                fan: "N",
                //pos_pr = req.body.pos_pr,
                progetto_stock: "STOCK", //nella tabella ?? chiamato progetto, ma avrei una ripetizione, quindi aggiungo "stock"
                note: "nessuna nota",
                seriale: "Derivato",
                primario: "S",
                idproduct: 1, //ext key
            })
        })
        .then(function() {
            db.PartcodeMbom.create({
                id: 1,
                m_b: "M",
                liv: 1,
                pos: "001",
                um: "nr",
                qta: 1,
                codice: "DAS001048",
                descrizione: "descrizione primo elemento",
                fan: "N",
                //pos_pr = req.body.pos_pr,
                progetto_stock: "STOCK",
                note: "nessuna nota",
                seriale: "Derivato",
                primario: "S",
                idebom: 1, //ext key
            })
        })
        .then(() => {
            db.ContractWorkOrder.create({
                id: 1,
                idmbom: 1
            })
            db.PurchaseOrder.create({
                id: 1,
                idmbom: 1
            })
        })
        .then(() => {
            db.ContractWorkOrderItem.create({
                id: 1,
                idworkorder: 1
            })
            db.PurchaseOrderItem.create({
                id: 1,
                idorder: 1 //forse ?? meglio cambiare nome, chiamarlo idpurchaseorder
            })
        })
        .then(() => {
            db.ProductionOrder.create({
                id: 1,
                idmbom: 1,
                idworkorder: 1,
                idpurchaseorder: 1,
                idorderitem: 1,
                prodId: "ODP0004706",
                itemId: "DSI004919",
                itemName: "CYLINDER PIN",
                qtySched: 10.0000000000000000,
                prodStatus: 4,
                projId: "00717.061",
                oprNum: 20,
                oprId: "863",
                oprName: "TORNIRE A DISEGNO -E-",
                oprNumNext: 30,
                oprFinished: 0,
                queueTimeBefore: 0.0000000000000000,
                setupTime: 0.2000000000000000,
                processTime: 0.3000000000000000,
                processPerQty: 1.0000000000000000,
                transPTime: 72.0000000000000000,
                queueTimeAfter: 0.0000000000000000,
                toHours: 1.0000000000000000,
                wrkCtrGroupId: "01ALAVEST",
                projectDeliveryDate: "2045-12-31T00:00:00+01:00",
                vendorArrivalDate: "2022-12-31T00:00:00+01:00",
                vendorName: "test vendor",
                isExternal: "0/1",
            })
        })
        .then(() => {
            db.VendorService.create({
                vendorname: "test vendor",
                serviceurl: "http://localhost:4000/services/fornitore",
                servicetype: "external"
            })
        })
        .then(() => {
            res.send("insertion of data in the database finished sucessfully")
        })
})

// simula il servizio del fornitore che restituisce l'arrival date, funziona in coppia con notifyProductionOrder
router.post("/fornitore", (req, res) => {
    console.log("--------------------------------")
    res.json({
        "arrivalDate": "2022-03-02T00:00:00+01:00"
    })
})

// prende in input il production order, effettua una query al db per reperire l'url del fornitore che 
// restituisce la nuova arrivalDate. questa viene inserita nel json del production order e questo viene salvato nel db
router.post("/notifyProductionOrder", (req, res) => {
    // json = {
    //   "prodId": "ODP0004706",
    //   "itemId": "DSI004919",
    //   "itemName": "CYLINDER PIN",
    //   "qtySched": 4.0000000000000000,
    //   "prodStatus": 4,
    //   "projId": "00717.061",
    //   "oprNum": 20,
    //   "oprId": "863",
    //   "oprName": "TORNIRE A DISEGNO -E-",
    //   "oprNumNext": 30,
    //   "oprFinished": 0,
    //   "queueTimeBefore": 0.0000000000000000,
    //   "setupTime": 0.2000000000000000,
    //   "processTime": 0.3000000000000000,
    //   "processPerQty": 1.0000000000000000,
    //   "transPTime": 72.0000000000000000,
    //   "queueTimeAfter": 0.0000000000000000,
    //   "toHours": 1.0000000000000000,
    //   "wrkCtrGroupId": "01ALAVEST",                          // se il campo "wrkCtrGroupId"assume il valore "01ALAVEST", allora la fase di lavorazione non ?? interna, ma esterna;
    //   "projectDeliveryDate": "2045-12-31T00:00:00+01:00",
    //   "vendorArrivalDate": "2022-12-31T00:00:00+01:00",      // in caso di lavorazione esterna, il campo "vendorArrivalDate"avr?? valore"null"
    //   "vendorName": "...",                                   // nome del fornitore
    //   "isExternal": "0/1",
    // }
    vendorName = req.body['vendorName']
    let ResultArrivalDate

    db.VendorService.findAll({
            where: {
                vendorname: vendorName
            },
        })
        .then((attr) => {
            let serviceUrl = attr[0].serviceurl

            //ResultArrivalDate = richiestaDataFornitore(serviceUrl)
            // axios.get('/fornitore', {
            //     params: {
            //         prodId: "ODP0004706",
            //         itemId: "DSI004919",
            //         itemName: "CYLINDER PIN",
            //         qtySched: 4.0000000000000000,
            //         projectDeliveryDate: "2045-12-31T00:00:00+01:00",

            //     }
            // })
            console.log("AXIOS POST REQUEST")
            axios.post(serviceUrl, {
                    prodId: "ODP0004706",
                    itemId: "DSI004919",
                    itemName: "CYLINDER PIN",
                    qtySched: 4.0000000000000000,
                    projectDeliveryDate: "2045-12-31T00:00:00+01:00",
                })
                .then(res => {
                    console.log("inside axios " + res.body)
                })
                //ResultArrivalDate = "2022-03-02T00:00:00+01:00"

        })
    console.log("this is the date" + ResultArrivalDate)
    res.send("ciao")

    // if (req.body["wrkCtrGroupId"] === "01ALAVEST") {
    //   // lavorazione ESTERNA
    //   let isExternal = 1
    //   let ResultArrivalDate = null
    //   // richiesta valore vendorArrivalDate al fornitore, il cui nome ?? vendorName
    //   ResultArrivalDate = richiestaDataFornitore(vendorName) //ritorna un json

    // } else {
    //   // lavorazione INTERNA
    //   let isExternal = 0
    //   let ResultArrivalDate = null

    // }

    // db.sequelize
    //     .sync()
    //     .then(() => {
    //         db.ProductionOrder.create({
    //             idmbom: 1,
    //             idworkorder: 1,
    //             idpurchaseorder: 1,
    //             idorderitem: 1,
    //             prodId: req.body["prodId"],
    //             itemId: req.body["itemId"],
    //             itemName: req.body["itemName"],
    //             qtySched: req.body["qtySched"],
    //             prodStatus: req.body["prodStatus"],
    //             projId: req.body["projId"],
    //             oprNum: req.body["oprNum"],
    //             oprId: req.body["oprId"],
    //             oprName: req.body["oprName"],
    //             oprNumNext: req.body["oprNumNext"],
    //             oprFinished: req.body["oprFinished"],
    //             queueTimeBefore: req.body["queueTimeBefore"],
    //             setupTime: req.body["setupTime"],
    //             processTime: req.body["processTime"],
    //             processPerQty: req.body["processPerQty"],
    //             transPTime: req.body["transPTime"],
    //             queueTimeAfter: req.body["queueTimeAfter"],
    //             toHours: req.body["toHours"],
    //             wrkCtrGroupId: req.body["wrkCtrGroupId"],
    //             projectDeliveryDate: req.body["projectDeliveryDate"],
    //             vendorArrivalDate: ResultArrivalDate,
    //             vendorName: req.body["vendorName"],
    //             isExternal: req.body["isExternal"]
    //         })
    //     })
    //     .then(() => {
    //         res.send("insertion sales order and order items in the database finished sucessfully")
    //     })
})

// prende in input il json dell'ebom da registrare e lo salva nel db
router.post("/ebomJsonPOST", (req, res) => {
    db.sequelize
        .sync()
        .then(function() {
            db.PartcodeEbom.create({
                liv: req.body["liv"],
                pos: req.body["pos"],
                um: req.body["um"],
                qta: req.body["qta"],
                codice: req.body["codice"],
                descrizione: req.body["descrizione"],
                fan: req.body["fan"],
                //pos_pr = req.body.pos_pr,
                progetto_stock: req.body["progetto_stock"],
                note: req.body["note"],
                seriale: req.body["seriale"],
                primario: req.body["primario"],
                idproduct: req.body["idproduct"]
            })
        })
        .then(() => {
            res.send("Ebom registration finished sucessfully")
        })
})

// prende in input il json dell'mbom da registrare e lo salva nel db
router.post("/mbomJsonPOST", (req, res) => {
    db.sequelize
        .sync()
        .then(function() {
            db.PartcodeMbom.create({
                idebom: req.body["idebom"],
                m_b: req.body["m_b"],
                liv: req.body["liv"],
                pos: req.body["pos"],
                um: req.body["um"],
                qta: req.body["qta"],
                codice: req.body["codice"],
                descrizione: req.body["descrizione"],
                fan: req.body["fan"],
                //pos_pr = req.body.pos_pr,
                progetto_stock: req.body["progetto_stock"],
                note: req.body["note"],
                seriale: req.body["seriale"],
                primario: req.body["primario"]
            })
        })
        .then(() => {
            res.send("Mbom registration finished sucessfully")
        })
})

// prende in input il json del sales order da registrare e lo salva nel db
router.post("/salesOrderRegistration", (req, res) => {
    console.log("---------------------------")
    console.log(req.body["orderItem1"][0])
    console.log(req.body["orderItem1"][1])
    console.log(req.body["orderItem1"][2])
    console.log(req.body["orderItem1"][3])
    console.log("---------------------------")
    db.sequelize
        .sync()
        .then(() => {
            db.SalesOrder.create({
                vendorArrivalDate: req.body["vendorArrivalDate"],
                projId: req.body["projId"],
                projDeliveryDate: req.body["projDeliveryDate"],
                idclient: req.body["idclient"],
            })
        })
        .then(() => {
            db.SalesOrderItem.create({
                itemId: req.body["orderItem1"][0],
                itemName: req.body["orderItem1"][1],
                idsalesorder: req.body["orderItem1"][2],
                idproduct: req.body["orderItem1"][3]
            })
            db.SalesOrderItem.create({
                itemId: req.body["orderItem2"][0],
                itemName: req.body["orderItem2"][1],
                idsalesorder: req.body["orderItem2"][2],
                idproduct: req.body["orderItem1"][3]
            })
        })
        .then(() => {
            res.send("insertion sales order and order items in the database finished sucessfully")
        })
})


//  ########################### servizi di testing, non utilizzati ###################################################

router.post("/testjson", (req, res) => {
    console.log("ciao ciao")
    console.log(req.body["orderItems"][0])
    res.send(req.body)
})

// Estrazione informazioni json dal db
router.get('/realTask/:id', function(req, res) {
    let myjson = {
        // prodId: undefined,
        // prodStatus: undefined,
        // qtySched: undefined,
        // itemId: undefined,
        // itemName: undefined,
        // oprId: undefined,
        // oprName: undefined,
        // oprNumNext: undefined,
        // oprFinished: undefined,
        // queuetimeBefore: undefined,
        // setupTime: undefined,
        // processPerQty: undefined,
        // transProcessTime: undefined,
        // queueTimeAfter: undefined,
        // toHours: undefined,
        // wrkCtrGroupId: undefined,
        // vendorArrivalDate: undefined,
        // projectDeliveryDate: undefined,
        // projId: undefined,
    }

    let salesorderitemid
    let salesorderid
    let workcenter

    db.ProductionPhase.findAll({
        where: {
            id: req.params.id
        },
    }).then(attr => {
        myjson.prodId = attr[0].idproductionorder
        myjson.oprId = attr[0].id
        myjson.oprName = attr[0].oprName
        myjson.oprNumNext = attr[0].oprNumNext
        myjson.oprFinished = attr[0].oprFinished

        db.ProductionOrder.findAll({
            where: {
                id: myjson.prodId
            }
        }).then(attr => {
            // myjson.prodId = attr[0].prodId   nel caso in cui prodId identifichi l'id del prodotto
            myjson.prodStatus = attr[0].prodSatus //STATUS non SATUS!!!
            myjson.qtySched = attr[0].qtySched
            salesorderitemid = attr[0].idorderitem

            db.ProductionPhaseExecution.findAll({
                where: {
                    id: myjson.oprId
                }
            }).then(attr => {
                myjson.queueTimeBefore = attr[0].queueTimeBefore
                myjson.queueTimeAfter = attr[0].queueTimeAfter
                myjson.setUpTime = attr[0].setUpTime
                myjson.processPerQty = attr[0].processPerQty
                myjson.transProcessTime = attr[0].transProcessTime
                myjson.toHours = attr[0].toHours
                workcenter = attr[0].idworkcenter

                db.SalesOrderItem.findAll({
                    where: {
                        id: salesorderitemid
                    }
                }).then(attr => {
                    myjson.itemId = attr[0].itemId
                    myjson.itemName = attr[0].itemName
                    salesorderid = attr[0].idsalesorder

                    db.SalesOrder.findAll({
                        where: {
                            id: salesorderid
                        }
                    }).then(attr => {
                        myjson.vendorArrivalDate = attr[0].vendorArrivalDate
                        myjson.projDeliveryDate = attr[0].projDeliveryDate
                        myjson.projId = attr[0].projId

                        db.WorkCenter.findAll({
                            where: {
                                id: workcenter
                            }
                        }).then(attr => {
                            myjson.wrkCtrGroupId = attr[0].wrkCtrGroupId
                            res.json(myjson)
                        })
                    })
                })
            })
        })
    })
})

// router.get('/task1', function (req, res) {
//   db.User.findAll({
//     attributes: ['nome', 'cognome']
//   }).then(attr => {
//     res.json({
//       userName: attr[0]['nome'],
//       userSecondName: attr[0]['cognome']
//     })
//   })
// })

// router.get("/allusers", (req, res) => {
//   console.log("get users service")
//   db.User.findAll().then(usersList => {
//     res.json({
//       list: usersList
//     })
//   })
// })


module.exports = router