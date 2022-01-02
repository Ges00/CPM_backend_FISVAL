const express = require('express')
// utilizzo un router per avere una mini-app 
// gestita in questo file, ed isolata dal resto
// così da non avere un file server.js enorme.
// lavora esattamente come app, quindi ha sia get che post che altre funzioni
const router = express.Router()

router.get('/', (req, res) => {
    res.send('User List')
})

router.get('/new', (req, res) => {
    res.send('User New Form')
})

router.get("/:id", (req, res) => {
    res.send(`get User with ID ${req.params.id}`)
})

// possible commands to route: use, get, post, put, delete, route

router
    .route("/:id")
    .get((req, res) => {
        res.send(`get User with ID ${req.params.id}`)
    })
    .put((req, res) => { 
        res.send(`update User with ID ${req.params.id}`) 
    })
    .delete((req, res) => { 
        res.send(`delete User with ID ${req.params.id}`) 
    })

module.exports = router
