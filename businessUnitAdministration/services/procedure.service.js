const message = require("../../utils/message")
const procedureSchema = require("../../client/model/procedure")
const { getClientDatabaseConnection } = require("../../db/connection")
const getserialNumber = require("../../model/services/getserialNumber")
const httpStatusCode = require("../../utils/http-status-code")
const { validateObjectId } = require("./validate.serialNumber")
const createProcedure = async (input) => {

    try {
        console.log(input,input)
        if (!input?.clientId) return { status: false, message: message.lblUnauthorizeUser, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchNotFound, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitinValid, statusCode: httpStatusCode.Unauthorized }
        // if(input?.services?.length){
        const serviceValidations = await Promise.all(input?.services?.map(async (serviceid) => {
            if (! await validateObjectId({ clientid: input?.clientId, objectId: serviceid, collectionName: 'services' })) return false
            else return true
        }))
        

        if (serviceValidations.includes(false)) {
            const index = serviceValidations.findIndex(value => value == false)
            return { status: false, message: message.lblServicenotFound + input?.services[index], statusCode: httpStatusCode.Unauthorized };
        }
    // }
        const db = await getClientDatabaseConnection(input.clientId)
        const procedures = await db.model('procedure', procedureSchema)
        if (!input.procedureId) {
            const isExist = await procedures.findOne({ procedureName: input?.procedureName, branchId : input?.branchId , deletedAt : null})
            if (isExist) return { status: false, message: message.lblProcedureAlreadyExists, statusCode: httpStatusCode.Conflict }
            input.displayId = await getserialNumber('procedure', input?.clientId, input?.branchId, input?.buId)
        }

        const newRecord = {
            deptId: input?.deptId,
            services: input?.services || [],
            procedureName: input?.procedureName,
            displayId: input?.displayId,
            description: input?.description,
            branchId: input?.branchId,
            deletedAt: null,
            isActive: true,
            buId: input?.buId,
            createdBy: input?.id
        }
        const result = await procedures.updateOne({ displayId: input?.displayId }, { $set: newRecord }, { upsert: true })
        if (result.modifiedCount) return { status: true, message: message.lblProcedureModified, statusCode: 200, ...newRecord }
        else if (result.upsertedCount) return { status: true, message: message.lblProcedureCreated, statusCode: 201, ...newRecord }
        else return { status: false, message: message.lblProcedureNotModified, statusCode: 304 }
    } catch (error) {
        return { status: false, message: error.message, statusCode: 500 }
    }
}

