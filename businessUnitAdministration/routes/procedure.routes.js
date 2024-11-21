
const express = require('express')  
const { createProcedure,editProcedure,deleteProcedure,toggleProcedure } = require('../controller/procedure.controller')
const procedureRouter = express.Router()

procedureRouter.post('/createProcedure',createProcedure) 
procedureRouter.put('/editProcedure',editProcedure)  
procedureRouter.delete('/deleteProcedure',deleteProcedure)
procedureRouter.patch('/toggleProcedure',toggleProcedure)


module.exports = procedureRouter