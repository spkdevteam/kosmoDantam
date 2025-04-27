const clinetBranchSchema = require("../../../client/model/branch");
const clinetBusinessUnitSchema = require("../../../client/model/businessUnit");
const clinetPatientSchema = require("../../../client/model/patient");
const clinetUserSchema = require("../../../client/model/user");
const { getClientDatabaseConnection } = require("../../../db/connection");
const { activityLogSchema } = require("../../../model/activityLog");

const getActivitylogFn = async ({ activityId = null, page = 1, perPage = 10, searchKey = "", fromDate, toDate, userId, buId, branchId, patientId, createdUser, updatedUser, clientId }) => {
    try {
        const db = await getClientDatabaseConnection(clientId);
        const ActivityLog = await db.model('activityLog', activityLogSchema);

        //added models for populating data
        const businessUnit = await db.model("businessUnit", clinetBusinessUnitSchema);
        const branch = await db.model("branch", clinetBranchSchema);
        const user = await db.model("clientUsers", clinetUserSchema);
        const patient = db.model('patient', clinetPatientSchema);

        if (activityId) {
            const specificActivity = await ActivityLog.findOne({ _id: activityId, deletedAt: null })
                .populate("buId", "_id name")
                .populate("branchId", "_id name")
                .populate("patientId", "_id firstName lastName")
                .populate("createdBy", "_id firstName lastName")
                .populate("updatedBy", "_id firstName lastName")
                .populate("deletedBy", "_id firstName lastName")
                .lean();

            if (!specificActivity) {
                return { status: false, message: "Activity log not found" };
            }

            return {
                status: true,
                message: "The Activity log retrieved successfully.",
                data: {
                    activityLogs: specificActivity,
                    metadata: {
                        page: 1,
                        perPage: 1,
                        totalCount: 1,
                        totalPages: 1
                    },
                },
            };
        };


        let searchQuery = {};
        if (searchKey) {
            if (searchKey.trim()) {
                const words = searchKey.trim().split(/\s+/)
                    .map(word =>
                        word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim()
                    );
                //const escapedSearchKey = searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                searchQuery = {
                    $or: words.flatMap(word => [
                        { module: { $regex: word, $options: "i" } },
                        { activity: { $regex: word, $options: "i" } },
                        { description: { $regex: word, $options: "i" } },
                        { "data.displayId": { $regex: word, $options: "i" } },
                        { "data.firstName": { $regex: word, $options: "i" } },
                        { "data.lastName": { $regex: word, $options: "i" } },
                        { "data.email": { $regex: word, $options: "i" } },
                        { "data.phone": { $regex: word, $options: "i" } },
                        { "data.gender": { $regex: word, $options: "i" } },
                    ]),
                };
            }
        }


        const filterQuery = {
            deletedAt: null,
            ...searchQuery,
        };

        if (buId) filterQuery.buId = buId;
        if (branchId) filterQuery.branchId = branchId;
        if (patientId) filterQuery.patientId = patientId;
        if (userId) filterQuery.userId = userId;
        if (createdUser) filterQuery.createdBy = createdUser;
        if (updatedUser) filterQuery.updatedBy = updatedUser;
        //if (deletedUser) filterQuery.deletedBy = deletedUser;

        if (fromDate || toDate) {
            filterQuery.createdAt = {};
            if (fromDate) filterQuery.createdAt.$gte = new Date(fromDate);
            if (toDate) filterQuery.createdAt.$lte = new Date(toDate);
        }



        //apply date filters
        // let dateSearchKey = {};
        // if (fromDate || toDate) {
        //     dateSearchKey = { createdAt: {} };
        //     if (fromDate) dateSearchKey.createdAt.$gte = new Date(fromDate);
        //     if (toDate) dateSearchKey.createdAt.$lte = new Date(toDate);
        // };

        // {
        //     ...searchQuery,
        //     ...businessSearchKey,
        //     //...statusSearchKey,
        //     ...branchIdSearchKey,
        //     ...dateSearchKey,
        //     ...createdUserSearchKey,
        //     ...updatedUserSearchKey,
        //     ...deletedUserSearchKey,
        //     deletedAt: null,
        // }


        if (!page || !perPage) {
            const allActivityLogs = await ActivityLog.find(filterQuery)
                .populate("buId", "_id name")
                .populate("branchId", "_id name")
                .populate("patientId", "_id firstName lastName")
                .populate("createdBy", "_id firstName lastName")
                .populate("updatedBy", "_id firstName lastName")
                .populate("deletedBy", "_id firstName lastName")
                .lean();

            return {
                status: true,
                message: "The Activity log retrieved successfully.",
                data: {
                    activityLogs: allActivityLogs,
                    metadata: {
                        page: 1,
                        perPage: allActivityLogs?.length,
                        totalCount: allActivityLogs?.length,
                        totalPages: 1
                    },
                },
            };
        };


        let query = ActivityLog.find(filterQuery)
            .populate("buId", "_id name")
            .populate("branchId", "_id name")
            .populate("patientId", "_id firstName lastName")
            .populate("createdBy", "_id firstName lastName")
            .populate("updatedBy", "_id firstName lastName")
            .populate("deletedBy", "_id firstName lastName")
            .lean();

        //apply pagination only if page & perPage are provided
        page = Number(page) || 1;
        perPage = Number(perPage) || 10;

        const skip = (page - 1) * perPage;

        // Fetch data
        const activityLogs = await query.skip(skip).limit(perPage);


        // Get total count properly
        const totalCount = await ActivityLog.countDocuments(filterQuery);

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / perPage);


        //const { createdByFirstNames, updatedByFirstNames } = fnToExtractFirstNameOfCreatedAndEditedBy(chairs);

        return {
            status: true,
            message: totalCount < 1 ? "No Activity Logs found" : "Activity Logs details retrieved successfully.",
            data: {
                activityLogs: activityLogs,
                metadata: {
                    page,
                    perPage,
                    totalCount,
                    totalPages,
                    //createdBy: createdByFirstNames,
                    //editedBy: updatedByFirstNames
                },
            },
        };

    } catch (error) {
        console.log("error", error?.message)
        return { status: false, message: error?.message }
    }
}

module.exports = getActivitylogFn;