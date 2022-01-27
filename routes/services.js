const express = require('express')
var bodyParser = require("body-parser");

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }));

let db = require("../models");
const Product = require('../models/product_perspective/Product');
db.sequelize.sync()

// testing a user
let aldo = {
  idsupplychainactor: "NULL",
  nome: "aldo",
  cognome: "ritmo"
}

// services home
router.get("/", (req, res) => {
  console.log("services home")
  // rendering home.ejs
  res.render('home', { text: 'welcome to services' })
})

router.get("/initializingDB", (req, res) => {
  db.sequelize
    .sync()
    .then(function () {
      db.SupplyChainClient.create({
        id: 1,
        // idactorclient null 
      })
    })
    .then(function () {
      db.SalesOrder.create({
        id: 1,
        idclient: 1, //ext key
        vendorArrivalDate: new Date(),
        projId: 2,
        projDeliveryDate: new Date()
      })
    })
    .then(function () {
      db.SalesOrderItem.create({
        id: 1,
        idsalesorder: 1, //ext key
        itemId: 3,
        itemName: "test item"
      })
    })
    .then(function () {
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
        progetto_stock: "STOCK", //nella tabella è chiamato progetto, ma avrei una ripetizione, quindi aggiungo "stock"
        note: "nessuna nota",
        seriale: "Derivato",
        primario: "S"
      })
    })
    .then(function () {
      db.PartcodeMbom.create({
        id: 1,
        idebom: 1, //ext key
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
        primario: "S"
      })
    })
    .then(function () {
      db.ProductDetails.create({
        id: 1,
        // per ora non ci sono attributi necessari
      })
    })
    .then(function () {
      db.Product.create({
        id: 1,
        articolo: "ARTICOLO TEST",
        progetto: "PROGETTO TEST",
        approvatore: "APPROVATORE TEST",
        ultimo_agg: new Date(),
        mod_da: "STUFFO TEST",
        // external keys necessarie
        iddetails: 1,
        idebom: 1,
        idmbom: 1
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
        idorder: 1 //forse è meglio cambiare nome, chiamarlo idpurchaseorder
      })
    })
    .then(() => {
      db.ProductionOrder.create({
        id: 1,
        idmbom: 1,
        idworkorder: 1,
        idpurchaseorder: 1,
        idorderitem: 1,
        prodStatus: "OK",
        qtySched: 10
      })
    })
    .then(() => {
      res.send("insertion of data in the database finished sucessfully")
    })
})

// TO DO 
router.get("/notifyProductionOrder", (req, res) => {
  db.sequelize
    .sync()
    .then(() => {
      db.ProductionOrder.create({
        idmbom: 1,
        idworkorder: 1,
        idpurchaseorder: 1,
        idorderitem: 1,
        prodStatus: "OK",
        qtySched: 10
      })
    })
    .then(() => {
      res.send("insertion sales order and order items in the database finished sucessfully")
    })
})

router.get("/salesOrderRegistration", (req, res) => {
  var sales_order = {
    //sales order
    vendorArrivalDate: new Date(),
    projId: 2,
    projDeliveryDate: new Date(),
    //ext keys
    idclient: 1
  }

  var order_item_1 = {
    //sales order item
    // qta: 11,
    itemId: 1,
    itemName: "name 1",
    // ext key
    idsalesorder: 1
  }

  var order_item_2 = {
    //sales order item
    //qta: 22,
    itemId: 2,
    itemName: "name 2",
    // ext key
    idsalesorder: 1
  }
  db.sequelize
    .sync()
    .then(() => {
      db.SalesOrder.create(sales_order)
    })
    .then(() => {
      db.SalesOrderItem.create(order_item_1)
      db.SalesOrderItem.create(order_item_2)
    })
    .then(() => {
      res.send("insertion sales order and order items in the database finished sucessfully")
    })

})

// have to be casted when the db has just being created, to insert all the necessaries 
// records in tables in order to satisfy external key constraints to test all functionalities
router.get("/insertData", (req, res) => {
  db.sequelize
    .sync()
    .then(function () {
      db.SupplyChainClient.create({
        // idactorclient null 
      })
    })
    .then(function () {
      db.SalesOrder.create({
        idclient: 1, //ext key
        vendorArrivalDate: new Date(),
        projId: 2,
        projDeliveryDate: new Date()
      })
    })
    .then(function () {
      db.SalesOrderItem.create({
        idsalesorder: 1, //ext key
        itemId: 3,
        itemName: "test item"
      })
    })
    .then(function () {
      db.PartcodeEbom.create({
        liv: 1,
        pos: "001",
        um: "nr",
        qta: 1,
        codice: "DAS001048",
        descrizione: "descrizione primo elemento",
        fan: "N",
        //pos_pr = req.body.pos_pr,
        progetto_stock: "STOCK", //nella tabella è chiamato progetto, ma avrei una ripetizione, quindi aggiungo "stock"
        note: "nessuna nota",
        seriale: "Derivato",
        primario: "S"
      })
    })
    .then(function () {
      db.PartcodeMbom.create({
        idebom: 1, //ext key
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
        primario: "S"
      })
    })
    .then(function () {
      db.ProductDetails.create({
        // per ora non ci sono attributi necessari
      })
    })
    .then(function () {
      db.Product.create({
        id: 1,
        articolo: "ARTICOLO TEST",
        progetto: "PROGETTO TEST",
        approvatore: "APPROVATORE TEST",
        ultimo_agg: new Date(),
        mod_da: "STUFFO TEST",
        // external keys necessarie
        iddetails: 1,
        idebom: 1,
        idmbom: 1
      })
    })
    .then(() => {
      db.ContractWorkOrder.create({
        idmbom: 1
      })
      db.PurchaseOrder.create({
        idmbom: 1
      })
    })
    .then(() => {
      db.ContractWorkOrderItem.create({
        idworkorder: 1
      })
      db.PurchaseOrderItem.create({
        idorder: 1 //forse è meglio cambiare nome, chiamarlo idpurchaseorder
      })
    })
    .then(() => {
      db.ProductionOrder.create({
        idmbom: 1,
        idworkorder: 1,
        idpurchaseorder: 1,
        idorderitem: 1,
        prodStatus: "OK",
        qtySched: 10
      })
    })
    .then(() => {
      res.send("insertion of data in the database finished sucessfully")
    })
})

