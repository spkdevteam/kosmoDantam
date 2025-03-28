const express = require("express");
const multer = require("multer");
const statusCode = require("../../utils/http-status-code");
const getBusinessUnitSummary = require("../controller/businessUnit/getBusinessUnitSummary.controller");
// const businessUnitRouter = express.Router()
let router = express.Router();

router
    .get('/dashboardSummary/:clientId/:businessUnitId', getBusinessUnitSummary)


exports.router = router