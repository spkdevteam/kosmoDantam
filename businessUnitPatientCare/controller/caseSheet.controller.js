



const statusCode = require("../../utils/http-status-code");
const message = require("../../utils/message");

const { getClientDatabaseConnection } = require("../../db/connection");
const clinetBranchSchema = require("../../client/model/branch");
const clinetChairSchema = require("../../client/model/chair");
const clinetBusinessUnitSchema = require("../../client/model/businessUnit")



const cheifComplaintsService = require("../services/caseSheet.service")






// create cheif complaints by business unit
exports.createCheifComplaints = async (req, res, next) => {
    try {
        const { clientId, patientId, branchId, businessUnitId, cheifComplaints, } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        if (!branchId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchIRequired,
            });
        }
        if (!businessUnitId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitIdIsRequired,
            });
        }
        if (!cheifComplaints) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const BusinessUnit = clientConnection.model('businessUnit', clinetBusinessUnitSchema);
        const branch = await Branch.findById(branchId);
        if (!branch) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchNotFound,
            });
        }
        const bu = await BusinessUnit.findById(businessUnitId)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        const newCheifComplaint = await cheifComplaintsService.createCheifComplaints(clientId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, cheifComplaints, displayId: "CASE-0001",
        });
        return res.status(statusCode.OK).send({
            message: message.lblCheifComplaintsCreatedSuccess,
            data: { caseSheetId: newCheifComplaint._id },
        });
    } catch (error) {
        next(error)
    }
};


// update cheif complaints by busines unit
exports.updateCheifComplaints = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, patientId, branchId, businessUnitId, cheifComplaints, } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        if (!branchId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchIRequired,
            });
        }
        if (!businessUnitId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitIdIsRequired,
            });
        }
        if (!cheifComplaints) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const BusinessUnit = clientConnection.model('businessUnit', clinetBusinessUnitSchema);
        const branch = await Branch.findById(branchId);
        if (!branch) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchNotFound,
            });
        }
        const bu = await BusinessUnit.findById(businessUnitId)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        const newCheifComplaint = await cheifComplaintsService.updateCheifComplaints(clientId,caseSheetId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, cheifComplaints,
        });
        return res.status(statusCode.OK).send({
            message: message.lblCheifComplaintsCreatedSuccess,
            data: { caseSheetId: newCheifComplaint._id },
        });
    } catch (error) {
        next(error)
    }
};
