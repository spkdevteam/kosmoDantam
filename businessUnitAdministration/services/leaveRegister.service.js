const { getClientDatabaseConnection } = require("../../db/connection")
const httpStatusCode = require("../../utils/http-status-code")
const message = require("../../utils/message")
const { validateObjectId } = require("./validate.serialNumber")
const leaveRegisterSchema = require('../../client/model/leaveRegister')
const getserialNumber = require("../../model/services/getserialNumber")
exports.saveLeaveApplication = async (input) => {
    try {
        console.log(input, 'input')

        if (!await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitNotFound, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchNotFound, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.employeeId, collectionName: 'clientuser' })) return { status: false, message: message.lblUserNotFound, statusCode: httpStatusCode.Unauthorized }
        if (new Date(input?.startDate) < new Date()) { return { status: false, message: 'date could not be less than today', statusCode: httpStatusCode.Unauthorized }; }
        if (new Date(input?.endDate) < new Date(input?.startDate)) { return { status: false, message: 'end date could not be less than start date', statusCode: httpStatusCode.Unauthorized }; }
        if (new Date(`${input?.startDate}T${input?.startTime}`) > new Date(`${input?.endDate}T${input?.endTime}`)) { return { status: false, message: 'end date could not be less than start date', statusCode: httpStatusCode.Unauthorized }; }

        //inserting new record 
        const db = await getClientDatabaseConnection(input?.clientId)
        const leaveRegister = await db.model('leaveRegister', leaveRegisterSchema)
        if (!input?.displayId) input.displayId = await getserialNumber('leaveRegister', input?.clientId, input?.branchId, input?.buId)
        const newData = {
            displayId: input?.displayId,
            employeeId: input?.employeeId,
            leaveType: input?.leaveType,
            appliedDate: Date.now(),
            startDate: input?.startDate,
            startTime: input?.startTime,
            endDate: input?.endDate,
            endTime: input?.endTime,
            reason: input?.reason,
            status: 'Pending',
            approverId: null,
            comments: null,
            createdAt: Date.now(),
            updatedAt: null,
            deletedAt: null,
            rejectionReason: null,
            buId: input?.buId,
            branchId: input?.branchId
        }
        const result = await leaveRegister.findOneAndUpdate({ displayId: input?.displayId }, { $set: newData }, { upsert: true, new: true, returnDocument: 'after' })
        console.log(result, 'result ')
        if (result?._doc) {
            return { status: true, statusCode: httpStatusCode.OK, data: result?.doc, message: message.lblLeaveRegisterCreated }
        }
        else {
            return { status: true, statusCode: httpStatusCode.BadRequest, message: message.lblLeaveRegisterCreationFailed }
        }

    } catch (error) {
        return { status: false, message: 'invalid credential' + error.message, statusCode: httpStatusCode.NotFound }
    }
}

