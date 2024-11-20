
const express = require('express')
const { createServices, editService, deleteService,readActiveServices } = require('../controller/service.controller')

const serviceRouter = express.Router()



serviceRouter.post('/createServices',createServices)
serviceRouter.put('/editService',editService )
serviceRouter.delete('/deleteService',deleteService )
serviceRouter.get('/getAllActiveServices',readActiveServices)

module.exports = serviceRouter