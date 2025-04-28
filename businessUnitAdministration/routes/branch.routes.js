

const express = require("express");
let router = express.Router();

const statusCode = require("../../utils/http-status-code")


const businessUnitBranchContrller = require("../controller/branch.controller");
const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization");
const { uploadBranch } = require("../../utils/multer");
const getBranchDetailsctrl = require("../controller/branches/getBranchDetailsctrl");




// # create, update, view, list, activate/inactive, delete Branch by business unit routes starts here


router.post('/createBranch', entityAuth.authorizeEntity("Administration", "Branch", "create"), (req, res, next) => {
    uploadBranch.single("file")(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                return res.status(statusCode.BadRequest).send({
                    message: 'File too large. Maximum file size allowed is 1 MB.'
                });
            } else {
                console.error('Multer Error:', err.message);
                return res.status(statusCode.BadRequest).send({
                    message: err.message
                });
            }
        }
        next();
    });
}, businessUnitBranchContrller.createBranchByBusinessUnit);

// router.post('/createBranch', entityAuth.authorizeEntity("Administration", "Branch", "create"), businessUnitBranchContrller.createBranchByBusinessUnit);

// router.put('/updateBranch', entityAuth.authorizeEntity("Administration", "Branch", "update"), businessUnitBranchContrller.updateBranchByBusinessUnit);


router.put('/updateBranch', entityAuth.authorizeEntity("Administration", "Branch", "update"), (req, res, next) => {
    uploadBranch.single("file")(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                return res.status(statusCode.BadRequest).send({
                    message: 'File too large. Maximum file size allowed is 1 MB.'
                });
            } else {
                console.error('Multer Error:', err.message);
                return res.status(statusCode.BadRequest).send({
                    message: err.message
                });
            }
        }
        next();
    });
}, businessUnitBranchContrller.updateBranchByBusinessUnit);

router.get('/branch/:clientId/:branchId', businessUnitBranchContrller.getParticularBranchByBusinessUnit);// entityAuth.authorizeEntity("Administration", "Branch", "view")

router.get('/listBranch',  businessUnitBranchContrller.listBranch); // entityAuth.authorizeEntity("Administration", "Branch", "view")

router.post("/activeInactiveBranch", entityAuth.authorizeEntity("Administration", "Branch", "update"), businessUnitBranchContrller.activeinactiveBranchByBusinessUnit);

router.post("/softDeleteBranch", entityAuth.authorizeEntity("Administration", "Branch", "softDelete"), businessUnitBranchContrller.softDeleteBranchByBusinesssUnit);

router.post("/restoreBranch", entityAuth.authorizeEntity("Administration", "Branch", "update"), businessUnitBranchContrller.restoreBranchByBusinessUnit);

router.get('/getAllActiveBranch',  businessUnitBranchContrller.getAllActiveBranch)
router.get('/getBranchDetails', getBranchDetailsctrl)

// # create, update, view, list, activate/inactive, delete Branch by business unit routes ends here






exports.router = router;