exports.editLeaveApplication = async (input) => {
    try {
        //input validation 
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.leaveApplicationId, collectionName: 'leaveRegister' })) return { status: false, message: message.lblLeaveRegisterDoesNotExist, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.employeeId, collectionName: 'clientuser' })) return { status: false, message: message.lblUserNotFound, statusCode: httpStatusCode.Unauthorized }
        if (new Date(input?.startDate) < new Date()) { return { status: false, message: 'date could not be less than today', statusCode: httpStatusCode.Unauthorized }; }
        if (new Date(input?.endDate) < new Date(input?.startDate)) { return { status: false, message: 'end date could not be less than start date', statusCode: httpStatusCode.Unauthorized }; }
        if (new Date(`${input?.startDate}T${input?.startTime}`) > new Date(`${input?.endDate}T${input?.endTime}`)) return { status: false, message: 'end date could not be less than start date', statusCode: httpStatusCode.Unauthorized };

        //inserting new record 
        const db = await getClientDatabaseConnection(input?.clientId)
        const leaveRegister = await db.model('leaveRegister', leaveRegisterSchema)
        if (!input?.displayId) input.displayId = await getserialNumber('leaveRegister', input?.clientId, input?.branchId, input?.buId)
        const newData = {
            employeeId: input?.employeeId,
            leaveType: input?.leaveType,
            appliedDate: Date.now(),
            startDate: input?.startDate,
            startTime: input?.startTime,
            endDate: input?.endDate,
            endTime: input?.endTime,
            reason: input?.reason,
            approverId: null,
            comments: null,
            updatedAt: Date.now(),
            deletedAt: null
        }
        const result = await leaveRegister.findOneAndUpdate({ _id: input?.leaveApplicationId }, { $set: newData }, { upsert: true, new: true, returnDocument: 'after' })
        if (result?._doc) {
            return { status: true, statusCode: httpStatusCode.OK, data: result?._doc, message: message.lblLeaveRegisterEdited }
        }
        else {
            return { status: true, statusCode: httpStatusCode.BadRequest, message: message.lblLeaveRegisterCreationFailed }
        }

    } catch (error) {
        return { status: false, message: 'invalid credential' + error.message, statusCode: httpStatusCode.NotFound }
    }
}

exports.deleteLeaveApplication = async (input) => {
    try {
        //input validation 
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.leaveApplicationId, collectionName: 'leaveRegister' })) return { status: false, message: message.lblLeaveRegisterDoesNotExist, statusCode: httpStatusCode.Unauthorized }
        //inserting new record 
        const db = await getClientDatabaseConnection(input?.clientId)
        const leaveRegister = await db.model('leaveRegister', leaveRegisterSchema)
        const isExist = await leaveRegister.findOne({ _id: input?.leaveApplicationId, deletedAt: null })
        if (!isExist) return { status: false, statusCode: httpStatusCode.BadGateway, message: message.lblLeaveRegisterDoesNotExist }
        const result = await leaveRegister.updateOne({ _id: input?.leaveApplicationId }, { $set: { deletedAt: Date.now() } })
        if (result?.modifiedCount) return { status: true, statusCode: httpStatusCode.OK, message: message.lblLeaveRegisterDeleted }
    } catch (error) {
        return { status: false, message: 'invalid credential' + error.message, statusCode: httpStatusCode.NotFound }
    }
}

exports.toggleLeaveApplication = async (input) => {
    try {
        //input validation 
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.leaveApplicationId, collectionName: 'leaveRegister' })) return { status: false, message: message.lblLeaveRegisterDoesNotExist, statusCode: httpStatusCode.Unauthorized }
        //inserting new record 
        const db = await getClientDatabaseConnection(input?.clientId)
        const leaveRegister = await db.model('leaveRegister', leaveRegisterSchema)
        const isExist = await leaveRegister.findOne({ _id: input?.leaveApplicationId, deletedAt: null })
        if (!isExist) return { status: false, statusCode: httpStatusCode.BadGateway, message: message.lblLeaveRegisterDoesNotExist }
        const result = await leaveRegister.updateOne({ _id: input?.leaveApplicationId }, { $set: { isActive: !isExist.isActive } })
        if (result?.modifiedCount) return { status: true, statusCode: httpStatusCode.OK, message: `leave application ${isExist.isActive ? 'cancelled' : 'restored'}` }
    } catch (error) {
        return { status: false, message: 'invalid credential' + error.message, statusCode: httpStatusCode.NotFound }
    }
}

exports.readActiveLeaveApplication = async (input) => {
    try {
        //input validation 
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' }))
            return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        //inserting new record 
        const db = await getClientDatabaseConnection(input?.clientId)
        const leaveRegister = await db.model('leaveRegister', leaveRegisterSchema)
        const leaveApplication = await leaveRegister.find({ deletedAt: null, isActive: true })
        return { status: true, statusCode: httpStatusCode.OK, message: message.lblLeaveRegisterFetched, data: leaveApplication }
    } catch (error) {
        return { status: false, message: 'invalid credential' + error.message, statusCode: httpStatusCode.NotFound }
    }
}

