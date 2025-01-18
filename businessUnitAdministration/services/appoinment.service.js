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
const caseSheetSchema = require("../../client/model/caseSheet");


exports.creatAppointment = async (input) => {
    try {
        console.log(input, 'input')
        //handling missing credential  
        if (!input?.clientId) return { status: false, message: message.lblClinetIdIsRequired, statusCode: httpStatusCode.Unauthorized }
        if (!input?.branchId) return { status: false, message: message.lblBranchIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (!input?.buId) return { status: false, message: message.lblBusinessUnitinValid, statusCode: httpStatusCode.Unauthorized }
        if (!input?.dutyDoctorId) return { status: false, message: 'doctor detail is missing ', statusCode: httpStatusCode.Unauthorized }
       // if (!input?.dentalAssistant) return { status: false, message: 'dental assistant is missing  ', statusCode: httpStatusCode.Unauthorized }
        if (!input?.chairId) return { status: false, message: 'chair details is missing ', statusCode: httpStatusCode.Unauthorized }
        if (!input?.patientId) return { status: false, message: 'patient id is missing ', statusCode: httpStatusCode.Unauthorized }

        //handling invalid credential 
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitNotFound, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.dutyDoctorId, collectionName: 'clientuser' })) return { status: false, message: 'doctor detail is invalid ', statusCode: httpStatusCode.Unauthorized }
      //  if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.dentalAssistant, collectionName: 'clientuser' })) return { status: false, message: 'dental assistant is invalid  ', statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.chairId, collectionName: 'chair' })) return { status: false, message: 'chair details is inValid ', statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.patientId, collectionName: 'patient' })) return { status: false, message: 'patient id is not valid ', statusCode: httpStatusCode.Unauthorized }
        
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
            date: input?.date ? new Date(input.date.includes('T') ? input.date.split('T')[0] + 'T00:00:00.000Z' : input.date + 'T00:00:00.000Z') : null,
            caseSheetId: input?.caseId || null,
            dutyDoctorId: input?.dutyDoctorId,
            dentalAssistant: input?.dentalAssistant && mongoose.isValidObjectId(input.dentalAssistant)  ? input.dentalAssistant  : null, 
            chiefComplaint:input?.chiefComplaint,
            slotFrom: input?.slotFrom,
            slotTo: input?.slotTo,
            chairId: input?.chairId,
            patientId: input?.patientId,
            status: input?.status,
            isActive: input?.isActive || true,
            deletedAt: input?.deletedAt || null,
            createdUser: input?.createdUser,
        }


        if (!input?._id) {
            const result = await appointments.findOneAndUpdate({ displayId: input?.displayId }, { $set: newData }, { upsert: true, returnDocument: 'after', new: true })
            console.log(result)
            if (result?._doc) return { status: true, message: message.lblAppointmentCreated, statusCode: httpStatusCode.OK, data: result?._doc }
            else return { status: false, message: message.lblCredentialMissing, statusCode: httpStatusCode.Unauthorized }
        }
        else {
            const result = await appointments.findOneAndUpdate({ _id: input?._id }, { $set: newData }, { returnDocument: 'after', new: true })
            console.log(result)
            if (result?._doc) return { status: true, message: message.lblAppointmentEdited, statusCode: httpStatusCode.OK, data: result?._doc }
            else return { status: false, message: message.lblCredentialMissing, statusCode: httpStatusCode.Unauthorized }
        }
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
        
        const db = await getClientDatabaseConnection(input?.clientId)
        const appointment = await db.model('appointment', appointmentSchema)
        const startOfDay = new Date(input?.bookingDate + 'T00:00:00.000Z');
        const endOfDay = new Date(input?.bookingDate + 'T00:00:00.000Z');

        const bookingdetails = await appointment.find({
            buId: input?.buId,
            branchId: input?.branchId,
            isActive: true,
            deletedAt: null,
            date: new Date(input?.bookingDate + 'T00:00:00.000Z')
        })
            .populate('dutyDoctorId', 'firstName')
            .populate('dentalAssistant', 'firstName')
            .populate('patientId', 'firstName age email lastName phone mainPatientLinkedid displayId')
            .populate('buId', 'name')
            .populate('branchId', 'incorporationName')
            .populate('chairId', 'chairNumber chairLocation')

        console.log(bookingdetails, 'bookingdetails')

        const bookings = bookingdetails?.map((item) => {

            return {
                _id: item?._id,
                bookingType: 'appointment',
                bookingId: item?.displayId,
                status: item?.status,
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
                    name: item?.dutyDoctorId?.firstName,
                    _id: item?.dutyDoctorId?._id
                },
                dentalAssistant: {
                    name: item?.dentalAssistant?.firstName,
                    _id: item?.dentalAssistant?._id
                },
                patient: item?.patientId,
                chair: {
                    _id: item?.chairId?._id,
                    location: item?.chairId?.chairLocation,
                    number: item?.chairId?.chairNumber,
                }
            }
        })
        return { status: true, message: 'appointmentFetched', data: bookings || [] }
    } catch (error) {
        return { status: false, message: 'appointment Fetch failed ' }
    }
}

