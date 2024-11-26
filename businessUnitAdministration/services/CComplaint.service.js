const cheifComplaintSchema = require("../../client/model/cheifcomplaint");
const { getClientDatabaseConnection } = require("../../db/connection");
const getserialNumber = require("../../model/services/getserialNumber");
const httpStatusCode = require("../../utils/http-status-code");
const message = require("../../utils/message")
// input =  {
//     "complaintId": "67444ddab193ebcde507e2a4",
//     "complaintName": "Severe Headache",
//     "discription": "Complaint of frequent and severe headaches lasting more than a week.",
//     "clientId": "6735e64c5c58f271b1ce1678"
//   }

const createCheifComplaint = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input?.clientId);
        const cheifComplaint = await db.model('CheifComplaint', cheifComplaintSchema)
        console.log(input, 'sasasa')
        if (!input?.complaintId) {
            const isExist = await cheifComplaint.findOne({ complaintName: input?.complaintName, deletedAt: null })
            if (isExist) return { status: false, message: message.lblChiefComplaintAlreadyExist, statusCode: httpStatusCode.Conflict }
            input.complaintId = await getserialNumber('cheifComplaint', input?.clientId, '',input?.buId)
            console.log(input,'inputinput')
            const newData = {
                complaintId: input?.complaintId,
                complaintName: input?.complaintName,
                discription: input?.discription,
                buId: input?.buId,
                deletedAt: null,
                isActive: true
            }

            const result = await cheifComplaint.findOneAndUpdate({
                complaintId: input?.complaintId
            },
                {
                    $set: newData
                },
                {
                    upsert: true,
                    new: true,
                    returnDocument: 'after'
                })
            console.log(result)
            return { statusCode: httpStatusCode.OK, status: true, message: message.lblChiefComplaintAuthorizationFailed, data: result?._doc }
        }
        return { status: false, message: message.lblChiefComplaintAuthorizationFailed, statusCode: httpStatusCode.Forbidden }
    } catch (error) {

    }
}

const editCheifComplaint = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input?.clientId);
        const cheifComplaint = await db.model('CheifComplaint', cheifComplaintSchema)
        if (input?.complaintId) {
            const isExist = await cheifComplaint.findOne({ _id: input?.complaintId, deletedAt: null })
            if (!isExist) return { statusCode: httpStatusCode.NotFound, status: true, message: message.lblChiefComplaintDoesNotExist }
            const newData = {
                complaintId: input?.complaintId,
                complaintName: input?.complaintName,
                discription: input?.discription,
                buId: input?.buid,
                deletedAt: null,
                isActive: true
            }

            const result = await cheifComplaint.findOneAndUpdate({
                _id: input?.complaintId
            },
                {
                    $set: newData
                },
                {
                    new: true,
                    returnDocument: 'after'
                })
            console.log(result, '8989898')
            if (result?._doc)
                return { statusCode: httpStatusCode?.OK, status: true, message: message.lblChiefComplaintEdited } //data: result?._doc 
            return { statusCode: 404, status: false, message: message.lblChiefComplaintDoesNotExist, data: result?._doc || {} }
        }
        return { status: false, message: message.lblChiefComplaintDoesNotExist, statusCode: 404 }
    } catch (error) {
        return { status: false, message: error.message, statusCode: httpStatusCode.ExpectationFailed }
    }
}

const toggleCheifComplain = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input?.clientId);
        const cheifComplaint = await db.model('CheifComplaint', cheifComplaintSchema)
        if (input?.complaintId) {
            const isExist = await cheifComplaint.findOne({ _id: input?.complaintId, deletedAt: null })
            if (!isExist) return { statusCode: httpStatusCode.NotFound, status: true, message: message.lblChiefComplaintDoesNotExist }
            const result = await cheifComplaint.updateOne({ _id: input?.complaintId, deletedAt: null }, { $set: { isActive: !isExist.isActive } })
            if (result.modifiedCount) return { statusCode: httpStatusCode.OK, status: true, message: `${isExist.complaintName} ${isExist.isActive ? 'disabled' : 'enabled'}` }
            return { statusCode: httpStatusCode.OK, status: true, message: message.lblChiefComplaintEditingFailed }
        }
        return { statusCode: httpStatusCode.Forbidden, status: true, message: message.lblChiefComplaintDoesNotExist }
    } catch (error) {
        return { status: false, message: 'invalid credential', statusCode: httpStatusCode.NotFound }
    }
}