const deleteProcedure = async (input) => {
    try {
        if (!input?.clientId) return { status: false, message: message.lblUnauthorizeUser, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.procedureId, collectionName: 'procedure' })) return { status: false, message: message.lblProcedureDoesNotExist, statusCode: httpStatusCode.Unauthorized }


        const db = await getClientDatabaseConnection(input.clientId)
        const procedures = await db.model('procedure', procedureSchema)
        const isExit = await procedures.findOne({ _id: input?.procedureId, deletedAt: null })
        console.log(isExit, 'isExit')
        if (!isExit || isExit.deletedAt) return { status: false, message: message.lblProcedureNotFound, statusCode: 404 }
        const result = await procedures.updateOne({ _id: input?.procedureId }, { $set: { deletedAt: new Date(), deletedBy: input?.id } })
        if (result.modifiedCount) return { status: true, message: message.lblProcedureDeleted, statusCode: 200 }
        else return { status: false, message: message.lblFailed, statusCode: 304 }
    } catch (error) {
        return { status: false, message: error.message, statusCode: 500 }
    }
}
const revokeDeletedProcedure = async (input) => {
    try {
        if (!input?.clientId) return { status: false, message: message.lblUnauthorizeUser, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.procedureId, collectionName: 'procedure' })) return { status: false, message: message.lblProcedureDoesNotExist, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(input.clientId);
        const procedures = await db.model('procedure', procedureSchema);
        const result = await procedures.updateOne({ _id: input?.procedureId }, { $set: { deletedAt: null, deletedBy: null } });
        if (result.modifiedCount) return { status: true, message: message.lblProcedureRestored, statusCode: 200 };
        else return { status: false, message: message.lblFailed, statusCode: 304 };
    } catch (error) {
        return { status: false, message: error.message, statusCode: 500 };
    }
}
const toggleProcedure = async (input) => {
    try {
        if (!input?.clientId) return { status: false, message: message.lblUnauthorizeUser, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.procedureId, collectionName: 'procedure' })) return { status: false, message: message.lblProcedureDoesNotExist, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(input.clientId)
        const procedures = await db.model('procedure', procedureSchema)
        const isExit = await procedures.findOne({ _id: input?.procedureId, })
        if (!isExit || isExit.deletedAt) return { status: false, message: message.lblProcedureNotFound, statusCode: 404 }
        const result = await procedures.updateOne(
            { _id: input?.procedureId },
            { $set: { isActive: !isExit.isActive, updatedBy: input?.id } }
        )
        console.log(input, result)
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
// const editProcedure = async (input) => {
//     try {
//         if (!input?.clientId) return { status: false, message: message.lblUnauthorizeUser, statusCode: httpStatusCode.Unauthorized }
//         if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
//         if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.procedureId, collectionName: 'procedure' })) return { status: false, message: message.lblProcedureDoesNotExist, statusCode: httpStatusCode.Unauthorized }
//         if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchNotFound, statusCode: httpStatusCode.Unauthorized }
//         if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitinValid, statusCode: httpStatusCode.Unauthorized }
//         if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.deptId, collectionName: 'department' })) return { status: false, message: message.lbldepartmentNotFound, statusCode: httpStatusCode.Unauthorized }
        
//         const serviceValidations = await Promise.all(input?.services?.map(async (serviceid) => {
//             if (! await validateObjectId({ clientid: input?.clientId, objectId: serviceid, collectionName: 'services' })) return false
//             else return true
//         }))

//         if (serviceValidations.includes(false)) {
//             const index = serviceValidations.findIndex(value => value == false)
//             return { status: false, message: message.lblServicenotFound + input?.services[index], statusCode: httpStatusCode.Unauthorized };
//         }
//         const db = await getClientDatabaseConnection(input.clientId)
//         const procedures = await db.model('procedure', procedureSchema)
//         if (!input.procedureId) {
//             const isExist = await procedures.findOne({ _id: input?.procedureName })
//             if (isExist) return { status: false, message: message.lblProcedureAlreadyExists, statusCode: 400 }
//             if(isExist?.deptId == input?.deptId &&  
//                 input?.services?.length == isExist?.services?.length  &&
//                 isExist?.procedureName ==  input?.procedureName && 
//                 isExist?.description == input?.description && 
//                 isExist?.branchId ==  input?.branchId && 
//              )
//         }
//         const newRecord = {
//             deptId: input?.deptId,
//             services: input?.services || [],
//             procedureName: input?.procedureName,
//             description: input?.description,
//             branchId: input?.branchId,
            
//         }
        
//         const result = await procedures.updateOne({ _id: input?.procedureId }, { $set: newRecord })
//         result.modifiedCount
//         console.log(result,'result.modifiedCount')

//         if (result.modifiedCount) return { status: true, message: message.lblProcedureModified, statusCode: 200, ...newRecord }
//         else if (result.upsertedCount) return { status: true, message: message.lblProcedureCreated, statusCode: 201, ...newRecord }
//         else return { status: false, message: message.lblProcedureNotModified, statusCode: 304 }
//     } catch (error) {
//         return { status: false, message: error.message, statusCode: 500 }
//     }
// }

const editProcedure = async (input) => {
    try {
        if (!input?.clientId) return { status: false, message: message.lblUnauthorizeUser, statusCode: httpStatusCode.Unauthorized };

        if (!await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' }))
            return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized };

        if (!await validateObjectId({ clientid: input?.clientId, objectId: input?.procedureId, collectionName: 'procedure' }))
            return { status: false, message: message.lblProcedureDoesNotExist, statusCode: httpStatusCode.Unauthorized };

        if (!await validateObjectId({ clientid: input?.clientId, objectId: input?.branchId, collectionName: 'branch' }))
            return { status: false, message: message.lblBranchNotFound, statusCode: httpStatusCode.Unauthorized };

        if (!await validateObjectId({ clientid: input?.clientId, objectId: input?.buId, collectionName: 'businessunit' }))
            return { status: false, message: message.lblBusinessUnitinValid, statusCode: httpStatusCode.Unauthorized };

        if (!await validateObjectId({ clientid: input?.clientId, objectId: input?.deptId, collectionName: 'department' }))
            return { status: false, message: message.lbldepartmentNotFound, statusCode: httpStatusCode.Unauthorized };

        const serviceValidations = await Promise.all(
            input?.services?.map(async (serviceid) => 
                await validateObjectId({ clientid: input?.clientId, objectId: serviceid, collectionName: 'services' }))
        );

        if (serviceValidations.includes(false)) {
            const index = serviceValidations.findIndex(value => value === false);
            return { status: false, message: message.lblServicenotFound + input?.services[index], statusCode: httpStatusCode.Unauthorized };
        }

        const db = await getClientDatabaseConnection(input.clientId);
        const procedures = await db.model('procedure', procedureSchema);

        const existingProcedure = await procedures.findOne({ _id: input?.procedureId });

        if (!existingProcedure) {
            return { status: false, message: message.lblProcedureDoesNotExist, statusCode: httpStatusCode.Unauthorized };
        }

        // Check if all values are the same
        console.log(existingProcedure.services,input?.services ,'existingProcedure.services,input?.services ')
        const areServicesEqual = JSON.stringify(existingProcedure.services.sort()) === JSON.stringify((input?.services?.map((item)=>item?._id) || []).sort());
        console.log(existingProcedure.deptId.toString() === input?.deptId.toString() ,
        existingProcedure.procedureName === input?.procedureName ,
        existingProcedure.description === input?.description ,
        existingProcedure.branchId.toString() === input?.branchId.toString() ,areServicesEqual,'99999999999999999999999999' )
        if (
            existingProcedure.deptId.toString() === input?.deptId.toString() &&
            existingProcedure.procedureName === input?.procedureName &&
            existingProcedure.description === input?.description &&
            existingProcedure.branchId.toString() === input?.branchId.toString() &&
            areServicesEqual
        ) {
            return { status: false, message: 'No Changes Found to Update ', statusCode: 200 };
        }

        // Update the procedure if changes exist
        const newRecord = {
            deptId: input?.deptId,
            services: input?.services || [],
            procedureName: input?.procedureName,
            description: input?.description,
            branchId: input?.branchId,
            updatedBy: input?.id,
        };

        const result = await procedures.updateOne({ _id: input?.procedureId }, { $set: newRecord });

        if (result.modifiedCount) {
            return { status: true, message: message.lblProcedureModified, statusCode: 200, ...newRecord };
        } else if (result.upsertedCount) {
            return { status: true, message: message.lblProcedureCreated, statusCode: 201, ...newRecord };
        } else {
            return { status: false, message: message.lblProcedureNotModified, statusCode: 304 };
        }
    } catch (error) {
        return { status: false, message: error.message, statusCode: 500 };
    }
};

const getAllProcedures = async (input) => {
    try {
        if (!input?.clientId) return { status: false, message: message.lblUnauthorizeUser, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(input.clientId)
        const procedures = await db.model('procedure', procedureSchema)
        const result = await procedures.find({ deletedAt: null })
        return { status: true, statusCode: 200, result: result, message: message.lblProcedureFetched }
    } catch (error) {
        return { status: false, message: error.message, statusCode: 500 }
    }
}
const procedureUnderService = async (input) => {
    try {
        if (!input?.clientId) return { status: false, message: message.lblUnauthorizeUser, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.serviceId, collectionName: 'services' })) return { status: false, message: message.lblServicenotFound, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(input.clientId)
        const procedures = await db.model('procedure', procedureSchema)
        const result = await procedures.find({ deletedAt: null, services: input?.serviceId })
        return { status: true, statusCode: 200, result: result, message: message.lblProcedureFetched }
    } catch (error) {
        return { status: false, message: error.message, statusCode: 500 }
    }
}
const getAllProceduresByPage = async (input) => {
    try {
        
        
        !input?.page ? input.page = 0 : input.page = parseInt(input.page)
        !input?.perPage ? input.perPage = 10 : input.perPage = parseInt(input.perPage)
        const orArray = input?.keyword?.length ? {$or:[
            {procedureName:{$regex:input?.keyword,$options:'i'}},
            {description:{$regex:input?.keyword,$options:'i'}},
            {displayId:{$regex:input?.keyword,$options:'i'}}
        ] } :null
        if (!input?.clientId) return { status: false, message: message.lblUnauthorizeUser, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(input.clientId)
        const procedures = await db.model('procedure', procedureSchema)
        const filters ={ deletedAt: null}
        if(input?.branchId?.length) filters.branchId = input.branchId
        const result = await procedures.find({ ...filters,...orArray,...(input?.branchId?{branchId:input?.branchId}:{})})
        .populate('branchId','name')
        .populate({
            path: 'services',
            populate: [
              { path: 'departmentId', select: 'deptName' },
              { path: 'createdBy', select: 'fullName email' } // if needed
            ]
          })
        .skip((input.page) *  input.perPage )
        .limit( input.perPage)
        .sort({_id:-1})

        const totalRows = await procedures.find({ ...filters,...orArray,...(input?.branchId?{branchId:input?.branchId}:{})})
        
        return { status: true, statusCode: 200,count:totalRows?.length, result: result, message: message.lblProcedureFetched }
    } catch (error) {
        return { status: false, message: error.message, statusCode: 500 }
    }
}

module.exports = { 
    createProcedure, 
    getAllProceduresByPage,
    deleteProcedure, 
    toggleProcedure, 
    revokeDeletedProcedure, 
    editProcedure, 
    getAllProcedures, 
    procedureUnderService 
}
