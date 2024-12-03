

const express = require("express");
let router = express.Router();

const auth = require("../../middleware/authorization/chairAuthorization/chairAuthorization")

const businessUnitChairContrller = require("../controller/chair.controller");

const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization")




// # create, update, view, list, activate/inactive, delete Chair by business unit routes starts here


router.post('/createChair', entityAuth.authorizeEntity("administration", "Chair", "create"), businessUnitChairContrller.createChairByBusinessUnit);

router.put('/updateChair', entityAuth.authorizeEntity("administration", "Chair", "update"), businessUnitChairContrller.updateChairByBusinessUnit);

router.get('/Chair/:clientId/:chairId', entityAuth.authorizeEntity("administration", "Chair", "view"), businessUnitChairContrller.getParticularChairByBusinessUnit);

router.get('/listChair', entityAuth.authorizeEntity("administration", "Chair", "list"), businessUnitChairContrller.listChair);

router.post("/activeInactiveChair", entityAuth.authorizeEntity("administration", "Chair", "activeActive"), businessUnitChairContrller.activeinactiveChairByBusinessUnit);

router.post("/softDeleteChair", entityAuth.authorizeEntity("administration", "Chair", "softDelete"), businessUnitChairContrller.softDeleteChairByBusinesssUnit);

router.post("/restoreChair", entityAuth.authorizeEntity("administration", "Chair", "update"), businessUnitChairContrller.restoreChairByBusinessUnit);


// # create, update, view, list, activate/inactive, delete Chair by business unit routes ends here






exports.router = router;
