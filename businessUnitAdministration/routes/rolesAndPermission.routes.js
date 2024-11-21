

const express = require("express");
let router = express.Router();



const businessUnitHeadRolesAndPermissionContrller = require("../controller/rolesAndPermission.controller");



// # create, update, view, list,  delete RolesAndPermission by business unit routes starts here

router.post('/createRolesAndPermission', businessUnitHeadRolesAndPermissionContrller.createRolesAndPermissionByBusinessUnit);

router.put('/updateRolesAndPermission', businessUnitHeadRolesAndPermissionContrller.updateRoleAndPermissionByBusinessUnit);

router.get('/RolesAndPermission/:clientId/:roleId', businessUnitHeadRolesAndPermissionContrller.getParticularRoleAndPermissionByBusinessUnit);

router.get('/listRolesAndPermission', businessUnitHeadRolesAndPermissionContrller.listRolesAndPermission);

router.post("/softDeleteRolesAndPermission", businessUnitHeadRolesAndPermissionContrller.softDeleteRolesAndPermissionByBusinesssUnit);

router.post("/restoreRolesAndPermission", businessUnitHeadRolesAndPermissionContrller.restoreRoleAndPermissionByBusinessUnit);


// # create, update, view, list, delete RolesAndPermission by business unit routes ends here






exports.router = router;
