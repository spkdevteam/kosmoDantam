

const express = require("express");
let router = express.Router();



const businessUnitBranchContrller = require("../controller/branch.controller");



// # create, update, view, list, activate/inactive, delete Branch by business unit routes starts here


router.post('/createBranch', businessUnitBranchContrller.createBranchByBusinessUnit);

router.put('/updateBranch', businessUnitBranchContrller.updateBranchByBusinessUnit);

router.get('/branch/:clientId/:branchId', businessUnitBranchContrller.getParticularBranchByBusinessUnit);

router.get('/listBranch', businessUnitBranchContrller.listBranch);

router.post("/activeInactiveBranch", businessUnitBranchContrller.activeinactiveBranchByBusinessUnit);

router.post("/softDeleteBranch", businessUnitBranchContrller.softDeleteBranchByBusinesssUnit);

router.post("/restoreBranch", businessUnitBranchContrller.restoreBranchByBusinessUnit);



// # create, update, view, list, activate/inactive, delete Branch by business unit routes ends here






exports.router = router;
