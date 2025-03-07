

const express = require("express");
const integrateData = require("../controller/integrateData.controller");
const utilsRouter = express.Router();

utilsRouter.get('/defaultDataForBranch',integrateData)

module.exports = utilsRouter
