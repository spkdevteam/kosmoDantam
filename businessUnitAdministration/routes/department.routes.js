
const express = require('express')
const deptRouter = express.Router()
const deptController = require('../controller/department.controller')

const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization")
const getDepartmentWithFilters = require('../controller/department/getDepartmentWithFilters.controller')
const { tempAuthorizeEntity } = require('../../middleware/authorization/commonEntityAuthorization/tempUserValidation')


deptRouter
    .post('/createDepartment', entityAuth.authorizeEntity("Administration", "Department", "create"), deptController.createDepartment)
    .put('/editDepartment', entityAuth.authorizeEntity("Administration", "Department", "update"), deptController.editDepartment)
    .delete('/deleteDepartment', entityAuth.authorizeEntity("Administration", "Department", "delete"), deptController.deleteDepartment)
    .post('/softDeleteDepartment', tempAuthorizeEntity("Administration", "Department", "delete"), deptController.softDeleteDepartment)
    .get('/activeDepartments', deptController.getAllActiveDepartment)
    .get('/allDepartmentsByPage', entityAuth.authorizeEntity("Administration", "Department", "view"), deptController.getallDepartmentsByPage)
    // .patch('/toggleDepartment', deptController.toggleDepartments)
    .patch('/activeInactiveDepartment', entityAuth.authorizeEntity("Administration", "Department", "update"), deptController.activeinactiveDepartment)
    .put('/revokeDepartment', entityAuth.authorizeEntity("Administration", "Department", "update"), deptController.revokeDepartment)
    .put('/toggleDepartmentWithPage', entityAuth.authorizeEntity("Administration", "Department", "update"), deptController.putToggleDepartmentsWithPage)
    .get('/getDepartmentById',deptController.getDepartmentById)
    .get('/getDepartmentDetailsWithFilters', getDepartmentWithFilters)

module.exports = deptRouter
