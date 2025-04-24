const { default: mongoose } = require("mongoose");
const { getClientDatabaseConnection } = require("../../../db/connection");
const appointmentSchema = require("../../../client/model/appointments");
const clinetChairSchema = require("../../../client/model/chair");
const clinetBusinessUnitSchema = require("../../../client/model/businessUnit");
const clinetBranchSchema = require("../../../client/model/branch");
const caseSheetSchema = require("../../../client/model/caseSheet");
const clinetUserSchema = require("../../../client/model/user");
const clinetPatientSchema = require("../../../client/model/patient");
const { formatAppointment } = require("../../../utils/helperFunctions");
const fnToExtractFirstNameOfCreatedAndEditedBy = require("../../../utils/fnToExtractFIrstNameOfCreatedAndEditedByNew");

const getAppointmentWithFilterFn = async ({ page = null, perPage = null, searchKey, chairId, appointmentId, fromDate, toDate, buId, branchId, dutyDoctorId, specialistDoctorId, dentalAssistant, patientId, caseSheetId, caseId, createdUser, updatedUser, clientId }) => {
    try {
        const db = await getClientDatabaseConnection(clientId);
        const Appointment = await db.model('Appointment', appointmentSchema);
        //, clinetBusinessUnitSchema, clinetBranchSchema, clinetUserSchema


        //these are user for populating the data
        const businessUnit = await db.model("businessUnit", clinetBusinessUnitSchema);
        const branch = await db.model("branch", clinetBranchSchema);
        const caseSheet = db.model('caseSheet', caseSheetSchema);
        const user = await db.model("clientUsers", clinetUserSchema);
        const patient = db.model('patient', clinetPatientSchema);
        const chair = await db.model("chair", clinetChairSchema);


        if (appointmentId) {
            const specificAppointment = await Appointment.findOne({ _id: appointmentId, deletedAt: null })
                .populate("buId", "_id name")
                .populate("branchId", "_id name")
                .populate("dutyDoctorId", "_id firstName lastName")
                .populate("specialistDoctorId", "_id firstName lastName")
                .populate("patientId", "_id firstName lastName bloodGroup phone email age gender ")
                .populate("caseSheetId", "_id displayId")
                .populate("chairId", "_id chairNumber chairLocation")
                .populate("caseId", "_id displayId")
                .populate("createdBy", "_id firstName lastName")
                .populate("updatedBy", "_id firstName lastName")
                .populate("deletedBy", "_id firstName lastName")
                .sort({ createdAt: -1 })
                .lean();

            if (!specificAppointment) {
                return { status: false, message: "Appointment not found" };
            }

            const formattedAppointment = formatAppointment(specificAppointment);

            return {
                status: true,
                message: "The Appointment retrieved successfully.",
                data: {
                    appointments: formattedAppointment,
                    metadata: {
                        page: 1,
                        perPage: 1,
                        totalCount: 1,
                        totalPages: 1
                    },
                },
            };
        };

        // let searchQuery = {};
        // if (searchKey) {
        //     if (searchKey.trim()) {
        //         const words = searchKey.trim().split(/\s+/)
        //             .map(word =>
        //                 word.replace(/[.*+?^${}|[\]\\]/g, '\\$&').trim()
        //             );
        //         //const escapedSearchKey = searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        //         searchQuery = {
        //             $or: words.flatMap(word => [
        //                 { displayId: { $regex: word, $options: "i" } },
        //                 { status: { $regex: word, $options: "i" } },
        //                 { chiefComplaint: { $regex: word, $options: "i" } },
        //             ]),
        //         };
        //     };
        // };

        // Apply filters only if parameters exist
        // const businessSearchKey = buId ? { buId } : {};
        // const branchIdSearchKey = branchId ? { branchId } : {};
        // const dutyDoctorIdSearchKey = dutyDoctorId ? { dutyDoctorId } : {};
        // const specialistDoctorIdSearchKey = specialistDoctorId ? { specialistDoctorId } : {};
        // const patientIdSearchKey = patientId ? { patientId } : {};
        // const dentalAssistantIdSearchKey = dentalAssistant ? { dentalAssistant } : {};
        // const caseSheetIdSearchKey = caseSheetId ? { caseSheetId } : {};
        // const caseIdSearchKey = caseId ? { caseId } : {};
        // const createdUserSearchKey = createdUser ? { createdBy: createdUser } : {};
        // const updatedUserSearchKey = updatedUser ? { updatedBy: updatedUser } : {};
        //const deletedUserSearchKey = deletedUser ? { deletedBy: deletedUser } : {};

        const filterQuery = {
            deletedAt: null,
            // ...searchQuery,
        };

        if (buId) filterQuery.buId = new mongoose.Types.ObjectId(buId);
        if (branchId) filterQuery.branchId = new mongoose.Types.ObjectId(branchId);
        if (dutyDoctorId) filterQuery.dutyDoctorId = new mongoose.Types.ObjectId(dutyDoctorId);
        if (chairId) filterQuery.chairId = new mongoose.Types.ObjectId(chairId);
        if (specialistDoctorId) filterQuery.specialistDoctorId = new mongoose.Types.ObjectId(specialistDoctorId);
        if (patientId) filterQuery.patientId = new mongoose.Types.ObjectId(patientId);
        if (dentalAssistant) filterQuery.dentalAssistant = new mongoose.Types.ObjectId(dentalAssistant);
        if (caseSheetId) filterQuery.caseSheetId = new mongoose.Types.ObjectId(caseSheetId);
        if (caseId) filterQuery.caseId = new mongoose.Types.ObjectId(caseId);
        if (createdUser) filterQuery.createdBy = new mongoose.Types.ObjectId(createdUser);
        if (updatedUser) filterQuery.updatedBy = new mongoose.Types.ObjectId(updatedUser);

        if (fromDate || toDate) {
            filterQuery.date = {};
            if (fromDate) filterQuery.date.$gte = new Date(fromDate);
            if (toDate) filterQuery.date.$lte = new Date(toDate);
        }
        //aggregation by rahul:
        const queryPipeline = [];
        queryPipeline.push({
            $match: {
                deletedAt: null,
                ...(filterQuery || {}), // fromDate, toDate, businessUnit, branch, etc.
            }
        });
        // Lookups starts here
        queryPipeline.push(
            // buId
            {
                $lookup: {
                    from: "businessunits",
                    localField: "buId",
                    foreignField: "_id",
                    as: "buId"
                }
            },
            { $unwind: { path: "$buId", preserveNullAndEmptyArrays: true } },
            //branch
            {
                $lookup: {
                    from: "branches",
                    localField: "branchId",
                    foreignField: "_id",
                    as: "branchId"
                }
            },
            { $unwind: { path: "$branchId", preserveNullAndEmptyArrays: true } },
            // dutyDoctorId
            {
                $lookup: {
                    from: "clientusers",
                    localField: "dutyDoctorId",
                    foreignField: "_id",
                    as: "dutyDoctorId"
                }
            },
            { $unwind: { path: "$dutyDoctorId", preserveNullAndEmptyArrays: true } },
            //specialistDoctorId
            {
                $lookup: {
                    from: "clientusers",
                    localField: "specialistDoctorId",
                    foreignField: "_id",
                    as: "specialistDoctorId",
                }
            },
            { $unwind: { path: "$specialistDoctorId", preserveNullAndEmptyArrays: true } },
            // patientId
            {
                $lookup: {
                    from: "patients",
                    localField: "patientId",
                    foreignField: "_id",
                    as: "patientId"
                }
            },
            { $unwind: { path: "$patientId", preserveNullAndEmptyArrays: true } },
            // caseSheetId
            {
                $lookup: {
                    from: "casesheets",
                    localField: "caseSheetId",
                    foreignField: "_id",
                    as: "caseSheetId"
                }
            },
            { $unwind: { path: "$caseSheetId", preserveNullAndEmptyArrays: true } },
            // chairId
            {
                $lookup: {
                    from: "chairs",
                    localField: "chairId",
                    foreignField: "_id",
                    as: "chairId",
                }
            },
            { $unwind: { path: "$chairId", preserveNullAndEmptyArrays: true } },
            // caseId
            {
                $lookup: {
                    from: "casesheets",
                    localField: "caseId",
                    foreignField: "_id",
                    as: "caseId",
                }
            },
            { $unwind: { path: "$caseId", preserveNullAndEmptyArrays: true } },
            //createdBy
            {
                $lookup: {
                    from: "clientusers",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "createdBy",
                }
            },
            { $unwind: { path: "$createdBy", preserveNullAndEmptyArrays: true } },
            // updatedBy
            {
                $lookup: {
                    from: "clientusers",
                    localField: "updatedBy",
                    foreignField: "_id",
                    as: "updatedBy",
                }
            },
            { $unwind: { path: "$updatedBy", preserveNullAndEmptyArrays: true } },
            // deletedBy
            {
                $lookup: {
                    from: "clientusers",
                    localField: "deletedBy",
                    foreignField: "_id",
                    as: "deletedBy",
                }
            },
            { $unwind: { path: "$deletedBy", preserveNullAndEmptyArrays: true } },
        )
        //lookup ends
        if (searchKey && searchKey.trim()) {
            const regex = new RegExp(searchKey.trim(), "i");

            queryPipeline.push({
                $match: {
                    $or: [
                        { displayId: { $regex: regex } },
                        { status: { $regex: regex } },
                        { chiefComplaint: { $regex: regex } },
                        { "patientId.firstName": { $regex: regex } },
                        { "patientId.lastName": { $regex: regex } },
                        { "patientId.phone": { $regex: regex } },
                        { "patientId.email": { $regex: regex } },
                        { "chairId.chairNumber": { $regex: regex } },
                        { "chairId.chairLocation": { $regex: regex } },
                    ]
                }
            });
        }
        //sorting
        queryPipeline.push({
            $sort: { createdAt: -1 }
        });
        //pagination handling
        if (!page || !perPage) {
            // No pagination — return all data and add a separate $facet for consistent structure
            queryPipeline.push({
                $facet: {
                    metadata: [
                        {
                            $group: {
                                _id: null,
                                totalCount: { $sum: 1 }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                totalCount: 1,
                                page: { $literal: 1 },
                                perPage: "$totalCount",
                                totalPages: { $literal: 1 }
                            }
                        }
                        // {
                        //     $count: "total"
                        // },
                        // {
                        //     $addFields: {
                        //         page: 1,
                        //         perPage: 1
                        //     }
                        // }
                    ],
                    data: [
                        // No $skip or $limit → return all matching docs
                    ]
                }
            });
        }
        else {
            queryPipeline.push({
                $facet: {
                    metadata: [
                        {
                            $group: {
                                _id: null,
                                totalCount: { $sum: 1 }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                totalCount: 1,
                                page: { $literal: Number(page) },
                                perPage: { $literal: Number(perPage) },
                                totalPages: {
                                    $ceil: {
                                        $divide: ["$totalCount", Number(perPage)]
                                    }
                                }
                            }
                        }
                        // { $count: "total" },
                        // {
                        //     $addFields: {
                        //         page: Number(page),
                        //         perPage: Number(perPage),
                        //     },
                        // },
                    ],
                    data: [
                        { $skip: (Number(page) - 1) * Number(perPage) },
                        { $limit: Number(perPage) }
                    ]
                }
            });
        }
        console.log("queryPipeline==>>", queryPipeline)
        const result = await Appointment.aggregate(queryPipeline);
        // return {
        //     status : true,
        //     data : queryPipeline
        // } 
        console.log("resultresult==>>>>>", result)
        // Extract data
        const appointmentNew = result[0]?.data || [];
        const meta = result[0]?.metadata[0];
        if (!appointmentNew || appointmentNew?.length < 1)
            return {
                status: false,
                message: "No Appointments found",
                data: {
                    appointments: [],
                    metadata: {},
                },
            }

        // Apply date filters
        // let dateSearchKey = {};
        // if (fromDate || toDate) {
        //     dateSearchKey = { createdAt: {} };
        //     if (fromDate) dateSearchKey.createdAt.$gte = new Date(fromDate);
        //     if (toDate) dateSearchKey.createdAt.$lte = new Date(toDate);
        // }


        // if (slotFrom || slotTo) {
        //     dateSearchKey = { createdAt: {} };
        //     if (slotFrom) dateSearchKey.createdAt.$gte = new Date(slotFrom);
        //     if (slotTo) dateSearchKey.createdAt.$lte = new Date(slotTo);
        // }


        // if (!page || !perPage) {
        //     const allAppointment = await Appointment.find(filterQuery)
        //         .populate("buId", "_id name")
        //         .populate("branchId", "_id name")
        //         .populate("dutyDoctorId", "_id firstName lastName")
        //         .populate("specialistDoctorId", "_id firstName lastName")
        //         .populate("patientId", "_id firstName lastName bloodGroup phone email age gender")
        //         .populate("caseSheetId", "_id displayId")
        //         .populate("chairId", "_id chairNumber chairLocation")
        //         .populate("caseId", "_id displayId")
        //         .populate("createdBy", "_id firstName lastName")
        //         .populate("updatedBy", "_id firstName lastName")
        //         .populate("deletedBy", "_id firstName lastName")
        //         .sort({ createdAt: -1 })
        //         .lean();


        //     const formattedAppointment = allAppointment.map((appointment) => formatAppointment(appointment));
        //     return {
        //         status: true,
        //         message: "All Appointment retrieved successfully.",
        //         data: {
        //             appointments: formattedAppointment,
        //             metadata: {
        //                 page: 1,
        //                 perPage: allAppointment?.length,
        //                 totalCount: allAppointment?.length,
        //                 totalPages: 1
        //             },
        //         },
        //     };
        // };

        // {
        //     ...searchQuery,
        //     ...businessSearchKey,
        //     ...branchIdSearchKey,
        //     ...dutyDoctorIdSearchKey,
        //     ...specialistDoctorIdSearchKey,
        //     ...patientIdSearchKey,
        //     ...dentalAssistantIdSearchKey,
        //     ...caseSheetIdSearchKey,
        //     ...caseIdSearchKey,
        //     ...createdUserSearchKey,
        //     ...updatedUserSearchKey,
        //     deletedAt: null,
        // }

        // Query the database
        // console.log('reched Here at General Query ')
        // let query = Appointment.find(filterQuery)
        //     .populate("buId", "_id name")
        //     .populate("branchId", "_id name")
        //     .populate("dutyDoctorId", "_id firstName lastName")
        //     .populate("specialistDoctorId", "_id firstName lastName")
        //     .populate("patientId", "_id firstName lastName bloodGroup phone email age gender")
        //     .populate("caseSheetId", "_id displayId")
        //     .populate("chairId", "_id chairNumber chairLocation")
        //     .populate("caseId", "_id displayId")
        //     .populate("createdBy", "_id firstName lastName")
        //     .populate("updatedBy", "_id firstName lastName")
        //     .populate("deletedBy", "_id firstName lastName")
        //     .sort({ createdAt: -1 })
        //     .lean();


        // // Apply pagination only if page & perPage are provided
        // page = Number(page) || 1;
        // perPage = Number(perPage) || 10;

        // const skip = (page - 1) * perPage;

        // // Fetch data
        // const appointments = await query.skip(skip).limit(perPage);


        const formattedAppointments = appointmentNew.map((appointment) => formatAppointment(appointment));

        // // Get total count properly
        // const totalCount = await Appointment.countDocuments(filterQuery);

        // // Calculate total pages
        // const totalPages = Math.ceil(totalCount / perPage); 

        const { createdByFirstNames, updatedByFirstNames } = fnToExtractFirstNameOfCreatedAndEditedBy(appointmentNew);
        meta.createdBy = createdByFirstNames ? createdByFirstNames : [];
        meta.editedBy = updatedByFirstNames ? updatedByFirstNames : [];

        return {
            status: true,
            message: "Appointment details retrieved successfully",
            data: {
                appointments: formattedAppointments,
                metadata: meta
            },
        };
        //return { status: true, data: result };

    } catch (error) {
        return { status: false, message: error.message, data: {} };
    }
}

module.exports = getAppointmentWithFilterFn;