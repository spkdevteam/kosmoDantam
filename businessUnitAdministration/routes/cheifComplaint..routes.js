const express = require('express')
const { createCComplaint,getListComplaintByPage, toggleCComplaint,deleteCComplaint,patchToggleComplaintWithPage, revokeCComplaint,getActiveCComplaint,getAllCComplaint } = require('../controller/CComplaint.controller')
const { editCComplaint } = require('../controller/CComplaint.controller')
const { toggleComplaintWithPage } = require('../services/CComplaint.service')
const ccRouter = express.Router()

ccRouter
    .post('/create',createCComplaint)
    .put('/edit',editCComplaint)
    .patch('/toggle',toggleCComplaint)
    .put('/toggleComplaintWithPage',patchToggleComplaintWithPage)
    .delete('/delete',deleteCComplaint)
    .put('/revoke',revokeCComplaint)
    .get('/readactive',getActiveCComplaint)
    .get('/ListComplaintByPage',getListComplaintByPage)
    .get('/all',getAllCComplaint)

module.exports = ccRouter