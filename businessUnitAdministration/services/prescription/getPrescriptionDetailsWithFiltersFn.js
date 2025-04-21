const clinetBranchSchema = require("../../../client/model/branch");
const clinetBusinessUnitSchema = require("../../../client/model/businessUnit");
const caseSheetSchema = require("../../../client/model/caseSheet");
const clinetPatientSchema = require("../../../client/model/patient");
const prescriptionSchema = require("../../../client/model/prescription");
const clinetUserSchema = require("../../../client/model/user");
const { getClientDatabaseConnection } = require("../../../db/connection");
const { formatPrescription } = require("../../../utils/helperFunctions");

const getPrescriptionDetailsWithFiltersFn = async ({ page = null, perPage = null, searchKey, prescriptionId, fromDate, toDate, buId, branchId, doctorId, patientId, caseSheetId, nextVisitDate, createdUser, updatedUser, deletedUser, clientId }) => {
    try {
        const db = await getClientDatabaseConnection(clientId);
        const Prescription = await db.model('prescription', prescriptionSchema)
        //, clinetBusinessUnitSchema, clinetBranchSchema, clinetUserSchema

        //these are user for populating the data
        const businessUnit = await db.model("businessUnit", clinetBusinessUnitSchema);
        const branch = await db.model("branch", clinetBranchSchema);
        const user = await db.model("clientUsers", clinetUserSchema);
        const caseSheet = db.model('caseSheet', caseSheetSchema);
        const patient = db.model('patient', clinetPatientSchema);


        if (prescriptionId) {
            const specificPrescription = await Prescription.findOne({ _id: prescriptionId, deletedAt: null })
                .populate("buId", "_id name")
                .populate("branchId", "_id name")
                .populate("doctorId", "_id firstName lastName")
                .populate("patientId", "_id firstName lastName")
                .populate("caseSheetId", "_id displayId")
                .populate("createdBy", "_id firstName lastName")
                .populate("updatedBy", "_id firstName lastName")
                .populate("deletedBy", "_id firstName lastName")
                .sort({ createdAt: -1 })
                .lean();

            if (!specificPrescription) {
                return { status: false, message: "Prescription not found" };
            }

            const formattedPrescription = formatPrescription(specificPrescription);

            return {
                status: true,
                message: "The Prescription retrieved successfully.",
                data: {
                    prescriptions: formattedPrescription,
                    metadata: {
                        page: 1,
                        perPage: 1,
                        totalCount: 1,
                        totalPages: 1
                    },
                },
            };
        }

        let searchQuery = {};
        if (searchKey) {
            if (searchKey.trim()) {
                const words = searchKey.trim().split(/\s+/)
                    .map(word =>
                        word.replace(/[.*+?^${}|[\]\\]/g, '\\$&').trim()
                    );
                //const escapedSearchKey = searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                searchQuery = {
                    $or: words.flatMap(word => [
                        { displayId: { $regex: word, $options: "i" } },
                        { additionalAdvice: { $regex: word, $options: "i" } },
                        { nextVisitDiscription: { $regex: word, $options: "i" } },
                        {
                            drugArray: {
                                $elemMatch: {
                                    $or: [
                                        { drugName: { $regex: word, $options: "i" } },
                                        { drug: { $regex: word, $options: "i" } },
                                        { dosage: { $regex: word, $options: "i" } },
                                        { freequency: { $regex: word, $options: "i" } },
                                        { duration: { $regex: word, $options: "i" } },
                                        { instruction: { $regex: word, $options: "i" } },
                                        { note: { $regex: word, $options: "i" } },
                                        { timing: { $regex: word, $options: "i" } }
                                    ]
                                }
                            }
                        }
                    ]),
                };
            };
        };

        // Apply filters only if parameters exist
        const businessSearchKey = buId ? { buId } : {};
        const branchIdSearchKey = branchId ? { branchId } : {};
        const doctorIdSearchKey = doctorId ? { doctorId } : {};
        const patientIdIdSearchKey = patientId ? { patientId } : {};
        const caseSheetIdSearchKey = caseSheetId ? { caseSheetId } : {};
        const createdUserSearchKey = createdUser ? { createdBy: createdUser } : {};
        const updatedUserSearchKey = updatedUser ? { updatedBy: updatedUser } : {};
        const deletedUserSearchKey = deletedUser ? { deletedBy: deletedUser } : {};


        // Apply date filters
        let dateSearchKey = {};
        if (fromDate || toDate) {
            dateSearchKey = { createdAt: {} };
            if (fromDate) dateSearchKey.createdAt.$gte = new Date(fromDate);
            if (toDate) dateSearchKey.createdAt.$lte = new Date(toDate);
            if (nextVisitDate) dateSearchKey.nextVisitDateSearchKey = new Date(nextVisitDate);
        }


        if (!page || !perPage) {
            const allPrescription = await Prescription.find({
                ...searchQuery,
                ...businessSearchKey,
                ...branchIdSearchKey,
                ...doctorIdSearchKey,
                ...patientIdIdSearchKey,
                ...caseSheetIdSearchKey,
                ...createdUserSearchKey,
                ...updatedUserSearchKey,
                ...deletedUserSearchKey,
                deletedAt: null,
            })
                .populate("buId", "_id name")
                .populate("branchId", "_id name")
                .populate("doctorId", "_id firstName lastName")
                .populate("patientId", "_id firstName lastName")
                .populate("caseSheetId", "_id displayId")
                .populate("createdBy", "_id firstName lastName")
                .populate("updatedBy", "_id firstName lastName")
                .populate("deletedBy", "_id firstName lastName")
                .sort({ createdAt: -1 })
                .lean();


            const formattedPrescription = allPrescription.map((prescription) => formatPrescription(prescription));
            return {
                status: true,
                message: "All Prescriptions retrieved successfully.",
                data: {
                    prescriptions: formattedPrescription,
                    metadata: {
                        page: 1,
                        perPage: allPrescription?.length,
                        totalCount: allPrescription?.length,
                        totalPages: 1
                    },
                },
            };
        };


        // Query the database
        let query = Prescription.find({
            ...searchQuery,
            ...businessSearchKey,
            ...branchIdSearchKey,
            ...doctorIdSearchKey,
            ...patientIdIdSearchKey,
            ...caseSheetIdSearchKey,
            ...createdUserSearchKey,
            ...updatedUserSearchKey,
            ...deletedUserSearchKey,
            deletedAt: null,
        })
            .populate("buId", "_id name")
            .populate("branchId", "_id name")
            .populate("doctorId", "_id firstName lastName")
            .populate("patientId", "_id firstName lastName")
            .populate("caseSheetId", "_id displayId")
            .populate("createdBy", "_id firstName lastName")
            .populate("updatedBy", "_id firstName lastName")
            .populate("deletedBy", "_id firstName lastName")
            .sort({ createdAt: -1 })
            .lean();


        // Apply pagination only if page & perPage are provided
        page = Number(page) || 1;
        perPage = Number(perPage) || 10;

        const skip = (page - 1) * perPage;

        // Fetch data
        const prescriptions = await query.skip(skip).limit(perPage);


        const formattedPrescriptions = prescriptions.map((prescription) => formatPrescription(prescription));

        // Get total count properly
        const totalCount = await Prescription.countDocuments({
            ...searchQuery,
            ...businessSearchKey,
            ...branchIdSearchKey,
            ...doctorIdSearchKey,
            ...patientIdIdSearchKey,
            ...caseSheetIdSearchKey,
            ...createdUserSearchKey,
            ...updatedUserSearchKey,
            ...deletedUserSearchKey,
            deletedAt: null,
        });

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / perPage);

        return {
            status: true,
            message: totalCount < 1 ? "No Prescriptions found" : "Precription details retrieved successfully.",
            data: {
                prescriptions: formattedPrescriptions,
                metadata: {
                    page,
                    perPage,
                    totalCount,
                    totalPages,
                },
            },
        };
        //return { status: true, data: result };

    } catch (error) {
        return { status: false, message: error.message };
    }
}

module.exports = getPrescriptionDetailsWithFiltersFn;