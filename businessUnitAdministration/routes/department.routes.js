
const express = require('express')
const deptRouter = express.Router()
const deptController = require('../controller/department.controller')

 
deptRouter
.post('/createDepartment',deptController.createDepartment)
.put('/editDepartment',deptController.editDepartment)
.delete('/deleteDepartment',deptController.deleteDepartment)
.get('/activeDepartments',deptController.getAllActiveDepartment)
.patch('/toggleDepartment',deptController.toggleDepartments)
.put('/revokeDepartment',deptController.revokeDepartment)
module.exports = deptRouter
