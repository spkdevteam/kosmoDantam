

const express = require("express");
let router = express.Router();



const businessUnitBranchContrller = require("../controller/branch.controller");
const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization")




// # create, update, view, list, activate/inactive, delete Branch by business unit routes starts here


router.post('/createBranch', entityAuth.authorizeEntity("Administration", "Branch", "create"), businessUnitBranchContrller.createBranchByBusinessUnit);

router.put('/updateBranch', entityAuth.authorizeEntity("Administration", "Branch", "update"), businessUnitBranchContrller.updateBranchByBusinessUnit);

router.get('/branch/:clientId/:branchId', entityAuth.authorizeEntity("Administration", "Branch", "view"), businessUnitBranchContrller.getParticularBranchByBusinessUnit);

router.get('/listBranch', entityAuth.authorizeEntity("Administration", "Branch", "view"), businessUnitBranchContrller.listBranch);

router.post("/activeInactiveBranch", entityAuth.authorizeEntity("Administration", "Branch", "update"), businessUnitBranchContrller.activeinactiveBranchByBusinessUnit);

router.post("/softDeleteBranch", entityAuth.authorizeEntity("Administration", "Branch", "softDelete"), businessUnitBranchContrller.softDeleteBranchByBusinesssUnit);

router.post("/restoreBranch", entityAuth.authorizeEntity("Administration", "Branch", "update"), businessUnitBranchContrller.restoreBranchByBusinessUnit);

router.get('/getAllActiveBranch',  businessUnitBranchContrller.getAllActiveBranch)


// # create, update, view, list, activate/inactive, delete Branch by business unit routes ends here






exports.router = router;
