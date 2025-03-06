

const express = require("express");
const multer = require("multer");
const statusCode = require("../../utils/http-status-code")
let router = express.Router();



const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization");

const caseSheetController = require("../controller/caseSheet.controller");



const {
    uploadInvestigation,
    uploadAttachment,
} = require('../../utils/multer');




// -------- case sheet routes starts here ----------



// check alrady ongoing case sheet
router.post('/checkAlreadyOngoingCaseSheet', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.checkAlreadyOngoingCaseSheet);
router.post('/markAsCompletedCaseSheet', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.markedAsCompletedCaseSheet);

// cheif complain part
router.post('/createCheifComplaints', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.createCheifComplaints);
router.put('/updateCheifComplaints', entityAuth.authorizeEntity("Patient", "Case Sheet", "update"), caseSheetController.updateCheifComplaints);
router.post('/deleteCheifComplaints', entityAuth.authorizeEntity("Patient", "Case Sheet", "softDelete"), caseSheetController.deleteCheifComplaints);

// clinical finding part
router.post('/createClinicalFinding', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.createClinicalFinding);
router.put('/updateClinicalFinding', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.updateClinicalFinding);
router.post('/deleteClinicalFinding', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.deleteClinicalFinding);

// Diagnosis
router.post('/createDiagnosis', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.createDiagnosis);
router.put('/updateDiagnosis', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.updateDiagnosis);
router.post('/deleteDiagnosis', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.deleteDiagnosis);


// medical history
router.post('/createMedicalHistory', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.createMedicalHistory);
router.put('/updateMedicalHistory', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.updateMedicalHistory);
router.post('/deleteMedicalHistory', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.deleteMedicalHistory);

// investigaton
router.post('/createInvestigation', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), (req, res, next) => {
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
router.post('/updateInvestigation', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), (req, res, next) => {
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
router.post('/deleteInvestigation', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.deleteInvestigation);

// other attachment
router.post('/createOtherAttachment', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), (req, res, next) => {
    uploadAttachment.array("file")(req, res, (err) => {
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
router.post('/updateOtherAttachment', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), (req, res, next) => {
    uploadAttachment.array("file")(req, res, (err) => {
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
router.post('/deleteOtherAttachment', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.deleteOtherAttachment);

// notes
router.post('/createNotes', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.createNotes);
router.put('/updateNotes', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.updateNotes);
router.post('/deleteNotes', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.deleteNotes);

// services
router.post('/createServices', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.createServices);
router.put('/updateServices', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.updateServices);
router.post('/editParticularServices', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.editParticularServices);
router.post('/deleteServices', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.deleteServices);

// procedures
router.post('/createProcedure', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.createProcedure);
router.put('/updateProcedure', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.updateProcedure);
router.post('/deleteProcedure', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.deleteProcedure);

// remove from draft
router.post('/removeAsDraft',entityAuth.authorizeEntity("Patient", "Case Sheet", "create"),caseSheetController.removeAsDraft)
router.post('/updateCaseSheet',entityAuth.authorizeEntity("Patient", "Case Sheet", "create"),caseSheetController.updateCaseSheet)

// -------- case sheet routes ends here ----------

// ------- case sheet details routes starts here ------

router.get('/listCaseSheet', entityAuth.authorizeEntity("Patient", "Case Sheet", "view"), caseSheetController.listCaseSheet);
router.get('/getCaseSheet/:clientId/:caseSheetId',entityAuth.authorizeEntity("Patient", "Case Sheet", "view"), caseSheetController.getParticularCaseSheet)
router.get('/getAllDraftedCaseSheet/:clientId/:patientId', entityAuth.authorizeEntity("Patient", "Case Sheet", "view"), caseSheetController.getAllDrafted);
router.get('/getAllCaseSheet/:clientId/:patientId', entityAuth.authorizeEntity("Patient", "Case Sheet", "view"), caseSheetController.getAllCaseSheet);
router.get('/getAllCaseSheetOfPatient', entityAuth.authorizeEntity("Patient", "Case Sheet", "view"), caseSheetController.getAllCaseSheetOfPatient);
router.delete('/deleteCaseSheet/:clientId/:caseSheetId', entityAuth.authorizeEntity("Patient", "Case Sheet", "view"), caseSheetController.deleteCaseSheet);
router.get('/getCaseDetail/:clientId/:caseSheetId',entityAuth.authorizeEntity("Patient", "Case Sheet", "view"), caseSheetController.getCaseDetail)

// ------- case sheet details routes ends here ------

// ------- Treatment plan routes starts starts here -------

router.get('/getTreatmentPlan/:clientId/:caseSheetId',entityAuth.authorizeEntity("Patient", "Case Sheet", "view"), caseSheetController.getTreatmentPlan);
router.put('/updateTreatment',entityAuth.authorizeEntity("Patient", "Case Sheet", "view"), caseSheetController.updateTreatment);
router.put('/updateTreatmentAndCloseCaseSheet',entityAuth.authorizeEntity("Patient", "Case Sheet", "view"), caseSheetController.updateTreatmentAndCloseCaseSheet);
router.put('/closeCaseSheet',entityAuth.authorizeEntity("Patient", "Case Sheet", "view"), caseSheetController.closeCaseSheet);
router.put('/updateTreatmentProcedure',entityAuth.authorizeEntity("Patient", "Case Sheet", "view"), caseSheetController.updateTreatmentProcedure);
router.get('/getActiveCaseSheetOverView/:clientId/:patientId', caseSheetController.getCaseSheetOverViewByPatient);


router.get('/getAppointmentsWithCaseSheet/:clientId/:patientId/:caseSheetId',caseSheetController.getAppointmentByCase)
// ------- Treatment plan routes starts starts here -------


// ------- Medical History routes starts here-------
router.get('/getPatientMedicalHistory/:clientId/:patientId', entityAuth.authorizeEntity("Patient", "Case Sheet", "view"), caseSheetController.getPatientMedicalHistory);
router.put('/updatePatientMedicalHistory', entityAuth.authorizeEntity("Patient", "Case Sheet", "view"), caseSheetController.updatePatientMedicalHistory);







exports.router = router;
