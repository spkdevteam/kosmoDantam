
const statusCode = require("../../utils/http-status-code");
const message = require("../../utils/message");

const { getClientDatabaseConnection } = require("../../db/connection");
const clinetBranchSchema = require("../../client/model/branch");
const getserialNumber = require("../../model/services/getserialNumber");
const complaintSchema = require("../../client/model/complaint");
const patientFindingsSchema = require("../../client/model/finding");




// create
exports.create = async (req, res) => {
    try {
        const { clientId, findingsName, discription } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!findingsName ) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Finding = clientConnection.model('patientFinding', patientFindingsSchema);
        const existing = await Finding.findOne({
            $or: [{ complaintName: findingsName }],
        });
        if (existing) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblFindingsAlreadyExist,
            });
        }

        const newFinding = await Finding.create(
            [
                {
                    findingsName, discription
                },
            ],
        );
        return res.status(statusCode.OK).send({
            message: message.lblFindingsCreated,
            data: newFinding 
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
        const Finding = clientConnection.model('patientFinding', patientFindingsSchema);
        const findings = await Finding.find({
            isActive : true
        })
        return res.status(statusCode.OK).send({
            message: message.lblFindingFound,
            data: findings 
        });
    } catch (error) {
        console.error("Error in:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};