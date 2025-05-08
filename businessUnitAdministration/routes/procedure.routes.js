const express = require('express');
const {
    createProcedure,
    editProcedure,
    deleteProcedure,
    toggleProcedure,
    revokeProcedure,
    getAllProcedures,
    getProcedureUnderService,
    getAllProceduresByPage,
    putToggleProcedureByPage
} = require('../controller/procedure.controller');
const getProcedureDetailsWithFilters = require('../controller/procedure/getProcedureDetailsWithFilters.controller');
const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization");
const { tempAuthorizeEntity } = require('../../middleware/authorization/commonEntityAuthorization/tempUserValidation');
const postCreateBulkProceduresCTRL = require('../controller/procedure/postCreateBulkProceduresCTRL.controller');


const procedureRouter = express.Router();

// Procedure Routes
procedureRouter
    .post('/create', tempAuthorizeEntity("Administration", "Procedures", "create"), createProcedure)
    .put('/edit', tempAuthorizeEntity("Administration", "Procedures", "create"), editProcedure)     //entityAuth.authorizeEntity("Administration", "Procedures", "update")
    .delete('/delete', tempAuthorizeEntity("Administration", "Procedures", "delete"), deleteProcedure)
    .patch('/toggleActivestatus', tempAuthorizeEntity("Administration", "Procedures", "update"), toggleProcedure)
    .put('/toggleProcedureByPage', tempAuthorizeEntity("Administration", "Procedures", "update"), putToggleProcedureByPage)
    .put('/revoke', revokeProcedure)
    .get('/getAllProcedures', getAllProcedures)
    .get('/proceduresByPage', getAllProceduresByPage)
    .get('/procedureUnderService', getProcedureUnderService)
    .get('/getProcedureDetailsWithFilters', getProcedureDetailsWithFilters)
    .post('/createBulkProcedures',
        tempAuthorizeEntity("Administration", "Procedures", "create"),
        postCreateBulkProceduresCTRL)
module.exports = procedureRouter;