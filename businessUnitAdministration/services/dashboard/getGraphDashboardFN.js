const mongoose = require("mongoose");
const { getClientDatabaseConnection } = require("../../../db/connection");
const appointmentSchema = require("../../../client/model/appointments");
const clinetUserSchema = require("../../../client/model/user");

const getGraphDashboardFN = async ({ clientId, buId, branchId, module, viewType, fromDate, toDate }) => {
    try {
        //db connection :
        const db = await getClientDatabaseConnection(clientId);
        const Appointment = await db.model('Appointment', appointmentSchema);
        const User = await db.model('clientUsers', clinetUserSchema);
        const metaData = {
            fromDate: fromDate,
            toDate: toDate,
            module: module,
            viewType: viewType
        };
        const returnData = [];

        if (String(module?.toLowerCase()) == String('Appointment').toLowerCase()) {//done working tested..all date are at the start of day thats why coming in same group otherwise okay
            const filterQuery = {
                deletedAt: null,
            };
            filterQuery.buId = new mongoose.Types.ObjectId(buId)
            if (branchId) filterQuery.branchId = new mongoose.Types.ObjectId(branchId)
            filterQuery.date = {}
            filterQuery.date.$gte = new Date(`${fromDate}T00:00:00.000Z`);
            filterQuery.date.$lte = new Date(`${toDate}T23:59:59.999Z`);
            const fetchedAppointment = await Appointment.find({ ...(filterQuery || {}) });
            console.log("fetchedAppointmentfetchedAppointment==>>>", fetchedAppointment)
            const generateHourlyAppointmentCounts = (appointments) => {
                const result = Array.from({ length: 24 }, (_, hour) => {
                    const labelStart = formatHour(hour);
                    const labelEnd = formatHour((hour + 1) % 24);
                    return {
                        name: `${labelStart} - ${labelEnd}`,
                        value: 0
                    };
                });
            
                for (const appt of appointments) {
                    const date = new Date(appt?.createdAt); // "2025-04-30T08:07:07.723+00:00"
                    const hour = date.getUTCHours(); // For strict UTC grouping
                    result[hour].value++;
                }
            
                return result;
            };
            
            // Helper to convert 24h format to a.m/p.m label
            const formatHour = (hour) => {
                const h = hour % 12 === 0 ? 12 : hour % 12;
                const period = hour < 12 ? "a.m" : "p.m";
                return `${h} ${period}`;
            };
            const result = generateHourlyAppointmentCounts(fetchedAppointment);
            // const generateHourlyAppointmentCounts = (appointments, fromDate) => {
            //     const result = Array.from({ length: 24 }, (_, i) => ({
            //         name: `${i % 12 === 0 ? 12 : i % 12} ${i < 12 ? "a.m" : "p.m"} - ${(i + 1) % 12 === 0 ? 12 : (i + 1) % 12} ${i + 1 < 12 || i + 1 === 24 ? "a.m" : "p.m"}`,
            //         value: 0,
            //     }));

            //     for (const appt of appointments) {
            //         const apptDate = new Date(appt.date);
            //         const apptDay = apptDate.toISOString().split("T")[0];
            //         if (apptDay === fromDate) {
            //             const hour = apptDate.getUTCHours(); // Ensures Z-format compatibility
            //             result[hour].value++;
            //         }
            //     }

            //     return result;
            // };
            // const result = generateHourlyAppointmentCounts(fetchedAppointment, fromDate);
            // let count1 = 0; let count2 = 0; let count3 = 0; let count4 = 0; let count5 = 0; let count6 = 0; let count7 = 0; let count8 = 0; let count9 = 0; let count10 = 0; let count11 = 0; let count12 = 0; let count13 = 0; let count14 = 0; let count15 = 0; let count16 = 0; let count17 = 0; let count18 = 0; let count19 = 0; let count20 = 0; let count21 = 0; let count22 = 0; let count23 = 0; let count24 = 0;
            // let result = [];
            // for (const element of fetchedAppointment) {
            //     if (String(viewType?.toLowerCase()) == String('daily').toLowerCase()) {

            //         if (new Date(element?.date) <= new Date(`${fromDate}T00:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T00:59:059.999Z`)) {
            //             count1++;
            //         }
            //         if (new Date(element?.date) <= new Date(`${fromDate}T01:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T01:59:059.999Z`)) {
            //             count2++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T02:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T02:59:059.999Z`)) {
            //             count3++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T03:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T03:59:059.999Z`)) {
            //             count4++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T04:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T04:59:059.999Z`)) {
            //             count5++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T05:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T05:59:059.999Z`)) {
            //             count6++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T06:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T06:59:059.999Z`)) {
            //             count7++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T07:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T07:59:059.999Z`)) {
            //             count8++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T08:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T08:59:059.999Z`)) {
            //             count9++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T09:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T09:59:059.999Z`)) {
            //             count10++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T10:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T10:59:059.999Z`)) {
            //             count11++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T11:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T11:59:059.999Z`)) {
            //             count12++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T12:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T12:59:059.999Z`)) {
            //             count13++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T13:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T13:59:059.999Z`)) {
            //             count14++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T14:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T14:59:059.999Z`)) {
            //             count15++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T15:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T15:59:059.999Z`)) {
            //             count16++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T16:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T16:59:059.999Z`)) {
            //             count17++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T17:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T17:59:059.999Z`)) {
            //             count18++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T18:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T18:59:059.999Z`)) {
            //             count19++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T19:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T19:59:059.999Z`)) {
            //             count20++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T20:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T20:59:059.999Z`)) {
            //             count21++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T21:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T21:59:059.999Z`)) {
            //             count22++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T22:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T22:59:059.999Z`)) {
            //             count23++;
            //         } if (new Date(element?.date) <= new Date(`${fromDate}T23:00:00.000Z`) &&
            //             new Date(element?.date) >= new Date(`${fromDate}T23:59:059.999Z`)) {
            //             count24++;
            //         }
            //         result = [
            //             {
            //                 name: "0 a.m - 1 a.m",
            //                 value: count1
            //             },
            //             {
            //                 name: "1 a.m - 2 a.m",
            //                 value: count2
            //             }, {
            //                 name: "2 a.m - 3 a.m",
            //                 value: count3
            //             }, {
            //                 name: "3 a.m - 4 a.m",
            //                 value: count4
            //             }, {
            //                 name: "4 a.m - 5 a.m",
            //                 value: count5
            //             }, {
            //                 name: "5 a.m - 6 a.m",
            //                 value: count6
            //             }, {
            //                 name: "6 a.m - 7 a.m",
            //                 value: count7
            //             }, {
            //                 name: "7 a.m - 8 a.m",
            //                 value: count8
            //             }, {
            //                 name: "8 a.m - 9 a.m",
            //                 value: count9
            //             }, {
            //                 name: "9 a.m - 10 a.m",
            //                 value: count10
            //             }, {
            //                 name: "10 a.m - 11 a.m",
            //                 value: count11
            //             }, {
            //                 name: "11 a.m - 12 p.m",
            //                 value: count12
            //             }, {
            //                 name: "12 p.m - 1 p.m",
            //                 value: count13
            //             }, {
            //                 name: "1 p.m - 2 p.m",
            //                 value: count14
            //             }, {
            //                 name: "2 p.m - 3 p.m",
            //                 value: count15
            //             }, {
            //                 name: "3 p.m - 4 p.m",
            //                 value: count16
            //             }, {
            //                 name: "4 p.m - 5 p.m",
            //                 value: count17
            //             }, {
            //                 name: "5 p.m - 6 p.m",
            //                 value: count18
            //             }, {
            //                 name: "6 a.m - 7 p.m",
            //                 value: count19
            //             }, {
            //                 name: "7 p.m - 8 p.m",
            //                 value: count20
            //             }, {
            //                 name: "8 p.m - 9 p.m",
            //                 value: count21
            //             }, {
            //                 name: "9 p.m - 10 p.m",
            //                 value: count22
            //             }, {
            //                 name: "10 p.m - 11 p.m",
            //                 value: count23
            //             }, {
            //                 name: "11 p.m - 12 p.m",
            //                 value: count24
            //             },
            //         ]

            //     }
            // }
            returnData.push({
                module: 'Appointment',
                Message: fetchedAppointment && fetchedAppointment?.length > 0 ? 'Appoints fetched' : 'Appoints fetch failed!',
                data: [...result]
            })


            return { status: true, message: "test_message", data: returnData, metaData: metaData }

        }


        else if (String(module?.toLowerCase()) == String('Registration').toLowerCase()) {
            const filterQuery = {
                deletedAt: null,
            };
            filterQuery.businessUnit = new mongoose.Types.ObjectId(buId)
            if (branchId) filterQuery.branch = new mongoose.Types.ObjectId(branchId)
            filterQuery.createdAt = {}
            filterQuery.createdAt.$gte = new Date(`${fromDate}T00:00:00.000Z`);
            filterQuery.createdAt.$lte = new Date(`${toDate}T23:59:59.999Z`);
            const fetchRegistration = await User.find({ ...(filterQuery || {}) })
            returnData.push({
                module: 'Registration',
                Message: fetchRegistration && fetchRegistration?.length > 0 ? 'Registration fetched' : 'Registration fetch failed!',
                value: fetchRegistration && fetchRegistration?.length > 0 ? fetchRegistration : []
            })
            return { status: true, message: "test_message", data: returnData, metaData: metaData }

        }
        else {

        }

    }
    catch (error) {
        console.log("error", error?.message)
        return { status: false, message: error?.message, data: [], metadata: {} }
    }
}

module.exports = getGraphDashboardFN