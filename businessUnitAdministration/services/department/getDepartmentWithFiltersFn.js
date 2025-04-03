const clinetBranchSchema = require("../../../client/model/branch");
const clinetBusinessUnitSchema = require("../../../client/model/businessUnit");
const departmentSchema = require("../../../client/model/department");
const clinetUserSchema = require("../../../client/model/user");
const { getClientDatabaseConnection } = require("../../../db/connection");
const { formatDepartment } = require("../../../utils/helperFunctions");

const getDepartmentWithFiltersFn = async ({ page = null, perPage = null, searchKey, fromDate, toDate, buId, branchId, createdUser, updatedUser, deletedUser, clientId }) => {
    try {
        const db = await getClientDatabaseConnection(clientId);
        const Department = await db.model("department", departmentSchema);
        //, clinetBusinessUnitSchema, clinetBranchSchema, clinetUserSchema

        //these are user for populating the data
        const businessUnit = db.model("businessUnit", clinetBusinessUnitSchema);
        const branch = db.model("branch", clinetBranchSchema);
        const user = db.model("clientUsers", clinetUserSchema);

        if (!page || !perPage) {
            const allDepartments = await Department.find({ deletedAt: null })
                .populate("buId", "_id name")
                .populate("branchId", "_id name")
                .populate("createdBy", "_id firstName lastName")
                .populate("updatedBy", "_id firstName lastName")
                .populate("deletedBy", "_id firstName lastName")
                .lean();

            const formattedDepartments = allDepartments.map((department) => formatDepartment(department));

            return {
                status: true,
                message: "All Departments retrieved successfully.",
                data: {
                    departments: formattedDepartments,
                    pagination: {
                        page: 1,
                        perPage: allDepartments?.length,
                        totalCount: allDepartments?.length,
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
                        word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim()
                    );
                //const escapedSearchKey = searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                searchQuery = {
                    $or: words.flatMap(word => [
                        { deptName: { $regex: word, $options: "i" } },
                        { displayId: { $regex: word, $options: "i" } },
                        { description: { $regex: word, $options: "i" } },
                    ]),
                };
            }
        }

        // Apply filters only if parameters exist
        const businessSearchKey = buId ? { buId: buId } : {};
        const branchIdSearchKey = branchId ? { branchId } : {};
        const createdUserSearchKey = createdUser ? { createdBy: createdUser } : {};
        const updatedUserSearchKey = updatedUser ? { updatedBy: updatedUser } : {};
        const deletedUserSearchKey  = deletedUser ? { deletedBy: deletedUser } : {};


        // Apply date filters
        let dateSearchKey = {};
        if (fromDate || toDate) {
            dateSearchKey = { createdAt: {} };
            if (fromDate) dateSearchKey.createdAt.$gte = new Date(fromDate);
            if (toDate) dateSearchKey.createdAt.$lte = new Date(toDate);
        }


        // Query the database
        let query = Department.find({
            ...searchQuery,
            ...businessSearchKey,
            ...branchIdSearchKey,
            ...dateSearchKey,
            ...createdUserSearchKey,
            ...updatedUserSearchKey,
            ...deletedUserSearchKey,
            deletedAt: null,
        })
            .populate("buId", "_id name")
            .populate("branchId", "_id name")
            .populate("createdBy", "_id firstName lastName")
            .populate("deletedBy", "_id firstName lastName")
            .populate("updatedBy", "_id firstName lastName")
            .lean();

        // Apply pagination only if page & perPage are provided
        page = Number(page) || 1;
        perPage = Number(perPage) || 10;

        const skip = (page - 1) * perPage;

        // Fetch data
        const departments = await query.skip(skip).limit(perPage);


        const formattedDepartments = departments.map((department) => formatDepartment(department));

        // Get total count properly
        const totalCount = await Department.countDocuments({
            ...searchQuery,
            ...businessSearchKey,
            ...branchIdSearchKey,
            ...dateSearchKey,
            ...createdUserSearchKey,
            ...updatedUserSearchKey,
            ...deletedUserSearchKey,
            deletedAt: null,
        });

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / perPage);

        return {
            status: true,
            message: totalCount < 1 ? "No departments found" : "Department details retrieved successfully.",
            data: {
                departments: formattedDepartments,
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

module.exports = getDepartmentWithFiltersFn;