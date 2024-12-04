

const express = require("express");
let router = express.Router();



const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization");

const caseSheetController = require("../controller/caseSheet.controller");



const {
    uploadInvestigation,
} = require('../../utils/multer');




// -------- case sheet routes starts here ----------


// cheif complain part
router.post('/createCheifComplaints', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.createCheifComplaints);
router.put('/updateCheifComplaints', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.updateCheifComplaints);
router.delete('/deleteCheifComplaints', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.deleteCheifComplaints);

// clinical finding part
router.post('/createClinicalFinding', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.createClinicalFinding);
router.put('/updateClinicalFinding', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.updateClinicalFinding);
router.delete('/deleteClinicalFinding', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.deleteClinicalFinding);

// medical history
router.post('/createMedicalHistory', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.createMedicalHistory);
router.put('/updateMedicalHistory', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.updateMedicalHistory);
router.delete('/deleteMedicalHistory', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.deleteMedicalHistory);

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
}, caseSheetController.createInvestigation);
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
}, caseSheetController.updateInvestigation);
router.delete('/deleteInvestigation', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.deleteInvestigation);

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
}, caseSheetController.createOtherAttachment);
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
}, caseSheetController.updateOtherAttachment);
router.delete('/deleteOtherAttachment', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.deleteOtherAttachment);

// notes
router.post('/createNotes', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.createNotes);
router.put('/updateNotes', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.updateNotes);
router.delete('/deleteNotes', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.deleteNotes);

// services
router.post('/createServices', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.createServices);
router.put('/updateServices', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.updateServices);
router.delete('/deleteServices', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.deleteServices);

// procedures
router.post('/createProcedure', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.createProcedure);
router.put('/updateProcedure', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.updateProcedure);
router.delete('/deleteProcedure', entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"), caseSheetController.deleteProcedure);

// remove from draft
router.post('/removeAsDraft',entityAuth.authorizeEntity("Pataints", "CaseSheet", "create"),caseSheetController.removeAsDraft)

// -------- case sheet routes ends here ----------

// ------- case sheet details routes starts here ------

router.get('/listCaseSheet', entityAuth.authorizeEntity("Pataints", "CaseSheet", "list"), caseSheetController.listCaseSheet);
router.get('/getCaseSheet/:clientId/:caseSheetId',entityAuth.authorizeEntity("Pataints", "CaseSheet", "view"), caseSheetController.getParticularCaseSheet)

// ------- case sheet details routes ends here ------

// ------- Treatment plan routes starts starts here -------

router.get('/getTreatmentPlan/:clientId/:caseSheetId',entityAuth.authorizeEntity("Pataints", "CaseSheet", "view"), caseSheetController.getTreatmentPlan)
router.put('/updateTreatmentProcedure',entityAuth.authorizeEntity("Pataints", "CaseSheet", "view"), caseSheetController.updateTreatmentProcedure)



// ------- Treatment plan routes starts starts here -------







exports.router = router;
