// services/chairService.js
const { getClientDatabaseConnection } = require("../../db/connection");
const clinetUserSchema = require("../../client/model/user");
const clinetPatientSchema = require("../../client/model/patient");
const caseSheetSchema = require("../../client/model/caseSheet")

const message = require("../../utils/message");
const statusCode = require("../../utils/http-status-code");

const CustomError = require("../../utils/customeError")


const createCheifComplaints = async (clientId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        return await CaseSheet.create(data);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};

const updateCheifComplaints = async (clientId, caseSheetId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const existing = await CaseSheet.findById(caseSheetId);
        if(!existing){
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        Object.assign(existing, data);
        return await existing.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};



const getById = async (clientId, patientId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Patient = clientConnection.model('patient', clinetPatientSchema);

        const patient = await Patient.findById(patientId);
        if (!patient) {
            throw new CustomError(statusCode.NotFound, message.lblPatientNotFound);
        }
        return patient;
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error getting patient: ${error.message}`);
    }
};

const list = async (clientId, filters = {}, options = { page: 1, limit: 10 }) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Patient = clientConnection.model('patient', clinetPatientSchema);
        const { page, limit } = options;
        const skip = (page - 1) * limit;
        const [patients, total] = await Promise.all([
            Patient.find(filters).skip(skip).limit(limit).sort({ _id: -1 }),
            Patient.countDocuments(filters),
        ]);
        return { count: total, patients };
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error listing patient: ${error.message}`);
    }
};

const activeInactive = async (clientId, email, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const User = clientConnection.model('clientUsers', clinetUserSchema);
        const patient = await User.findOne({ email: email });
        if (!patient) {
            throw new CustomError(statusCode.NotFound, message.lblPatientNotFound);
        }
        Object.assign(patient, data);
        return await patient.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error active inactive patient: ${error.message}`);
    }
};

module.exports = {
    createCheifComplaints,
    updateCheifComplaints,
    getById,
    list,
    activeInactive,
};
