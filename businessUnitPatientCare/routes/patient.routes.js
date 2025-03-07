

const express = require("express");
let router = express.Router();

// const auth = require("../../middleware/authorization/PatientAuthorization/PatientAuthorization")

const businessUnitPatientContrller = require("../controller/patient.controller");

const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization")



const {
    uploadPatient, 
} = require('../../utils/multer');


// # create, update, view, list, activate/inactive, delete Patient by business unit routes starts here


// router.post('/createPatient', entityAuth.authorizeEntity("Patient", "Patient", "create"), businessUnitPatientContrller.createMainPatientByBusinessUnit);

router.post('/createPatient',entityAuth.authorizeEntity("Patient", "Patient", "create"), (req, res, next) => {
    uploadPatient.single("img")(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                // MulterError: File too large
                return res.status(statusCode.BadRequest).send({
                    message: 'File too large. Maximum file size allowed is 1 MB.'
                });
            } else {
                // Other errors
                console.error('Multer Error:', err.message);
                return res.status(statusCode.BadRequest).send({
                    message: err.message
                });
            }
        }
        next();
    });
}, businessUnitPatientContrller.createMainPatientByBusinessUnit);

router.post('/createSubPatient', entityAuth.authorizeEntity("Patient", "Patient", "create"), businessUnitPatientContrller.createSubPatientByBusinessUnit);

// router.put('/updatePatient', entityAuth.authorizeEntity("Patient", "Patient", "update"), businessUnitPatientContrller.updatePatientByBusinessUnit);

router.put('/updatePatient',entityAuth.authorizeEntity("Patient", "Patient", "update"), (req, res, next) => {
    uploadPatient.single("img")(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                // MulterError: File too large
                return res.status(statusCode.BadRequest).send({
                    message: 'File too large. Maximum file size allowed is 1 MB.'
                });
            } else {
                // Other errors
                console.error('Multer Error:', err.message);
                return res.status(statusCode.BadRequest).send({
                    message: err.message
                });
            }
        }
        next();
    });
}, businessUnitPatientContrller.updatePatientByBusinessUnit);

router.get('/patient/:clientId/:patientId', entityAuth.authorizeEntity("Patient", "Patient", "view"), businessUnitPatientContrller.getParticularPatientByBusinessUnit);

router.get('/listPatient', entityAuth.authorizeEntity("Patient", "Patient", "view"), businessUnitPatientContrller.listPatient);
router.get('/listPatientWithSearch', entityAuth.authorizeEntity("Patient", "Patient", "view"), businessUnitPatientContrller.getPatientByNameEmailAndPhone);

router.post("/activeInactivePatient", entityAuth.authorizeEntity("Patient", "Patient", "update"), businessUnitPatientContrller.activeinactivePatientByBusinessUnit);

router.post("/softDeletePatient", entityAuth.authorizeEntity("Patient", "Patient", "softDelete"), businessUnitPatientContrller.softDeletePatient);


router.get('/getPatientRoleId/:clientId',  businessUnitPatientContrller.getPatientRoleId);

router.get('/searchPatient',businessUnitPatientContrller.searchPatients)

router.post('/createPatientWhileBooking',businessUnitPatientContrller.createMinimalPatient)
// # create, update, view, list, activate/inactive, delete Patient by business unit routes ends here






exports.router = router;
