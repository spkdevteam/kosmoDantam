const { getClientDatabaseConnection } = require("../../db/connection")
const message = require("../../utils/message")
const httpStatusCode = require("../../utils/http-status-code");
const appointmentSchema = require("../../client/model/appointments");
const getserialNumber = require("../../model/services/getserialNumber");
const { validateObjectId } = require("./validate.serialNumber");
const { getDateWiseLeaVeDetails, filterLeaveApplication } = require("./leaveRegister.service");
const timeSlots = require("../../utils/timeSlots");
const { listEmployeeByRole } = require("./clientUser.service");
const mongoose = require('mongoose');
const getAvailableSlots = require("../../helper/getAvailableSlots");
const { getchairList } = require("./chairs.service");

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
            console.log('sdsdsds')
            input.displayId = await getserialNumber('appointment', input?.clientId, input?.branchId, input?.buId)
        }

        const newData = {
            displayId: input?.displayId,
            branchId: input?.branchId,
            buId: input?.buId,
            token: input?.token || null,
            date: input?.date ? new Date(input.date.includes('T') ? input.date.split('T')[0] + 'T00:00:00.000Z' : input.date + 'T00:00:00.000Z') : null,
            caseId: input?.caseId || null,
            dutyDoctorId: input?.dutyDoctorId,
            dentalAssistant: input?.dentalAssistant,
            slotFrom: input?.date ? new Date(input.date.includes('T') ? input.date.split('T')[0] + `T${input.slotFrom}:00.000Z` : input.date + `T${input.slotFrom}:00.000Z`) : null,
            slotTo: input?.date ? new Date(input.date.includes('T') ? input.date.split('T')[0] + `T${input.slotTo}:00.000Z` : input.date + `T${input.slotTo}:00.000Z`) : null,
            chairId: input?.chairId,
            patientId: input?.patientId,
            status: input?.status,
            isActive: input?.isActive || true,
            deletedAt: input?.deletedAt || null,
            createdUser: input?.createdUser,
        }

        console.log(newData, 'newDatanewData')
        const result = await appointments.findOneAndUpdate({ displayId: input?.displayId }, { $set: newData }, { upsert: true, returnDocument: 'after', new: true })
        console.log(result)
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
        if (input?.bookingDate.length > 10) input?.bookingDate.splice(0, 10)
        console.log(input?.bookingDate)
        const db = await getClientDatabaseConnection(input?.clientId)
        const appointment = await db.model('appointment', appointmentSchema)
        const startOfDay = new Date(input?.bookingDate + 'T00:00:00.000Z');
        const endOfDay = new Date(input?.bookingDate + 'T00:00:00.000Z');

        const bookingdetails = await appointment.find({
            buId: input?.buId,
            branchId: input?.branchId,
            isActive: true,
            date: new Date(input?.bookingDate + 'T00:00:00.000Z')
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
        input.prepareBy='chair'
        const absentees = await getDateWiseLeaVeDetails(input);
        const booking = await this.getDateWiseBookidDetails(input);
        const daystatus = [...absentees?.data, ...booking?.data];
        //console.log(daystatus,'daystatus')
        const doctors = await listEmployeeByRole(input);
        const chairs = await getchairList(input)
        let data = [];
        if(input.prepareBy != 'chair'){
            for (let i = 0; i <= timeSlots?.length; i++) {
                if (!data[i]) data[i] = [];
                for (let j = 0; j <= doctors?.length; j++) {
                    if (i == 0 && j != 0) {
                        data[i][j] = doctors[j - 1]?.firstName
                        continue
                    }
                    else if (j == 0 && i != 0) {
                        data[i][j] = timeSlots[i - 1]
                        continue
                    }
                    else if (i && j ) {
                        doc_And_Time = { ...doctors[j - 1], ...timeSlots[i - 1] }
                        const record = daystatus.filter((record) => {
                            console.log(doc_And_Time?._doc?._id.toString() == record?.doctor?._id.toString(),'recordrecord')
                            return new Date(input?.bookingDate + 'T' + doc_And_Time.end + ':00.000Z') > record.slotFrom &&
                                new Date(input?.bookingDate + 'T' + doc_And_Time.start + ':00.000Z') < record.slotTo &&
                                doc_And_Time?._doc?._id.toString() == record?.doctor?._id.toString() 
                        });
                        const bookedSlots = record.map((item) => {
                            //console.log(item?.slotFrom?.toISOString().split('T')[1].slice(0,5))
                            return { slotFrom: item?.slotFrom?.toISOString().split('T')[1].slice(0,5), slotTo: item?.slotTo?.toISOString().split('T')[1].slice(0,5) }
                        })
                        const hourStart = data[i][0]?.start;
                        const hourEnd = data[i][0]?.end;
                       // console.log(data[i][0],hourStart,hourEnd ,bookedSlots)
                        const availabilitySlot = getAvailableSlots({ hourStart: hourStart, hourEnd: hourEnd, bookedSlots: bookedSlots })?.map((vacantSlot)=> {return {bookingType:'vacant',slotFrom:new Date(input?.bookingDate + 'T' + vacantSlot?.slotFrom + ':00.000Z'),slotTo:new Date(input?.bookingDate + 'T' + vacantSlot?.slotTo + ':00.000Z')}})
                        data[i][j] = [...record,...availabilitySlot]?.sort((a, b) => new Date(a.slotFrom) - new Date(b.slotFrom))  || []
                      //  data[i][j].length > 1 ? console.log(data[i][j],'data[i][j]'):''
    
                    } 
                }
            } 
        }
        else{
            for (let i = 0; i <= timeSlots?.length; i++) {
                if (!data[i]) data[i] = [];
                for (let j = 0; j <= chairs?.length; j++) {
                    if (i == 0 && j != 0) {
                        console.log(chairs[j - 1],'test here eeeee')
                        data[i][j] = 'Chair '+ chairs[j - 1]?.chairNumber
                        continue
                    }
                    else if (j == 0 && i != 0) {
                        data[i][j] = timeSlots[i - 1]
                        continue
                    }
                    else if (i && j ) {
                        doc_And_Time = { ...chairs[j - 1], ...timeSlots[i - 1] }
                        const record = daystatus.filter((record) => {
                            console.log(doc_And_Time?._doc?._id.toString() == record?.doctor?._id.toString(),'recordrecord')
                            return new Date(input?.bookingDate + 'T' + doc_And_Time.end + ':00.000Z') > record.slotFrom &&
                                new Date(input?.bookingDate + 'T' + doc_And_Time.start + ':00.000Z') < record.slotTo &&
                                doc_And_Time?._doc?._id.toString() == record?.chair?._id.toString() 
                        });
                        const bookedSlots = record.map((item) => {
                            //console.log(item?.slotFrom?.toISOString().split('T')[1].slice(0,5))
                            return { slotFrom: item?.slotFrom?.toISOString().split('T')[1].slice(0,5), slotTo: item?.slotTo?.toISOString().split('T')[1].slice(0,5) }
                        })
                        const hourStart = data[i][0]?.start;
                        const hourEnd = data[i][0]?.end;
                       // console.log(data[i][0],hourStart,hourEnd ,bookedSlots)
                        const availabilitySlot = getAvailableSlots({ hourStart: hourStart, hourEnd: hourEnd, bookedSlots: bookedSlots })?.map((vacantSlot)=> {return {bookingType:'vacant',slotFrom:new Date(input?.bookingDate + 'T' + vacantSlot?.slotFrom + ':00.000Z'),slotTo:new Date(input?.bookingDate + 'T' + vacantSlot?.slotTo + ':00.000Z')}})
                        data[i][j] = [...record,...availabilitySlot]?.sort((a, b) => new Date(a.slotFrom) - new Date(b.slotFrom))  || []
                      //  data[i][j].length > 1 ? console.log(data[i][j],'data[i][j]'):''
    
                    } 
                }
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
            query.date = new Date(input.bookingDate + 'T00:00:00.000Z');
            console.log(new Date(input.bookingDate + 'T00:00:00.000Z'));
        }
        const orConditions = [];
        if (input?.startTime) query.slotFrom = { $gte: new Date(input.bookingDate + 'T' + input.startTime + ':00.000Z'), $lte: new Date(input.bookingDate + 'T' + input.endTime + ':00.000Z') };
        if (input?.endTime) query.slotTo = { $gte: new Date(input.bookingDate + 'T' + input.startTime + ':00.000Z'), $lte: new Date(input.bookingDate + 'T' + input.endTime + ':00.000Z') };
        if (input?.chairId) orConditions.push({ chairId: input.chairId });
        if (input?.doctorId) orConditions.push({ dutyDoctorId: input.doctorId });
        if (input?.dentalAssistantId) orConditions.push({ dentalAssistant: input.dentalAssistantId });
        if (orConditions.length > 0) {
            query.$or = orConditions;
        }
        const out = await appointment.aggregate([
            {
                $match: {
                    isActive: true,
                    deletedAt: null,
                    date: new Date(input.bookingDate + 'T00:00:00.000Z'),

                    $or: [
                        {
                            slotFrom: {
                                $gte: new Date(input.bookingDate + 'T' + input.startTime + ':00.000Z'),
                                $lte: new Date(input.bookingDate + 'T' + input.endTime + ':00.000Z')
                            }
                        },
                        {
                            slotTo: {
                                $gte: new Date(input.bookingDate + 'T' + input.startTime + ':00.000Z'),
                                $lte: new Date(input.bookingDate + 'T' + input.endTime + ':00.000Z')
                            }
                        }
                    ],


                }
            },
            {
                $match:
                {
                    $or: [
                        { chairId: new mongoose.Types.ObjectId(input.chairId) },
                        { dutyDoctorId: new mongoose.Types.ObjectId(input.doctorId) },
                        { dentalAssistant: new mongoose.Types.ObjectId(input.dentalAssistantId) },
                        //  { specialistDoctorId:new mongoose.Types.ObjectId(input.specialistDoctorId) }
                    ]
                }
            }
        ]);
        const bookedDoctors = new Set()
        const bookedChairs = new Set()
        const bookedAssistants = new Set()
        const bookedSpecialist = new Set()
        out?.map((item) => {
            bookedDoctors.add(JSON.stringify(item.dutyDoctorId).slice(1, JSON.stringify(item.dutyDoctorId)?.length - 1))
            bookedChairs.add(JSON.stringify(item.chairId).slice(1, JSON.stringify(item.chairId)?.length - 1))
            bookedAssistants.add(JSON.stringify(item.dentalAssistant).slice(1, JSON.stringify(item.dentalAssistant)?.length - 1))
            //  bookedSpecialist.add(JSON.stringify(item.specialistDoctorId).slice(1,JSON.stringify( item.specialistDoctorId)?.length-1)) 
        })
        return { bookedDoctors, bookedChairs, bookedAssistants, bookedSpecialist }
    } catch (error) {

    }
}

exports.generateAvailabiltyChart = async (input) => {
    const absentees = await filterLeaveApplication(input);
    const booking = await filterAppointment(input);
    const daystatus = { ...booking, absentees };
    return daystatus
}


