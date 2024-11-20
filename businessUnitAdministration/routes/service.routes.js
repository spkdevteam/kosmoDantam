
const express = require('express')
const { createSerices } = require('../controller/service.controller')
const serviceRouter = express.Router()



serviceRouter.post('/createServices',createSerices)

module.exports = serviceRouter