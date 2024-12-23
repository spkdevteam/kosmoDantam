
const statusCode = require("../../utils/http-status-code");
const message = require("../../utils/message");

const { getClientDatabaseConnection } = require("../../db/connection");
const clinetBranchSchema = require("../../client/model/branch");
const getserialNumber = require("../../model/services/getserialNumber");
const complaintSchema = require("../../client/model/complaint");
const medicalSchema = require("../../client/model/medical");




// create
exports.create = async (req, res) => {
    try {
        const { clientId, caseName, remark } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!caseName ) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Medical = clientConnection.model('medical', medicalSchema);
        const existing = await Medical.findOne({
            $or: [{ caseName: caseName }],
        });
        if (existing) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblMedicalHistoryhAlreadyExists,
            });
        }

        const newComplaint = await Medical.create(
            [
                {
                    caseName, remark
                },
            ],
        );
        return res.status(statusCode.OK).send({
            message: message.lblMedicalHistoryCreatedSuccess,
            data: newComplaint 
        });
    } catch (error) {
        console.error("Error in:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};

exports.getAllActive = async (req, res) => {
    try {
        const { clientId } = req.params; 
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Medical = clientConnection.model('medical', medicalSchema);
        const medical = await Medical.find({
            isActive : true
        })
        return res.status(statusCode.OK).send({
            message: message.lblMedicalHistoryFoundSucessfully,
            data: medical 
        });
    } catch (error) {
        console.error("Error in:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};