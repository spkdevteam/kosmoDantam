

const express = require("express");
let router = express.Router();



const rolesAndPermissionContrller = require("../controller/rolesAndPermission.controller");

const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization");
const getRolesAndPermissionsWithSearchKey = require("../controller/rolesAndPermissions/getRolesAndPermissionsWithSearchKey.controller");


// # create, update, view, list,  delete RolesAndPermission by business unit routes starts here

router.post('/createRolesAndPermission', entityAuth.authorizeEntity("Administration", "Roles & Permissions", "create"), rolesAndPermissionContrller.createRolesAndPermissionByBusinessUnit);

router.put('/updateRolesAndPermission', entityAuth.authorizeEntity("Administration", "Roles & Permissions", "update"), rolesAndPermissionContrller.updateRoleAndPermissionByBusinessUnit);

router.get('/rolesAndPermission/:clientId/:roleId', entityAuth.authorizeEntity("Administration", "Roles & Permissions", "view"), rolesAndPermissionContrller.getParticularRoleAndPermissionByBusinessUnit);

router.get('/listRolesAndPermission', entityAuth.authorizeEntity("Administration", "Roles & Permissions", "view"), rolesAndPermissionContrller.listRolesAndPermission);

router.post("/softDeleteRolesAndPermission", entityAuth.authorizeEntity("Administration", "Roles & Permissions", "softDelete"), rolesAndPermissionContrller.softDeleteRolesAndPermissionByBusinesssUnit);

// router.get('/getRolesList', entityAuth.authorizeEntity("Administration", "Roles & Permissions", "view"), rolesAndPermissionContrller.getRolesList);
router.get('/getRolesList', entityAuth.commonAuthForValidToken, rolesAndPermissionContrller.getRolesList);

router.post('/togglePermissionStatus',(req,res,next)=>{console.log('hi');next()} ,rolesAndPermissionContrller.togglePermissionStatus)
.get("/getRolesAndPermissionsWithSearchKey", getRolesAndPermissionsWithSearchKey)
// router.post("/restoreRolesAndPermission", entityAuth.authorizeEntity("administration", "Roles & Permissions", "delete"), rolesAndPermissionContrller.restoreRoleAndPermissionByBusinessUnit);


// # create, update, view, list, delete RolesAndPermission by business unit routes ends here






exports.router = router;
