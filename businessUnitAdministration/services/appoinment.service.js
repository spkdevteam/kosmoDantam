const { getClientDatabaseConnection } = require("../../db/connection")
const message = require("../../utils/message")
const httpStatusCode = require("../../utils/http-status-code");
const appointmentSchema = require("../../client/model/appointments");
const getserialNumber = require("../../model/services/getserialNumber");
const { validateObjectId } = require("./validate.serialNumber");


exports.creatAppointment = async (input) => { 
    try {
        //handling missing credential  
        if(!input?.clientId ) return {status:false,message:message.lblClinetIdIsRequired, statusCode:httpStatusCode.Unauthorized}
        if(!input?.branchId) return {status:false,message:message.lblBranchIdInvalid, statusCode:httpStatusCode.Unauthorized}
        if(!input?.buId) return {status:false,message:message.lblBusinessUnitinValid, statusCode:httpStatusCode.Unauthorized}
        if(!input?.dutyDoctorId) return {status:false,message:'doctor detail is missing ', statusCode:httpStatusCode.Unauthorized}
        if(!input?.dentalAssistant) return {status:false,message:'dental assistant is missing  ', statusCode:httpStatusCode.Unauthorized}
        if(!input?.chairId) return {status:false,message:'chair details is missing ', statusCode:httpStatusCode.Unauthorized}
        if(!input?.patientId) return {status:false,message:'patient id is missing ', statusCode:httpStatusCode.Unauthorized}

        //handling invalid credential 
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.clientId,collectionName:'clientId'})) return {status:false,message:message.lblClinetIdInvalid, statusCode:httpStatusCode.Unauthorized}
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.branchId,collectionName:'branch'})) return {status:false,message:message.lblBranchIdInvalid, statusCode:httpStatusCode.Unauthorized}
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.buId,collectionName:'businessunit'})) return {status:false,message:message.lblBusinessUnitNotFound, statusCode:httpStatusCode.Unauthorized}
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.dutyDoctorId,collectionName:'clientuser'})) return {status:false,message:'doctor detail is invalid ', statusCode:httpStatusCode.Unauthorized}
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.dentalAssistant,collectionName:'clientuser'})) return {status:false,message:'dental assistant is invalid  ', statusCode:httpStatusCode.Unauthorized}
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.chairId,collectionName:'chair'})) return {status:false,message:'chair details is inValid ', statusCode:httpStatusCode.Unauthorized}
        if(! await validateObjectId({clientid:input?.clientId,objectId:input?.patientId,collectionName:'clientuser'})) return {status:false,message:'patient id is not valid ', statusCode:httpStatusCode.Unauthorized}
        
        const db = await getClientDatabaseConnection(input?.clientId)
        const appointments = await db.model('appointment',appointmentSchema)
        if(!input?.displayId){
            input.displayId = await getserialNumber('appointment', input?.clientId,input?.branchId,input?.buId)
        }
        
        const newData = {
            displayId: input?.displayId,
            branchId: input?.branchId,
            buId:input?.buId,
            token: input?.token|| null ,
            date: input?.date || new Date(),
            caseId: input?.caseId || null ,
            dutyDoctorId: input?.dutyDoctorId,
            dentalAssistant: input?.dentalAssistant,
            slotFrom: input?.slotFrom,
            slotTo: input?.slotTo,
            chairId: input?.chairId,
            patientId: input?.patientId,
            status: input?.status,
            isActive: input?.isActive || true,
            deletedAt: input?.deletedAt || null ,
            createdUser: input?.createdUser,
        }
        const result = await appointments.findOneAndUpdate({displayId: input?.displayId},{$set:newData},{upsert:true,returnDocument:'after',new:true})
        if(result?._doc) return  {status:true,message:message.lblAppointmentCreated, statusCode:httpStatusCode.OK,data:result?._doc}
        else return  {status:false,message:message.lblCredentialMissing, statusCode:httpStatusCode.Unauthorized}
    } catch (error) {
        return {status:false,message:error.message, statusCode:httpStatusCode.InternalServerError}
    }
}