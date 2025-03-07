

const { validateObjectId } = require('./validate.serialNumber')
const { getClientDatabaseConnection } = require('../../db/connection')
const tokenSchema = require('../../client/model/token')
const message = require('../../utils/message')
const httpStatusCode = require('../../utils/http-status-code')
exports.createToken = async ({date,clientId,branchId,buId,appointmentid})=>{
        try {
            if (! await validateObjectId({ clientid: clientId, objectId: clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
            if (! await validateObjectId({ clientid: clientId, objectId: buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitNotFound, statusCode: httpStatusCode.Unauthorized }
            if (! await validateObjectId({ clientid: clientId, objectId: branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchNotFound, statusCode: httpStatusCode.Unauthorized }
            if (! await validateObjectId({ clientid: clientId, objectId: appointmentid, collectionName: 'appointment' })) return { status: false, message: message.lblAppointmentDoesNotExist, statusCode: httpStatusCode.Unauthorized }
            
            const db = await getClientDatabaseConnection(clientId)
            const token = await db.model('token',tokenSchema)
            const isToken = await token.findOneAndUpdate(
                { tokenDate: date,branchId:branchId,buId:buId },
                { $inc: { tokenNumber: 1 } },
                { returnDocument: 'after', upsert: true }
            );
            return isToken?._doc;
        } catch (error) {
            console.error('Error creating token:', error);
            return { status: false, message: 'Internal server error', statusCode: httpStatusCode.InternalServerError };
        }

        
       
}
