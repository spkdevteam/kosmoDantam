
const express = require('express')
const { createMedicalCases, updateMedicalCases, getActiveCases, deleteMedicalCases, revokeDeleteMedicalCases,toggleMedicalCases } = require('../controller/medicalCases.controller')
const { get } = require('../../model/patient')

const medHistoryRoutes = express.Router()

medHistoryRoutes
    .post('/create',createMedicalCases)
    .put('/update',updateMedicalCases)
    .get('/readActiveCases',getActiveCases)
    .delete('/delete',deleteMedicalCases) 
    .patch('/revokeDelete',revokeDeleteMedicalCases)
    .patch('/toggle',toggleMedicalCases )


module.exports = medHistoryRoutes