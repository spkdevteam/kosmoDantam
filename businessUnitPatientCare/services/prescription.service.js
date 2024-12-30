// services/chairService.js
const { getClientDatabaseConnection } = require("../../db/connection");
// const prescriptionSchema = require("../../client/model/user");
const prescriptionSchema = require("../../client/model/prescription")

const message = require("../../utils/message");
const statusCode = require("../../utils/http-status-code");

const CustomError = require("../../utils/customeError");
const httpStatusCode = require("../../utils/http-status-code");
const { validateObjectId } = require("../../businessUnitAdministration/services/validate.serialNumber");
const caseSheetSchema = require("../../client/model/caseSheet");


const create = async (clientId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Prescription = clientConnection.model('prescription', prescriptionSchema);
        console.log(Prescription.find())

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


const readPrescription = async ({clientId,buId,patientId,keyword, filters,branchId, page, perPage}) => {
    try {
        console.log(patientId)
        //const { keyWord, page, perPage, clientId, buId, branchId, patientId } = input
        if (!await validateObjectId({ clientid: clientId, objectId: clientId, collectionName: 'clientId' })) {
            return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized };
        }

        if (!await validateObjectId({ clientid: clientId, objectId: branchId, collectionName: 'branch' })) {
            return { status: false, message: message.lblBranchNotFound, statusCode: httpStatusCode.Unauthorized };
        }

        if (!await validateObjectId({ clientid: clientId, objectId: buId, collectionName: 'businessunit' })) {
            return { status: false, message: message.lblBusinessUnitNotFound, statusCode: httpStatusCode.Unauthorized };
        }

        // if (!await validateObjectId({ clientid: clientId, objectId: patientId, collectionName: 'patient' })) {
        //     return { status: false, message: message.lblPatientNotFound, statusCode: httpStatusCode.Unauthorized };
        // }

        const db = await getClientDatabaseConnection(clientId)
        const prescription = await db.model('prescription', prescriptionSchema)
        const casesheet = await db.model('casesheets', caseSheetSchema)
        
        const result = await prescription.find()//.skip(page * perPage).limit(perPage)
        .populate({
            path: 'caseSheetId', // Populate the caseSheetId
            populate: {
              path: 'cheifComplaints',
              populate:{
                path:'complaints.compId'
              }
            },
          })
        .populate('doctorId', 'firstName lastName ')
        .populate('createdBy', 'firstName lastName ') 
        
                console.log(result)
        if (result) {
            return { status: true,  message: message.lblPrescriptionFoundSucessfully, statusCode: httpStatusCode.OK, data: result }
        }
        else {
            return { status: true, message: message.lblprocedureListNotFound, statusCode: httpStatusCode.NoContent, }
        }
    } catch (error) {
        return { status: false, message: error.message, statusCode: httpStatusCode.NotFound, }
    }



}




module.exports = {
    create,
    update,
    getById,
    list,
    readPrescription

};