exports.getBookingChart = async (input) => {
    try {
        console.log(input);
        input.roleId = 3;
        //  input.prepareBy='chair'
        const absentees = await getDateWiseLeaVeDetails(input) || [];
        const booking = await this.getDateWiseBookidDetails(input) || [];
        console.log(booking, 'booking?.data')
        const daystatus = [...absentees?.data, ...booking.data];
        //console.log(daystatus,'daystatus')
        const doctors = await listEmployeeByRole(input);
        const chairs = await getchairList(input);
        console.log(chairs, 'chairschairs')
        let data = [];

        if (input.prepareBy != 'chair') {
            for (let i = 0; i <= timeSlots?.length; i++) {
                if (!data[i]) data[i] = [];
                for (let j = 0; j <= doctors?.length; j++) {
                    if (i == 0 && j != 0) {
                        data[i][j] = {
                            name: doctors[j - 1]?.firstName,
                            _id: doctors[j - 1]?._id,
                        }

                        continue
                    }
                    else if (j == 0 && i != 0) {
                        data[i][j] = timeSlots[i - 1]
                        continue
                    }
                    else if (i && j) {
                        doc_And_Time = { ...doctors[j - 1], ...timeSlots[i - 1] }
                        const record = daystatus.filter((record) => {
                            console.log(doc_And_Time?._doc?._id.toString() == record?.doctor?._id.toString(), 'recordrecord')
                            return new Date(input?.bookingDate + 'T' + doc_And_Time.end + ':00.000Z') > record.slotFrom &&
                                new Date(input?.bookingDate + 'T' + doc_And_Time.start + ':00.000Z') < record.slotTo &&
                                doc_And_Time?._doc?._id.toString() == record?.doctor?._id.toString()
                        });
                        const bookedSlots = record.map((item) => {
                            //console.log(item?.slotFrom?.toISOString().split('T')[1].slice(0,5))
                            return { slotFrom: item?.slotFrom?.toISOString().split('T')[1].slice(0, 5), slotTo: item?.slotTo?.toISOString().split('T')[1].slice(0, 5) }
                        })
                        const hourStart = data[i][0]?.start;
                        const hourEnd = data[i][0]?.end;
                        // console.log(data[i][0],hourStart,hourEnd ,bookedSlots)
                        const availabilitySlot = getAvailableSlots({ hourStart: hourStart, hourEnd: hourEnd, bookedSlots: bookedSlots })?.map((vacantSlot) => { return { bookingType: 'vacant', slotFrom: new Date(input?.bookingDate + 'T' + vacantSlot?.slotFrom + ':00.000Z'), slotTo: new Date(input?.bookingDate + 'T' + vacantSlot?.slotTo + ':00.000Z') } })
                        data[i][j] = [...record, ...availabilitySlot]?.sort((a, b) => new Date(a.slotFrom) - new Date(b.slotFrom)) || []
                        //  data[i][j].length > 1 ? console.log(data[i][j],'data[i][j]'):''

                    }
                }
            }
        }
        else {
            for (let i = 0; i <= timeSlots?.length; i++) {
                if (!data[i]) data[i] = [];
                for (let j = 0; j <= chairs?.length; j++) {
                    if (i == 0 && j != 0) {
                        console.log(chairs[j - 1], 'test here eeeee')
                        data[i][j] = {
                            name: 'Chair ' + chairs[j - 1]?.chairNumber,
                            _id: chairs[j - 1]?._id,
                        }
                        continue
                    }
                    else if (j == 0 && i != 0) {
                        data[i][j] = timeSlots[i - 1]
                        continue
                    }
                    else if (i && j) {
                        doc_And_Time = { ...chairs[j - 1], ...timeSlots[i - 1] }
                        const record = daystatus.filter((record) => {
                            console.log(doc_And_Time?._doc?._id.toString() == record?.doctor?._id.toString(), 'recordrecord')
                            return new Date(input?.bookingDate + 'T' + doc_And_Time.end + ':00.000Z') > record.slotFrom &&
                                new Date(input?.bookingDate + 'T' + doc_And_Time.start + ':00.000Z') < record.slotTo &&
                                doc_And_Time?._doc?._id.toString() == record?.chair?._id.toString()
                        });
                        const bookedSlots = record.map((item) => {
                            //console.log(item?.slotFrom?.toISOString().split('T')[1].slice(0,5))
                            return { slotFrom: item?.slotFrom?.toISOString().split('T')[1].slice(0, 5), slotTo: item?.slotTo?.toISOString().split('T')[1].slice(0, 5) }
                        })
                        const hourStart = data[i][0]?.start;
                        const hourEnd = data[i][0]?.end;
                        // console.log(data[i][0],hourStart,hourEnd ,bookedSlots)
                        const availabilitySlot = getAvailableSlots({ hourStart: hourStart, hourEnd: hourEnd, bookedSlots: bookedSlots })?.map((vacantSlot) => { return { bookingType: 'vacant', slotFrom: new Date(input?.bookingDate + 'T' + vacantSlot?.slotFrom + ':00.000Z'), slotTo: new Date(input?.bookingDate + 'T' + vacantSlot?.slotTo + ':00.000Z') } })
                        data[i][j] = [...record, ...availabilitySlot]?.sort((a, b) => new Date(a.slotFrom) - new Date(b.slotFrom)) || []
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


exports.getBookingChartNonTabular = async (input) => {
    try {
        console.log(input);
        const absentees = await getDateWiseLeaVeDetails(input) || [];
        const booking = await this.getDateWiseBookidDetails(input) || [];
        const daystatus = [...absentees?.data, ...booking.data];
        const doctors = await listEmployeeByRole({ ...input, roleId: 3 });
        const chairs = await getchairList(input)
        const assistant = await listEmployeeByRole({ ...input, roleId: 4 })

        return { chairs, doctors, daystatus, assistant, timeSlots };
    } catch (error) {
        console.error('Error in getBookingChart:', error);
        throw error;
    }
};

const filterAppointment = async (input) => {
    try {
        
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
        console.log(new Date(input.bookingDate + 'T' + input.endTime + ':00.000Z'))
        const orConditions = [];
        if (input?.startTime) query.slotFrom = { $gte: new Date(input.bookingDate + 'T' + input.startTime + ':00.000Z'), $lte: new Date(input.bookingDate + 'T' + input.endTime + ':00.000Z') };
        if (input?.endTime) query.slotTo = { $gte: new Date(input.bookingDate + 'T' + input.endTime + ':00.000Z'), $lte: new Date(input.bookingDate + 'T' + input.endTime + ':00.000Z') };
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
                                $lte: new Date(input.endTime),
                            },
                            slotTo: {
                                $gte: new Date(input.startTime),
                            }
                        }
                    ]
                }
            }
        ]);


        const bookedDoctors = new Set()
        const bookedChairs = new Set()
        const bookedAssistants = new Set()
        const bookedSpecialist = new Set()
        out?.map((item) => {
            bookedDoctors.add(item.dutyDoctorId.toString())
            bookedChairs.add(item.chairId.toString())
            bookedAssistants.add(item.dentalAssistant.toString())
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


exports.delete = async (input) => {
    try {
        console.log(input);
        if (!input?.clientId) return { status: false, message: message.lblClinetIdIsRequired, statusCode: httpStatusCode.Unauthorized }
        if (!input?.branchId) return { status: false, message: message.lblBranchIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (!input?.buId) return { status: false, message: message.lblBusinessUnitinValid, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(input?.clientId)
        const appointments = await db.model('appointment', appointmentSchema)
        const result = await appointments.findOneAndUpdate({ _id: input.appointmentid }, { $set: { deletedAt: new Date() } }, { returnDocument: 'after', new: true })
        console.log(result.deletedAt)
        if (result.deletedAt) {
            return { status: true, message: message.lblAppointmentDeleted, data: result }
        }
        else return { status: false, message: message.lblAppointmentDoesNotExist }
        return

    } catch (error) {
        console.error('Error in getBookingChart:', error);
        throw error;
    }
};

exports.dailyBookingWithPagination = async (input) => {
    try {
        // clientId, buId, bookingDate, page, perPage, branchId======>>>>>  input 
        console.log(input, 'input')
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitNotFound, statusCode: httpStatusCode.Unauthorized }

        const db = await getClientDatabaseConnection(input?.clientId)
        const appointment = await db.model('appointment', appointmentSchema)
        const query = { isActive: true, deletedAt: null };

        if (input?.bookingDate) {
            query.date = new Date(input.bookingDate + 'T00:00:00.000Z');
            console.log(new Date(input.bookingDate + 'T00:00:00.000Z'), 'bookingDate');
        }
        const out = await appointment.aggregate([
            // Match the base fields in the `appointment` collection
            {
                $match: {
                    isActive: true,
                    deletedAt: null,
                    date: new Date(input.bookingDate + 'T00:00:00.000Z')
                }
            },
            {
                $lookup: {
                    from: 'chairs', // Name of the collection storing doctor data
                    localField: 'chairId',
                    foreignField: '_id',
                    as: 'chairId'
                }
            },
            {
                $unwind: {
                    path: '$chairId',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'branches', // Name of the collection storing patient data
                    localField: 'branchId',
                    foreignField: '_id',
                    as: 'branchId'
                }
            },
            // Unwind the `patientDetails` array to access individual documents
            {
                $unwind: {
                    path: '$branchId',
                    preserveNullAndEmptyArrays: true
                }
            },
            // Lookup for the `patientId` field
            {
                $lookup: {
                    from: 'patients', // Name of the collection storing patient data
                    localField: 'patientId',
                    foreignField: '_id',
                    as: 'patientId'
                }
            },
            // Unwind the `patientDetails` array to access individual documents
            {
                $unwind: {
                    path: '$patientId',
                    preserveNullAndEmptyArrays: true
                }
            },
            
            // Lookup for the `dutyDoctorId` field
            {
                $lookup: {
                    from: 'clientusers', // Name of the collection storing doctor data
                    localField: 'dutyDoctorId',
                    foreignField: '_id',
                    as: 'dutyDoctorId'
                }
            },
            {
                $unwind: {
                    path: '$dutyDoctorId',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'clientusers',  
                    localField: 'dentalAssistant',
                    foreignField: '_id',
                    as: 'dentalAssistant'
                }
            },
            {
                $unwind: {
                    path: '$dentalAssistant',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    $or: [
                        { 'patientId.firstName': { $regex: input?.keyword, $options: 'i' } },
                        { 'patientId.lastName': { $regex: input?.keyword, $options: 'i' } },
                        { 'patientId.email': { $regex: input?.keyword, $options: 'i' } },
                        { 'patientId.phone': { $regex: input?.keyword, $options: 'i' } },
                        { 'dutyDoctorId.firstName': { $regex: input?.keyword, $options: 'i' } }
                    ]
                }
            },
            
            {
                $skip: (parseInt( input?.page) - 1) *parseInt( input?.perPage)
            },
            {
                $limit: parseInt( input?.perPage)
            }
        ]);
        

        console.log(out,(parseInt( input?.page) - 1) * parseInt( input?.perPage),parseInt( input?.perPage) ,'outoutout')
        return { status: true, message: 'Success', data: out }
    } catch (error) {

    }
}



exports.filterBookingWithfromToDateAndKeyWord = async (input) => {
    try {
        // clientId, buId, bookingDate, page, perPage, branchId======>>>>>  input 
        console.log(input, 'input')
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitNotFound, statusCode: httpStatusCode.Unauthorized }

        const db = await getClientDatabaseConnection(input?.clientId)
        const appointment = await db.model('appointment', appointmentSchema)
        const query = { isActive: true, deletedAt: null };

        console.log(input, {
            isActive: true,
            deletedAt: null,
            // date: 
            // {
            //     $gte:new Date(input.fromDate + 'T00:00:00.000Z'),
            //     $lte:new Date(input.toDate + 'T00:00:00.000Z')
            // },
             ...(input?.branchId?{branchId:new mongoose.Schema.ObjectId( input?.branchId)}:{})
            
        },'mer++++++++++++++++++')
        const out = await appointment.aggregate([
            // Match the base fields in the `appointment` collection
            {
                $match: {
                    isActive: true,
                    deletedAt: null,
                    date: 
                    {
                        $gte:new Date(input.fromDate + 'T00:00:00.000Z'),
                        $lte:new Date(input.toDate + 'T00:00:00.000Z')
                    },
                     ...(input?.branchId?{branchId:new mongoose.Types.ObjectId( input?.branchId)}:{})
                    
                }
            },
            {
                $lookup: {
                    from: 'chairs', // Name of the collection storing doctor data
                    localField: 'chairId',
                    foreignField: '_id',
                    as: 'chairId'
                }
            },
            {
                $unwind: {
                    path: '$chairId',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'branches', // Name of the collection storing patient data
                    localField: 'branchId',
                    foreignField: '_id',
                    as: 'branchId'
                }
            },
            // Unwind the `patientDetails` array to access individual documents
            {
                $unwind: {
                    path: '$branchId',
                    preserveNullAndEmptyArrays: true
                }
            },
            // Lookup for the `patientId` field
            {
                $lookup: {
                    from: 'patients', // Name of the collection storing patient data
                    localField: 'patientId',
                    foreignField: '_id',
                    as: 'patientId'
                }
            },
            // Unwind the `patientDetails` array to access individual documents
            {
                $unwind: {
                    path: '$patientId',
                    preserveNullAndEmptyArrays: true
                }
            },
            
            // Lookup for the `dutyDoctorId` field
            {
                $lookup: {
                    from: 'clientusers', // Name of the collection storing doctor data
                    localField: 'dutyDoctorId',
                    foreignField: '_id',
                    as: 'dutyDoctorId'
                }
            },
            {
                $unwind: {
                    path: '$dutyDoctorId',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'clientusers',  
                    localField: 'dentalAssistant',
                    foreignField: '_id',
                    as: 'dentalAssistant'
                }
            },
            {
                $unwind: {
                    path: '$dentalAssistant',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    $or: [
                        { 'patientId.firstName': { $regex: input?.keyword||'', $options: 'i' } },
                        { 'patientId.lastName': { $regex: input?.keyword||'', $options: 'i' } },
                        { 'patientId.email': { $regex: input?.keyword||'', $options: 'i' } },
                        { 'patientId.phone': { $regex: input?.keyword||'', $options: 'i' } },
                        { 'dutyDoctorId.firstName': { $regex: input?.keyword||'', $options: 'i' } }
                    ]
                }
            },
            
            {
                $skip: (parseInt( input?.page) - 1) *parseInt( input?.perPage)
            },
            {
                $limit: parseInt( input?.perPage)
            }
        ]);
        

        console.log(out,(parseInt( input?.page) - 1) * parseInt( input?.perPage),parseInt( input?.perPage) ,'outoutout')
        return { status: true, message: 'Success', data: out }
    } catch (error) {

    }
}
exports.updateBookingWithToken = async ({ tokenNumber, appointmentid, buId, branchId, clientId }) => {
    try {
        console.log({ tokenNumber: tokenNumber, appointmentId: appointmentid, buId: buId, branchId: branchId, clientId: clientId })
        if (! await validateObjectId({ clientid: clientId, objectId: clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: clientId, objectId: buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitNotFound, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: clientId, objectId: branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchNotFound, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(clientId)
        const appointment = await db.model('appointment', appointmentSchema)
        const isexist = await appointment.findOne({ _id: appointmentid, deletedAt: null, isActive: true })
        if (isexist.token) {
            return { status: true, message: 'Token Updated', statusCode: httpStatusCode.OK, data: isexist }
        }
        else {
            const result = await appointment.findOneAndUpdate({ _id: appointmentid, branchId: branchId, isActive: true, deletedAt: null }, { $set: { token: tokenNumber } }, { returnDocument: 'after', new: true })
            if (result) {
                return { status: true, message: 'Token Updated', statusCode: httpStatusCode.OK, data: result?._doc }
            }
            else {
                return { status: false, message: 'no appointment found on this id ', statusCode: 501, }
            }
        }

    } catch (error) {
        return { status: false, message: error.message, statusCode: 501, }
    }
}


exports.changeBookingStatus = async ({ date, clientId, branchId, buId, appointmentId, status }) => {
    try {
        console.log({ appointmentId: appointmentId, buId: buId, branchId: branchId, clientId: clientId, status: status })
        if (! await validateObjectId({ clientid: clientId, objectId: clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: clientId, objectId: buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitNotFound, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: clientId, objectId: branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchNotFound, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(clientId)
        const appointment = await db.model('appointment', appointmentSchema)
        const result = await appointment.
            findOneAndUpdate(
                { _id: appointmentId, branchId: branchId, isActive: true, deletedAt: null },
                { $set: { status: status } },
                { returnDocument: 'after', new: true })
        if (result) {
            return { status: true, message: 'status Updated', statusCode: httpStatusCode.OK, data: result?._doc }
        }
        else {
            return { status: false, message: 'no appointment found on this id ', statusCode: 501, }
        }


    } catch (error) {
        return { status: false, message: error.message, statusCode: 501, }
    }
}

exports.activeBooking = async ({ clientId, branchId, buId, patientId})=>{
    try {
        console.log({ patientId:patientId, buId: buId, branchId: branchId, clientId: clientId },'zazaz')
        if (! await validateObjectId({ clientid: clientId, objectId: clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: clientId, objectId: buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitNotFound, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: clientId, objectId: branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchNotFound, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: clientId, objectId: patientId, collectionName: 'patient' })) return { status: false, message: message.lblPatientNotFound, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(clientId)
        const appointment = await db.model('appointment', appointmentSchema)
        const result = await appointment?.findOne({
            patientId: patientId,
            branchId: branchId,
             isActive: true,
             deletedAt: null,
             status: { $in: ['Arrived', 'ChairReady', 'In-Progress'] } ,
        });
                
        if (result) {
            return { status: true, message: 'status Updated', statusCode: httpStatusCode.OK, data: result?._doc }
        }
        else {
            return { status: false, message: 'no appointment found on this id ', statusCode: 501, }
        }


    } catch (error) {
        return { status: false, message: error.message, statusCode: 501, }
    }
}

exports.readAllAppointmentbyPatient = async ({ clientId, branchId, buId, patientId})=>{
    try {
        console.log({ patientId:patientId, buId: buId, branchId: branchId, clientId: clientId },'zaasaasazaz')
        if (! await validateObjectId({ clientid: clientId, objectId: clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: clientId, objectId: buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitNotFound, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: clientId, objectId: branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchNotFound, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: clientId, objectId: patientId, collectionName: 'patient' })) return { status: false, message: message.lblPatientNotFound, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(clientId)
        const appointment = await db.model('appointment', appointmentSchema)
        const CaseSheet = db.model('caseSheet', caseSheetSchema);

        const result = await appointment?.find({
            patientId: patientId,
            branchId: branchId,
             isActive: true,
             deletedAt: null,
              
        }).populate({
            path: 'caseSheetId',
            model: CaseSheet,
            select: '+createdAt'
        })
        
        .populate('dutyDoctorId', 'firstName lastName phone ')
        .populate('dentalAssistant','firstName lastName phone ')
        .populate('chairId' , 'chairNumber chairLocation ')
        .populate('patientId', 'firstName lastName displayId ')
        
        
        if (result) {
            console.log(result,'result')     
            return { status: true, message: 'status Updated', statusCode: httpStatusCode.OK, data: result }
        }
        else {
            return { status: false, message: 'no appointment found on this id ', statusCode: 501, }
        }


    } catch (error) {
        return { status: false, message: error.message, statusCode: 501, }
    }
}

// exports.bookingSummarybyPeriod = async ({clientId,branchId,fromDate,toDate})=>{
//     try {
//         console.log(clientId,branchId,fromDate,toDate,'clientId,branchId,fromDate,toDate')
//         if (! await validateObjectId({ clientid: clientId, objectId: clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
//         if (! await validateObjectId({ clientid: clientId, objectId: branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchIdInvalid, statusCode: httpStatusCode.Unauthorized }
//         const db =await getClientDatabaseConnection(clientId)
//         const appointment =await db.model('appointment',appointmentSchema)
//          const result = await appointment.aggregate()
//         console.log(result,'result')
//         return {status:true,message:message.lblAppointmentFetched,data:result}
        
        

//     } catch (error) {
        
//     } 
// }

 
exports.bookingSummarybyPeriod = async ({ clientId, branchId, fromDate, toDate }) => {
  try {
    if (! await validateObjectId({ clientid: clientId, objectId: clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
    if (! await validateObjectId({ clientid: clientId, objectId: branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchIdInvalid, statusCode: httpStatusCode.Unauthorized }
    const db =await getClientDatabaseConnection(clientId)
    const Appointment =await db.model('appointment',appointmentSchema)
    const bookings = await Appointment.aggregate([
        {
          $match: {
            branchId:new mongoose.Types.ObjectId(branchId), // Match the branchId
            date: {
              $gte: new Date(fromDate), // Greater than or equal to fromDate
              $lte: new Date(toDate) // Less than or equal to toDate
            },
            isActive: true // Optional: Only include active bookings
          }
        },
        {
          $group: {
            _id: {
              date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, // Group by date
              hour: { $hour: "$date" } // Group by hour
            },
            count: { $sum: 1 } // Count the number of bookings for each hour
          }
        },
        {
          $project: {
            _id: 0,
            date: "$_id.date",
            hour: "$_id.hour",
            count: 1,
            slotFrom: {
              $dateToString: {
               
                date: {
                  $dateAdd: {
                    startDate: { $dateFromString: { dateString: "$_id.date" } },
                    unit: "hour",
                    amount: "$_id.hour"
                  }
                }
              }
            },
            slotTo: {
              $dateToString: {
                date: {
                  $dateAdd: {
                    startDate: { $dateFromString: { dateString: "$_id.date" } },
                    unit: "hour",
                    amount: { $add: ["$_id.hour", 1] } // Add 1 hour for slotTo
                  }
                }
              }
            }
          }
        },
        {
          $sort: { date: 1, hour: 1 } // Sort by date and hour ascending
        }
      ])

    return {status:true,message:message.lblAppointmentFetched, data:bookings}; // Returns an array of objects with date and count
  } catch (error) {
    console.error("Error fetching booking summary:", error);
    throw error; // Rethrow the error for further handling
  }
};
 

