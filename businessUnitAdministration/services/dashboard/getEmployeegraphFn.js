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
        // const result = await Appointment.aggregate([
        //     {
        //         $match: {
        //             // ...(branchId ? { branchId } : {}),
        //             // ...(buId ? { businessUnit: new mongoose.Types.ObjectId(buId) } : {}),
        //             slotFrom: { $gte: new Date(`${fromDate}T00:00:00.000Z`) },
        //             slotTo: { $lte: new Date(`${toDate}T23:59:59.999Z`) },
        //             deletedAt: null
        //         } 
        //     },
        //         {
        //             $lookup: {
        //                 from: 'clientusers',
        //                 localField: 'dutyDoctorId',
        //                 foreignField: '_id',
        //                 as: 'dutyDoctorId'
        //             }
        //         },
        //         {
        //             $lookup: {
        //                 from: 'clientusers',
        //                 localField: 'specialistDoctorId',
        //                 foreignField: '_id',
        //                 as: 'specialistDoctorId'
        //             }
        //         },
        //         {
        //             $lookup: {
        //                 from: 'clientusers',
        //                 localField: 'dentalAssistant',
        //                 foreignField: '_id',
        //                 as: 'dentalAssistant'
        //             }
        //         }
        //         ,
        //         {
        //             $unwind: '$dentalAssistant'
        //         },
        //         {
        //             $unwind: '$specialistDoctorId'
        //         },
        //         {
        //             $unwind: '$dutyDoctorId'
        //         },
        //         {
        //             $match: {
        //               $or: [
        //                 { 'dutyDoctorId.roleId': parseInt(roleId) },
        //                 { 'specialistDoctorId.roleId': parseInt(roleId)},
        //                 { 'dentalAssistant.roleId': parseInt(roleId) }
        //               ]
        //             }
        //           },
        //         {
        //             $project:{

        //                 branch:1,
        //                 businessUnit:1,
        //                 date:1,
        //                 status:1,
        //                 doctor:'$dutyDoctorId._id',
        //                 doctorName:'$dutyDoctorId.firstName',
        //                 doctorRole:'$dutyDoctorId.roleId',
        //                 sepcialist:'$specialistDoctorId._id',
        //                 sepcialistName:'$specialistDoctorId.firstName',
        //                 sepcialistRole:'$specialistDoctorId.roleId',
        //                 dentalAssistant:'$dentalAssistant._id',
        //                 dentalAssistantName:'$dentalAssistant.firstName',
        //                 dentalAssistantRole:'$dentalAssistant.roleId',
        //             }
        //         },





        // ]);
        // const temp = new Set(result?.map((day)=>(day.date?.toISOString())))
        // console.log(result,roleId,'resultresult')
        // const dates = [... new Set(result?.map((val)=>val.date?.toISOString()))]
        // let employee = [
        //     ...new Set(
        //       result
        //         .filter(val => val.doctorRole === parseInt(roleId))?.map((val)=>(val?.doctor?.toString()))

        //     )
        //   ];
        //   employee=  [...employee,
        //     ...new Set(
        //       result
        //         .filter(val => val.dentalAssistantRole == parseInt(roleId))?.map((val)=>(val?.dentalAssistant?.toString()))

        //     )
        //   ];
        //   employee=  [...employee,
        //     ...new Set(
        //       result
        //         .filter(val => val.sepcialistRole == parseInt(roleId))?.map((val)=>(val?.sepcialist?.toString()))

        //     )
        //   ];

        // console.log([... new Set(employee)],dates)

        // const temp = []

        // result?.map((doc) => {

        //     temp.push({ name: doc?._id, [doc?.employeeName]: doc?.appointment })
        // })

        // const employeeList = new Set(temp?.map((item) => (Object.keys(item)?.filter((item) => item != 'name')[0])))
        // const grouped = temp.reduce((acc, curr) => {
        //     const date = curr.name;
        //     if (!acc[date]) {
        //         acc[date] = { name: date?.toISOString().split('T')[0] };
        //     }


        //     employeeList?.forEach((employee) => {
        //         acc[date][employee] = curr[employee] || 0
        //     })

        //     return acc;
        // }, {});
        let tempDate = new Date(fromDate);
        const endDate = new Date(toDate);
        let dateArray = []
        while (tempDate <= endDate) {
            dateArray.push({ name: new Date(tempDate) })
            tempDate.setDate(tempDate.getDate() + 1);
        }
        const employeeList = await ClientUsers.find({ deletedAt: null, roleId: parseInt(roleId) }, { firstName: 1 })
        console.log(employeeList)

        const result = await Promise.all(
            dateArray.map(async (dateObj) => {
                const date = dateObj.name;

                const doctorsCount = {};

                await Promise.all(
                    employeeList.map(async (emp) => {
                        // console.log(emp, dateObj.name, 'emp._id')
                        const docCount = await Appointment.find({
                            date: date,
                            dutyDoctorId: emp._id  
                        });
                        const specCount = await Appointment.find({
                            date: date,
                            specialistDoctorId: emp._id  ,
                        });
                        const dentAssistcount = await Appointment.find({
                            date: date,
                            dentalAssistant: emp._id
                        });
                        console.log(emp.firstName,'emp.firstName',date?.toISOString()?.split('T')[0] ,docCount,'docCount',specCount,'specCount',dentAssistcount,'dentAssistcount')
                        doctorsCount[emp.firstName] = docCount?.length+specCount?.length+dentAssistcount?.length; // use emp.name or emp.fullName
                    })
                );
 
                return {
                    name: date?.toISOString()?.split('T')[0]?.split('-')[2],
                    ...doctorsCount
                };
            })
        );








        return { status: true, message: 'success', data: result }
    } catch (error) {
        return { status: false, message: error?.message }
    }
}


module.exports = getEmployeegraphFn
