
const express = require('express')
const { createServices, getReadActiveServicesbyPage,
    editService, deleteService, readActiveServices,
    toggleService, getServiceUnderDepartment, create, update, listServices,activeinactiveService,softDeleteService,
    putToggleServiceByPage } = require('../controller/service.controller')

const serviceRouter = express.Router()

const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization")



serviceRouter
    .post('/createServices', entityAuth.authorizeEntity("administration", "Services", "create"), create)
    .put('/editService', entityAuth.authorizeEntity("administration", "Services", "update"), update)
    .delete('/deleteService', deleteService)
    .post('/softDeleteService', softDeleteService)
    .get('/getAllActiveServices', readActiveServices)
    .get('/allServicesByPage', entityAuth.authorizeEntity("administration", "Services", "list"), listServices)
    // .patch('/toggleService', entityAuth.authorizeEntity("administration", "Services", "update"), toggleService)
    .patch('/activeInactiveService', entityAuth.authorizeEntity("administration", "Services", "update"), activeinactiveService)

    .put('/toggleServiceByPage', putToggleServiceByPage)
    .get('/serviceUnderDepartment', getServiceUnderDepartment)


module.exports = serviceRouter