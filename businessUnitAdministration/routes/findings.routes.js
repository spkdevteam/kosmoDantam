const express = require('express')
const { createFindings, editFindings,toggleFindings,deleteFindings,revokeFindings } = require('../controller/findings.controller')
const findingsRouter = express.Router()

findingsRouter
    .post('/create',createFindings)
    .post('/edit',editFindings)
    .post('/toggleFindings',toggleFindings)
    .delete('/delete',deleteFindings)
    .put('/revokeDeletedFindings',revokeFindings)


module.exports = findingsRouter