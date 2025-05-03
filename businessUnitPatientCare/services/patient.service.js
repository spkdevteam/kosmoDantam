// services/chairService.js
const { getClientDatabaseConnection } = require("../../db/connection");
const clinetUserSchema = require("../../client/model/user");
const clinetPatientSchema = require("../../client/model/patient")

const message = require("../../utils/message");
const statusCode = require("../../utils/http-status-code");

const CustomError = require("../../utils/customeError");
const clinetBranchSchema = require("../../client/model/branch");


const create = async (clientId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const User = clientConnection.model('clientUsers', clinetUserSchema);
        const existing = await User.findOne({
            $or: [{ phone: data?.phone }],
        });
        if (existing) {
            throw new CustomError(statusCode.Conflict, message.lblPatientAlreadyExists);
        }

        return await User.create(data);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating patient: ${error.message}`);
    }
};

const update = async (clientId, email, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const User = clientConnection.model('clientUsers', clinetUserSchema);
        const patient = await User.findOne({email : email});
        if (!patient) {
            throw new CustomError(statusCode.NotFound, message.lblPatientNotFound);
        }
        const existing = await User.findOne({
            $and: [
                { email: { $ne: email } },
                {
                    $or:[{ email: data.email },
                        { phone: data?.phone }
                        ],
                },
            ],
        });
        if (existing) {
            throw new CustomError(statusCode.Conflict, message.lblPatientAlreadyExists);
        }
        const prevEmailAndPhone = { email: patient.email, phone: patient.phone }
        Object.assign(patient, data);
        await patient.save();
        return prevEmailAndPhone
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error updating patient: ${error.message}`);
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
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const { page, limit } = options;
        const skip = (page - 1) * limit;
        const [patients, total] = await Promise.all([
            Patient.find(filters).skip(skip).limit(limit).sort({ _id: -1 }).populate({
                path: 'branch',
                model: Branch,
                select: 'displayId name _id'
            }),
            Patient.countDocuments(filters),
        ]);
        return { count: total, patients };
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error listing patient: ${error.message}`);
    }
};

const listWithSearch = async (clientId, filters = {}) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Patient = clientConnection.model('patient', clinetPatientSchema);
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const [patients, total] = await Promise.all([
            Patient.find(filters).sort({ _id: -1 })
            // .populate({
            //     path: 'branch',
            //     model: Branch,
            //     select: 'displayId name _id'
            // })
            ,
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
        const patient = await User.findOne({email : email});
        if (!patient) {
            throw new CustomError(statusCode.NotFound, message.lblPatientNotFound);
        }
        Object.assign(patient, data);
        return await patient.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error active inactive patient: ${error.message}`);
    }
};

const deleteOne = async (clientId, email, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const User = clientConnection.model('clientUsers', clinetUserSchema);
        const patient = await User.findOne({email : email});
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
    create,
    update,
    getById,
    list,
    listWithSearch,
    activeInactive,
    deleteOne
};
