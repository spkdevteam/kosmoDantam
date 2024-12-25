const prescriptionController = require('../controller/preScription.controller')
const express = require('express')
const preScriptionRouter = express.Router()

preScriptionRouter
    .post('/create',prescriptionController.create)//   input => branchId,buid,clientId,doctorId,drugCode,dosage,freequency,duration,notes
    .delete('/delete',prescriptionController.deletePreScription)
    .patch('/edit',prescriptionController.editPrescription)
    .patch('/toggle',prescriptionController.togglePrescription)
    .get('/readPrescription',prescriptionController.readPrescription)


module.exports = preScriptionRouter