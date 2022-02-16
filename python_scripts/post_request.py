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
    "mod_da": "modif"}

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
    "mod_da": "modif"}

# aggiungere quantità per ogni order item?
sales_order = {
    "vendorArrivalDate": "2022-02-11 14:42:29",
    "projId": 2,
    "projDeliveryDate": "2022-02-16 14:42:29",
    "idclient": 1,
    "orderItem1":
        [
            1,
            "name 1",
            1,
            1
        ],
    "orderItem2":
        [
            2,
            "name 2",
            1,
            1
        ],
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

# ebomJson=json.dumps(ebom)
# print(ebomJson)
# r = requests.get("http://localhost:4000/services/ciao")
# r = requests.post("http://localhost:4000/services/ebomGETPOST", (ebom))
# rEbom = requests.post("http://localhost:4000/services/ebomJsonPOST", (ebom))
#rMbom = requests.post("http://localhost:4000/services/mbomJsonPOST", (mbom))
rSalesOrder = requests.post("http://localhost:4000/services/salesORderRegistration", (sales_order))

#print(sales_order["orderItems"][1])
print(rSalesOrder)