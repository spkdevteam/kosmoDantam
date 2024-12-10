
const express = require('express')
const deptRouter = express.Router()
const deptController = require('../controller/department.controller')

const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization")


deptRouter
    .post('/createDepartment', entityAuth.authorizeEntity("administration", "Department", "create"), deptController.createDepartment)
    .put('/editDepartment', entityAuth.authorizeEntity("administration", "Department", "update"), deptController.editDepartment)
    .delete('/deleteDepartment', deptController.deleteDepartment)
    .post('/softDeleteDepartment', deptController.softDeleteDepartment)
    .get('/activeDepartments', deptController.getAllActiveDepartment)
    .get('/allDepartmentsByPage', entityAuth.authorizeEntity("administration", "Department", "list"), deptController.listDepartment)
    // .patch('/toggleDepartment', deptController.toggleDepartments)
    .patch('/activeInactiveDepartment', entityAuth.authorizeEntity("administration", "Department", "update"), deptController.activeinactiveDepartment)
    .put('/revokeDepartment', deptController.revokeDepartment)
    .put('/toggleDepartmentWithPage', deptController.putToggleDepartmentsWithPage)

module.exports = deptRouter
