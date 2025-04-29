
const express = require('express')
const { createServices, getReadActiveServicesbyPage,
    editService, deleteService, readActiveServices,
    toggleService, getServiceUnderDepartment, create, update, listServices,activeinactiveService,softDeleteService,
    putToggleServiceByPage, 
    getServiceDetailsById} = require('../controller/service.controller')

const serviceRouter = express.Router()

const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization")
const getServiceDetailsWithFilters = require('../controller/Services/getServiceDetailsWithFilters.controller')
const { tempAuthorizeEntity } = require('../../middleware/authorization/commonEntityAuthorization/tempUserValidation')



serviceRouter
    .post('/createServices', entityAuth.authorizeEntity("Administration", "Services", "create"), createServices)
    .put('/editService', entityAuth.authorizeEntity("Administration", "Services", "update"), editService)
    .delete('/deleteService', entityAuth.authorizeEntity("Administration", "Services", "delete"), deleteService)
    .post('/softDeleteService', tempAuthorizeEntity("Administration", "Services", "delete"), softDeleteService)
    .get('/getAllActiveServices', readActiveServices)
    .get('/allServicesByPage', entityAuth.authorizeEntity("Administration", "Services", "view"), getReadActiveServicesbyPage)//listServices
    // .patch('/toggleService', entityAuth.authorizeEntity("Administration", "Services", "update"), toggleService)
    .patch('/activeInactiveService', entityAuth.authorizeEntity("Administration", "Services", "update"), activeinactiveService)
    .put('/toggleServiceByPage', entityAuth.authorizeEntity("Administration", "Services", "update"), putToggleServiceByPage)
    .get('/serviceUnderDepartment', getServiceUnderDepartment)
    .get('/getServiceById', getServiceDetailsById)
    .get('/getServiceDetailsWithFilters', getServiceDetailsWithFilters)


module.exports = serviceRouter