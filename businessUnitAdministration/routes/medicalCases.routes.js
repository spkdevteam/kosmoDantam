
const express = require('express')
const { getReadActiveCasesByPage,createMedicalCases, updateMedicalCases, getActiveCases, deleteMedicalCases, revokeDeleteMedicalCases,toggleMedicalCases } = require('../controller/medicalCases.controller')
 
const medHistoryRoutes = express.Router()

medHistoryRoutes
    .post('/create',createMedicalCases)
    .put('/update',updateMedicalCases)
    .get('/readActiveCases',getActiveCases)
    .get('/readActiveCasesByPage',getReadActiveCasesByPage)
    .delete('/delete',deleteMedicalCases) 
    .patch('/revokeDelete',revokeDeleteMedicalCases)
    .patch('/toggle',toggleMedicalCases )
module.exports = medHistoryRoutes