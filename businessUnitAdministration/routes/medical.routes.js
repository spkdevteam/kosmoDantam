

const express = require("express");
let router = express.Router();



const medicalContrller = require("../controller/medical.controller");


router.post('/createMedical',  medicalContrller.create);

router.get('/getAllActiveMedical/:clientId',  medicalContrller.getAllActive)








exports.router = router;
