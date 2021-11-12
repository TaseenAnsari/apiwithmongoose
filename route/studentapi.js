const express = require('express');
const route = express.Router();
const model = require('../model/student')
route.get('/', (req, res) => {
    (async function () {
        const data = await model.fetchData(req.query)
        console.log(data.length)
        res.send(data);
    })()
})
route.post('/', (req, res) => {
    if (!req.body.name) res.send("Name required")
    if (!req.body.email) res.send("Email required")
    const call = async () => {
        const data = await model.saveData(req.body)
        res.send(data);
    }
    call()
})
route.put('/', (req, res) => {
    (async () => {
        const data = await model.updateData(req.query, req.body)
        res.send(data);
    })();
})

route.delete('/', (req, res) => {
    (async () => {
        const data = await model.deleteData(req.query)
        res.send(data);
    })();
})

module.exports = route;