
const prescriptionSchema = require("../../client/model/prescription");
const { getClientDatabaseConnection } = require("../../db/connection");
const httpStatusCode = require("../../utils/http-status-code")
const message = require("../../utils/message")
const { validateObjectId } = require("./validate.serialNumber")
const getserialNumber = require("../../model/services/getserialNumber")
async function createPrescription(input) {
    try {
        
        if (!await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) {
            return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized };
        }

        if (!await validateObjectId({ clientid: input?.clientId, objectId: input?.branchId, collectionName: 'branch' })) {
            return { status: false, message: message.lblBranchNotFound, statusCode: httpStatusCode.Unauthorized };
        }

        if (!await validateObjectId({ clientid: input?.clientId, objectId: input?.buId, collectionName: 'businessunit' })) {
            return { status: false, message: message.lblBusinessUnitNotFound, statusCode: httpStatusCode.Unauthorized };
        }

        if (!await validateObjectId({ clientid: input?.clientId, objectId: input?.patientId, collectionName: 'patient' })) {
            return { status: false, message: message.lblPatientNotFound, statusCode: httpStatusCode.Unauthorized };
        }

        if (!await validateObjectId({ clientid: input?.clientId, objectId: input?.doctorId, collectionName: 'clientuser' })) {
            return { status: false, message: message.lblDoctorNotFound, statusCode: httpStatusCode.Unauthorized };
        }
        const db =await getClientDatabaseConnection(input?.clientId)
        const Prescription =await db.model('prescription',prescriptionSchema)

        if(!input._id)  {
                // const isExist = await Prescription.findOne({ displayId: input?.displayId||'', deletedAt: null })
                // if (isExist) return { status: false, statusCode: httpStatusCode.Conflict, message: message.lblChairhAlreadyExists }
                input.displayId = await getserialNumber('prescription', input?.clientId, input?.branchId,input?.buId)
            }    

        // Construct the prescription data
        const prescriptionData = {
            displayId: input.displayId,
            branchId: input.branchId,
            buId: input.buId || null,
            patientId: input.patientId,
            doctorId: input.doctorId,
            caseSheetId: input.caseSheetId,
            drugArray: input.drugArray || [],
            additionalAdvice: input.additionalAdvice || null,
            createdBy: input.createdBy || null,
        };

        // Save the prescription
        const newPrescription = new Prescription(prescriptionData);
        const savedPrescription = await newPrescription.save();

        return {
            status: true,
            message: "Prescription created successfully",
            data: savedPrescription,
            statusCode: httpStatusCode.Created
        };

    } catch (error) {
        console.error("Error creating prescription:", error);
        return {
            status: false,
            message: "Error creating prescription",
            error: error.message,
            statusCode: httpStatusCode.InternalServerError
        };
    }
}

module.exports = { createPrescription };
