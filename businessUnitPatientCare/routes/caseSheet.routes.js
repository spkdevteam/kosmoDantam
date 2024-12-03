

const express = require("express");
let router = express.Router();



const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization");

const businessUnitCaseSheetController = require("../controller/caseSheet.controller");



const {
    uploadInvestigation, 
} = require('../../utils/multer');




// cheif complain part
router.post('/createCheifComplaints', entityAuth.authorizeEntity("CaseSheet", "create"), businessUnitCaseSheetController.createCheifComplaints);
router.put('/updateCheifComplaints', entityAuth.authorizeEntity("CaseSheet", "create"), businessUnitCaseSheetController.updateCheifComplaints);
router.delete('/deleteCheifComplaints', entityAuth.authorizeEntity("CaseSheet", "create"), businessUnitCaseSheetController.deleteCheifComplaints);

// clinical finding part
router.post('/createClinicalFinding', entityAuth.authorizeEntity("CaseSheet", "create"), businessUnitCaseSheetController.createClinicalFinding);
router.put('/updateClinicalFinding', entityAuth.authorizeEntity("CaseSheet", "create"), businessUnitCaseSheetController.updateClinicalFinding);
router.delete('/deleteClinicalFinding', entityAuth.authorizeEntity("CaseSheet", "create"), businessUnitCaseSheetController.deleteClinicalFinding);

// medical history
router.post('/createMedicalHistory', entityAuth.authorizeEntity("CaseSheet", "create"), businessUnitCaseSheetController.createMedicalHistory);
router.put('/updateMedicalHistory', entityAuth.authorizeEntity("CaseSheet", "create"), businessUnitCaseSheetController.updateMedicalHistory);
router.delete('/deleteMedicalHistory', entityAuth.authorizeEntity("CaseSheet", "create"), businessUnitCaseSheetController.deleteMedicalHistory);

// investigaton
router.post('/createInvestigation',  entityAuth.authorizeEntity("CaseSheet", "create"), (req, res, next) => {
    uploadInvestigation.single("file")(req, res, (err) => {
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
}, businessUnitCaseSheetController.createInvestigation);
router.post('/updateInvestigation',  entityAuth.authorizeEntity("CaseSheet", "create"), (req, res, next) => {
    uploadInvestigation.single("file")(req, res, (err) => {
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
}, businessUnitCaseSheetController.updateInvestigation);
router.delete('/deleteInvestigation', entityAuth.authorizeEntity("CaseSheet", "create"), businessUnitCaseSheetController.deleteInvestigation);

// other attachment
router.post('/createOtherAttachment',  entityAuth.authorizeEntity("CaseSheet", "create"), (req, res, next) => {
    uploadInvestigation.single("file")(req, res, (err) => {
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
}, businessUnitCaseSheetController.createOtherAttachment);
router.post('/updateOtherAttachment',  entityAuth.authorizeEntity("CaseSheet", "create"), (req, res, next) => {
    uploadInvestigation.single("file")(req, res, (err) => {
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
}, businessUnitCaseSheetController.updateOtherAttachment);
router.delete('/deleteOtherAttachment', entityAuth.authorizeEntity("CaseSheet", "create"), businessUnitCaseSheetController.deleteOtherAttachment);

// notes
router.post('/createNotes', entityAuth.authorizeEntity("CaseSheet", "create"), businessUnitCaseSheetController.createNotes);
router.put('/updateNotes', entityAuth.authorizeEntity("CaseSheet", "create"), businessUnitCaseSheetController.updateNotes);
router.delete('/deleteNotes', entityAuth.authorizeEntity("CaseSheet", "create"), businessUnitCaseSheetController.deleteNotes);

// services
router.post('/createServices', entityAuth.authorizeEntity("CaseSheet", "create"), businessUnitCaseSheetController.createServices);
router.put('/updateServices', entityAuth.authorizeEntity("CaseSheet", "create"), businessUnitCaseSheetController.updateServices);
router.delete('/deleteServices', entityAuth.authorizeEntity("CaseSheet", "create"), businessUnitCaseSheetController.deleteServices);




exports.router = router;
