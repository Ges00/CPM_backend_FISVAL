var db = require("../models");
var passport = require("../config/passport");

// NOT WORKING

module.exports = function (app) {
    app.set('view engine', 'ejs');

    app.get('/', function (req, res) {
        db.User.findAll().then(usersList => {
            res.json({
                list: usersList
            });
        });
        // res.render('index');
    });

    app.get('/apis/authentication/login', function (req, res){
        res.json({
            prodId:"",
            prodStatus:"",
            qty:"",
            itemId:"",
            itemName:"",
            operationId:"",
            oprName:"",
            oprNumNext:"",
            oprFinished:"",
            queuetimeBefore:"",
            setupTime:"",
            processPerQty:"",
            transProcessTime:"",
            queueTimeAfter:"",
            toHours:"",
            wrkCtrGroupId:"",
            vendorArrivalDate:"",
            projId:"",
            projectDeliveryDate:"",
        })
    })
}