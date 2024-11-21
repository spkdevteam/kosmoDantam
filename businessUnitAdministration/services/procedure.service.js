const message = require("../../utils/message")
const procedureSchema = require("../../client/model/procedure")
const { getClientDatabaseConnection } = require("../../db/connection")
const getserialNumber = require("../../model/services/getserialNumber")
const validateSerialnumber = require("../../utils/validateSerialNumber")

const createProcedure = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input.clientId)
        const procedures = await db.model('procedure', procedureSchema)
        if (!input.procedureId) {
            const isExist = await procedures.findOne({ procedureName: input?.procedureName })
            if (isExist) return { status: false, message: message.lblProcedurealreadyExist, statusCode: 400 }
            input.procedureId = await getserialNumber('procedure', input?.clientId, input?.branchId)
        }
        if (!await validateSerialnumber(input?.procedureId, input.clientId))
            return { status: false, message: message.lblNotavalidSerialNumber, statusCode: 400 }

        const newRecord = {
            deptId: input?.deptId,
            services: input?.services || [],
            procedureName: input?.procedureName,
            procedureId: input?.procedureId,
            description: input?.description,
            branchId: input?.branchId,
            delete: false,
            isActive: true,
        }
        const result = await procedures.updateOne({ procedureId: input?.procedureId }, { $set: newRecord }, { upsert: true })
        if (result.modifiedCount) return { status: true, message: message.lblProcedureModified, statusCode: 200, ...newRecord }
        else if (result.upsertedCount) return { status: true, message: message.lblProcedureCreated, statusCode: 201, ...newRecord }
        else return { status: false, message: message.lblProcedureNotModified, statusCode: 304 }
    } catch (error) {
        return { status: false, message: error.message, statusCode: 500 }
    }
}

const deleteProcedure = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input.clientId)
        const procedures = await db.model('procedure', procedureSchema)
        const isExit = await procedures.findOne({ procedureId: input?.procedureId, deleted: false })
        if (!isExit || isExit.deleted) return { status: false, message: message.lblProcedureNotFound, statusCode: 404 }
        const result = await procedures.updateOne({ procedureId: input?.procedureId }, { $set: { deleted: true } })
        if (result.modifiedCount) return { status: true, message: message.lblProcedureDeleted, statusCode: 200 }
        else return { status: false, message: message.lblFailed, statusCode: 304 }
    } catch (error) {
        return { status: false, message: error.message, statusCode: 500 }
    }
}

const toggleProcedure = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input.clientId)
        const procedures = await db.model('procedure', procedureSchema)
        const isExit = await procedures.findOne({ procedureId: input?.procedureId, deleted: false })
        if (!isExit || isExit.deleted) return { status: false, message: message.lblProcedureNotFound, statusCode: 404 }
        const result = await procedures.updateOne(
            { procedureId: input?.procedureId },
            { $set: { isActive: !isExit.isActive } }
        )
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

module.exports = { createProcedure, deleteProcedure, toggleProcedure }
