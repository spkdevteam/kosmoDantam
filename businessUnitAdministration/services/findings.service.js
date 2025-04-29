const findingsSchema = require("../../client/model/findings");
const { getClientDatabaseConnection } = require("../../db/connection");
const getserialNumber = require("../../model/services/getserialNumber");
const httpStatusCode = require("../../utils/http-status-code");
const message = require("../../utils/message");
const { validateObjectId } = require("./validate.serialNumber");
const createFindings = async (input) => {
    try {
        // Connect to the client database
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitinValid, statusCode: httpStatusCode.Unauthorized }

        const db = await getClientDatabaseConnection(input?.clientId);
        const findings = db.model('finding', findingsSchema);

        // Check if findingsId exists; if not, check for a duplicate name and generate a new ID
        if (!input.findingsId) {
            const isExist = await findings.findOne({ findingsName: input?.findingsName });
            if (isExist) {
                return {
                    status: false,
                    statusCode: httpStatusCode.Conflict,
                    message: 'Findings already exist.',
                };
            }
            input.findingsId = await getserialNumber('findings', input?.clientId, '', input?.buId);
        }

        const newData = {
            displayId: input?.findingsId,
            findingsName: input?.findingsName,
            discription: input?.discription,
            clientId: input?.clientId,
            buId: input?.buId,
        };

        const result = await findings.findOneAndUpdate(
            { displayId: input?.findingsId },
            { $set: newData },
            {
                new: true,
                returnDocument: 'after',
                upsert: true,
            }
        );

        // Return the created or updated findings
        return {
            status: true,
            statusCode: httpStatusCode.OK,
            message: 'New findings created.',
            data: result._doc,
        };
    } catch (error) {
        // Log and handle unexpected errors

        return {
            status: false,
            statusCode: httpStatusCode.InternalServerError,
            message: 'Internal server error.',
        };
    }
};


const editFindings = async (input) => {
    try {
        if (!input?.clientId) return { status: false, message: message.lblClinetIdIsRequired, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.findingsId, collectionName: 'finding' })) return { status: false, message: message.lblFindingsDoesNotExist, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitinValid, statusCode: httpStatusCode.Unauthorized }

        const db = await getClientDatabaseConnection(input?.clientId);
        const findings = db.model('finding', findingsSchema);
        if (!input._Id) return { status: false, statusCode: httpStatusCode.Conflict, message: message.lblFindingsDoesNotExist };
        const newData = {
            findingsName: input?.findingsName,
            discription: input?.discription,
            clientId: input?.clientId,
        };
        const result = await findings.findOneAndUpdate(
            { _id: input?._Id },
            { $set: newData },
            {
                new: true,
                returnDocument: 'after',
            }
        );


        return {
            status: true,
            statusCode: httpStatusCode.OK,
            message: message.lblFindingsEdited,
            data: result._doc,
        };
    } catch (error) {

        return {
            status: false,
            statusCode: httpStatusCode.InternalServerError,
            message: error.message,
        };
    }
};

const ToggleFindings = async (input) => {
    if (!input?.clientId) return { status: false, message: message.lblClinetIdIsRequired, statusCode: httpStatusCode.Unauthorized }
    if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
    if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.findingsId, collectionName: 'finding' })) return { status: false, message: message.lblFindingsDoesNotExist, statusCode: httpStatusCode.Unauthorized }
    const db = await getClientDatabaseConnection(input?.clientId)
    const findings = await db.model('finding', findingsSchema)
    const isExist = await findings.findOne({ _Id: input?._id })
    if (!isExist || isExist.deletedAt) return { status: false, statusCode: httpStatusCode.NotFound, message: message.lblFindingsDoesNotExist }
    const result = await findings.updateOne({ _Id: input?.Id }, { $set: { isActive: !isExist?.isActive } })
    if (result.modifiedCount) return { status: true, statusCode: httpStatusCode.OK, message: `${isExist.findingsName} ${isExist.isActive ? 'disabled' : 'enabled'} ` }
    else return { status: true, statusCode: httpStatusCode.OK, message: message.lblFindingsNoChanges }
}

