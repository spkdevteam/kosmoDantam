
const message = require("../../utils/message")
const procedureSchema = require("../../client/model/procedure")
const { getClientDatabaseConnection } = require("../../db/connection")
const getserialNumber = require("../../model/services/getserialNumber")
const validateSerialnumber = require("../../utils/validateSerialNumber")
const createProcedure =async (input)=>{
try {
    const db =await getClientDatabaseConnection(input.clientId)
    const procedures =await  db.model('procedure',procedureSchema)  
    if(!input.procedureId){
        const isExist =await procedures.findOne({procedureName:input?.procedureName})
       if(isExist) return {status:false,message:message.lblProcedurealreadyExist}
        input.procedureId = await getserialNumber('procedure', input?.clientId, input?.branchId)
    }
    if(!await validateSerialnumber(input?.procedureId,input.clientId)) return   { status: false, messsage: message.lblNotavalidSerialNumber }
    const isExit =await procedures.findOne({procedureId:input?.procedureId,deleted:false})
        if(!isExit || isExit.deleted) return {status:false,message:message.lblProcedureNotFound}
    const newRecord = {
        deptId:input?.deptId,
        services:input?.services|| [],
        procedureName:input?.procedureName,
        procedureId:input?.procedureId,
        description:input?.description,
        branchId:input?.branchId,
        delete:false,
        isActive:true,
    }
    const result = await procedures.updateOne({procedureId:input?.procedureId},{$set:newRecord},{upsert:true})
    if(result.modifiedCount) return {status:true,message:message.lblProcedureModified,...newRecord}
    else if (result.upsertedCount) return {status:true,message:message.lblProcedureCreated,...newRecord}
    else return {status:false,message:message.lblProcedureNotModified}
} catch (error) {
    return {status:true,message:error.message }
}
}

const deleteProcedure = async (input)=>{
    try {
        const db =await getClientDatabaseConnection(input.clientId)
        const procedures =await  db.model('procedure',procedureSchema)  
        const isExit =await procedures.findOne({procedureId:input?.procedureId,deleted:false})
        if(!isExit || isExit.deleted) return {status:false,message:message.lblProcedureNotFound}
        const result = await procedures.updateOne({procedureId:input?.procedureId},{$set:{deleted:true}})
        if(result.modifiedCount) return {status:true,message:message.lblProcedureDeleted}
        else  return {status:false,message:message.lblFailed}
    } catch (error) {
        return {status:false,message:error.message}
    }
}

const toggleProcedure =async (input)=>{
    try {
        const db =await getClientDatabaseConnection(input.clientId)
        const procedures =await  db.model('procedure',procedureSchema)  
        const isExit =await procedures.findOne({procedureId:input?.procedureId,deleted:false})
        if(!isExit || isExit.deleted) return {status:false,message:message.lblProcedureNotFound}
        const result = await procedures.updateOne({procedureId:input?.procedureId},{$set:{isActive:!isExit.isActive}})
        if(result.modifiedCount) return {status:true,message:`Procedure ${isExit.procedureName} has ${isExit.isActive?'disabled':'enabled'}`}

    } catch (error) {
        
    }
}

module.exports = {createProcedure,deleteProcedure,toggleProcedure}