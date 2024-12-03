
const express = require('express')
const { createServices, getReadActiveServicesbyPage,
    editService, deleteService,readActiveServices,
    toggleService,getServiceUnderDepartment,
    putToggleServiceByPage } = require('../controller/service.controller')

const serviceRouter = express.Router()



serviceRouter
    .post('/createServices',createServices)
    .put('/editService',editService )
    .delete('/deleteService',deleteService )
    .get('/getAllActiveServices',readActiveServices)
    .get('/allServicesByPage',getReadActiveServicesbyPage)
    .patch('/toggleService',toggleService)
    .put('/toggleServiceByPage',putToggleServiceByPage)
    .get('/serviceUnderDepartment',getServiceUnderDepartment)
    

module.exports = serviceRouter