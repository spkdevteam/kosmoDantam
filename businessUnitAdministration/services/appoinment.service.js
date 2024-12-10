const { getClientDatabaseConnection } = require("../../db/connection")
const message = require("../../utils/message")
const httpStatusCode = require("../../utils/http-status-code");
const appointmentSchema = require("../../client/model/appointments");
const getserialNumber = require("../../model/services/getserialNumber");
const { validateObjectId } = require("./validate.serialNumber");
const { getDateWiseLeaVeDetails, filterLeaveApplication } = require("./leaveRegister.service");
const timeSlots = require("../../utils/timeSlots");
const { listEmployeeByRole } = require("./clientUser.service");


exports.creatAppointment = async (input) => {
    try {
        //handling missing credential  
        if (!input?.clientId) return { status: false, message: message.lblClinetIdIsRequired, statusCode: httpStatusCode.Unauthorized }
        if (!input?.branchId) return { status: false, message: message.lblBranchIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (!input?.buId) return { status: false, message: message.lblBusinessUnitinValid, statusCode: httpStatusCode.Unauthorized }
        if (!input?.dutyDoctorId) return { status: false, message: 'doctor detail is missing ', statusCode: httpStatusCode.Unauthorized }
        if (!input?.dentalAssistant) return { status: false, message: 'dental assistant is missing  ', statusCode: httpStatusCode.Unauthorized }
        if (!input?.chairId) return { status: false, message: 'chair details is missing ', statusCode: httpStatusCode.Unauthorized }
        if (!input?.patientId) return { status: false, message: 'patient id is missing ', statusCode: httpStatusCode.Unauthorized }

        //handling invalid credential 
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitNotFound, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.dutyDoctorId, collectionName: 'clientuser' })) return { status: false, message: 'doctor detail is invalid ', statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.dentalAssistant, collectionName: 'clientuser' })) return { status: false, message: 'dental assistant is invalid  ', statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.chairId, collectionName: 'chair' })) return { status: false, message: 'chair details is inValid ', statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.patientId, collectionName: 'clientuser' })) return { status: false, message: 'patient id is not valid ', statusCode: httpStatusCode.Unauthorized }

        const db = await getClientDatabaseConnection(input?.clientId)
        const appointments = await db.model('appointment', appointmentSchema)
        if (!input?.displayId) {
            input.displayId = await getserialNumber('appointment', input?.clientId, input?.branchId, input?.buId)
        }

        const newData = {
            displayId: input?.displayId,
            branchId: input?.branchId,
            buId: input?.buId,
            token: input?.token || null,
            date: input?.date + 'T00:00:00.000Z' || new Date().setHours(0, 0, 0, 0),
            caseId: input?.caseId || null,
            dutyDoctorId: input?.dutyDoctorId,
            dentalAssistant: input?.dentalAssistant,
            slotFrom: input?.slotFrom,
            slotTo: input?.slotTo,
            chairId: input?.chairId,
            patientId: input?.patientId,
            status: input?.status,
            isActive: input?.isActive || true,
            deletedAt: input?.deletedAt || null,
            createdUser: input?.createdUser,
        }
        const result = await appointments.findOneAndUpdate({ displayId: input?.displayId }, { $set: newData }, { upsert: true, returnDocument: 'after', new: true })
        if (result?._doc) return { status: true, message: message.lblAppointmentCreated, statusCode: httpStatusCode.OK, data: result?._doc }
        else return { status: false, message: message.lblCredentialMissing, statusCode: httpStatusCode.Unauthorized }
    } catch (error) {
        return { status: false, message: error.message, statusCode: httpStatusCode.InternalServerError }
    }
}

