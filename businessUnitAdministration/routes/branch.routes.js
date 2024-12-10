

const express = require("express");
let router = express.Router();



const businessUnitBranchContrller = require("../controller/branch.controller");
const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization")




// # create, update, view, list, activate/inactive, delete Branch by business unit routes starts here


router.post('/createBranch', entityAuth.authorizeEntity("administration", "Branch", "create"), businessUnitBranchContrller.createBranchByBusinessUnit);

router.put('/updateBranch', entityAuth.authorizeEntity("administration", "Branch", "update"), businessUnitBranchContrller.updateBranchByBusinessUnit);

router.get('/branch/:clientId/:branchId', entityAuth.authorizeEntity("administration", "Branch", "view"), businessUnitBranchContrller.getParticularBranchByBusinessUnit);

router.get('/listBranch', entityAuth.authorizeEntity("administration", "Branch", "list"), businessUnitBranchContrller.listBranch);

router.post("/activeInactiveBranch", entityAuth.authorizeEntity("administration", "Branch", "activeActive"), businessUnitBranchContrller.activeinactiveBranchByBusinessUnit);

router.post("/softDeleteBranch", entityAuth.authorizeEntity("administration", "Branch", "softDelete"), businessUnitBranchContrller.softDeleteBranchByBusinesssUnit);

router.post("/restoreBranch", entityAuth.authorizeEntity("administration", "Branch", "hardDelete"), businessUnitBranchContrller.restoreBranchByBusinessUnit);

router.get('/getAllActiveBranch', entityAuth.authorizeEntity("administration", "Branch", "list"), businessUnitBranchContrller.getAllActiveBranch)


// # create, update, view, list, activate/inactive, delete Branch by business unit routes ends here






exports.router = router;
