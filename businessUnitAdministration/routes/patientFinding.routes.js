

const express = require("express");
let router = express.Router();



const findingContrller = require("../controller/patientFinding.controller");


router.post('/createFinding',  findingContrller.create);

router.get('/getAllActiveFinding/:clientId',  findingContrller.getAllActive)








exports.router = router;