exports.readActiveLeaveApplicationByPage = async (input) => {
    try {
        !input?.keyWord ? input.keyWord = "" : ''
        !input?.page ? input.page = 0 : input.page = parseInt(input.page)
        !input?.perPage ? input.perPage = 10 : input.perPage = parseInt(input.perPage)
        //input validation 
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        //inserting new record 
        const db = await getClientDatabaseConnection(input?.clientId)
        const leaveRegister = await db.model('leaveRegister', leaveRegisterSchema)
        const leaveApplication = await leaveRegister.find({
            deletedAt: null,
            $or: [
                { displayId: { $regex: input?.keyWord, $options: 'i' } },
                { comments: { $regex: input?.keyWord, $options: 'i' } },
                { reason: { $regex: input?.keyWord, $options: 'i' } },
            ]
        })
            .skip((input.page - 1) * input.perPage)
            .limit(input.page * input.perPage)
        return { status: true, statusCode: httpStatusCode.OK, message: message.lblLeaveRegisterFetched, data: leaveApplication }
    } catch (error) {
        return { status: false, message: 'invalid credential' + error.message, statusCode: httpStatusCode.NotFound }
    }
}

exports.getDateWiseLeaVeDetails = async (input) => {
    try {
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitNotFound, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchNotFound, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(input?.clientId)
        const leaveRegister = db.model('leaveRegister', leaveRegisterSchema)
        
        const absentees = await leaveRegister.find({
            buId: input?.buId,
            branchId: input?.branchId,
            startDate: { $lte: `${input?.bookingDate}T00:00:00.000Z` },
            endDate: { $gte: `${input?.bookingDate}T23:59:00.000Z` },
            isActive: true,
        }).populate('employeeId', 'firstName role');
        const data = absentees?.map((req) => {
            console.log(req,'```````````````````````````````````````````')
            if (req.startDate != input?.bookingDate) {
                req.startTime = new Date(`${input?.bookingDate}T10:00:00.000Z`)
                req.endTime = new Date(`${input?.bookingDate}T17:00:00.000Z`)
                 
            }
            return {
                bookingType: 'leave',
                date: new Date(input?.bookingDate),
                slotFrom: new Date(req.startTime),
                slotTo: new Date(req.endTime),
                staffName: req?.employeeId?.firstName,
                role: req?.employeeId?.role,
                staffId:req?.employeeId?._id

            }
        })

        return { status: true, message: message.lblLeaveRegisterFetched, statusCode: httpStatusCode.OK, data: data }
    } catch (error) {
        return { status: false, message: 'error' }
    }
}

exports.filterLeaveApplication = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input?.clientId)
        const leaveRegister = db.model('leaveRegister', leaveRegisterSchema)
        const query = {};
        if (input?.employeeId) query.employeeId = input?.employeeId;
        if (input?.doctorId && input?.dentalAssistantId ) query.$or = [{employeeId:input?.doctorId},{employeeId:input?.dentalAssistantId}] 
        if (input?.branchId) query.branchId = input?.branchId;
        if (input?.buId) query.buId = input?.buId;
        if (input?.bookingDate) {
            const date = new Date(input?.bookingDate);
            query.startDate = { $lte: date };
            query.endDate = { $gte: date };
        }
        if (input?.startTime) query.startTime =  { $lte: input?.startTime };
        if (input?.endTime) query.endTime = { $gte: input?.endTime  }; ;
        console.log(query,'query')
        
        const absentees = new Set()
        const engagedList = await leaveRegister.find({...query})
        engagedList?.map((item)=>{
            absentees.add(item.employeeId.toString()) 
        })
        console.log(absentees,'engagedListengagedList')
        // .populate('employeeId', 'name email')
        // .populate('branchId', '
        
        return  absentees  
    } catch (error) {

    }
}


