
const express = require('express')
const deptRouter = express.Router()
const deptController = require('../controller/department.controller')

const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization")

 
deptRouter
.post('/createDepartment',deptController.createDepartment)
.put('/editDepartment',deptController.editDepartment)
.delete('/deleteDepartment',deptController.deleteDepartment)
.get('/activeDepartments',deptController.getAllActiveDepartment)
.get('/allDepartmentsByPage',deptController.getallDepartmentsByPage)
.patch('/toggleDepartment',deptController.toggleDepartments)
.put('/revokeDepartment',deptController.revokeDepartment)
.put('/toggleDepartmentWithPage',deptController.putToggleDepartmentsWithPage)

module.exports = deptRouter
