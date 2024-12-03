

const express = require("express");
let router = express.Router();

// const auth = require("../../middleware/authorization/PatientAuthorization/PatientAuthorization")

const businessUnitPatientContrller = require("../controller/patient.controller");

const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization")




// # create, update, view, list, activate/inactive, delete Patient by business unit routes starts here


router.post('/createPatient', entityAuth.authorizeEntity("Pataints", "Patient", "create"), businessUnitPatientContrller.createMainPatientByBusinessUnit);

router.post('/createSubPatient', entityAuth.authorizeEntity("Pataints", "Patient", "create"), businessUnitPatientContrller.createSubPatientByBusinessUnit);

router.put('/updatePatient', entityAuth.authorizeEntity("Pataints", "Patient", "update"), businessUnitPatientContrller.updatePatientByBusinessUnit);

router.get('/patient/:clientId/:patientId', entityAuth.authorizeEntity("Pataints", "Patient", "view"), businessUnitPatientContrller.getParticularPatientByBusinessUnit);

router.get('/listPatient', entityAuth.authorizeEntity("Pataints", "Patient", "list"), businessUnitPatientContrller.listPatient);

router.post("/activeInactivePatient", entityAuth.authorizeEntity("Pataints", "Patient", "activeActive"), businessUnitPatientContrller.activeinactivePatientByBusinessUnit);


// # create, update, view, list, activate/inactive, delete Patient by business unit routes ends here






exports.router = router;
