const { default: mongoose } = require("mongoose")
const clinetUserSchema = require("../../../client/model/user")
const { getClientDatabaseConnection } = require("../../../db/connection")
const appointmentSchema = require("../../../model/patient")

const getEmployeegraphFn = async ({ clientId, buId, branchId, roleId, fromDate, toDate }) => {

    try {
        if (!clientId) return { status: false, message: 'client  connection details are invalid ' }
        if (!roleId) return { status: false, message: 'designation details  invalid ' }
        const db = await getClientDatabaseConnection(clientId)
        const Appointment = db.model('appointment', appointmentSchema)
        const ClientUsers = db.model('clientusers', clinetUserSchema)
        console.log(clientId, buId, branchId, roleId, new Date(`${fromDate}T00:00:00.000Z`), new Date(`${toDate}T23:59:59.999Z`), "<<<<<<<<<<<<<<<<<result>>>>>>>>>>>>>>")
        const result = await ClientUsers.aggregate([
            {
                $match: {
                    ...(branchId ? { branchId } : {}),
                    ...(buId ? { businessUnit: new mongoose.Types.ObjectId(buId) } : {}),
                    roleId: parseInt(roleId)
                }
            },
            {
                $project: {
                    firstName: 1,
                    lastName: 1,
                    email: 1
                }
            },
            {
                $lookup: {
                    from: 'appointments',
                    localField: '_id',
                    foreignField:  'dutyDoctorId',
                    as: 'appointments'
                }
            }

            ,
            {
                $unwind: '$appointments'
            },
            {
                $match: {
                    'appointments.slotFrom': {
                        $gte: new Date(`${fromDate}T00:00:00.000Z`)
                    },
                    'appointments.slotTo': {
                        $lte: new Date(`${toDate}T23:59:59.999Z`)
                    },
                    'appointments.deletedAt': null
                }
            },
            {
                $group: {
                    _id: {
                        _id: '$appointments.dutyDoctorId',
                        date: '$appointments.date',
                        firstName: '$firstName',
                        last: '$lastName'
                    },
                    appointment: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id.date',
                    firstName: '$_id.firstName',
                    booking: '$appointment'
                }
            },
            {
                $group:
                {
                    _id: {
                        _id: '$name',
                        firstName: '$firstName',
                    },
                    appointment: { $sum: '$booking' }

                }
            }, {
                $project: {
                    _id: '$_id._id',
                    employeeName: '$_id.firstName',
                    appointment: 1
                }
            }

        ]);
        const temp = []

        result?.map((doc) => {

            temp.push({ name: doc?._id, [doc?.employeeName]: doc?.appointment })
        })

        const employeeList = new Set(temp?.map((item) => (Object.keys(item)?.filter((item) => item != 'name')[0])))
        const grouped = temp.reduce((acc, curr) => {
            const date = curr.name;
            if (!acc[date]) {
                acc[date] = { name: date?.toISOString().split('T')[0] };
            }


            employeeList?.forEach((employee) => {
                acc[date][employee] = curr[employee] || 0
            })

            return acc;
        }, {});

        console.log({ status: true, message:'success', data: Object.values(grouped)?.sort((a,b)=>new Date(a.name) - new Date(b.name) ) })

        return { status: true, message:'success', data: Object.values(grouped)?.sort((a,b)=>new Date(a.name) - new Date(b.name) ) }
    } catch (error) {
        return { status: false, message: error?.message }
    }
}


module.exports = getEmployeegraphFn
