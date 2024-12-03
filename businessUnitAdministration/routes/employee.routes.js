

const express = require("express");
let router = express.Router();

const auth = require("../../middleware/authorization/chairAuthorization/chairAuthorization")

const businessUnitEmployeeContrller = require("../controller/employee.controller");

const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization")


// # create, update, view, list, activate/inactive Employee by business unit routes starts here

router.post('/createEmployee', entityAuth.authorizeEntity("administration", "Employee", "create"), businessUnitEmployeeContrller.createEmployeeByBusinessUnit);

router.put('/updateEmployee', entityAuth.authorizeEntity("administration", "Employee", "update"), businessUnitEmployeeContrller.updateEmployeeByBusinessUnit);

router.get('/getEmployee/:clientId/:employeeId', entityAuth.authorizeEntity("administration", "Employee", "view"), businessUnitEmployeeContrller.getParticularEmployeeByBusinessUnit);

router.get('/listEmployee', entityAuth.authorizeEntity("administration", "Employee", "list"), businessUnitEmployeeContrller.listEmployee);

router.post("/activeInactiveEmployee", entityAuth.authorizeEntity("administration", "Employee", "activeActive"), businessUnitEmployeeContrller.activeinactiveEmployeeByBusinessUnit);


// # create, update, view, list, activate/inactive Employee by business unit routes ends here




exports.router = router;
