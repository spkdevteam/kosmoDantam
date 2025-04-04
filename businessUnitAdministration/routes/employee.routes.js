

const express = require("express");
let router = express.Router();

const auth = require("../../middleware/authorization/chairAuthorization/chairAuthorization")

const employeeContrller = require("../controller/employee.controller");

const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization");
const getEmployeeDetailsDetailsWithFilter = require("../controller/employees/getEmployeeDetailsDetailsWithFilter.controller");


// # create, update, view, list, activate/inactive Employee routes starts here

router.post('/createEmployee', entityAuth.authorizeEntity("Administration", "Employee", "create"), employeeContrller.createEmployee);

router.put('/updateEmployee', entityAuth.authorizeEntity("Administration", "Employee", "update"), employeeContrller.updateEmployee);

router.get('/getEmployee/:clientId/:employeeId', entityAuth.authorizeEntity("Administration", "Employee", "view"), employeeContrller.getParticularEmployee);

router.get('/listEmployee', entityAuth.authorizeEntity("Administration", "Employee", "view"), employeeContrller.listEmployee);

router.post("/activeInactiveEmployee", entityAuth.authorizeEntity("Administration", "Employee", "update"), employeeContrller.activeinactiveEmployee);

router.post("/softDeleteEmployee", entityAuth.authorizeEntity("Administration", "Employee", "softDelete"), employeeContrller.softDeleteEmployee);
router.get('/getEmployeelist/:clientId/:branchId/:role',  employeeContrller.listEmployeebyBranchId);
router.get('/getEmployeeDetailsDetailsWithFilter',  getEmployeeDetailsDetailsWithFilter);

// # create, update, view, list, activate/inactive Employee routes ends here




exports.router = router;
