const express = require('express')
const { createFindings, editFindings,putToggleFindingsByPage,
    toggleFindings,deleteFindings,revokeFindings,readAllFindings,
    getReadAllFindingsByPage } = require('../controller/findings.controller')
const findingsRouter = express.Router()

findingsRouter
    .post('/create',createFindings)
    .post('/edit',editFindings)
    .post('/toggleFindings',toggleFindings)
    .delete('/delete',deleteFindings)
    .put('/revokeDeletedFindings',revokeFindings)
    .get('/',readAllFindings)
    .get('/readAllFindingsByPage',getReadAllFindingsByPage)
    .put('/toggleFindingsByPage',putToggleFindingsByPage)


module.exports = findingsRouter