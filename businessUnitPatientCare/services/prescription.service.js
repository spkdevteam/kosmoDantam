// services/chairService.js
const { getClientDatabaseConnection } = require("../../db/connection");
const prescriptionSchema = require("../../client/model/user");
const prescriptionSchema = require("../../client/model/prescription")

const message = require("../../utils/message");
const statusCode = require("../../utils/http-status-code");

const CustomError = require("../../utils/customeError")


const create = async (clientId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Prescription = clientConnection.model('prescription', prescriptionSchema);
        return await Prescription.create(data);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating prescription: ${error.message}`);
    }
};

const update = async (clientId, prescriptionId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Prescription = clientConnection.model('prescription', prescriptionSchema);
        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            throw new CustomError(statusCode.NotFound, message.lblPrescriptionNotFound);
        }
        Object.assign(prescription, data);
        return await prescription.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error updating prescription: ${error.message}`);
    }
};

const getById = async (clientId, prescriptionId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Prescription = clientConnection.model('prescription', prescriptionSchema);
        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            throw new CustomError(statusCode.NotFound, message.lblPrescriptionNotFound);
        }
        return prescription;
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error getting prescription: ${error.message}`);
    }
};

const list = async (clientId, filters = {}, options = { page: 1, limit: 10 }) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Prescription = clientConnection.model('prescription', prescriptionSchema);
        const { page, limit } = options;
        const skip = (page - 1) * limit;
        const [prescriptions, total] = await Promise.all([
            Prescription.find(filters).skip(skip).limit(limit).sort({ _id: -1 }),
            Prescription.countDocuments(filters),
        ]);
        return { count: total, prescriptions };
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error listing prescription: ${error.message}`);
    }
};

module.exports = {
    create,
    update,
    getById,
    list,

};
