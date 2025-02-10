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
const getserialNumber = require("../../model/services/getserialNumber");
const clinetChairSchema = require("../../client/model/chair");
const clinetUserSchema = require("../../client/model/user");
const clinetPatientSchema = require("../../client/model/patient");


const create = async (data) => {
    try {
        const { _id, displayId, branchId, buId, patientId, doctorId, caseSheetId, drugArray, additionalAdvice, clientId } = data
        if (! await validateObjectId({ clientid: clientId, objectId: clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: clientId, objectId: branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: clientId, objectId: buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitinValid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: clientId, objectId: patientId, collectionName: 'patient' })) return { status: false, message: message.lblPatientNotFound, statusCode: httpStatusCode.Unauthorized }
        // if (! await validateObjectId({ clientid: clientId, objectId: doctorId, collectionName: 'clientuser' })) return { status: false, message: message.lblDoctorNotFound, statusCode: httpStatusCode.Unauthorized }
        //if (! await validateObjectId({ clientid: clientId, objectId: caseSheetId, collectionName: 'caseSheet' })) return { status: false, message: message.lblCaseSheetNotFound, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(clientId)
        const prescription = await db.model('prescription', prescriptionSchema)
        const caseSheet = await db.model('caseSheet', caseSheetSchema)
        const chair = db.model('chair', clinetChairSchema);
        const User = await db.model('clientUsers', clinetUserSchema);
        const patientregister = db.model('patient', clinetPatientSchema);
        if (!_id) {
            if (!displayId) {
                data.displayId = await getserialNumber('prescription', clientId, branchId, buId)
            }
            const newData = {
                ...data
            }





            if (!newData.caseSheetId) delete newData.caseSheetId
            const result = await prescription
                .findOneAndUpdate(
                    { displayId: data.displayId },
                    { $set: newData },
                    { upsert: true, returnDocument: 'after', new: true }
                )
                .populate('branchId')
                .populate('patientId')
                .populate('doctorId') // Assuming doctorId is part of prescription schema
                .populate('createdBy')
                .populate({
                    path: 'caseSheetId', // Populate caseSheetId first
                    populate: [
                        {
                            path: 'cheifComplaints.complaints.compId',
                            model: 'CheifComplaint',
                        },
                        {
                            path: 'clinicalFindings.findings.findId',
                            model: 'finding',
                        },
                        {
                            path: 'services.department.deptId',
                            model: 'department',
                        },
                        {
                            path: 'services.service.servId',
                            model: 'services',
                        },
                        {
                            path: 'procedures.service.servId',
                            model: 'services',
                        },
                        {
                            path: 'procedures.procedure.procedId',
                            model: 'procedure',
                        },
                    ],
                });

            if (result) {
                return { status: true, message: message.lblPrescriptionCreatedSuccess, data: result?._doc }
            }
            else {
                return { status: false, message: 'creation failed' }
            }
        }
        else {
            const newData = {
                ...data
            }
            const result = await prescription.findOneAndUpdate({ _id: data._id }, { $set: newData }, { returnDocument: 'after', new: true, })
            return { status: true, message: message.lblPrescriptionUpdatedSuccess, data: result?._doc }
        }


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
        const User = await clientConnection.model('clientUsers', clinetUserSchema);

        const prescription = await Prescription.findById(prescriptionId)
            .populate({
                path: 'doctorId',
                populate: {
                    path: 'role',
                    select: 'name'
                }
            })

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


const readPrescription = async ({ clientId, buId, patientId, keyword, filters, branchId, page, perPage }) => {
    try {
        console.log(patientId)
        //const { keyWord, page, perPage, clientId, buId, branchId, patientId } = input
        if (!await validateObjectId({ clientid: clientId, objectId: clientId, collectionName: 'clientId' })) {
            return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized };
        }

        // if (!await validateObjectId({ clientid: clientId, objectId: branchId, collectionName: 'branch' })) {
        //     return { status: false, message: message.lblBranchNotFound, statusCode: httpStatusCode.Unauthorized };
        // }

        if (!await validateObjectId({ clientid: clientId, objectId: buId, collectionName: 'businessunit' })) {
            return { status: false, message: message.lblBusinessUnitNotFound, statusCode: httpStatusCode.Unauthorized };
        }

        // if (!await validateObjectId({ clientid: clientId, objectId: patientId, collectionName: 'patient' })) {
        //     return { status: false, message: message.lblPatientNotFound, statusCode: httpStatusCode.Unauthorized };
        // }

        const db = await getClientDatabaseConnection(clientId)
        const prescription = await db.model('prescription', prescriptionSchema)
        const casesheet = await db.model('casesheets', caseSheetSchema)
        const filter = {
            deletedAt: null,

        }
        if (patientId) filter.patientId = patientId;
        if (buId) filter.buId = buId;
        if (branchId?.length) filter.branchId = branchId

        console.log(filter, 'filter is no look like this ')
        const result = await prescription.find({ deletedAt: null })?.sort({ createdAt: -1 }).skip(page * perPage).limit(perPage)
            .populate('caseSheetId', 'displayId')
            .populate('doctorId', 'firstName lastName ')
            .populate('createdBy', 'firstName lastName ')
            .populate('branchId');


        console.log(result)
        if (result) {
            return { status: true, message: message.lblPrescriptionFoundSucessfully, statusCode: httpStatusCode.OK, data: result }
        }
        else {
            return { status: true, message: message.lblprocedureListNotFound, statusCode: httpStatusCode.NoContent, }
        }
    } catch (error) {
        return { status: false, message: error.message, statusCode: httpStatusCode.NotFound, }
    }



}

const deletePrescription = async (clientId, prescriptionId) => {
    try {
        console.log(clientId,'clientId')
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Prescription = await clientConnection.model('prescription', prescriptionSchema);
        const result = await Prescription.updateOne({ _id: prescriptionId }, { $set: { deletedAt: Date.now() } })
        if (result.modifiedCount) {
            return { status: true, statusCode: 200, message: 'prescription has deleted ' }
        }
        else return { status: false, statusCode: 404, message: 'prescription deletion failed ' }

    } catch (error) {
        return { status: false, statusCode: 501, message:error.message }
    }
}



 





module.exports = {
    create,
    update,
    getById,
    list,
    readPrescription,
    deletePrescription

};
