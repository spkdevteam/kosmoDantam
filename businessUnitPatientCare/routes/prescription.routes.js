

const express = require("express");
let priscriptionRouter = express.Router();

// const auth = require("../../middleware/authorization/PrescriptionAuthorization/PrescriptionAuthorization")

const prescriptionContrller = require("../controller/prescription.controller");

const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization")




// # create, update, view, list, activate/inactive, delete Prescription by business unit routes starts here


priscriptionRouter.post('/createPrescription',  prescriptionContrller.createPrescription);//entityAuth.authorizeEntity("Pataints", "Prescription", "create"),

priscriptionRouter.put('/updatePrescription', entityAuth.authorizeEntity("Pataints", "Prescription", "update"), prescriptionContrller.updatePrescription);

priscriptionRouter.get('/prescription/:clientId/:prescriptionId',   prescriptionContrller.getParticularPrescription); //entityAuth.authorizeEntity("Pataints", "Prescription", "view")

priscriptionRouter.get('/pataintPrescription', entityAuth.authorizeEntity("Pataints", "Prescription", "view"), prescriptionContrller.pataintPrescriptionList);

priscriptionRouter.get('/listPrescription',  prescriptionContrller.listPrescription); //entityAuth.authorizeEntity("Pataints", "Prescription", "list"),
priscriptionRouter.delete('/deletePrescription',  prescriptionContrller.deletePrescription); //entityAuth.authorizeEntity("Pataints", "Prescription", "list"),



// # create, update, view, list, activate/inactive, delete Prescription by business unit routes ends here






module.exports  = priscriptionRouter;
