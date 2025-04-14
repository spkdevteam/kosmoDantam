const appointmentSchema = require("../../../client/model/appointments");
const leaveRegisterSchema = require("../../../client/model/leaveRegister");
const { getClientDatabaseConnection } = require("../../../db/connection");
const httpStatusCode = require("../../../utils/http-status-code");
const message = require("../../../utils/message");
const { validateObjectId } = require("../validate.serialNumber")

const generateAvailabiltyChart = async (input) => {
    try {
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitNotFound, statusCode: httpStatusCode.Unauthorized }
        if (! await validateObjectId({ clientid: input?.clientId, objectId: input?.branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchNotFound, statusCode: httpStatusCode.Unauthorized }
        const db = await getClientDatabaseConnection(input?.clientId)
        const appointment = await db.model('appointment', appointmentSchema)
        const leaveRegister = db.model('leaveRegister', leaveRegisterSchema)

        //const query = { isActive: true, deletedAt: null };
        // if (input?.branchId) query.branchId = input.branchId;
        // if (input?.bookingDate) {
        //     query.date = new Date(input.bookingDate + 'T00:00:00.000Z');
        //     console.log(new Date(input.bookingDate + 'T00:00:00.000Z'));
        // }
        // console.log(new Date(input.bookingDate + 'T' + input.endTime + ':00.000Z'));
        // const orConditions = [];
        // if (input?.startTime) query.slotFrom = { $gte: new Date(input.bookingDate + 'T' + input.startTime + ':00.000Z'), $lte: new Date(input.bookingDate + 'T' + input.endTime + ':00.000Z') };
        // if (input?.endTime) query.slotTo = { $gte: new Date(input.bookingDate + 'T' + input.endTime + ':00.000Z'), $lte: new Date(input.bookingDate + 'T' + input.endTime + ':00.000Z') };
        // if (input?.chairId) orConditions.push({ chairId: input.chairId });
        // if (input?.doctorId) orConditions.push({ dutyDoctorId: input.doctorId });
        // if (input?.dentalAssistantId) orConditions.push({ dentalAssistant: input.dentalAssistantId });
        // if (orConditions.length > 0) {
        //     query.$or = orConditions;
        // }

        const out = await appointment.aggregate([
            {
                $match: {
                    isActive: true,
                    deletedAt: null,
                    date: new Date(input.bookingDate),
                    $or: [
                        {
                            slotFrom: {
                                $gte: new Date(input.endTime),
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


        //to get number of absentees
        const query1 = {};
        if (input?.employeeId) query1.employeeId = input?.employeeId;
        if (input?.doctorId && input?.dentalAssistantId) query1.$or = [{ employeeId: input?.doctorId }, { employeeId: input?.dentalAssistantId }];
        if (input?.branchId) query1.branchId = input?.branchId;
        if (input?.buId) query1.buId = input?.buId;
        if (input?.bookingDate) {
            const date = new Date(input?.bookingDate);
            query1.startDate = { $lte: date };
            query1.endDate = { $gte: date };
        }
        if (input?.startTime) query1.startTime = { $lte: input?.startTime };
        if (input?.endTime) query1.endTime = { $gte: input?.endTime };
        console.log(query1, 'query1')

        const absentees = new Set();
        const engagedList = await leaveRegister.find({ ...query1 });
        engagedList?.map((item) => {
            absentees.add(item.employeeId.toString());
        });
        console.log(absentees, 'engagedListengagedList');
        // .populate('employeeId', 'name email')
        // .populate('branchId', '
        return { bookedDoctors, bookedChairs, bookedAssistants, bookedSpecialist, absentees };
    } catch (error) {
        return { status: false, message: error.message };
    }
}


module.exports = generateAvailabiltyChart;