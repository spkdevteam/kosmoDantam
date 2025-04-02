const clinetBranchSchema = require("../../../client/model/branch");
const clinetBusinessUnitSchema = require("../../../client/model/businessUnit");
const clinetChairSchema = require("../../../client/model/chair");
const clinetUserSchema = require("../../../client/model/user");

const { getClientDatabaseConnection } = require("../../../db/connection");
const { formatChair } = require("../../../utils/helperFunctions");

const getChairDetailsWithFiltersFn = async ({ page = null, perPage = null, searchKey, businessUnitId, branchId, status, fromDate, toDate, clientId }) => {
    try {
        const db = await getClientDatabaseConnection(clientId);
        const Chair = db.model("chair", clinetChairSchema);
        //, clinetBusinessUnitSchema, clinetBranchSchema, clinetUserSchema

        //these are user for populating the data
        const bussinessUnit = db.model("businessUnit", clinetBusinessUnitSchema);
        const branch = db.model("branch", clinetBranchSchema);
        const user = db.model("clientUsers", clinetUserSchema);

        if (!page || !perPage) {
            const allChairs = await Chair.find({ deletedAt: null })
                .populate("businessUnit", "_id name")
                .populate("branch", "_id name")
                .populate("createdBy", "_id firstName lastName")
                .populate("updatedBy", "_id firstName lastName")
                .populate("deletedBy", "_id firstName lastName")
                .lean();

            const formattedChairs = allChairs.map((chair) => formatChair(chair));

            return {
                status: true,
                message: "All chairs retrieved successfully.",
                data: {
                    chairs: formattedChairs,
                    pagination: {
                        page: 1,
                        perPage: allChairs?.length,
                        totalCount: allChairs?.length,
                        totalPages: 1
                    },
                },
            };
        };

        //.map((chair) => formatChair(chair))

        //const chairsWithBussinessUnitId = await Chair.find({ deletedAt: null, isActive: true, businessUnit: bussinessUnitId });
        //const chairsWithbranchId = chairsWithBussinessUnitId.includes({ branch: branchId });

        let searchQuery = {};
        if (searchKey) {
            if (searchKey.trim()) {
                const words = searchKey.trim().split(/\s+/)
                    .map(word =>
                        word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                    );
                //const escapedSearchKey = searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                searchQuery = {
                    $or: words.flatMap(word => [
                        { chairNumber: { $regex: word.trim(), $options: "i" } },
                        { chairLocation: { $regex: word.trim(), $options: "i" } },
                        { status: { $regex: word.trim(), $options: "i" } },
                    ]),
                };
            }
        }

        // Apply filters only if parameters exist
        const businessSearchKey = businessUnitId ? { businessUnit: businessUnitId } : {};
        const branchIdSearchKey = branchId ? { branch: branchId } : {};
        const statusSearchKey = status ? { status } : {};


        // Apply date filters
        let dateSearchKey = {};
        if (fromDate || toDate) {
            dateSearchKey = { createdAt: {} };
            if (fromDate) dateSearchKey.createdAt.$gte = new Date(fromDate);
            if (toDate) dateSearchKey.createdAt.$lte = new Date(toDate);
        }


        // Query the database
        let query = Chair.find({
            ...searchQuery,
            ...businessSearchKey,
            ...statusSearchKey,
            ...branchIdSearchKey,
            ...dateSearchKey,
            deletedAt: null,
        })
            .populate("businessUnit", "_id name")
            .populate("branch", "_id name")
            .populate("createdBy", "_id firstName lastName")
            .populate("deletedBy", "_id firstName lastName")
            .populate("updatedBy", "_id firstName lastName")
            .lean();

        // Apply pagination only if page & perPage are provided
        page = Number(page) || 1;
        perPage = Number(perPage) || 10;

        const skip = (page - 1) * perPage;

        // Fetch data
        const chairs = await query.skip(skip).limit(perPage);


        const formattedChairs = chairs.map((chair) => formatChair(chair));

        // Get total count properly
        const totalCount = await Chair.countDocuments({
            ...searchQuery,
            ...businessSearchKey,
            ...branchIdSearchKey,
            ...dateSearchKey,
            deletedAt: null,
        });

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / perPage);

        return {
            status: true,
            message: "Chair details retrieved successfully.",
            data: {
                chairs: formattedChairs,
                pagination: {
                    page,
                    perPage,
                    totalCount,
                    totalPages,
                },
            },
        };
        //return { status: true, data: result };
    } catch (error) {
        console.log("error", error?.message)
        return { status: false, message: error?.message }
    }
}


module.exports = getChairDetailsWithFiltersFn;