
const express = require('express')
const { createServices, getReadActiveServicesbyPage,editService, deleteService,readActiveServices,toggleService,getServiceUnderDepartment,getProcedureUnderService } = require('../controller/service.controller')

const serviceRouter = express.Router()



serviceRouter
    .post('/createServices',createServices)
    .put('/editService',editService )
    .delete('/deleteService',deleteService )
    .get('/getAllActiveServices',readActiveServices)
    .get('/allServicesByPage',getReadActiveServicesbyPage)
    .patch('/toggleService',toggleService)
    .get('/serviceUnderDepartment',getServiceUnderDepartment)
    

module.exports = serviceRouter