const express = require('express')

const router = express.Router()

let db = require("../models");
db.sequelize.sync()

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
  console.log("services hom")
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

router.get("/allusers", (req, res) => {
  console.log("get users service")
  db.User.findAll().then(usersList => {
    res.json({
      list: usersList
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