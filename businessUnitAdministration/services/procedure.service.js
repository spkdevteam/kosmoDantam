
// {
//     "clientId": "6735e64c5c58f271b1ce1678",
//     "deptId": "UT-AB-2024-DP100008",
//     "services": [
//       "UT-AB-2024-SV1001",
//       "UT-AB-2024-SV1014"
//     ],
//     "procedureName": "Fillings (Amalgam or Composite)",
//     "procedureId": null,
//     "description": "General Dental Care is designed to maintain optimal oral health. This service includes essential procedures such as Teeth Cleaning (Prophylaxis) to remove plaque, tartar, and stains, and Fillings to restore cavities or tooth damage using high-quality materials like amalgam or composite resin. Regular visits to maintain general dental care can help prevent cavities, gum disease, and ensure a bright, healthy smile.",
//     "branchId": "BR001"
//   }

const message = require("../../utils/message")
const procedureSchema = require("../../client/model/procedure")
const { getClientDatabaseConnection } = require("../../db/connection")
const getserialNumber = require("../../model/services/getserialNumber")
const validateSerialnumber = require("../../utils/validateSerialNumber")
const createProcedure =async (input)=>{
try {
    console.log(input)
    const db =await getClientDatabaseConnection(input.clientId)
    const procedures =await  db.model('procedure',procedureSchema)  
    if(!input.procedureId){
        const isExist =await procedures.findOne({procedureName:input?.procedureName})
        console.log(isExist)
        if(isExist) return {status:false,message:message.lblProcedurealreadyExist}
        input.procedureId = await getserialNumber('procedure', input?.clientId, input?.branchId)
    }
    if(!await validateSerialnumber(input?.procedureId,input.clientId)) return   { status: false, messsage: message.lblNotavalidSerialNumber }
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

module.exports = {createProcedure,deleteProcedure}