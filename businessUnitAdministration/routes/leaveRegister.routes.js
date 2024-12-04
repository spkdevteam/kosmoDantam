


const express = require('express')
const { postSaveLeaveRequest, 
    putEditLeaveApplication, 
    deleteLeaveApplication, 
    postToggleLeaveApplication,
    getReadActiveApplications, 
    getAllLeaveApplicationByPage,
    postToggleLeaveApplicationByPage} = require('../controller/leaveRegister.controller')

 
const leaveRouter = express.Router()

leaveRouter
    .post('/applyLeave',postSaveLeaveRequest)
    .put('/editLeaveApplication',putEditLeaveApplication)
    .delete('/deleteLeaveApplication',deleteLeaveApplication )
    .patch('/toggleLeaveApplication',postToggleLeaveApplication)
    .post('/toggleWithPage',postToggleLeaveApplicationByPage)
    .get('/readActiveApplications',getReadActiveApplications)
    .get('/readActiveApplicationswithPage',getAllLeaveApplicationByPage)
// /api/client/bu/leave
module.exports = leaveRouter