// route to the html index file we have to compile to then send
// the post request
var path = require('path');
router.get("/ebomGETPOST", function (req, res) {
  res.sendFile(path.join(__dirname + '/ebomRequest.html'));
});
// route submitted after compiling the form
router.post("/ebomGETPOST", (req, res) => {
  db.sequelize
    .sync()
    .then(function () {
      db.PartcodeEbom.create({
        liv: req.body.liv,
        pos: req.body.pos,
        um: req.body.um,
        qta: req.body.qta,
        codice: req.body.codice,
        descrizione: req.body.descrizione,
        fan: req.body.fan,
        //pos_pr = req.body.pos_pr,
        progetto_stock: req.body.progetto_stock,
        note: req.body.note,
        seriale: req.body.seriale,
        primario: req.body.primario
      })
    })
    .then(() => {
      db.Product.create({
        articolo: req.body.articolo,
        progetto: req.body.progetto,
        approvatore: req.body.approvatore,
        ultimo_agg: new Date(),
        mod_da: req.body.mod_da,
        // external keys necessarie
        iddetails: 1,
        idebom: 1,
        idmbom: 1
      })
    })
    .then(() => {
      res.send("Ebom registration finished sucessfully")
    })
})

router.get("/ebomRegistration", (req, res) => {

  // req should be formatted as:

  // ATTRIBUTI ENTITA' PRODOTTO O DETTAGLI PRODOTTO
  // articolo
  // progetto
  // approvatore
  // ultimo_agg
  // mod_da

  // ATTRIBUTI ENTITA' EBOM
  // liv
  // pos
  // um
  // qta
  // codice
  // descrizione
  // fan
  // pos_pr (NULLABLE)
  // progetto (NULLABLE)
  // note (NULLABLE)
  // seriale
  // primario

  let date = new Date()

  //attributi prodotto
  var productReq = {
    body: {
      articolo: "VSS000799 TEST",
      progetto: "01450.015",
      approvatore: "system",
      ultimo_agg: date,
      mod_da: "mstuffo",
      // external keys necessarie
      iddetails: 1,
      idebom: 1,
      idmbom: 1
    }
  }

  //attributi ebom
  var ebomReq = {
    body: {
      liv: 1,
      pos: "001",
      um: "nr",
      qta: 1,
      codice: "DAS001048",
      descrizione: "descrizione primo elemento",
      fan: "N",
      //pos_pr = req.body.pos_pr,
      progetto_stock: "STOCK", //nella tabella è chiamato progetto, ma avrei una ripetizione
      note: "nessuna nota",
      seriale: "Derivato",
      primario: "S"
    }
  }

  db.sequelize
    .sync()
    .then(function () {
      // con la funzione create posso direttamente passare req.body se questa è già correttamente formattata
      // db.PartcodeEbom.create(req.body)
      // posso filtrare i campi di req.body tramite fields[]

      // idproduct ha senso, come diceva il prof, collegare ad ogni ebom il prodotto a cui fa riferimento?
      //idebom: idebom, //external key for parent ebom. quale dovrebbe essere nella tabella?
      db.PartcodeEbom.create(ebomReq.body)
    })
    .then(() => {
      db.Product.create(productReq.body)
    })
    .then(() => {
      res.send("Ebom registration finished sucessfully")
    })
})

router.get('/mbomRegistration', (req, res) => {

  let date = new Date()
  //attributi prodotto
  var productReq = {
    body: {
      articolo: "VSS000799 TEST",
      progetto: "01450.015",
      approvatore: "system",
      ultimo_agg: date,
      mod_da: "mstuffo",
      // external keys necessarie
      iddetails: 1,
      idebom: 1,
      idmbom: 1

    }
  }
  //attributi ebom
  var mbomReq = {
    body: {
      idebom: 1,
      m_b: "M",
      liv: 1,
      pos: "001",
      um: "nr",
      qta: 1,
      codice: "DAS001048",
      descrizione: "descrizione primo elemento",
      fan: "N",
      //pos_pr = req.body.pos_pr,
      progetto_stock: "STOCK", //nella tabella è chiamato progetto, ma avrei una ripetizione
      note: "nessuna nota",
      seriale: "Derivato",
      primario: "S"
    }
  }

  db.sequelize
    .sync()
    .then(function () {
      db.PartcodeMbom.create(mbomReq.body)
    })
    .then(() => {
      db.Product.create(productReq.body)
    })
    .then(() => {
      res.send("Mbom registration finished sucessfully")
    })
})

// Estrazione informazioni json dal db
router.get('/realTask/:id', function (req, res) {
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

//  ########################### servizi di testing, non utilizzati ###################################################
router.get('/task1', function (req, res) {
  db.User.findAll({
    attributes: ['nome', 'cognome']
  }).then(attr => {
    res.json({
      userName: attr[0]['nome'],
      userSecondName: attr[0]['cognome']
    })
  })
})

router.get("/allusers", (req, res) => {
  console.log("get users service")
  db.User.findAll().then(usersList => {
    res.json({
      list: usersList
    })
  })
})


module.exports = router