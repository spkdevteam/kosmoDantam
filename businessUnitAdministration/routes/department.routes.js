
const express = require('express')
const deptRouter = express.Router()
const deptController = require('../controller/department.controller')

 
deptRouter.post('/createDepartment',deptController.createDepartment)
deptRouter.put('/editDepartment',deptController.editDepartment)
deptRouter.delete('/deleteDepartment',deptController.deleteDepartment)
deptRouter.get('/activeDepartments',deptController.getAllActiveDepartment)
module.exports = deptRouter
