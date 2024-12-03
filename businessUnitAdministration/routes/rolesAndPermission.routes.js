

const express = require("express");
let router = express.Router();



const rolesAndPermissionContrller = require("../controller/rolesAndPermission.controller");

const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization")


// # create, update, view, list,  delete RolesAndPermission by business unit routes starts here

router.post('/createRolesAndPermission', entityAuth.authorizeEntity("administration", "Roles & Permissions", "create"), rolesAndPermissionContrller.createRolesAndPermissionByBusinessUnit);

router.put('/updateRolesAndPermission', entityAuth.authorizeEntity("administration", "Roles & Permissions", "update"), rolesAndPermissionContrller.updateRoleAndPermissionByBusinessUnit);

router.get('/rolesAndPermission/:clientId/:roleId', entityAuth.authorizeEntity("administration", "Roles & Permissions", "view"), rolesAndPermissionContrller.getParticularRoleAndPermissionByBusinessUnit);

router.get('/listRolesAndPermission', entityAuth.authorizeEntity("administration", "Roles & Permissions", "view"), rolesAndPermissionContrller.listRolesAndPermission);

router.post("/softDeleteRolesAndPermission", entityAuth.authorizeEntity("administration", "Roles & Permissions", "delete"), rolesAndPermissionContrller.softDeleteRolesAndPermissionByBusinesssUnit);

router.post("/restoreRolesAndPermission", entityAuth.authorizeEntity("administration", "Roles & Permissions", "delete"), rolesAndPermissionContrller.restoreRoleAndPermissionByBusinessUnit);


// # create, update, view, list, delete RolesAndPermission by business unit routes ends here






exports.router = router;
