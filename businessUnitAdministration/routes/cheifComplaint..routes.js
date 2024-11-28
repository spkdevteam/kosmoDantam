const express = require('express')
const { createCComplaint, toggleCComplaint,deleteCComplaint, revokeCComplaint,getActiveCComplaint,getAllCComplaint } = require('../controller/CComplaint.controller')
const { editCComplaint } = require('../controller/CComplaint.controller')
const ccRouter = express.Router()

ccRouter
    .post('/create',createCComplaint)
    .put('/edit',editCComplaint)
    .patch('/toggle',toggleCComplaint)
    .delete('/delete',deleteCComplaint)
    .put('/revoke',revokeCComplaint)
    .get('/readactive',getActiveCComplaint)
    .get('/all',getAllCComplaint)

module.exports = ccRouter