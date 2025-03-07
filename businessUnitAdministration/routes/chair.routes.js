

const express = require("express");
let router = express.Router();

const auth = require("../../middleware/authorization/chairAuthorization/chairAuthorization")

const businessUnitChairContrller = require("../controller/chair.controller");

const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization")




// # create, update, view, list, activate/inactive, delete Chair by business unit routes starts here


router.post('/createChair', entityAuth.authorizeEntity("Administration", "Chair", "create"), businessUnitChairContrller.createChairByBusinessUnit);

router.put('/updateChair', entityAuth.authorizeEntity("Administration", "Chair", "update"), businessUnitChairContrller.updateChairByBusinessUnit);

router.get('/Chair/:clientId/:chairId', entityAuth.authorizeEntity("Administration", "Chair", "view"), businessUnitChairContrller.getParticularChairByBusinessUnit);

router.get('/listChair', entityAuth.authorizeEntity("Administration", "Chair", "view"), businessUnitChairContrller.listChair);

router.post("/activeInactiveChair", entityAuth.authorizeEntity("Administration", "Chair", "update"), businessUnitChairContrller.activeinactiveChairByBusinessUnit);

router.post("/softDeleteChair", entityAuth.authorizeEntity("Administration", "Chair", "softDelete"), businessUnitChairContrller.softDeleteChairByBusinesssUnit);

router.post("/restoreChair", entityAuth.authorizeEntity("Administration", "Chair", "update"), businessUnitChairContrller.restoreChairByBusinessUnit);

router.patch('/updateChairStatusReady',businessUnitChairContrller?.updateChairStatusReady)
router.patch('/updateChairStatusInProgress',businessUnitChairContrller?.updateChairStatusInprogress)
router.patch('/updateChairCleared',businessUnitChairContrller?.updateChairCleared)  
router.patch('/CancelChairReadyStatus',businessUnitChairContrller?.CancelChairReadyStatus) 

// # create, update, view, list, activate/inactive, delete Chair by business unit routes ends here






exports.router = router;
