
const express = require('express')
const { getallInvestigationByPage,createInvestigation, editInvestigation, toggleInvestigation, deleteInvestigation, revokeInvestigation, getActiveInvestigation, getAllInvestigation } = require('../controller/investigation.controller')
const investigationRouter = express.Router()

investigationRouter
.post('/create',createInvestigation)
.put('/edit',editInvestigation)
.patch('/toggle',toggleInvestigation) 
.delete('/delete',deleteInvestigation )
.post('/revoke',revokeInvestigation)
.get('/getActiveInvestigation',getActiveInvestigation)
.get('/getAllInvestigation',getAllInvestigation)
.get('/allInvestigationByPage',getallInvestigationByPage)


module.exports = investigationRouter
