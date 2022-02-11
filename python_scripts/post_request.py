import requests
import json

ebom ={
    "liv": 1,
    "pos": "pos1",
    "um": "metri",
    "qta": 12,
    "codice": "APOSOVO93",
    "descrizione": "descrizione test",
    "fan": "fan test",
    "progetto_stock": "STOCK",
    "note": "note",
    "seriale": "dofi438hv",
    "primario": "prim",
    "articolo": "fsdfd",
    "progetto": "prog1",
    "approvatore": "approvato",
    "mod_da": "modif"}


#ebomJson=json.dumps(ebom)
#print(ebomJson)
#r = requests.get("http://localhost:4000/services/ciao")
#r = requests.post("http://localhost:4000/services/ebomGETPOST", (ebom))
r = requests.post("http://localhost:4000/services/ebomJsonPOST", (ebom))


print(r)

