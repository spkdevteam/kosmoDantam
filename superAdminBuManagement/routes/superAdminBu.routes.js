

const express = require("express");
let router = express.Router();
const auth = require("../../middleware/authorization/superAdmin");



const supersuperAdminController = require("../controller/superAdminBu.controller");


// # create, update, view, list, activate/inactive, delete Business Unit routes starts here


router.post('/createBusinessUnit', auth.superAdminAuth, supersuperAdminController.createBusinessUnit);

router.put('/updateBusinessUnit/:userId', auth.superAdminAuth, supersuperAdminController.updateBusinessUnit);

router.get('/businessUnit/:userId', auth.superAdminAuth, supersuperAdminController.getBusinessUnit);

router.get('/listBusinessUnit', auth.superAdminAuth, supersuperAdminController.listBusinessUnit);

router.post("/activeInactiveBusinessUnit", auth.superAdminAuth, supersuperAdminController.activeinactiveBusinessUnit);

router.post("/softDeleteBusinessUnit", auth.superAdminAuth, supersuperAdminController.softDeleteBusinessUnit);

router.post("/restoreBusinessUnit", auth.superAdminAuth, supersuperAdminController.restoreBusinessUnit);



// # create, update, view, list, activate/inactive, delete Business Unit routes ends here






exports.router = router;
