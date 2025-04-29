
const investigationSchema = require("../../client/model/investigationSchema");
const { getClientDatabaseConnection } = require("../../db/connection");
const getserialNumber = require("../../model/services/getserialNumber");
const httpStatusCode = require("../../utils/http-status-code");
const message = require("../../utils/message");
const { validateObjectId } = require("./validate.serialNumber");
// input =  {
//     "complaintId": "67444ddab193ebcde507e2a4",
//     "complaintName": "Severe Headache",
//     "discription": "Complaint of frequent and severe headaches lasting more than a week.",
//     "clientId": "6735e64c5c58f271b1ce1678"
//   }

const createInvestigation = async (input) => {
    try {
        if(!input?.clientId) return  { status: false, message: message.lblUnauthorizeUser, statusCode: httpStatusCode.Unauthorized }
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.clientId,collectionName:'clientId'})) return {status:false,message:message.lblClinetIdInvalid, statusCode:httpStatusCode.Unauthorized}
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.buId,collectionName:'businessunit'})) return {status:false,message:message.lblBusinessUnitinValid, statusCode:httpStatusCode.Unauthorized}
        
        const db = await getClientDatabaseConnection(input?.clientId);
        const investigation = await db.model('investigation', investigationSchema)
        if (!input?.investigationId) {
            const isExist = await investigation.findOne({ investigationName: input?.investigationName, deletedAt: null })
            console.log(isExist,'ssssss')
            if (isExist) return { status: false, message: message.lblChiefComplaintAlreadyExist, statusCode: httpStatusCode.Conflict }
            input.investigationId = await getserialNumber('investigation', input?.clientId, '',input?.buId)
            
            const newData = {
                displayId: input?.investigationId,
                investigationName: input?.investigationName,
                discription: input?.discription,
                deletedAt: null,
                isActive: true,
                buId: input?.buId,
            }
            
            const result = await investigation.findOneAndUpdate({
                displayId: input?.investigationId
            },
            {
                $set: newData
            },
            {
                upsert: true,
                new: true,
                returnDocument: 'after'
            })
            
            if(result?._doc) return { statusCode: httpStatusCode.OK, status: true, message: message.lblChiefComplaintCreated, data: result?._doc }
            return { statusCode: httpStatusCode.BadRequest, status: false, message: message.lblChiefComplaintCreationFailed,  }
        }
        console.log(newData, 'sasasa')
        return { status: false, message: message.lblChiefComplaintAuthorizationFailed, statusCode: httpStatusCode.Forbidden }
    } catch (error) {

    }
}

const editinvestigation = async (input) => {
    try {
         
        if(!input?.clientId) return  { status: false, message: message.lblUnauthorizeUser, statusCode: httpStatusCode.Unauthorized }
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.clientId,collectionName:'clientId'})) return {status:false,message:message.lblClinetIdInvalid, statusCode:httpStatusCode.Unauthorized}
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.buId,collectionName:'businessunit'})) return {status:false,message:message.lblBusinessUnitinValid, statusCode:httpStatusCode.Unauthorized}
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.investigationId,collectionName:'investigation'})) return {status:false,message:message.lblInvestigationDoesNotExist, statusCode:httpStatusCode.Unauthorized}
        const db = await getClientDatabaseConnection(input?.clientId);
        const investigation = await db.model('investigation', investigationSchema)
        if (input?.investigationId) {
            const isExist = await investigation.findOne({ _id: input?.investigationId, deletedAt: null })
            if (!isExist) return { statusCode: httpStatusCode.NotFound, status: true, message: message.lblInvestigationDoesNotExist }
            const newData = {
                investigationName: input?.investigationIdName,
                discription: input?.discription,
                deletedAt: null,
                isActive: true
            }

            const result = await investigation.findOneAndUpdate({
                _id: input?.investigationId
            },
                {
                    $set: newData
                },
                {
                    new: true,
                    returnDocument: 'after'
                })
            if (result?._doc)
                return { statusCode: httpStatusCode?.OK, status: true, message: message.lblInvestigationEdited } //data: result?._doc 
            return { statusCode: 404, status: false, message: message.lblInvestigationDoesNotExist, data: result?._doc || {} }
        }
        return { status: false, message: message.lblInvestigationDoesNotExist, statusCode: 404 }
    } catch (error) {
        return { status: false, message: error.message, statusCode: httpStatusCode.ExpectationFailed }
    }
}

