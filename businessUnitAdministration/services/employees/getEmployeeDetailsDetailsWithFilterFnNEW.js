const clinetBranchSchema = require("../../../client/model/branch");
const clinetBusinessUnitSchema = require("../../../client/model/businessUnit");
const clientRoleSchema = require("../../../client/model/role");
const clinetUserSchema = require("../../../client/model/user");
const userModel = require("../../../model/user")
const { getClientDatabaseConnection } = require("../../../db/connection");
const { formatEmployee } = require("../../../utils/helperFunctions");

const getEmployeeDetailsDetailsWithFilterFnNEW = async ({ page = 1, perPage = 10, searchKey = "", fromDate, toDate, role, businessUnit, branch, createdUser, updatedUser, deletedUser, clientId }) => {
    try {

        console.log("rolerolerole", role);
        const db = await getClientDatabaseConnection(clientId);
        // const Employee = await db.model("clientUsers", clinetUserSchema);
        
        //, clinetBusinessUnitSchema, clinetBranchSchema, clinetUserSchema

        //these are user for populating the data
        const BusinessUnit = await db.model("businessUnit", clinetBusinessUnitSchema);
        const Branch = await db.model("branch", clinetBranchSchema);
        const clientRoles = await db.model("clientRoles", clientRoleSchema);
        const user = await db.model("clientUsers", clinetUserSchema);

        // if (!page || !perPage) {
        //     const allEmployees = await Employee.find({ deletedAt: null })
        //         .populate("businessUnit", "_id name")
        //         .populate("branch", "_id name")
        //         .populate("role", "_id name")
        //         .populate("createdBy", "_id firstName lastName")
        //         .populate("updatedBy", "_id firstName lastName")
        //         .populate("deletedBy", "_id firstName lastName")
        //         .lean();

        //     const formattedEmployees = allEmployees.map((employee) => formatEmployee(employee));

        //     return {
        //         status: true,
        //         message: "All Departments retrieved successfully.",
        //         data: {
        //             employees: formattedEmployees,
        //             metadata: {
        //                 page: 1,
        //                 perPage: allEmployees?.length,
        //                 totalCount: allEmployees?.length,
        //                 totalPages: 1
        //             },
        //         },
        //     };
        // };

        //.map((chair) => formatChair(chair))

        //const chairsWithBussinessUnitId = await Chair.find({ deletedAt: null, isActive: true, businessUnit: bussinessUnitId });
        //const chairsWithbranchId = chairsWithBussinessUnitId.includes({ branch: branchId });

        let searchQuery = {};
        if (searchKey) {
            if (searchKey.trim()) {
                const words = searchKey.trim().split(/\s+/)
                    .map(word =>
                        word.replace(/[*+?^${}()|[\]\\]/g, '\\$&').trim()
                    );
                //const escapedSearchKey = searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                searchQuery = {
                    $or: words.flatMap(word => [
                        { firstName: { $regex: word, $options: "i" } },
                        { lastName: { $regex: word, $options: "i" } },
                        { email: { $regex: word, $options: "i" } },
                        { phone: { $regex: word, $options: "i" } },
                        { gender: { $regex: word, $options: "i" } },
                        { bloodGroup: { $regex: word, $options: "i" } },
                        { panNumber: { $regex: word, $options: "i" } },
                        { adharNumber: { $regex: word, $options: "i" } },
                        { city: { $regex: word, $options: "i" } },
                        { state: { $regex: word, $options: "i" } },
                        { country: { $regex: word, $options: "i" } },
                        { ZipCode: { $regex: word, $options: "i" } },
                        { displayId: { $regex: word, $options: "i" } },
                        { description: { $regex: word, $options: "i" } },
                    ]),
                };
            }
        }

        // Apply filters only if parameters exist
        const businessSearchKey = businessUnit ? { businessUnit } : {};
        const branchIdSearchKey = branch ? { branch } : {};
        const createdUserSearchKey = createdUser ? { createdBy: createdUser } : {};
        const roleSearchKey = role ? { role: role } : {};
        const updatedUserSearchKey = updatedUser ? { updatedBy: updatedUser } : {};
        const deletedUserSearchKey = deletedUser ? { deletedBy: deletedUser } : {};


        // Apply date filters
        let dateSearchKey = {};
        if (fromDate || toDate) {
            dateSearchKey = { createdAt: {} };
            if (fromDate) dateSearchKey.createdAt.$gte = new Date(fromDate);
            if (toDate) dateSearchKey.createdAt.$lte = new Date(toDate);
        }


        if (!page || !perPage) {
            const allEmployees = await userModel.find({
                ...searchQuery,
                ...businessSearchKey,
                ...branchIdSearchKey,
                ...dateSearchKey,
                ...roleSearchKey,
                ...createdUserSearchKey,
                ...updatedUserSearchKey,
                ...deletedUserSearchKey,
                deletedAt: null,
            })
                .populate("businessUnit", "_id name")
                .populate("branch", "_id name")
                .populate("role", "_id name")
                .populate("createdBy", "_id firstName lastName")
                .populate("updatedBy", "_id firstName lastName")
                .populate("deletedBy", "_id firstName lastName")
                .lean();

            const formattedEmployees = allEmployees.map((employee) => formatEmployee(employee));

            return {
                status: true,
                message: "All Employee details retrieved successfully.",
                data: {
                    employees: formattedEmployees,
                    metadata: {
                        page: 1,
                        perPage: allEmployees?.length,
                        totalCount: allEmployees?.length,
                        totalPages: 1
                    },
                },
            };
        };


        // Query the database
        let query = userModel.find({
            ...searchQuery,
            ...businessSearchKey,
            ...branchIdSearchKey,
            ...dateSearchKey,
            ...roleSearchKey,
            ...createdUserSearchKey,
            ...updatedUserSearchKey,
            ...deletedUserSearchKey,
            deletedAt: null,
        })
            .populate("businessUnit", "_id name")
            .populate("branch", "_id name")
            .populate("role", "_id name")
            .populate("createdBy", "_id firstName lastName")
            .populate("updatedBy", "_id firstName lastName")
            .populate("deletedBy", "_id firstName lastName")
            .lean();

        // Apply pagination only if page & perPage are provided
        page = Number(page) || 1;
        perPage = Number(perPage) || 10;

        const skip = (page - 1) * perPage;

        // Fetch data
        const employees = await query.skip(skip).limit(perPage);


        const formattedEmployees = employees.map((employee) => formatEmployee(employee));

        // Get total count properly
        const totalCount = await userModel.countDocuments({
            ...searchQuery,
            ...businessSearchKey,
            ...branchIdSearchKey,
            ...dateSearchKey,
            ...roleSearchKey,
            ...createdUserSearchKey,
            ...updatedUserSearchKey,
            ...deletedUserSearchKey,
            deletedAt: null,
        });

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / perPage);

        return {
            status: true,
            message: totalCount < 1 ? "No employees found" : "Employee details retrieved successfully.",
            data: {
                employees: formattedEmployees,
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

module.exports = getEmployeeDetailsDetailsWithFilterFnNEW;