

const express = require("express");
let router = express.Router();

const auth = require("../../middleware/authorization/chairAuthorization/chairAuthorization")

const businessUnitChairContrller = require("../controller/chair.controller");

const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization");
const getChairDetailsWithFilters = require("../controller/Chairs/getChairDetailsWithFilters.controller");




// # create, update, view, list, activate/inactive, delete Chair by business unit routes starts here


router.post('/createChair', entityAuth.authorizeEntity("Administration", "Chair", "create"), businessUnitChairContrller.createChairByBusinessUnit);

router.put('/updateChair', entityAuth.authorizeEntity("Administration", "Chair", "update"), businessUnitChairContrller.updateChairByBusinessUnit);

router.get('/Chair/:clientId/:chairId', entityAuth.authorizeEntity("Administration", "Chair", "view"), businessUnitChairContrller.getParticularChairByBusinessUnit);

router.get('/listChair', entityAuth.authorizeEntity("Administration", "Chair", "view"), businessUnitChairContrller.listChair);

router.post("/activeInactiveChair", entityAuth.authorizeEntity("Administration", "Chair", "update"), businessUnitChairContrller.activeinactiveChairByBusinessUnit);

router.post("/softDeleteChair", entityAuth.authorizeEntity("Administration", "Chair", "softDelete"), businessUnitChairContrller.softDeleteChairByBusinesssUnit);

router.post("/restoreChair", entityAuth.authorizeEntity("Administration", "Chair", "update"), businessUnitChairContrller.restoreChairByBusinessUnit);

router.patch('/updateChairStatusReady', entityAuth.authorizeEntity("Administration", "Chair", "update"), businessUnitChairContrller?.updateChairStatusReady)
router.patch('/updateChairStatusInProgress', entityAuth.authorizeEntity("Administration", "Chair", "update"),  businessUnitChairContrller?.updateChairStatusInprogress)
router.patch('/updateChairCleared', entityAuth.authorizeEntity("Administration", "Chair", "update"), businessUnitChairContrller?.updateChairCleared)  
router.patch('/CancelChairReadyStatus', entityAuth.authorizeEntity("Administration", "Chair", "update"), businessUnitChairContrller?.CancelChairReadyStatus) 
        .get("/getChairDetailsWithFilters", getChairDetailsWithFilters)

// # create, update, view, list, activate/inactive, delete Chair by business unit routes ends here






exports.router = router;