const toggleInvestigation = async (input) => {
    try {
        if(!input?.clientId) return  { status: false, message: message.lblUnauthorizeUser, statusCode: httpStatusCode.Unauthorized }
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.clientId,collectionName:'clientId'})) return {status:false,message:message.lblClinetIdInvalid, statusCode:httpStatusCode.Unauthorized}
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.investigationId,collectionName:'investigation'})) return {status:false,message:message.lblInvestigationDoesNotExist, statusCode:httpStatusCode.Unauthorized}
        const db = await getClientDatabaseConnection(input?.clientId);
        const investigation = await db.model('investigation', investigationSchema)
        if (input?.investigationId) {
            const isExist = await investigation.findOne({ _id: input?.investigationId, deletedAt: null })
            if (!isExist) return { statusCode: httpStatusCode.NotFound, status: true, message: message.lblInvestigationDoesNotExist }
            const result = await investigation.updateOne({ _id: input?.investigationId, deletedAt: null }, { $set: { isActive: !isExist.isActive } })
            if (result.modifiedCount) return { statusCode: httpStatusCode.OK, status: true, message: `${isExist.investigationName} ${isExist.isActive ? 'disabled' : 'enabled'}` }
            return { statusCode: httpStatusCode.OK, status: true, message: message.lblInvestigationEditingFailed }
        }
        return { statusCode: httpStatusCode.Forbidden, status: true, message: message.lblInvestigationDoesNotExist }
    } catch (error) {
        return { status: false, message: 'invalid credential', statusCode: httpStatusCode.NotFound }
    }
}

const deleteInvestigation = async (input) => {
    try {
        if(!input?.clientId) return  { status: false, message: message.lblUnauthorizeUser, statusCode: httpStatusCode.Unauthorized }
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.clientId,collectionName:'clientId'})) return {status:false,message:message.lblClinetIdInvalid, statusCode:httpStatusCode.Unauthorized}
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.investigationId,collectionName:'investigation'})) return {status:false,message:message.lblInvestigationDoesNotExist, statusCode:httpStatusCode.Unauthorized}
        const db = await getClientDatabaseConnection(input?.clientId);
        const investigation = await db.model('investigation', investigationSchema)
        if (input?.investigationId) {
            const isExist = await investigation.findOne({ _id: input?.investigationId, deletedAt: null })
            if (!isExist) return { statusCode: httpStatusCode.NotFound, status: true, message: message.lblInvestigationDoesNotExist }
            const result = await investigation.updateOne({ _id: input?.investigationId, deletedAt: null }, { $set: { deletedAt:new Date() } })
            if (result.modifiedCount) return { statusCode: httpStatusCode.OK, status: true, message: `${isExist.investigationName} ${isExist.deletedAt ? 'revoked' : 'deleted'}` }
            return { statusCode: httpStatusCode.OK, status: true, message: message.lblInvestigationEditingFailed }
        }
        return { statusCode: httpStatusCode.Forbidden, status: true, message: message.lblInvestigationDoesNotExist }
    } catch (error) {
        return { status: false, message: 'invalid credential', statusCode: httpStatusCode.NotFound }
    }
}

 
const revokeinvestigation = async (input) => {
    try {
        if(!input?.clientId) return  { status: false, message: message.lblUnauthorizeUser, statusCode: httpStatusCode.Unauthorized }
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.clientId,collectionName:'clientId'})) return {status:false,message:message.lblClinetIdInvalid, statusCode:httpStatusCode.Unauthorized}
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.investigationId,collectionName:'investigation'})) return {status:false,message:message.lblInvestigationDoesNotExist, statusCode:httpStatusCode.Unauthorized}
        const db = await getClientDatabaseConnection(input?.clientId);
        const investigation = await db.model('investigation', investigationSchema)
        if (input?.investigationId) {
            const isExist = await investigation.findOne({ _id: input?.investigationId, deletedAt: {$ne:null} })
            if (!isExist) return { statusCode: httpStatusCode.NotFound, status: true, message: 'does not exist in the dump' }
            const result = await investigation.updateOne({ _id: input?.investigationId, deletedAt: {$ne:null} }, { $set: { deletedAt:null } })
            if (result.modifiedCount) return { statusCode: httpStatusCode.OK, status: true, message: `${isExist.investigationName} ${isExist.deletedAt ? 'revoked' : 'deleted'}` }
            return { statusCode: httpStatusCode.OK, status: true, message: message.lblInvestigationEditingFailed }
        }
        return { statusCode: httpStatusCode.Forbidden, status: true, message: message.lblInvestigationDoesNotExist }
    } catch (error) {
        return { status: false, message: 'invalid credential', statusCode: httpStatusCode.NotFound }
    }
}

