

const mongoose = require('mongoose')
const { validateObjectId } = require('./validate.serialNumber')
const { createClientDatabase } = require('../../db/connection')
const tokenSchema = require('../../client/model/token')
exports.createToken = async ({date,clientId,branchId,buId})=>{
        try {
            if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
            if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitNotFound, statusCode: httpStatusCode.Unauthorized }
            if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchNotFound, statusCode: httpStatusCode.Unauthorized }

        const db = createClientDatabase(clientId)
        const token = db.model('token',tokenSchema)
        const isToken = await token.findOneAndUpdate(
            { tokenDate: date },
            { $inc: { tokenNumber: 1 } },
            { returnDocument: 'after', upsert: true }
        );

        return isToken.tokenNumber;
        } catch (error) {
            
        }

        
       
}