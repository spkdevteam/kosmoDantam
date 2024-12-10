

const express = require("express");
let router = express.Router();

const auth = require("../../middleware/authorization/chairAuthorization/chairAuthorization")

const employeeContrller = require("../controller/employee.controller");

const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization")


// # create, update, view, list, activate/inactive Employee routes starts here

router.post('/createEmployee', entityAuth.authorizeEntity("administration", "Employee", "create"), employeeContrller.createEmployee);

router.put('/updateEmployee', entityAuth.authorizeEntity("administration", "Employee", "update"), employeeContrller.updateEmployee);

router.get('/getEmployee/:clientId/:employeeId', entityAuth.authorizeEntity("administration", "Employee", "view"), employeeContrller.getParticularEmployee);

router.get('/listEmployee', entityAuth.authorizeEntity("administration", "Employee", "list"), employeeContrller.listEmployee);

router.post("/activeInactiveEmployee", entityAuth.authorizeEntity("administration", "Employee", "activeActive"), employeeContrller.activeinactiveEmployee);

router.post("/softDeleteEmployee", entityAuth.authorizeEntity("administration", "Employee", "softDelete"), employeeContrller.softDeleteEmployee);

// # create, update, view, list, activate/inactive Employee routes ends here




exports.router = router;
