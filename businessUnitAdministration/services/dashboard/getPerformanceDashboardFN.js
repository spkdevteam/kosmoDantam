const appointmentSchema = require("../../../client/model/appointments");
const clinetChairSchema = require("../../../client/model/chair");
const serviceSchema = require("../../../client/model/service");
const clinetUserSchema = require("../../../client/model/user");
const { getClientDatabaseConnection } = require("../../../db/connection");
const mongoose = require("mongoose");
const getPerformanceDashboardFN = async ({ clientId, buId, branchId, fromDate, toDate }) => {
    try {
        //db connection :
        const db = await getClientDatabaseConnection(clientId);
        const Chairs = await db.model('chair', clinetChairSchema);
        const Appointment = await db.model('Appointment', appointmentSchema);
        const User = await db.model('clientUsers', clinetUserSchema);
        const Service = await db.model('services', serviceSchema);

        const buBranchFilter = { buId: new mongoose.Types.ObjectId(buId) };
        if (branchId) buBranchFilter.branchId = new mongoose.Types.ObjectId(branchId);
        const metaData = {
            fromDate: fromDate,
            toDate: toDate
        };
        const returnData = [];
        const fromDateStr = new Date(fromDate);
        const toDateStr = new Date(toDate);
        fromDateStr.setHours(0, 0, 0, 0);
        toDateStr.setHours(23, 59, 59, 999);
        const dateDifferenceInMillis = toDateStr.getTime() - fromDateStr.getTime();
        const differenceInDays = Math.ceil(dateDifferenceInMillis / (1000 * 60 * 60 * 24));
        console.log("differenceInDays==>>", differenceInDays)

        //chairs occupancy rate calculation:
        const appointmentDateQuery = {
            occupiedAt: {
                $gte: new Date(`${fromDate}T00:00:00.000Z`),
                $lte: new Date(`${toDate}T23:59:59.999Z`)
            }
        }
        const usedChairDetails = await Appointment.find(
            {
                ...(buBranchFilter || {}),
                ...appointmentDateQuery,
                deletedAt: null,
                occupiedAt: { $ne: null },
                unOccupiedAt: { $ne: null }
            },
            {
                _id: 1,
                occupiedAt: 1,
                unOccupiedAt: 1
            }
        );

        const buBranchChairFilter = { businessUnit: new mongoose.Types.ObjectId(buId) };
        if (branchId) buBranchChairFilter.branch = new mongoose.Types.ObjectId(branchId);
        const chairDateQuery = {
            createdAt: {
                $lte: new Date(`${toDate}T23:59:59.999Z`)
            }
        }
        const totalChairAvailableNumber = await Chairs.countDocuments(
            {
                ...(buBranchChairFilter || {}),
                ...chairDateQuery,
                deletedAt: null
            }
        );
        if (usedChairDetails && usedChairDetails?.length > 0 && totalChairAvailableNumber > 0) {
            let totalTimeOccupied = 0;
            usedChairDetails.map((element, index) => {
                const occupiedTime = new Date(element?.occupiedAt);
                const unOccupiedTime = new Date(element?.unOccupiedAt);
                const differenceInMillis = unOccupiedTime.getTime() - occupiedTime.getTime();
                const differenceInHours = differenceInMillis / (1000 * 60 * 60);
                totalTimeOccupied += differenceInHours;
            })
            console.log("totalTimeOccupied==>>", totalTimeOccupied)
            console.log("totalOcupied CHair ==>>>", usedChairDetails?.length)
            console.log("totalChairAvailableNumber==>>>", totalChairAvailableNumber)
            const percentTimeOccupied = ((totalTimeOccupied / (14 * totalChairAvailableNumber * (differenceInDays > 0 ? differenceInDays : 1))) * 100);
            returnData.push({
                status: true,
                Module: 'Chair',
                Message: 'Chair Occupancy Rate',
                value: Number(percentTimeOccupied.toFixed(2)) + ' %'
            })
        }
        else {
            returnData.push({
                status: false,
                Module: 'Chair',
                Message: 'Chair Occupancy Rate could not be found!!',
                value: 0
            })
        }

        //Average in patient TAT
        const appointmentDateQuery2 = {
            arrivedAt: {
                $gte: new Date(`${fromDate}T00:00:00.000Z`),
                $lte: new Date(`${toDate}T23:59:59.999Z`)
            }
        }
        const inPatientDetails = await Appointment.find(
            {
                ...(buBranchFilter || {}),
                ...appointmentDateQuery2,
                deletedAt: null,
                arrivedAt: { $ne: null },
                status: { $ne: null }
            },
            {
                _id: 1,
                arrivedAt: 1,
                updatedAt: 1,
                status: 1
            }
        );
        if (inPatientDetails && inPatientDetails?.length > 0) {
            let totalDifferenceInMins = 0;
            inPatientDetails.map(element => {
                if (['cancelled', 'rescheduled', 'completed'].includes(element?.status?.toLowerCase())) {
                    arrivalTime = new Date(element?.arrivedAt);
                    depertureTime = new Date(element?.updatedAt);
                    console.log("arrivalTime==>>",arrivalTime);
                    console.log("depertureTime==>>>",depertureTime)
                    const differenceInMillis = depertureTime.getTime() - arrivalTime.getTime();
                    const differenceInMins = differenceInMillis / (1000 * 60);
                    totalDifferenceInMins += differenceInMins;
                }
            })
            avgInTimeMIns = (totalDifferenceInMins / inPatientDetails?.length)
            // returnData.push(inPatientDetails)
            returnData.push({
                status: true,
                Module: 'Patient',
                Message: 'Avg. Inpatient TAT',
                value: Number(avgInTimeMIns.toFixed(0)) + ' minutes'
            })
        }
        else {
            returnData.push({
                status: false,
                Module: 'Patient',
                Message: 'Avg. Inpatient TAT could not be found!!',
                value: 0
            })
        }

        //registreed employees
        const filterQueryRegistration = {
            createdAt: {
                $gte: new Date(`${fromDate}T00:00:00.000Z`),
                $lte: new Date(`${toDate}T23:59:59.999Z`)
            }
        }
        const registeredEmployeesCount = await User.countDocuments(
            {
                ...(filterQueryRegistration || {}),
                deletedAt: null,
                ...(buBranchChairFilter || {}),
                roleId: { $nin: [17] }
            }
        )
        if (registeredEmployeesCount && registeredEmployeesCount > 0) {
            returnData.push({
                status: true,
                Module: 'Employee',
                Message: 'Registered Employees',
                value: registeredEmployeesCount
            }
            )
        }
        else {
            returnData.push({
                status: false,
                Module: 'Employee',
                Message: 'Registered Employees could not be found!!',
                value: 0
            }
            )
        }
        //services count:

        const registeredServicesCount = await Service.countDocuments(
            {
                ...(filterQueryRegistration || {}),
                deletedAt: null,
                ...(buBranchFilter || {}),
            }
        )
        if (registeredServicesCount && registeredServicesCount > 0) {
            returnData.push({
                status: true,
                Module: 'Services',
                Message: 'Services Count',
                value: registeredServicesCount
            }
            )
        }
        else {
            returnData.push({
                status: false,
                Module: 'Services',
                Message: ' Services Count could not be found!!',
                value: 0
            }
            )
        }


        return { status: true, message: "Performance Data fetched successfully!", data: returnData, metaData: metaData }
    }
    catch (error) {
        console.log("error", error?.message)
        return { status: false, message: error?.message, data: [], metadata: {} }
    }
}

module.exports = getPerformanceDashboardFN