

const express = require("express");
let router = express.Router();



const businessUnitBranchContrller = require("../controller/branch.controller");
const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization")




// # create, update, view, list, activate/inactive, delete Branch by business unit routes starts here


router.post('/createBranch', entityAuth.authorizeEntity("Branch", "create"), businessUnitBranchContrller.createBranchByBusinessUnit);

router.put('/updateBranch', entityAuth.authorizeEntity("Branch", "update"), businessUnitBranchContrller.updateBranchByBusinessUnit);

router.get('/branch/:clientId/:branchId', entityAuth.authorizeEntity("Branch", "create"), businessUnitBranchContrller.getParticularBranchByBusinessUnit);

router.get('/listBranch', entityAuth.authorizeEntity("Branch", "create"), businessUnitBranchContrller.listBranch);

router.post("/activeInactiveBranch", entityAuth.authorizeEntity("Branch", "create"), businessUnitBranchContrller.activeinactiveBranchByBusinessUnit);

router.post("/softDeleteBranch", entityAuth.authorizeEntity("Branch", "create"), businessUnitBranchContrller.softDeleteBranchByBusinesssUnit);

router.post("/restoreBranch", entityAuth.authorizeEntity("Branch", "create"), businessUnitBranchContrller.restoreBranchByBusinessUnit);



// # create, update, view, list, activate/inactive, delete Branch by business unit routes ends here






exports.router = router;
