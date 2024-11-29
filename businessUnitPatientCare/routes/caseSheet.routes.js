

const express = require("express");
let router = express.Router();



const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization");

const businessUnitCaseSheetController = require("../controller/caseSheet.controller")




router.post('/createCheifComplaints', entityAuth.authorizeEntity("CaseSheet", "create"), businessUnitCaseSheetController.createCheifComplaints);
router.put('/updateCheifComplaints', entityAuth.authorizeEntity("CaseSheet", "create"), businessUnitCaseSheetController.updateCheifComplaints);







exports.router = router;
