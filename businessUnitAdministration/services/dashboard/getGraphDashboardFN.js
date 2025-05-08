const mongoose = require("mongoose");
const { getClientDatabaseConnection } = require("../../../db/connection");
const appointmentSchema = require("../../../client/model/appointments");
const clinetUserSchema = require("../../../client/model/user");
const clinetPatientSchema = require("../../../client/model/patient");

const getGraphDashboardFN = async ({ clientId, buId, branchId, module, viewType, fromDate, toDate }) => {
    try {
        //db connection :
        const db = await getClientDatabaseConnection(clientId);
        const Appointment = await db.model('Appointment', appointmentSchema);
        // const User = await db.model('clientUsers', clinetUserSchema);
        const User = await db.model('patient', clinetPatientSchema);
        const metaData = {
            fromDate: fromDate,
            toDate: toDate,
            module: module,
            viewType: viewType
        };
        const returnData = {};

        if (String(module?.toLowerCase()) == String('Appointment').toLowerCase()) {//APPOINTMENT
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
            metaData.totalCount = fetchedAppointment && fetchedAppointment?.length > 0 ? fetchedAppointment?.length : 0;
            //:=>
            if (String(viewType?.toLowerCase()) == String('daily_not_required_right_now').toLowerCase()) {//done working tested..all date are at the start of day thats why coming in same group otherwise okay
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
                        const date = new Date(appt?.date); // "2025-04-30T08:07:07.723+00:00"
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

                returnData.module = 'Appointment';
                returnData.message = fetchedAppointment && fetchedAppointment?.length > 0 ? 'Appoints fetched' : 'Appoints fetch failed!';
                returnData.status = fetchedAppointment && fetchedAppointment?.length > 0 ? true : false;
                returnData.data = [...result];

            }
            // weekly & monthly & custom & daily:=>
            else if (String(viewType?.toLowerCase()) == String('weekly').toLowerCase() || String(viewType?.toLowerCase()) == String('monthly').toLowerCase() || String(viewType?.toLowerCase()) == String('custom').toLowerCase() || String(viewType?.toLowerCase()) == String('daily').toLowerCase()) {
                const groupByDateWithDay = (appointments, fromDate, toDate) => {
                    const groupedData = {};

                    // Step 1: Build base date structure
                    const current = new Date(fromDate);
                    const end = new Date(toDate);
                    while (current <= end) {
                        const dateStr = current.toISOString().split('T')[0];
                        const dayName = current.toLocaleDateString('en-US', { weekday: 'long' });
                        if (String(viewType?.toLowerCase()) == String('monthly').toLowerCase() || String(viewType?.toLowerCase()) == String('custom').toLowerCase() || String(viewType?.toLowerCase()) == String('daily').toLowerCase()) {
                            groupedData[dateStr] = {
                                date: dayName,
                                name: dateStr,
                                value: 0
                            };
                        }
                        else {
                            groupedData[dateStr] = {
                                date: dateStr,//2025-02-05
                                name: dayName,//eg sunday
                                value: 0
                            };
                        }
                        current.setDate(current.getDate() + 1);
                    }

                    // Step 2: Count appointments per date
                    appointments.forEach(app => {
                        if (app?.date) {
                            const dateObj = new Date(app?.date);
                            const dateStr = dateObj.toISOString().split('T')[0];
                            if (groupedData[dateStr]) {
                                groupedData[dateStr].value += 1;
                            }
                        }
                    });

                    return Object.values(groupedData);
                };
                const result = groupByDateWithDay(fetchedAppointment, fromDate, toDate)

                returnData.module = 'Appointment';
                returnData.message = fetchedAppointment && fetchedAppointment?.length > 0 ? 'Appoints fetched' : 'Appoints fetch failed!';
                returnData.status = fetchedAppointment && fetchedAppointment?.length > 0 ? true : false;
                returnData.data = [...result];

            }
            //yearly
            else if (String(viewType?.toLowerCase()) == String('yearly').toLowerCase()) {
                const groupByYearRange = (appointments, fromDate, toDate) => {
                    const groupedData = {};

                    // Step 1: Initialize all years in range with count 0
                    const startYear = new Date(fromDate).getFullYear();
                    const endYear = new Date(toDate).getFullYear();

                    for (let name = startYear; name <= endYear; name++) {//name is the year actually
                        groupedData[name] = {
                            name: name,
                            value: 0
                        };
                    }

                    // Step 2: Count appointments per year
                    appointments.forEach(app => {
                        if (app?.date) {
                            const name = new Date(app?.date).getFullYear();
                            if (groupedData[name]) {
                                groupedData[name].value += 1;
                            }
                        }
                    });

                    return Object.values(groupedData).sort((a, b) => a.name - b.name);
                };
                const result = groupByYearRange(fetchedAppointment, fromDate, toDate)

                returnData.module = 'Appointment';
                returnData.message = fetchedAppointment && fetchedAppointment?.length > 0 ? 'Appoints fetched' : 'Appoints fetch failed!';
                returnData.status = fetchedAppointment && fetchedAppointment?.length > 0 ? true : false;
                returnData.data = [...result];

            }
            else {
                return { status: false, message: "Invalid View Type", data: [], metaData: {} }
            }

        }


        else if (String(module?.toLowerCase()) == String('Registration').toLowerCase()) {//Rehistration
            const filterQuery = {
                deletedAt: null,
            };
            filterQuery.businessUnit = new mongoose.Types.ObjectId(buId)
            if (branchId) filterQuery.branch = new mongoose.Types.ObjectId(branchId)
            filterQuery.createdAt = {}
            filterQuery.createdAt.$gte = new Date(`${fromDate}T00:00:00.000Z`);
            filterQuery.createdAt.$lte = new Date(`${toDate}T23:59:59.999Z`);
            const fetchedRegistration = await User.find({ ...(filterQuery || {}) })
            console.log("fetchedRegistrationfetchedRegistration==>>>", fetchedRegistration)
            metaData.totalCount = fetchedRegistration && fetchedRegistration?.length > 0 ? fetchedRegistration?.length : 0;
            //:=>
            if (String(viewType?.toLowerCase()) == String('daily_not_required_right_now').toLowerCase()) {//done working tested..all date are at the start of day thats why coming in same group otherwise okay
                const generateHourlyCounts = (data) => {
                    const result = Array.from({ length: 24 }, (_, hour) => {
                        const labelStart = formatHour(hour);
                        const labelEnd = formatHour((hour + 1) % 24);
                        return {
                            name: `${labelStart} - ${labelEnd}`,
                            value: 0
                        };
                    });

                    for (const appt of data) {
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
                const result = generateHourlyCounts(fetchedRegistration);

                returnData.module = 'Registration';
                returnData.message = fetchedRegistration && fetchedRegistration?.length > 0 ? 'Registration fetched' : 'Registration fetch failed!';
                returnData.status = fetchedRegistration && fetchedRegistration?.length > 0 ? true : false;
                returnData.data = [...result];

            }
            // weekly & monthly & custom & daily:=>
            else if (String(viewType?.toLowerCase()) == String('weekly').toLowerCase() || String(viewType?.toLowerCase()) == String('monthly').toLowerCase() || String(viewType?.toLowerCase()) == String('custom').toLowerCase() || String(viewType?.toLowerCase()) == String('daily').toLowerCase()) {
                const groupByDateWithDay = (data, fromDate, toDate) => {
                    const groupedData = {};

                    // Step 1: Build base date structure
                    const current = new Date(fromDate);
                    const end = new Date(toDate);
                    while (current <= end) {
                        const dateStr = current.toISOString().split('T')[0];
                        const dayName = current.toLocaleDateString('en-US', { weekday: 'long' });
                        if (String(viewType?.toLowerCase()) == String('monthly').toLowerCase() || String(viewType?.toLowerCase()) == String('custom').toLowerCase() || String(viewType?.toLowerCase()) == String('daily').toLowerCase()) {
                            groupedData[dateStr] = {
                                date: dayName,
                                name: dateStr,
                                value: 0
                            };
                        }
                        else {
                            groupedData[dateStr] = {
                                date: dateStr,
                                name: dayName,
                                value: 0
                            };
                        }

                        current.setDate(current.getDate() + 1);
                    }

                    // Step 2: Count  per date
                    data?.forEach(app => {
                        if (app?.createdAt) {
                            const dateObj = new Date(app?.createdAt);
                            const dateStr = dateObj.toISOString().split('T')[0];
                            if (groupedData[dateStr]) {
                                groupedData[dateStr].value += 1;
                            }
                        }
                    });

                    return Object.values(groupedData);
                };
                const result = groupByDateWithDay(fetchedRegistration, fromDate, toDate)

                returnData.module = 'Registration';
                returnData.message = fetchedRegistration && fetchedRegistration?.length > 0 ? 'Registration fetched' : 'Registration fetch failed!';
                returnData.status = fetchedRegistration && fetchedRegistration?.length > 0 ? true : false;
                returnData.data = [...result];

            }
            //yearly
            else if (String(viewType?.toLowerCase()) == String('yearly').toLowerCase()) {
                const groupByYearRange = (data, fromDate, toDate) => {
                    const groupedData = {};

                    // Step 1: Initialize all years in range with count 0
                    const startYear = new Date(fromDate).getFullYear();
                    const endYear = new Date(toDate).getFullYear();

                    for (let name = startYear; name <= endYear; name++) {
                        groupedData[name] = {
                            name: name,
                            value: 0
                        };
                    }

                    // Step 2: Count data per year
                    data.forEach(app => {
                        if (app?.createdAt) {
                            const name = new Date(app?.createdAt).getFullYear();
                            if (groupedData[name]) {
                                groupedData[name].value += 1;
                            }
                        }
                    });

                    return Object.values(groupedData).sort((a, b) => a.name - b.name);
                };
                const result = groupByYearRange(fetchedRegistration, fromDate, toDate)

                returnData.module = 'Registration';
                returnData.message = fetchedRegistration && fetchedRegistration?.length > 0 ? 'Registration fetched' : 'Registration fetch failed!';
                returnData.status = fetchedRegistration && fetchedRegistration?.length > 0 ? true : false;
                returnData.data = [...result];
            }
            else {
                return { status: false, message: "Invalid View Type", data: [], metaData: {} }
            }
        }
        else {
            return { status: false, message: "Invalid module", data: [], metaData: {} }
        }
        return { status: returnData ? true : false, message: returnData && returnData?.status ? "Graph data fetched successfully" : "Graph data is zero or could not be fetched", data: returnData, metaData: metaData || {} }
    }
    catch (error) {
        console.log("error", error?.message)
        return { status: false, message: error?.message, data: [], metadata: {} }
    }
}

module.exports = getGraphDashboardFN