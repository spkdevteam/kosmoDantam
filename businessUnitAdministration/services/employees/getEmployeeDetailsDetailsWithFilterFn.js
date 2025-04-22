const clinetBranchSchema = require("../../../client/model/branch");
const clinetBusinessUnitSchema = require("../../../client/model/businessUnit");
const clientRoleSchema = require("../../../client/model/role");
const clinetUserSchema = require("../../../client/model/user");
const { getClientDatabaseConnection } = require("../../../db/connection");
const fnToExtractFirstNameOfCreatedAndEditedBy = require("../../../utils/fnToExtractFIrstnameOfCreatedAndEditedBy");
const { formatEmployee } = require("../../../utils/helperFunctions");

const getEmployeeDetailsDetailsWithFilterFn = async ({ includeAdmin = 'false', page = 1, perPage = 10, searchKey = "", employeeId, fromDate, toDate, role, businessUnit, branch, createdUser, updatedUser, deletedUser, clientId }) => {
    try {
        const booleanIncludeAdmin = includeAdmin === 'true' ? true : false;

        const db = await getClientDatabaseConnection(clientId);
        const Employee = await db.model("clientUsers", clinetUserSchema);
        //, clinetBusinessUnitSchema, clinetBranchSchema, clinetUserSchema

        //these are user for populating the data
        const BusinessUnit = await db.model("businessUnit", clinetBusinessUnitSchema);
        const Branch = await db.model("branch", clinetBranchSchema);
        const clientRoles = await db.model("clientRoles", clientRoleSchema);
        const user = await db.model("clientUsers", clinetUserSchema);

        if (employeeId) {
            const specificEmployee = await Employee.findOne({ _id: employeeId, deletedAt: null })
                .populate("businessUnit", "_id name")
                .populate("branch", "_id name")
                .populate("role", "_id name")
                .populate("createdBy", "_id firstName lastName")
                .populate("updatedBy", "_id firstName lastName")
                .populate("deletedBy", "_id firstName lastName")
                .lean();

            if (!specificEmployee) {
                return { status: false, message: "Employee not found" };
            }

            const formattedEmployee = formatEmployee(specificEmployee);

            return {
                status: true,
                message: "The Employee retrieved successfully.",
                data: {
                    employees: formattedEmployee,
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
        // const businessSearchKey = businessUnit ? { businessUnit } : {};
        // // const branchIdSearchKey = branch ? { branch } : {};
        // const branchIdSearchKey = branch
        //     ? { branch }
        //     : includeAdmin
        //         ? {}
        //         : { branch: { $ne: null } };
        // const createdUserSearchKey = createdUser ? { createdBy: createdUser } : {};
        // const roleSearchKey = role ? { roleId: role } : {};
        // const updatedUserSearchKey = updatedUser ? { updatedBy: updatedUser } : {};
        // const deletedUserSearchKey = deletedUser ? { deletedBy: deletedUser } : {};



        const filterQuery = {
            deletedAt: null,
            ...searchQuery,
        }


        if (businessUnit) filterQuery.businessUnit = businessUnit;
        if (!booleanIncludeAdmin) {
            filterQuery.branch = !branch ? { $ne: null } : branch;
        }
        else {
            if(branch){
                filterQuery.branch = { $in: [branch, null] };
            }
        }

        console.log("filterQuery.branch==>>",filterQuery.branch)
        //if (status) filterQuery.status = status;
        //   if(role) filterQuery.role = role;
        // if (role) filterQuery.roleId = { $in: role };
        // if (role) {
        //     let roleArray = [];

        //     if (Array.isArray(role)) {
        //         roleArray = role;
        //     } else {
        //         try {
        //             roleArray = JSON.parse(role);
        //         } catch (err) {
        //             roleArray = [role];
        //         }
        //     }
        //     if (roleArray.length > 0) {
        //         filterQuery.roleId = { $in: roleArray };
        //     }
        // }
        // if (role) {
        //     let roleArray = [];

        //     if (Array.isArray(role)) {
        //         roleArray = role;
        //     } else if (typeof role === 'string') {
        //         try {
        //             roleArray = JSON.parse(role);
        //         } catch (err) {
        //             // If it's a comma-separated string like "15,4", split and parse
        //             roleArray = role.split(',').map(r => Number(r.trim()));
        //         }
        //     }

        //     // Optional: Filter out NaN values (invalid numbers)
        //     roleArray = roleArray.filter(r => !isNaN(r));

        //     if (roleArray.length > 0) {
        //         filterQuery.roleId = { $in: roleArray };
        //     }
        // }
        if (role) {
            let roleArray = [];

            if (Array.isArray(role)) {
                roleArray = role;
            } else if (typeof role === 'number') {
                roleArray = [role];
            } else if (typeof role === 'string') {
                try {
                    // Try to parse JSON array string
                    const parsed = JSON.parse(role);
                    roleArray = Array.isArray(parsed) ? parsed : [parsed];
                } catch (err) {
                    // If not JSON, fallback to comma-separated string
                    roleArray = role.split(',').map(r => Number(r.trim()));
                }
            }

            // Optional: Filter out NaN
            roleArray = roleArray.filter(r => !isNaN(r));

            if (roleArray.length > 0) {
                filterQuery.roleId = { $in: roleArray };
            }
        }
        if (createdUser) filterQuery.createdBy = createdUser;
        if (updatedUser) filterQuery.updatedBy = updatedUser;
        if (deletedUser) filterQuery.deletedBy = deletedUser;

        if (fromDate || toDate) {
            filterQuery.createdAt = {};
            if (fromDate) filterQuery.createdAt.$gte = new Date(fromDate);
            if (toDate) filterQuery.createdAt.$lte = new Date(toDate);
        }



        // Apply date filters
        let dateSearchKey = {};
        if (fromDate || toDate) {
            dateSearchKey = { createdAt: {} };
            if (fromDate) dateSearchKey.createdAt.$gte = new Date(fromDate);
            if (toDate) dateSearchKey.createdAt.$lte = new Date(toDate);
        }


        if (!page || !perPage) {
            const allEmployees = await Employee.find(filterQuery, {
                roleId: { $ne: 17 },
                // ...searchQuery,
                // ...businessSearchKey,
                // ...branchIdSearchKey,
                // ...dateSearchKey,
                // ...roleSearchKey,
                // ...createdUserSearchKey,
                // ...updatedUserSearchKey,
                // ...deletedUserSearchKey,
                //deletedAt: null,
            }).sort({ createdAt: -1 })
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

        console.log("filterQuery==>>", filterQuery)
        // Query the database
        let query = Employee.find({
            roleId: { $ne: 17 },
            ...filterQuery,
            // ...searchQuery,
            // ...businessSearchKey,
            // ...branchIdSearchKey,
            // ...dateSearchKey,
            // ...roleSearchKey,
            // ...createdUserSearchKey,
            // ...updatedUserSearchKey,
            // ...deletedUserSearchKey,
            // deletedAt: null,
        }).sort({ createdAt: -1 })
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
        // console.log("employeesemployees=>>>", employees);


        const formattedEmployees = employees.map((employee) => formatEmployee(employee));

        // Get total count properly
        const totalCount = await Employee.countDocuments({
            roleId: { $ne: 17 },
            ...filterQuery,
            // ...searchQuery,
            // ...businessSearchKey,
            // ...branchIdSearchKey,
            // ...dateSearchKey,
            // ...roleSearchKey,
            // ...createdUserSearchKey,
            // ...updatedUserSearchKey,
            // ...deletedUserSearchKey,
            // deletedAt: null,
        });

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / perPage);

        const { createdByFirstNames, updatedByFirstNames } = fnToExtractFirstNameOfCreatedAndEditedBy(employees);
        

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
                    createdBy: createdByFirstNames,
                    editedBy: updatedByFirstNames
                },
            },
        };
        //return { status: true, data: result };
    } catch (error) {
        return { status: false, message: error.message };
    }
}

module.exports = getEmployeeDetailsDetailsWithFilterFn;