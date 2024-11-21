

const express = require("express");
let router = express.Router();

const auth = require("../../middleware/authorization/chairAuthorization/chairAuthorization")

const businessUnitChairContrller = require("../controller/chair.controller");


// # create, update, view, list, activate/inactive, delete Chair by business unit routes starts here


router.post('/createChair', auth.chiarCreateAuth, businessUnitChairContrller.createChairByBusinessUnit);

router.put('/updateChair', auth.chiarUpdateAuth, businessUnitChairContrller.updateChairByBusinessUnit);

router.get('/Chair/:clientId/:chairId', auth.chiarGetAuth, businessUnitChairContrller.getParticularChairByBusinessUnit);

router.get('/listChair', auth.chiarListAuth, businessUnitChairContrller.listChair);

router.post("/activeInactiveChair", auth.chiarActiveInactiveAuth, businessUnitChairContrller.activeinactiveChairByBusinessUnit);

router.post("/softDeleteChair", auth.chiarSoftDeleteAuth, businessUnitChairContrller.softDeleteChairByBusinesssUnit);

router.post("/restoreChair", auth.chiarRestoreAuth, businessUnitChairContrller.restoreChairByBusinessUnit);


// # create, update, view, list, activate/inactive, delete Chair by business unit routes ends here






exports.router = router;
