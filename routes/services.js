const express = require('express')

const router = express.Router()

let db = require("../models");
const Product = require('../models/product_perspective/Product');
db.sequelize.sync()

// testing a user
let aldo = {
  idsupplychainactor: "NULL",
  nome: "aldo",
  cognome: "ritmo"
}

// raw insert query not working
const createUser = (input) => {
  const sql = `
    INSERT INTO user (nome, cognome)
    VALUES ('${input.nome}', '${input.cognome}');
  `
  return db.query(sql, {
    type: db.QueryTypes.INSERT
  })
}

// services home
router.get("/", (req, res) => {
  console.log("services home")
  // rendering home.ejs
  res.render('home', { text: 'welcome to services' })
})


// add user route NOT WORKING
// router.get("/addUsers", (req, res) => {
//   console.log(aldo)
//   createUser(aldo);
//   db.User.findAll({
//     where: {
//       nome: aldo.nome,
//       cognome: aldo.cognome
//     }
//   }).then(usersList =>{
//     res.json({
//       list: usersList
//     })
//   })
// })

router.get("/registrazione", (req, res) => {
  console.log("servizio per la registrazione della distinta base e dell'anagrafica dei cicli ATV")

  // ATTRIBUTI STANDARD
  // entità codice parte: quantità, note
  // entità operazione: ispezione, tempo
  // 


})

router.get("/insertData", (req, res) => {
  res.send("testing")
  db.sequelize
    .sync({
      force: true
    })
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
        progetto_stock: "STOCK", //nella tabella è chiamato progetto, ma avrei una ripetizione
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
        progetto_stock: "STOCK", //nella tabella è chiamato progetto, ma avrei una ripetizione
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
})

router.get("/allusers", (req, res) => {
  console.log("get users service")
  db.User.findAll().then(usersList => {
    res.json({
      list: usersList
    })
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

  // var articolo = req.body.articolo,
  //     progetto = req.body.progetto,
  //     approvatore = req.body.approvatore,
  //     ultimo_agg = req.body.ultimo_agg,
  //     mod_da = req.body.mod_da,
  //     liv = req.body.liv,
  //     pos = req.body.pos,
  //     um = req.body.um,
  //     qta = req.body.qta,
  //     codice = req.body.codice,
  //     descrizione = req.body.descrizione,
  //     fan = req.body.fan,
  //     pos_pr = req.body.pos_pr,
  //     progetto_stock = req.body.progetto_stock, //nella tabella è chiamato progetto, ma avrei una ripetizione
  //     note = req.body.req.body.note,
  //     seriale = req.body.seriale,
  //     primario = req.body.primario

  let date = new Date()
  //attributi mbom
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
    .sync({
      // se metto il force a true non funziona, nel caricare azzera i dati della tabella parcodeMbom quindi cade il vincolo
      // di chiave esterna e non carica correttamente i dati. perchè?
      force: false
    })
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
      res.send("finished")
    })


})

router.post('/mbomRegistration', (res, req) => {

  let date = new Date()
  // attributi prodotto
  var articolo = "VSS000799",
    progetto = "01450.015",
    approvatore = "system",
    ultimo_agg = date,
    mod_da = "mstuffo",
    // attributi mbom
    m_b = "M",
    liv = 1,
    pos = "001",
    um = "nr",
    qta = 1,
    codice = "DAS001048",
    descrizione = "descrizione primo elemento",
    fan = "N",
    //pos_pr = req.body.pos_pr,
    progetto_stock = "STOCK", //nella tabella è chiamato progetto, ma avrei una ripetizione
    note = "nessuna nota",
    seriale = "Derivato",
    primario = "S"

  db.sequelize
    .sync({
      force: true
    })
    .then(() => {
      db.PartcodeMbom.create({
        m_b: m_b,
        liv: liv,
        pos: pos,
        um: um,
        qta: qta,
        codice: codice,
        descrizione: descrizione,
        fan: fan,
        //pos_pr: pos_pr,
        progetto_stock: progetto_stock,
        note: note,
        seriale: seriale,
        primario: primario
      })
    })
})

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


    // servizio Bertoglio tesi

    // ORDINE ATV
    // prodId (id prodotto)
    // numero pezzi (qtySched)
    // fasi
    // risorse
    // data inizio
    // data fine prevista
    // codice ITP

    // ORDINE FORNITORE ODOBEZ
    // codice articolo da produrre
    // numero pezzi
    // data richiesta di consegna
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


module.exports = router