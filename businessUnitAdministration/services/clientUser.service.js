
const mongoose = require('mongoose')
const { validateObjectId } = require('./validate.serialNumber')
const message = require('../../utils/message')
const { getClientDatabaseConnection } = require('../../db/connection')
const clinetUserSchema = require('../../client/model/user')
const httpStatusCode = require('../../utils/http-status-code')

exports.listEmployeeByRole = async (input)=>{
try {


    const roleIds = Array.isArray(input?.roleId) ? input.roleId : [input?.roleId];
    
    if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
    if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchIdInvalid, statusCode: httpStatusCode.Unauthorized }
    if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitinValid, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(input?.clientId) 
        const employee =await db.model('clientUser',clinetUserSchema)
        const emploeeList = await employee.find({roleId: { $in: roleIds },branch:input?.branchId ,deletedAt:null,isActive:true},{firstName:1,lastName:1,_id:1,roleId:1})
        return emploeeList
    } catch (error) {
    
}
}


