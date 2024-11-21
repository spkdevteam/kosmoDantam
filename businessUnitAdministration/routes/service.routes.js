
const express = require('express')
const { createServices, editService, deleteService,readActiveServices,toggleService } = require('../controller/service.controller')

const serviceRouter = express.Router()



serviceRouter.post('/createServices',createServices)
serviceRouter.put('/editService',editService )
serviceRouter.delete('/deleteService',deleteService )
serviceRouter.get('/getAllActiveServices',readActiveServices)
serviceRouter.patch('/toggleService',toggleService)

module.exports = serviceRouter