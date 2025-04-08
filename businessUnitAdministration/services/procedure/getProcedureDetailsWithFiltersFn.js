const clinetBranchSchema = require("../../../client/model/branch");
const clinetBusinessUnitSchema = require("../../../client/model/businessUnit");
const departmentSchema = require("../../../client/model/department");
const procedureSchema = require("../../../client/model/procedure");
const serviceSchema = require("../../../client/model/service");
const clinetUserSchema = require("../../../client/model/user");
const { getClientDatabaseConnection } = require("../../../db/connection");
const { formatProcedure } = require("../../../utils/helperFunctions");

const getProcedureDetailsWithFiltersFn = async ({ page = null, perPage = null, searchKey, procedureId, deptId, serviceId, buId, branchId, createdUser, updatedUser, deletedUser, fromDate, toDate, clientId }) => {
    try {
        const db = await getClientDatabaseConnection(clientId);
        const Procedure = await db.model('procedure', procedureSchema);
        //, clinetBusinessUnitSchema, clinetBranchSchema, clinetUserSchema

        //these are user for populating the data
        const businessUnit = await db.model("businessUnit", clinetBusinessUnitSchema);
        const branch = await db.model("branch", clinetBranchSchema);
        const user = await db.model("clientUsers", clinetUserSchema);
        const department = await db.model("department", departmentSchema);
        const service = await db.model('services', serviceSchema);

        if (procedureId) {
            const specificProcedure = await Procedure.findOne({ _id: procedureId, deletedAt: null })
                .populate("buId", "_id name")
                .populate("branchId", "_id name")
                .populate("services", "_id serviceName")
                .populate("deptId", "_id deptName")
                .populate("createdBy", "_id firstName lastName")
                .populate("updatedBy", "_id firstName lastName")
                .populate("deletedBy", "_id firstName lastName")
                .lean();

            if (!specificProcedure) {
                return { status: false, message: "Procedure not found" };
            }

            const formattedProcedure = formatProcedure(specificProcedure);

            return {
                status: true,
                message: "The Procedure retrieved successfully.",
                data: {
                    procedures: formattedProcedure,
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
                        { procedureName: { $regex: word, $options: "i" } },
                        { displayId: { $regex: word, $options: "i" } },
                    ]),
                };
            };
        };

        // Apply filters only if parameters exist
        const businessSearchKey = buId ? { buId: buId } : {};
        const branchIdSearchKey = branchId ? { branchId } : {};
        const departmentSearchkey = deptId ? { deptId } : {};
        const serviceSearchKey = serviceId ? { services: serviceId } : {};
        const createdUserSearchKey = createdUser ? { createdBy: createdUser } : {};
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
            const allProcedure = await Procedure.find({
                ...searchQuery,
                ...businessSearchKey,
                ...branchIdSearchKey,
                ...departmentSearchkey,
                ...serviceSearchKey,
                ...createdUserSearchKey,
                ...updatedUserSearchKey,
                ...deletedUserSearchKey,
                deletedAt: null,
            })
                .populate("buId", "_id name")
                .populate("branchId", "_id name")
                .populate("services", "_id serviceName")
                .populate("deptId", "_id deptName")
                .populate("createdBy", "_id firstName lastName")
                .populate("updatedBy", "_id firstName lastName")
                .populate("deletedBy", "_id firstName lastName")
                .lean();

            const formattedProcedure = allProcedure.map((procedure) => formatProcedure(procedure));

            return {
                status: true,
                message: "All Procedures retrieved successfully.",
                data: {
                    procedures: formattedProcedure,
                    metadata: {
                        page: 1,
                        perPage: allProcedure?.length,
                        totalCount: allProcedure?.length,
                        totalPages: 1
                    },
                },
            };
        };


        // Query the database
        let query = Procedure.find({
            ...searchQuery,
            ...businessSearchKey,
            ...branchIdSearchKey,
            ...departmentSearchkey,
            ...serviceSearchKey,
            ...createdUserSearchKey,
            ...updatedUserSearchKey,
            ...deletedUserSearchKey,
            deletedAt: null,
        })
            .populate("buId", "_id name")
            .populate("branchId", "_id name")
            .populate("services", "_id serviceName")
            .populate("deptId", "_id deptName")
            .populate("createdBy", "_id firstName lastName")
            .populate("updatedBy", "_id firstName lastName")
            .populate("deletedBy", "_id firstName lastName")
            .lean();


        // Apply pagination only if page & perPage are provided
        page = Number(page) || 1;
        perPage = Number(perPage) || 10;

        const skip = (page - 1) * perPage;

        // Fetch data
        const procedures = await query.skip(skip).limit(perPage);


        const formattedProcedures = procedures.map((procedures) => formatProcedure(procedures));

        // Get total count properly
        const totalCount = await Procedure.countDocuments({
            ...searchQuery,
            ...businessSearchKey,
            ...branchIdSearchKey,
            ...departmentSearchkey,
            ...serviceSearchKey,
            ...createdUserSearchKey,
            ...updatedUserSearchKey,
            ...deletedUserSearchKey,
            deletedAt: null,
        });

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / perPage);

        return {
            status: true,
            message: totalCount < 1 ? "No Procedures found" : "Procedure details retrieved successfully.",
            data: {
                procedures: formattedProcedures,
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
        console.log(error?.message)
        return { status: false, message: error?.message }
    }
}

module.exports = getProcedureDetailsWithFiltersFn;