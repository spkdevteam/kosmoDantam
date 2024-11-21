const express = require('express');
const { 
    createProcedure, 
    editProcedure, 
    deleteProcedure, 
    toggleProcedure,
    revokeProcedure ,
    getAllProcedures
} = require('../controller/procedure.controller');


const procedureRouter = express.Router();

// Procedure Routes
procedureRouter
    .post('/create', createProcedure) // Create a new procedure
    .put('/edit', editProcedure)     // Edit an existing procedure
    .delete('/delete', deleteProcedure) // Delete a procedure
    .patch('/toggleActivestatus', toggleProcedure) // Toggle a procedure's status
    .put('/revoke',revokeProcedure)
    .get('/getAllProcedures',getAllProcedures)

module.exports = procedureRouter;
