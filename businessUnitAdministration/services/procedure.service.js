const message = require("../../utils/message")
const procedureSchema = require("../../client/model/procedure")
const { getClientDatabaseConnection } = require("../../db/connection")
const getserialNumber = require("../../model/services/getserialNumber")
const createProcedure = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input.clientId)
        const procedures = await db.model('procedure', procedureSchema)
        if (!input.procedureId) {
            const isExist = await procedures.findOne({ procedureName: input?.procedureName })
            if (isExist) return { status: false, message: message.lblProcedureAlreadyExists, statusCode: 400 }
            input.procedureId = await getserialNumber('procedure', input?.clientId, input?.branchId,input?.buId)
        }
        const newRecord = {
            deptId: input?.deptId,
            services: input?.services || [],
            procedureName: input?.procedureName,
            displayId: input?.procedureId,
            description: input?.description,
            branchId: input?.branchId,
            deletedAt: null,
            isActive: true,
            buId: input?.buId,
        }
        const result = await procedures.updateOne({ displayId: input?.procedureId }, { $set: newRecord }, { upsert: true })
        if (result.modifiedCount) return { status: true, message: message.lblProcedureModified, statusCode: 200, ...newRecord }
        else if (result.upsertedCount) return { status: true, message: message.lblProcedureCreated, statusCode: 201, ...newRecord }
        else return { status: false, message: message.lblProcedureNotModified, statusCode: 304 }
    } catch (error) {
        return { status: false, message: error.message, statusCode: 500 }
    }
}



const deleteProcedure = async (input) => {
    try {
        //aquiering connection with client database 
        const db = await getClientDatabaseConnection(input.clientId)
        const procedures = await db.model('procedure', procedureSchema)
        const isExit = await procedures.findOne({ _id: input?.procedureId, deletedAt: null })
        console.log(isExit,'isExit')
        if (!isExit || isExit.deletedAt) return { status: false, message: message.lblProcedureNotFound, statusCode: 404 }
        const result = await procedures.updateOne({ _id: input?.procedureId }, { $set: { deletedAt: new Date() } })
        if (result.modifiedCount) return { status: true, message: message.lblProcedureDeleted, statusCode: 200 }
        else return { status: false, message: message.lblFailed, statusCode: 304 }
    } catch (error) {
        return { status: false, message: error.message, statusCode: 500 }
    }
}
const revokeDeletedProcedure = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input.clientId)
        const procedures = await db.model('procedure', procedureSchema)
        const result = await procedures.updateOne({ _id: input?.procedureId }, { $set: { deletedAt:null } })
        if (result.modifiedCount) return { status: true, message: message.lblProcedurerestored, statusCode: 200 }
        else return { status: false, message: message.lblFailed, statusCode: 304 }
    } catch (error) {
        return { status: false, message: error.message, statusCode: 500 }
    }
}
const toggleProcedure = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input.clientId)
        const procedures = await db.model('procedure', procedureSchema)
        const isExit = await procedures.findOne({ _id: input?.procedureId,   })
        if (!isExit || isExit.deletedAt) return { status: false, message: message.lblProcedureNotFound, statusCode: 404 }
        const result = await procedures.updateOne(
            { _id: input?.procedureId },
            { $set: { isActive: !isExit.isActive } }
        )
        console.log(input,result)
        if (result.modifiedCount)
            return {
                status: true,
                message: `Procedure ${isExit.procedureName} has ${isExit.isActive ? 'disabled' : 'enabled'}`,
                statusCode: 200
            }
        else return { status: false, message: message.lblFailed, statusCode: 304 }
    } catch (error) {
        return { status: false, message: error.message, statusCode: 500 }
    }
}
const editProcedure = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input.clientId)
        const procedures = await db.model('procedure', procedureSchema)
        if (!input.procedureId) {
            const isExist = await procedures.findOne({ _id: input?.procedureName })
            if (isExist) return { status: false, message: message.lblProcedureAlreadyExists, statusCode: 400 }
            
        }
        const newRecord = {
            deptId: input?.deptId,
            services: input?.services || [],
            procedureName: input?.procedureName,
            description: input?.description,
            branchId: input?.branchId,
            deletedAt: null,
            isActive: true,
        }
        const result = await procedures.updateOne({ _id: input?.procedureId }, { $set: newRecord })
        if (result.modifiedCount) return { status: true, message: message.lblProcedureModified, statusCode: 200, ...newRecord }
        else if (result.upsertedCount) return { status: true, message: message.lblProcedureCreated, statusCode: 201, ...newRecord }
        else return { status: false, message: message.lblProcedureNotModified, statusCode: 304 }
    } catch (error) {
        return { status: false, message: error.message, statusCode: 500 }
    }
}
const getAllProcedures = async (input)=>{
    try {
        const db = await getClientDatabaseConnection(input.clientId)
        const procedures = await db.model('procedure', procedureSchema)
        const result =await procedures.find({deletedAt:null})
        return {status:true,statusCode:200,result:result,message:message.lblProcedureFetched}
    } catch (error) {
        return { status: false, message: error.message, statusCode: 500 }
    }
}
const procedureUnderService = async (input)=>{
    try {
        const db = await getClientDatabaseConnection(input.clientId)
        const procedures = await db.model('procedure', procedureSchema)
        const result =await procedures.find({deletedAt:null,services:input?.serviceId})
        return {status:true,statusCode:200,result:result,message:message.lblProcedureFetched}
    } catch (error) {
        return { status: false, message: error.message, statusCode: 500 }
    }
}

module.exports = { createProcedure, deleteProcedure, toggleProcedure ,revokeDeletedProcedure,editProcedure,getAllProcedures,procedureUnderService }
