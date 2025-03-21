
const express = require('express')
const deptRouter = express.Router()
const deptController = require('../controller/department.controller')

const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization")


deptRouter
    .post('/createDepartment', entityAuth.authorizeEntity("Administration", "Department", "create"), deptController.createDepartment)
    .put('/editDepartment', entityAuth.authorizeEntity("Administration", "Department", "update"), deptController.editDepartment)
    .delete('/deleteDepartment', deptController.deleteDepartment)
    .post('/softDeleteDepartment', deptController.softDeleteDepartment)
    .get('/activeDepartments', deptController.getAllActiveDepartment)
    .get('/allDepartmentsByPage', entityAuth.authorizeEntity("Administration", "Department", "view"), deptController.getallDepartmentsByPage)
    // .patch('/toggleDepartment', deptController.toggleDepartments)
    .patch('/activeInactiveDepartment', entityAuth.authorizeEntity("Administration", "Department", "update"), deptController.activeinactiveDepartment)
    .put('/revokeDepartment', deptController.revokeDepartment)
    .put('/toggleDepartmentWithPage', deptController.putToggleDepartmentsWithPage)
    .get('/getDepartmentById',deptController.getDepartmentById)

module.exports = deptRouter
