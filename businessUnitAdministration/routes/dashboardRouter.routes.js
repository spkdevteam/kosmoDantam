const express = require("express");
const getCaseSheetDashboardCTRL = require("../controller/dashboard/getCaseSheetDashboardCTRL");
const getMetricsDashboardCTRL = require("../controller/dashboard/getMetricsDashboardCTRL");
const getGraphDashboardCTRL = require("../controller/dashboard/getGraphDashboardCTRL");
const getPerformanceDashboardCTRL = require("../controller/dashboard/getPerformanceDashboardCTRL");

const dashboardRouter = express.Router();

dashboardRouter.get("/caseSheet", getCaseSheetDashboardCTRL);
dashboardRouter.get("/metrics", getMetricsDashboardCTRL);
dashboardRouter.get("/graph", getGraphDashboardCTRL);
dashboardRouter.get("/performance", getPerformanceDashboardCTRL);

module.exports = dashboardRouter
