
const statusCode = require("../../utils/http-status-code");
const message = require("../../utils/message");

const { getClientDatabaseConnection } = require("../../db/connection");
const clinetBranchSchema = require("../../client/model/branch");
const getserialNumber = require("../../model/services/getserialNumber");
const complaintSchema = require("../../client/model/complaint");



// create
exports.create = async (req, res) => {
    try {
        const { clientId, complaintName, discription } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!complaintName || !complaintName) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Complaint = clientConnection.model('complaint', complaintSchema);
        const existing = await Complaint.findOne({
            $or: [{ complaintName: complaintName }],
        });
        if (existing) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblCheifComplaintshAlreadyExists,
            });
        }

        const newComplaint = await Complaint.create(
            [
                {
                    complaintName, discription
                },
            ],
        );
        

        return res.status(statusCode.OK).send({
            message: message.lblChiefComplaintCreated,
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
        const Complaint = clientConnection.model('complaint', complaintSchema);
        const complaints = await Complaint.find({
            isActive : true
        })
        return res.status(statusCode.OK).send({
            message: message.lblCheifComplaintsFoundSucessfully,
            data: complaints 
        });
    } catch (error) {
        console.error("Error in:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};