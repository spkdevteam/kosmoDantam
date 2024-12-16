
const express = require('express')
const { createServices, getReadActiveServicesbyPage,
    editService, deleteService, readActiveServices,
    toggleService, getServiceUnderDepartment, create, update, listServices,activeinactiveService,softDeleteService,
    putToggleServiceByPage } = require('../controller/service.controller')

const serviceRouter = express.Router()

const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization")



serviceRouter
    .post('/createServices', entityAuth.authorizeEntity("Administration", "Services", "create"), createServices)
    .put('/editService', entityAuth.authorizeEntity("Administration", "Services", "update"), editService)
    .delete('/deleteService', deleteService)
    .post('/softDeleteService', softDeleteService)
    .get('/getAllActiveServices', readActiveServices)
    .get('/allServicesByPage', entityAuth.authorizeEntity("Administration", "Services", "list"), listServices)
    // .patch('/toggleService', entityAuth.authorizeEntity("Administration", "Services", "update"), toggleService)
    .patch('/activeInactiveService', entityAuth.authorizeEntity("Administration", "Services", "update"), activeinactiveService)

    .put('/toggleServiceByPage', putToggleServiceByPage)
    .get('/serviceUnderDepartment', getServiceUnderDepartment)


module.exports = serviceRouter