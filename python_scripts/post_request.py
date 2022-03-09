import requests
import json

ebom = {
    "liv": 1,
    "pos": "pos1",
    "um": "metri",
    "qta": 12,
    "codice": "APOSOVO93",
    "descrizione": "descrizione test",
    "fan": "fan test",
    #pos_pr = "",
    "progetto_stock": "STOCK",
    "note": "note",
    "seriale": "dofi438hv",
    "primario": "prim",
    "articolo": "fsdfd",
    "progetto": "prog1",
    "approvatore": "approvato",
    "mod_da": "modif",
    "idproduct": 1 #ext key
    } 

mbom = {
    "idebom": 1,
    "m_b": "M",
    "liv": 1,
    "pos": "pos1",
    "um": "metri",
    "qta": 12,
    "codice": "APOSOVO93",
    "descrizione": "descrizione test",
    "fan": "fan test",
    #pos_pr = "",
    "progetto_stock": "STOCK",
    "note": "note",
    "seriale": "dofi438hv",
    "primario": "prim",
    "articolo": "fsdfd",
    "progetto": "prog1",
    "approvatore": "approvato",
    "mod_da": "modif"
    }

# aggiungere quantità per ogni order item?
sales_order = {
    "vendorArrivalDate": "2022-02-11 14:42:29",
    "projId": 2,
    "projDeliveryDate": "2022-02-16 14:42:29",
    "idclient": 1,
    "orderItem1":
        [
            1,  #itemId
            "name 1",   #itemName
            1,  #idsalesorder
            1   #idproduct
        ],
    "orderItem2":
        [
            2,  #itemId
            "name 2",   #itemName
            1,  #idsalesorder
            1   #idproduct
        ],
}

# salvare i time come double??
# json per servizio notifyProductionOrder
production_order = {
    "prodId": "ODP0004706",#
    "itemId": "DSI004919",#
    "itemName": "CYLINDER PIN",#
    "qtySched": 4.0000000000000000,#
    "prodStatus": 4,
    "projId": "00717.061",
    "oprNum": 20,
    "oprId": "863",
    "oprName": "TORNIRE A DISEGNO -E-",
    "oprNumNext": 30,
    "oprFinished": 0,
    "queueTimeBefore": 0.0000000000000000,
    "setupTime": 0.2000000000000000,
    "processTime": 0.3000000000000000,
    "processPerQty": 1.0000000000000000,
    "transPTime": 72.0000000000000000,
    "queueTimeAfter": 0.0000000000000000,
    "toHours": 1.0000000000000000,
    "wrkCtrGroupId": "01ALAVEST",                          
    "projectDeliveryDate": "2045-12-31T00:00:00+01:00",#
    "vendorArrivalDate": "2022-12-31T00:00:00+01:00",##   
    "vendorName": "test vendor",
    "isExternal": "0/1",
  }

# prima di passare la richiesta con request riesco ad individuare
# gli elementi all'interno di orderItems, ma una volta inviata la richiesta
# in JS non vede orderItems come una array di due elementi ma come un
# array di 6 elementi, raggruppando tutti i campi in un unico array
sales_order_right = {
    "vendorArrivalDate": "2022-02-11 14:42:29",
    "projId": 2,
    "projDeliveryDate": "2022-02-16 14:42:29",
    "idclient": 1,
    "orderItems": [
        {
            "itemId": 1,
            "itemName": "name 1",
            "idsalesorder": 1,
            "idproduct": 1
        },
        {
            "itemId": 2,
            "itemName": "name 2",
            "idsalesorder": 1,
            "idproduct": 1
        },
    ]
}

sales_order_test = {
    "vendorArrivalDate": "2022-02-11 14:42:29",
    "projId": 2,
    "projDeliveryDate": "2022-02-16 14:42:29",
    "idclient": 1,
    "orderItems": [
        {
            1,
            "name 1",
            1,
            1
        },
        {
            2,
            "name 2",
            1,
            1
        },
    ]
}

#rEbom = requests.post("http://localhost:4000/services/ebomJsonPOST", (ebom))
#rMbom = requests.post("http://localhost:4000/services/mbomJsonPOST", (mbom))
#rSalesOrder = requests.post("http://localhost:4000/services/salesORderRegistration", (sales_order))
rProdOrder = requests.post("http://localhost:4000/services/notifyProductionOrder", (production_order))
#testjson = requests.post("http://localhost:4000/services/testjson", (sales_order_test))
#print(testjson)