

const express = require("express");
let router = express.Router();

// const auth = require("../../middleware/authorization/PrescriptionAuthorization/PrescriptionAuthorization")

const prescriptionContrller = require("../controller/prescription.controller");

const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization")




// # create, update, view, list, activate/inactive, delete Prescription by business unit routes starts here


router.post('/createPrescription', entityAuth.authorizeEntity("Pataints", "Prescription", "create"), prescriptionContrller.createPrescription);

router.put('/updatePrescription', entityAuth.authorizeEntity("Pataints", "Prescription", "update"), prescriptionContrller.updatePrescription);

router.get('/prescription/:clientId/:prescriptionId', entityAuth.authorizeEntity("Pataints", "Prescription", "view"), prescriptionContrller.getParticularPrescription);

router.get('/pataintPrescription', entityAuth.authorizeEntity("Pataints", "Prescription", "view"), prescriptionContrller.pataintPrescriptionList);

router.get('/listPrescription', entityAuth.authorizeEntity("Pataints", "Prescription", "list"), prescriptionContrller.listPrescription);



// # create, update, view, list, activate/inactive, delete Prescription by business unit routes ends here






exports.router = router;
