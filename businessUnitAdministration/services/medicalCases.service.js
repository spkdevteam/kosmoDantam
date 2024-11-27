const medicalCasesSchema = require("../../client/model/medicalCases")
const { getClientDatabaseConnection } = require("../../db/connection")
const getserialNumber = require("../../model/services/getserialNumber")
const httpStatusCode = require("../../utils/http-status-code")
const message = require("../../utils/message")


const createMedicalCases = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input?.clientId)
        const medicalCases = db.model('medicalCase', medicalCasesSchema)
        if (!input.caseId) {
            const isExist = await medicalCases.findOne({ caseName: input?.caseName, deletedAt: null })
            if (isExist) return { status: false, statusCode: httpStatusCode.Conflict, message: message.lblChairhAlreadyExists }
            input.caseId = await getserialNumber('mediCases', input?.clientId, '',input?.buId)
             
        }
 
        const newData = {
            displayId: input?.caseId,
            caseName: input?.caseName,
            remark: input?.remark,
            isActive: input?.isActive,
            createdBy: input?.createdBy,
            buId:input?.buId,

        }
        
        const result =await medicalCases.findOneAndUpdate(
            { displayId: input?.caseId, deletedAt: null },
            { $set: newData },
            {
                upsert: true,
                new: true,
                returnDocument: 'after'
            }
        ) 
        return  {status:true,statusCode:httpStatusCode.OK,data:result?._doc}
    } catch (error) {

    }
}
const updateMedicalCases = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input?.clientId)
        const medicalCases = db.model('medicalCase', medicalCasesSchema)
        if (!input.caseId) {
            const isExist = await medicalCases.findOne({ caseName: input?.caseName, deletedAt: null })
            if (isExist) return { status: false, statusCode: httpStatusCode.Conflict, message: message.lblcaseAlreadyExist }
            input.caseId = await getserialNumber('mediCases', input?.clientId, '')
        
        }
        const newData = {
            caseName: input?.caseName,
            remark: input?.remark,
            createdBy: input?.createdBy
        }
        const result = medicalCases.findOneAndUpdate(
            { _id: input?.caseId, deletedAt: null },
            { $set: newData },
            {
                new: true,
                returnDocument: 'after'
            }
        )
        return { status: false, statusCode: httpStatusCode.OK, result:result?._doc}
    } catch (error) {

    } 
}
const readAllMedicalCases = async (input)=>{
    try {
        console.log(input)
        const db =await getClientDatabaseConnection(input?.clientId)
        const medicalCases =await db.model('medicalCase', medicalCasesSchema)
        const activeCases = await medicalCases.find({ deletedAt: null });
        console.log(activeCases,'activeCases')
        return {status:true,statusCode:httpStatusCode.OK ,message:'Medical cases fetched ',data: activeCases}
    } catch (error) {
        console.log(error)
    }
}
const deleteMedicalCase = async (input)=>{
    try {
        console.log(input)
        const db =await getClientDatabaseConnection(input?.clientId)
        const medicalCases =await db.model('medicalCase', medicalCasesSchema)
        const activeCases = await medicalCases.findOne({ deletedAt: null,_id:input?.caseId });
        
        if(!activeCases) return {status:false,statusCode:httpStatusCode.NotFound,message:'no case exist in this id'}
        const result = await  medicalCases.updateOne({_id:input?.caseId},{$set:{deletedAt:new Date()}})
        console.log(activeCases,'activeCases')
        return {status:true,statusCode:httpStatusCode.OK ,message:'Medical case deleted '}
    } catch (error) {
        console.log(error)
    }
}
const revokeDeletedMedicalCase = async (input)=>{
    try {
        console.log(input)
        const db =await getClientDatabaseConnection(input?.clientId)
        const medicalCases =await db.model('medicalCase', medicalCasesSchema)
        const activeCases = await medicalCases.findOne({ deletedAt: {$ne:null} ,_id:input?.caseId });
        console.log(activeCases,'activeCases')
         if (activeCases){
            const isExist =  await medicalCases.findOne({ deletedAt: null,caseName:activeCases?.caseName });
            console.log(isExist,'isExist')
            if(isExist) return {status:false,statusCode:httpStatusCode.Conflict ,message:'Unable to restore , there is already medical case in the same name ',data: activeCases}
        }
        if(!activeCases) return {status:false,statusCode:httpStatusCode.NotFound,message:'No deleted records to restore'}
        const result = await  medicalCases.updateOne({_id:input?.caseId},{$set:{deletedAt:null}})
        console.log(result,'activeCases')
        if(result.modifiedCount)return {status:true,statusCode:httpStatusCode.OK ,message:'Medical cases restored '}
        else return {status:false,statusCode:httpStatusCode.NotFound ,message:'Medical cases not found  '}
    } catch (error) {
        console.log(error)
    }
}
const toggleMedicalCases = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input?.clientId)
        const medicalCases = db.model('medicalCase', medicalCasesSchema)
        
        const isExist = await medicalCases.findOne({_id:input?.caseId,deletedAt:null})
        if (!input.caseId || !isExist)  return { status: false, statusCode: httpStatusCode.NotFound, message: 'No case found on this Id' }

        const result =await medicalCases.updateOne(
            { _id: input?.caseId, deletedAt: null },
            { $set:{isActive:!isExist?.isActive}  },
             
        )
        console.log(result)
        if (result.modifiedCount ) return { status: true , statusCode:httpStatusCode.OK,message:`${isExist?.caseName} ${isExist?.isActive ?'disabled ' : 'activated'} `}
        else return { status: false , statusCode:httpStatusCode.OK,message:`no changes done `}
    } catch (error) {

    } 
}
module.exports = { 
    createMedicalCases,
    updateMedicalCases ,
    readAllMedicalCases,
    revokeDeletedMedicalCase,
    deleteMedicalCase,
    revokeDeletedMedicalCase,
    toggleMedicalCases
 }