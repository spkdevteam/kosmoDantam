const prescriptionController = require('../controller/preScription.controller')
const express = require('express')
const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization");


const preScriptionRouter = express.Router()

preScriptionRouter
    .post('/create',prescriptionController.create)//   input => branchId,buid,clientId,doctorId,drugCode,dosage,freequency,duration,notes
    .delete('/delete',prescriptionController.deletePreScription)
    .patch('/edit',prescriptionController.editPrescription)
    .patch('/toggle',prescriptionController.togglePrescription)
    //.get('/readPrescriptionwithPagination',prescriptionController.readPrescription)


module.exports = preScriptionRouter