const deleteCheifComplaint = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input?.clientId);
        const cheifComplaint = await db.model('CheifComplaint', cheifComplaintSchema)
        if (input?.complaintId) {
            const isExist = await cheifComplaint.findOne({ _id: input?.complaintId, deletedAt: null })
            if (!isExist) return { statusCode: httpStatusCode.NotFound, status: true, message: message.lblChiefComplaintDoesNotExist }
            const result = await cheifComplaint.updateOne({ _id: input?.complaintId, deletedAt: null }, { $set: { deletedAt:new Date() } })
            if (result.modifiedCount) return { statusCode: httpStatusCode.OK, status: true, message: `${isExist.complaintName} ${isExist.deletedAt ? 'revoked' : 'deleted'}` }
            return { statusCode: httpStatusCode.OK, status: true, message: message.lblChiefComplaintEditingFailed }
        }
        return { statusCode: httpStatusCode.Forbidden, status: true, message: message.lblChiefComplaintDoesNotExist }
    } catch (error) {
        return { status: false, message: 'invalid credential', statusCode: httpStatusCode.NotFound }
    }
}

const revokeCheifComplaint = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input?.clientId);
        const cheifComplaint = await db.model('CheifComplaint', cheifComplaintSchema)
        if (input?.complaintId) {
            const isExist = await cheifComplaint.findOne({ _id: input?.complaintId, deletedAt: {$ne:null} })
            if (!isExist) return { statusCode: httpStatusCode.NotFound, status: true, message: message.lblChiefComplaintDoesNotExist }
            const result = await cheifComplaint.updateOne({ _id: input?.complaintId, deletedAt: {$ne:null} }, { $set: { deletedAt:null } })
            if (result.modifiedCount) return { statusCode: httpStatusCode.OK, status: true, message: `${isExist.complaintName} ${isExist.deletedAt ? 'revoked' : 'deleted'}` }
            return { statusCode: httpStatusCode.OK, status: true, message: message.lblChiefComplaintEditingFailed }
        }
        return { statusCode: httpStatusCode.Forbidden, status: true, message: message.lblChiefComplaintDoesNotExist }
    } catch (error) {
        return { status: false, message: 'invalid credential', statusCode: httpStatusCode.NotFound }
    }
}

const readActiveCheifComplaint = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input?.clientId);
        const cheifComplaint = await db.model('CheifComplaint', cheifComplaintSchema)
        const isExist = await cheifComplaint.find({deletedAt: null,isActive:true })
        return { statusCode: httpStatusCode.OK, status: true, message: message.lblChiefComplaintFetched,data:isExist }
         } catch (error) {
        return { status: false, message: 'invalid credential', statusCode: httpStatusCode.NotFound }
    }
}
const readAllCheifComplaint = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input?.clientId);
        const cheifComplaint = await db.model('CheifComplaint', cheifComplaintSchema)
        const isExist = await cheifComplaint.find({deletedAt: null, })
        return { statusCode: httpStatusCode.OK, status: true, message: message.lblChiefComplaintFetched,data:isExist }
         } catch (error) {
        return { status: false, message: 'invalid credential', statusCode: httpStatusCode.NotFound }
    }
}


module.exports = { createCheifComplaint, editCheifComplaint,readAllCheifComplaint, toggleCheifComplain,deleteCheifComplaint,revokeCheifComplaint,readActiveCheifComplaint }