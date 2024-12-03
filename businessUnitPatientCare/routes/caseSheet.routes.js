

const express = require("express");
let router = express.Router();



const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization");

const businessUnitCaseSheetController = require("../controller/caseSheet.controller");



const {
    uploadInvestigation,
} = require('../../utils/multer');




// cheif complain part
router.post('/createCheifComplaints', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.createCheifComplaints);
router.put('/updateCheifComplaints', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.updateCheifComplaints);
router.delete('/deleteCheifComplaints', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.deleteCheifComplaints);

// clinical finding part
router.post('/createClinicalFinding', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.createClinicalFinding);
router.put('/updateClinicalFinding', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.updateClinicalFinding);
router.delete('/deleteClinicalFinding', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.deleteClinicalFinding);

// medical history
router.post('/createMedicalHistory', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.createMedicalHistory);
router.put('/updateMedicalHistory', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.updateMedicalHistory);
router.delete('/deleteMedicalHistory', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.deleteMedicalHistory);

// investigaton
router.post('/createInvestigation', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), (req, res, next) => {
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
router.post('/updateInvestigation', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), (req, res, next) => {
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
router.delete('/deleteInvestigation', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.deleteInvestigation);

// other attachment
router.post('/createOtherAttachment', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), (req, res, next) => {
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
router.post('/updateOtherAttachment', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), (req, res, next) => {
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
router.delete('/deleteOtherAttachment', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.deleteOtherAttachment);

// notes
router.post('/createNotes', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.createNotes);
router.put('/updateNotes', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.updateNotes);
router.delete('/deleteNotes', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.deleteNotes);

// services
router.post('/createServices', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.createServices);
router.put('/updateServices', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.updateServices);
router.delete('/deleteServices', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.deleteServices);



// procedures
router.post('/createProcedure', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.createProcedure);
router.put('/updateProcedure', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.updateProcedure);
router.delete('/deleteProcedure', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), businessUnitCaseSheetController.deleteProcedure);



exports.router = router;
