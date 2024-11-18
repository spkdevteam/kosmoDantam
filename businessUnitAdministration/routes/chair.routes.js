

const express = require("express");
let router = express.Router();



const businessUnitChairContrller = require("../controller/chair.controller");



// # create, update, view, list, activate/inactive, delete Chair by business unit routes starts here


router.post('/createChair', businessUnitChairContrller.createChairByBusinessUnit);

router.put('/updateChair', businessUnitChairContrller.updateChairByBusinessUnit);

router.get('/Chair/:clientId/:chairId', businessUnitChairContrller.getParticularChairByBusinessUnit);

router.get('/listChair', businessUnitChairContrller.listChair);

router.post("/activeInactiveChair", businessUnitChairContrller.activeinactiveChairByBusinessUnit);

router.post("/softDeleteChair", businessUnitChairContrller.softDeleteChairByBusinesssUnit);

router.post("/restoreChair", businessUnitChairContrller.restoreChairByBusinessUnit);



// # create, update, view, list, activate/inactive, delete Chair by business unit routes ends here






exports.router = router;