const readActiveinvestigation = async (input) => {
    try {
        if(!input?.clientId) return  { status: false, message: message.lblUnauthorizeUser, statusCode: httpStatusCode.Unauthorized }
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.clientId,collectionName:'investigation'})) return {status:false,message:message.lblInvestigationDoesNotExist, statusCode:httpStatusCode.Unauthorized}
        
        const db = await getClientDatabaseConnection(input?.clientId);
        const investigation = await db.model('investigation', investigationSchema)
        const isExist = await investigation.find({deletedAt: null,isActive:true })
        return { statusCode: httpStatusCode.OK, status: true, message: message.lblInvestigationFetched,data:isExist }
         } catch (error) {
        return { status: false, message: 'invalid credential', statusCode: httpStatusCode.NotFound }
    }
}
const readAllinvestigation = async (input) => {
    try {
        if(!input?.clientId) return  { status: false, message: message.lblUnauthorizeUser, statusCode: httpStatusCode.Unauthorized }
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.clientId,collectionName:'clientId'})) return {status:false,message:message.lblClinetIdInvalid, statusCode:httpStatusCode.Unauthorized}
        const db = await getClientDatabaseConnection(input?.clientId);
        const investigation = await db.model('investigation', investigationSchema)
        const isExist = await investigation.find({deletedAt: null, })
        return { statusCode: httpStatusCode.OK, status: true, message: message.lblInvestigationFetched,data:isExist }
         } catch (error) {
        return { status: false, message: 'invalid credential', statusCode: httpStatusCode.NotFound }
    }
}
const readAllinvestigationByPage = async  (input) => {
    try {
        !input?.keyWord ? input.keyWord = "" : ''
        !input?.page ? input.page = 0 : input.page = parseInt(input.page)
        !input?.perPage ? input.perPage = 10 : input.perPage = parseInt(input.perPage)
        if(!input?.clientId) return  { status: false, message: message.lblUnauthorizeUser, statusCode: httpStatusCode.Unauthorized }
        console.log(input)
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.clientId,collectionName:'clientId'})) return {status:false,message:message.lblClinetIdInvalid, statusCode:httpStatusCode.Unauthorized}
        const db = await getClientDatabaseConnection(input?.clientId);
        const investigation = await db.model('investigation', investigationSchema)
        const isExist = await investigation.find({
            $or:[
                {investigationName:{$regex:input?.keyWord,$options:'i'}},
                {discription:{$regex:input?.keyWord,$options:'i'}},
            ],
            deletedAt: null, 
        })
        .skip((input.page-1) * input.perPage )
        .limit( input.page * input.perPage)
        return { statusCode: httpStatusCode.OK, status: true, message: message.lblInvestigationFetched,data:isExist }
         } catch (error) {
        return { status: false, message: 'invalid credential', statusCode: httpStatusCode.NotFound }
    }
}


module.exports = {readAllinvestigationByPage, createInvestigation,editinvestigation,toggleInvestigation ,deleteInvestigation,revokeinvestigation,readActiveinvestigation,readAllinvestigation}
