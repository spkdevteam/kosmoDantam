
const express = require('express')
const { createServices, editService, deleteService,readActiveServices,toggleService,getServiceUnderDepartment,getProcedureUnderService } = require('../controller/service.controller')

const serviceRouter = express.Router()



serviceRouter
    .post('/createServices',createServices)
    .put('/editService',editService )
    .delete('/deleteService',deleteService )
    .get('/getAllActiveServices',readActiveServices)
    .patch('/toggleService',toggleService)
    .get('/serviceUnderDepartment',getServiceUnderDepartment)
    

module.exports = serviceRouter