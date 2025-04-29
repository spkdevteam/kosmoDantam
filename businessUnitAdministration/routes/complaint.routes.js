

const express = require("express");
let router = express.Router();



const complaintContrller = require("../controller/complaint.controller");


router.post('/createComplaint',  complaintContrller.create);

router.get('/getAllActiveComplaint/:clientId',  complaintContrller.getAllActive)








exports.router = router;
