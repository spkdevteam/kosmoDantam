const mongoose = require('mongoose')
const { validateObjectId } = require('./validate.serialNumber')
const message = require('../../utils/message')
const httpStatusCode = require('../../utils/http-status-code')
const clinetChairSchema = require('../../client/model/chair')
const { getClientDatabaseConnection } = require('../../db/connection')


exports.getchairList =async  (input)=>{
    try {
        console.log(input,'aaaaaaaaaaasssssssssasasass')
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitinValid, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(input?.clientId) 
        const chairs =await db.model('chair',clinetChairSchema)
        const result = await chairs.find({deletedAt:null,isActive:true,branch:input?.branchId,businessUnit:input?.buId})
        return result
    
    } catch (error) {
        
    }
}