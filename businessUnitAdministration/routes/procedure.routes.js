
const express = require('express')  
const { createProcedure,editProcedure,deleteProcedure } = require('../controller/procedure.controller')
const procedureRouter = express.Router()

procedureRouter.post('/createProcedure',createProcedure) 
procedureRouter.put('/editProcedure',editProcedure)  
procedureRouter.delete('/deleteProcedure',deleteProcedure)

module.exports = procedureRouter