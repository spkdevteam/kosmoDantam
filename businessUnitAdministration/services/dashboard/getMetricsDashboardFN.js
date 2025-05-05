const appointmentSchema = require("../../../client/model/appointments");
const caseSheetSchema = require("../../../client/model/caseSheet");
const clinetUserSchema = require("../../../client/model/user");
const { getClientDatabaseConnection } = require("../../../db/connection");
const mongoose = require("mongoose");

const getMetricsDashboardFN = async ({ clientId, buId, branchId, day }) => {
    try {
        //db connection :
        const db = await getClientDatabaseConnection(clientId);
        const Appointment = await db.model('Appointment', appointmentSchema);
        const User = await db.model('clientUsers', clinetUserSchema);
        // const Transaction = db.model('Transaction', transactionSchema); //?

        //////APPOINTMENT:===>>>
        //today
        const filterQueryAppointmentToday = {
            deletedAt: null,
        };
        if (buId) filterQueryAppointmentToday.buId = new mongoose.Types.ObjectId(buId);
        if (branchId) filterQueryAppointmentToday.branchId = new mongoose.Types.ObjectId(branchId);
        filterQueryAppointmentToday.date = {};
        filterQueryAppointmentToday.date.$gte = new Date(`${day}T00:00:00.000Z`);
        filterQueryAppointmentToday.date.$lte = new Date(`${day}T23:59:59.999Z`);
        console.log("filterQueryAppointmentToday.date==>>",filterQueryAppointmentToday.date)
        const resultAppointmentToday2 = await Appointment.countDocuments({...(filterQueryAppointmentToday || {})})
        console.log("resultAppointmentToday2==>>",resultAppointmentToday2)
        // const queryPipelineAppointmentToday = [];
        // queryPipelineAppointmentToday.push({
        //     $match: {
        //         ...(filterQueryAppointmentToday || {}), // fromDate, toDate, businessUnit, branch, etc.
        //     }
        // });
        // queryPipelineAppointmentToday.push({
        //     $count: "totalCountAppointmentToday"
        // })
        // const resultAppointmentToday = await Appointment.aggregate(queryPipelineAppointmentToday);
        // const resultAppointmentTodayVal = resultAppointmentToday[0]?.totalCountAppointmentToday;
        // console.log(" resultAppointmentToday[0]==>>", resultAppointmentToday)


        //month


        const filterQueryAppointmentMonth = {
            deletedAt: null,
        };
        if (buId) filterQueryAppointmentMonth.buId = new mongoose.Types.ObjectId(buId);
        if (branchId) filterQueryAppointmentMonth.branchId = new mongoose.Types.ObjectId(branchId);
        filterQueryAppointmentMonth.date = {};
        const inputDate = new Date(day);
        const firstDayOfMonth = new Date(Date.UTC(inputDate.getUTCFullYear(), inputDate.getUTCMonth(), 1, 0, 0, 0, 0));
        const lastDayOfMonth = new Date(Date.UTC(inputDate.getUTCFullYear(), inputDate.getUTCMonth() + 1, 0, 23, 59, 59, 999));
        const totalDaysInMonth = lastDayOfMonth.getUTCDate();
        console.log("totalDaysInMonth==>>",totalDaysInMonth)
        filterQueryAppointmentMonth.date.$gte = firstDayOfMonth.toISOString();
        filterQueryAppointmentMonth.date.$lte = lastDayOfMonth.toISOString();
        console.log("filterQueryAppointmentMonth.date==>>",filterQueryAppointmentMonth.date)
        // const queryPipelineAppointmentMonth = [];
        // queryPipelineAppointmentMonth.push({
        //     $match: {
        //         ...(filterQueryAppointmentMonth || {}), // fromDate, toDate, businessUnit, branch, etc.
        //     }
        // });
        // queryPipelineAppointmentMonth.push({
        //     $count: "totalCountAppointmentMonth"
        // })
        // const resultAppointmentMonth = await Appointment.aggregate(queryPipelineAppointmentMonth);
        const resultAppointmentMonth2 = await Appointment.countDocuments({...(filterQueryAppointmentMonth || {})})
        console.log("resultAppointmentMonth2==>>>",resultAppointmentMonth2)
        // console.log(" resultAppointmentMonth[0]==>>>", resultAppointmentMonth)
        // const resultAppointmentMonthVal = resultAppointmentMonth[0]?.totalCountAppointmentMonth;
        const monthlyAvgAppointment = totalDaysInMonth > 0 ? (resultAppointmentMonth2 / totalDaysInMonth) : 0;
        console.log("monthlyAvgAppointment==>>",monthlyAvgAppointment)
        const appointmentPercentage = resultAppointmentToday2 > 0 ? (((resultAppointmentToday2 - monthlyAvgAppointment) / resultAppointmentToday2) * 100) : 0;
        const returnData = []
        returnData.push({
            module: 'Appointment',
            Message:'Todays Appointment',
            average : Number(appointmentPercentage.toFixed(2)) ,
            value : resultAppointmentToday2
        })
        const metaData = {
            day : day
        }

        ///Registration:==>>>
        //today->
        const filterQueryRegistrationToday = {
            deletedAt: null,
        };
        if (buId) filterQueryRegistrationToday.businessUnit = new mongoose.Types.ObjectId(buId);
        if (branchId) filterQueryRegistrationToday.branch = new mongoose.Types.ObjectId(branchId);
        filterQueryRegistrationToday.createdAt = {};
        filterQueryRegistrationToday.createdAt.$gte = new Date(`${day}T00:00:00.000Z`);
        filterQueryRegistrationToday.createdAt.$lte = new Date(`${day}T23:59:59.999Z`);
        console.log("filterQueryRegistrationToday.createdAt==>>",filterQueryRegistrationToday.createdAt)
        const resultRegistrationToday2 = await User.countDocuments({...(filterQueryRegistrationToday || {})})
        console.log("resultRegistrationToday2==>>",resultRegistrationToday2)
        //monthly
        const filterQueryRegistrationMonth = {
            deletedAt: null,
        };
        if (buId) filterQueryRegistrationMonth.businessUnit = new mongoose.Types.ObjectId(buId);
        if (branchId) filterQueryRegistrationMonth.branch = new mongoose.Types.ObjectId(branchId);
        filterQueryRegistrationMonth.createdAt = {};
        console.log("totalDaysInMonth==>>",totalDaysInMonth)
        filterQueryRegistrationMonth.createdAt.$gte = firstDayOfMonth.toISOString();
        filterQueryRegistrationMonth.createdAt.$lte = lastDayOfMonth.toISOString();
        console.log("filterQueryRegistrationMonth.createdAt==>>",filterQueryRegistrationMonth.createdAt)
        const resultRegistrationMonth2 = await User.countDocuments({...(filterQueryRegistrationMonth || {})})
        console.log("resultRegistrationMonth2==>>>",resultRegistrationMonth2)
        const monthlyAvgRegistration = totalDaysInMonth > 0 ? (resultRegistrationMonth2 / totalDaysInMonth) : 0;
        console.log("monthlyAvgRegistration==>>",monthlyAvgRegistration)
        const RegistrationPercentage = resultRegistrationToday2 > 0 ? (((resultRegistrationToday2 - monthlyAvgRegistration) / resultRegistrationToday2) * 100) : 0;
        returnData.push({
            module: 'Registration',
            Message:'Todays Registration',
            average : Number(RegistrationPercentage.toFixed(2))  ,
            value : resultRegistrationToday2
        })

        return {status : true , message : "Metrics counts fethced successfully!" , data : returnData, metaData : metaData}
    }
    catch (error) {
        console.log("error", error?.message)
        return { status: false, message: error?.message, data: [], metadata: {} }
    }
}
module.exports = getMetricsDashboardFN