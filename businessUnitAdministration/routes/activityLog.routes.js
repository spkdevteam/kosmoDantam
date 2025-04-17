const express = require("express");
const activityLog = require("../controller/activityLog/activityLog.controller");



const activityLogRouter = express.Router();


activityLogRouter.get("/getActivityLogDetailsWithFilter", activityLog);


module.exports = activityLogRouter;