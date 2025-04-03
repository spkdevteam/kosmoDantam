const express = require('express');
const { 
    createProcedure, 
    editProcedure, 
    deleteProcedure, 
    toggleProcedure,
    revokeProcedure ,
    getAllProcedures,
    getProcedureUnderService,
    getAllProceduresByPage,
    putToggleProcedureByPage
} = require('../controller/procedure.controller');
const getProcedureDetailsWithFilters = require('../controller/procedure/getProcedureDetailsWithFilters.controller');
const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization");


const procedureRouter = express.Router();

// Procedure Routes
procedureRouter
    .post('/create', entityAuth.authorizeEntity("Administration", "Procedures", "create"), createProcedure) 
    .put('/edit', entityAuth.authorizeEntity("Administration", "Procedures", "update"), editProcedure)     
    .delete('/delete', entityAuth.authorizeEntity("Administration", "Procedures", "delete"), deleteProcedure) 
    .patch('/toggleActivestatus', entityAuth.authorizeEntity("Administration", "Procedures", "update"), toggleProcedure) 
    .put('/toggleProcedureByPage', entityAuth.authorizeEntity("Administration", "Procedures", "update"), putToggleProcedureByPage)
    .put('/revoke',revokeProcedure)
    .get('/getAllProcedures',getAllProcedures)
    .get('/proceduresByPage',getAllProceduresByPage)
    .get('/procedureUnderService',getProcedureUnderService)
    .get('/getProcedureDetailsWithFilters',getProcedureDetailsWithFilters)
module.exports = procedureRouter;
