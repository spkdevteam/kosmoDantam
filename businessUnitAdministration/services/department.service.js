
// {
//     "deptName": "Human Resources",
//     "deptId": "DPT001",
//     "branchId": "BR001",
//     "description": "Handles employee relations and administration."
//   }

const departmentSchema = require("../../client/model/department")
const { getClientDatabaseConnection } = require("../../db/connection")
const buSettingsSchema = require("../../model/buSettings")

const getserialNumber = require("../../model/services/getserialNumber")
const httpStatusCode = require("../../utils/http-status-code")
const message = require("../../utils/message")
const { validateObjectId } = require("./validate.serialNumber")
const createDepartment = async (input) => {
    try {
        if (!input?.clientId) return { status: false, message: message.lblClinetIdIsRequired, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitinValid, statusCode: httpStatusCode.Unauthorized }

        const db = await getClientDatabaseConnection(input?.clientId)
        const department = await db.model('department', departmentSchema)
        // If deptId doesn't exist, generate a new one or check if the department already exists
        if (!input?.deptId) {
            const result = await department.findOne({ deptName: input.deptName, deletedAt: null })
            if (result) {
                return {
                    status: false,
                    message: message.lblDepartmentalreadyExist,
                    statusCode: 400 // Bad Request (department already exists)
                }
            }
            input.deptId = await getserialNumber('department', input?.clientId, input?.branchId, input?.buId)
        }

        const newData = {
            deptName: input.deptName,
            branchId: input.branchId,
            description: input.description,
            displayId: input.deptId,
            buId: input?.buId,
            isActive: true,
        }
        console.log(newData, 'iput')


        const result = await department.findOneAndUpdate(
            { displayId: input.deptId },
            { $set: newData },
            {
                upsert: true,
                new: true,
                returnDocument: 'after'
            }
        );

        // Return success with status code 200 (OK) and the result data
        return {
            status: true,
            message: message.lblDpartmentCreationSuccess,
            statusCode: 200,
            ...result._doc
        }

    } catch (error) {
        // In case of an error, return status code 500 (Internal Server Error)
        return {
            status: false,
            message: error.message,
            statusCode: 500
        }
    }
}



const deleteDepartment = async (input) => {
    try {
        if (!input?.clientId) return { status: false, message: message.lblClinetIdIsRequired, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.deptId, collectionName: 'department' })) return { status: false, message: message.lbldepartmentNotFound, statusCode: httpStatusCode.Unauthorized }

        const db = await getClientDatabaseConnection(input?.clientId)
        const department = await db.model('department', departmentSchema)

        const result = await department.findOneAndUpdate({ _id: input.deptId }, { $set: { deletedAt: new Date() } }, { new: true, returnDocument: 'after' })
        if (result) return { status: true, message: message.lblDepartmentDeleted }
        else return { status: false, message: message.lbldepartmentNotFound, statusCode: 303 }
    } catch (error) {
        return { status: false, message: error.message, statusCode: 500 }
    }
}

const revokeDeleteDepartment = async (input) => {
    try {
        if (!input?.clientId) return { status: false, message: message.lblClinetIdIsRequired, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }

        const db = await getClientDatabaseConnection(input?.clientId)
        const department = await db.model('department', departmentSchema)
        const result = await department.updateOne({ _id: input.deptId }, { $set: { deletedAt: null } })
        if (result.modifiedCount) return { status: true, message: message.lblDepartmentRestored }
        else return { status: false, message: message.lblNoChanges, statusCode: 303 }
    } catch (error) {
        return { status: false, message: error.message, statusCode: 500 }
    }
}

const getallDepartments = async (input) => {
    try {
        if (!input?.clientId) return { status: false, message: message.lblClinetIdIsRequired, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(input.clientId)
        const departments = await db.model('department', departmentSchema)
        const result = await departments.find({ deletedAt: null, isActive: true })
        if (result) return { status: true, message: 'success', result: result, statusCode: 200 }
        else return { status: false, message: 'unKnown error ', statusCode: 500 }
    } catch (error) {
        return { status: false, message: error.message }
    }
}

const editDepartment = async (input) => {
    try {
        if (!input?.clientId) return { status: false, message: message.lblClinetIdIsRequired, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.deptId, collectionName: 'department' })) return { status: false, message: message.lbldepartmentNotFound, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchNotFound, statusCode: httpStatusCode.Unauthorized }

        const db = await getClientDatabaseConnection(input?.clientId)
        const department = await db.model('department', departmentSchema)
        // const buSettings =await db.model('BUSetting',buSettingsSchema)
        if (!input?.deptId) {
            const result = await department.findOne({ deptName: input.deptName, deletedAt: !null })
            if (result) return { status: false, message: message.lblDepartmentalreadyExist, statusCode: 400 }

        }
        const newData = {
            deptName: input.deptName,
            branchId: input.branchId,
            description: input.description,
            deletedAt: null,
            isActive: true,
        }
        const result = await department.findOneAndUpdate({ _id: input.deptId }, { $set: newData }, { new: true, returnDocument: 'after' })
        return { status: true, message: message.lblDpartmentModified, ...result?._doc, statusCode: 200 }

    } catch (error) {
        return { status: false, message: error.message, statusCode: 500 }
    }
}

const toggleDepartment = async (input) => {
    try {
        
        if (!input?.clientId) return { status: false, message: message.lblClinetIdIsRequired, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.deptId, collectionName: 'department' })) return { status: false, message: message.lbldepartmentNotFound, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(input.clientId)
        const departments = await db.model('department', departmentSchema)
        const isExist = await departments.findOne({ _id: input?.deptId })
        if (!isExist || isExist.deletedAt) return { status: false, message: message.lbldepartmentNotFound, statusCode: 400 }
        const result = await departments.updateOne({ _id: input?.deptId }, { $set: { isActive: !isExist?.isActive } })
        if (result.modifiedCount) return { statusCode: 200, status: true, message: `Department ${isExist?.deptName} has ${isExist?.isActive ? 'disabled' : 'enabled'} ` }
    } catch (error) {
        return { statusCode: 200, status: true, message: error.message }
    }
}
const allDepartmentsByPage = async (input) => {
    try {
        console.log(input,'input-------------')
        !input?.keyWord ? input.keyWord = "" : ''
        !input?.page ? input.page = 0 : input.page = parseInt(input.page)
        !input?.perPage ? input.perPage = 10 : input.perPage = parseInt(input.perPage)
        if (!input?.clientId) return { status: false, message: message.lblClinetIdIsRequired, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(input.clientId)
        const departments = await db.model('department', departmentSchema)
        const result = await departments.find(
            {
                $or:
                [
                    {deptName: { $regex: input?.keyWord || '', $options: 'i' }},
                    {description: { $regex: input?.keyWord || '', $options: 'i' }}
                ], 
                deletedAt: null, isActive: true
            })
            .populate('branchId','name')
            .skip((input?.page - 1) * input?.perPage)
            .limit(input?.page * input?.perPage);
        if (result) return { status: true, message: 'success', result: result, statusCode: 200 }
        else return { status: false, message: 'unKnown error ', statusCode: 500 }
    } catch (error) {
        return { status: false, message: error.message }
    }
}
module.exports = { allDepartmentsByPage,createDepartment, deleteDepartment, getallDepartments, toggleDepartment, editDepartment, revokeDeleteDepartment }