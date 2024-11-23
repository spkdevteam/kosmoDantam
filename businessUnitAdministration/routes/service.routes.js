
const express = require('express')
const { createServices, editService, deleteService,readActiveServices,toggleService } = require('../controller/service.controller')

const serviceRouter = express.Router()



serviceRouter
    .post('/createServices',createServices)
    .put('/editService',editService )
    .delete('/deleteService',deleteService )
    .get('/getAllActiveServices',readActiveServices)
    .patch('/toggleService',toggleService)

module.exports = serviceRouter