exports.getDateWiseBookidDetails = async (input) => {
    try {
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitNotFound, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchNotFound, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(input?.clientId)
        const appointment = await db.model('appointment', appointmentSchema)
        const startOfDay = new Date(input?.bookingDate);
        startOfDay.setUTCHours(0, 0, 0, 0); // Set to the start of the day
        const endOfDay = new Date(input?.bookingDate);
        endOfDay.setUTCHours(23, 59, 59, 999); // Set to the end of the day

        const bookingdetails = await appointment.find({
            buId: input?.buId,
            branchId: input?.branchId,
            isActive: true,
            date: { $gte: startOfDay, $lte: endOfDay }
        })
            .populate('dutyDoctorId', 'firstName')
            .populate('dentalAssistant', 'firstName')
            .populate('patientId', 'firstName')
            .populate('buId', 'name')
            .populate('branchId', 'incorporationName')
            .populate('chairId', 'chairNumber chairLocation')

        const bookings = bookingdetails?.map((item) => {

            return {
                _id: item?._id,
                bookingType: 'appointment',
                bookingId: item?.displayId,
                date: new Date(input?.bookingDate),
                slotFrom: item?.slotFrom,
                slotTo: item?.slotTo,
                cancelled: !item?.isActive,
                bUnit: {
                    name: item?.buId?.name,
                    _id: item?.buId?._id
                },
                branch: {
                    name: item?.branchId?.incorporationName,
                    _id: item?.branchId?._id
                },
                doctor: {
                    name: item?.dutyDoctorId.firstName,
                    _id: item?.dutyDoctorId._id
                },
                dentalAssistant: {
                    name: item?.dentalAssistant.firstName,
                    _id: item?.dentalAssistant._id
                },
                patient: {
                    name: item?.patientId.firstName,
                    _id: item?.patientId._id
                },
                chair: {
                    _id: item?.chairId?._id,
                    location: item?.chairId?.chairLocation,
                    number: item?.chairId?.chairNumber,
                }



            }
        })
        return { status: true, message: 'appointmentFetched', data: bookings }
    } catch (error) {
        return { status: false, message: 'appointment Fetch failed ' }
    }
}

exports.getBookingChart = async (input) => {
    try {
        console.log(input);
        input.roleId = 3;
        const absentees = await getDateWiseLeaVeDetails(input);
        const booking = await this.getDateWiseBookidDetails(input);
        const daystatus = [...absentees?.data, ...booking?.data];
        const doctors = await listEmployeeByRole(input);

        let data = [];

        for (let i = 0; i <= timeSlots?.length; i++) {
            if (!data[i]) data[i] = [];
            for (let j = 0; j <= doctors?.length; j++) {
                if (i == 0 && j != 0) {
                    data[i][j] = doctors[j - 1]?.lastName
                    continue
                }
                if (j == 0 && i != 0) {
                    data[i][j] = timeSlots[i - 1]
                    continue
                }
                doc_And_Time = { ...doctors[j - 1], ...timeSlots[i - 1] }
                const record = daystatus.filter((record) => {
                    return (
                        doc_And_Time.end > record.slotFrom &&
                        doc_And_Time.start < record.slotTo &&
                        doc_And_Time?._doc?.firstName === record?.doctor?.name
                    );
                });
                data[i][j] = record || null
            }
        }
        console.table(data);
        return { data };
    } catch (error) {
        console.error('Error in getBookingChart:', error);
        throw error;
    }
};

const filterAppointment = async (input) => {
    try {
        console.log(input, 'input')
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitNotFound, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchNotFound, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(input?.clientId)
        const appointment = await db.model('appointment', appointmentSchema)
        const query = { isActive: true, deletedAt: null };

        if (input?.branchId) query.branchId = input.branchId;
        if (input?.bookingDate) {
            query.date = new Date(input.bookingDate+'T00:00:00.000Z');
            console.log(new Date(input.bookingDate+'T00:00:00.000Z'));
        }
        const andCondition = []
          if (input?.startTime) andCondition.push([  { slotFrom: { $gte: '10:05' } },]);
          if (input?.endTime) query.slotTo = { $lte: input.endTime ,$gte: input.startTime};
        const orConditions = [];
        if (input?.chairId) orConditions.push({ chairId: input.chairId });
        if (input?.doctorId) orConditions.push({ dutyDoctorId: input.doctorId });
        if (input?.dentalAssistantId) orConditions.push({ dentalAssistant: input.dentalAssistantId });
        if (orConditions.length > 0) {
            query.$or = orConditions;
        }
        console.log(query)
        const result = await appointment.find({...query})

        

        console.log(result, result.length,'aaaaaaaaa')
    } catch (error) {

    }
}


exports.generateAvailabiltyChart = async (input) => {
    const absentees = await filterLeaveApplication(input);
    const booking = await filterAppointment(input);
    const daystatus = [absentees];
    // console.log(daystatus,'daystatus') 

    return input
}