const deleteFindings = async (input) => {
    try {
        if (!input?.clientId) return { status: false, message: message.lblClinetIdIsRequired, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.findingsId, collectionName: 'finding' })) return { status: false, message: message.lblFindingsDoesNotExist, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(input?.clientId)
        const findings = await db.model('finding', findingsSchema)
        const isExist = await findings.findOne({ _id: input?._Id })
        if (!isExist || isExist.deletedAt) return { status: false, statusCode: httpStatusCode.NotFound, message: message.lblFindingsDoesNotExist }
        console.log(isExist)
        const result = await findings.updateOne({ _id: input?._Id }, { $set: { deletedAt: new Date(), isActive: false } });
        console.log(result, 'result')
        if (result.modifiedCount) return { status: true, statusCode: httpStatusCode.OK, message: `${isExist.findingsName} ${isExist.isActive ? 'disabled' : 'enabled'} ` }
        else return { status: true, statusCode: httpStatusCode.OK, message: message.lblFindingsNoChanges }
    } catch (error) {

    }
}
const revokeFindings = async (input) => {
    try {
        console.log(input,'revokeFindings ')
        if (!input?.clientId) return { status: false, message: message.lblClinetIdIsRequired, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.findingsId, collectionName: 'finding' })) return { status: false, message: message.lblFindingsDoesNotExist, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(input?.clientId)
        const findings = await db.model('finding', findingsSchema)
        const isExist = await findings.findOne({ _id: input?._Id })
        if (!isExist || !isExist.deletedAt) return { status: false, statusCode: httpStatusCode.Conflict, message: message.lblFindingsRetrievalFailed }
        console.log(isExist)
        const result = await findings.updateOne({ _id: input?._Id }, { $set: { deletedAt: null, isActive: false } });
        console.log(result, 'result')
        if (result.modifiedCount) return { status: true, statusCode: httpStatusCode.OK, message: `${isExist.findingsName} restored ` }
        else return { status: true, statusCode: httpStatusCode.OK, message: message.lblFindingsNoChanges }
    } catch (error) {

    }
}
const readAllFindings = async (input) => {
    try {
        if (!input?.clientId) return { status: false, message: message.lblClinetIdIsRequired, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(input?.clientId)
        const findings = await db.model('finding', findingsSchema)
        const isExist = await findings.find({ deletedAt: null })
        if (isExist.length) return { status: true, statusCode: httpStatusCode.OK, message: message.lblFindingsFetched, data: isExist }
        else return { status: true, statusCode: httpStatusCode.OK, message: message.lblFindingsDoesNotExist }
    } catch (error) {

    }
}
const readAllFindingsByPage = async (input) => {
    try {
        !input?.keyWord ? input.keyWord = "" : ''
        !input?.page ? input.page = 0 : input.page = parseInt(input.page)
        !input?.perPage ? input.perPage = 10 : input.perPage = parseInt(input.perPage)
        if (!input?.clientId) return { status: false, message: message.lblClinetIdIsRequired, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(input?.clientId)
        const findings = await db.model('finding', findingsSchema)
        const isExist = await findings.find({ 
            $or:[
                {findingsName:{$regex:input.keyWord,$options:'i'}},
                {discription :{$regex:input.keyWord,$options:'i'}}
            ] ,
            deletedAt: null })
        .skip((input.page-1) * input.perPage )
        .limit( input.page * input.perPage)
        if (isExist.length) return { status: true, statusCode: httpStatusCode.OK, message: message.lblFindingsFetched, data: isExist }
        else return { status: true, statusCode: httpStatusCode.OK, message: message.lblFindingsDoesNotExist }
    } catch (error) {

    }
}





module.exports = { readAllFindingsByPage, createFindings, editFindings, ToggleFindings, deleteFindings, revokeFindings, readAllFindings };
