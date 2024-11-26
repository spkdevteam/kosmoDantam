const express = require('express');
const { 
    createProcedure, 
    editProcedure, 
    deleteProcedure, 
    toggleProcedure,
    revokeProcedure ,
    getAllProcedures,
    getProcedureUnderService
} = require('../controller/procedure.controller');


const procedureRouter = express.Router();

// Procedure Routes
procedureRouter
    .post('/create', createProcedure) 
    .put('/edit', editProcedure)     
    .delete('/delete', deleteProcedure) 
    .patch('/toggleActivestatus', toggleProcedure) 
    .put('/revoke',revokeProcedure)
    .get('/getAllProcedures',getAllProcedures)
    .get('/procedureUnderService',getProcedureUnderService)
module.exports = procedureRouter;
