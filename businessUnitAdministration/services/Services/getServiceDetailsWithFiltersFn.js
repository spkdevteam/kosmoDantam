const clinetBranchSchema = require("../../../client/model/branch");
const clinetBusinessUnitSchema = require("../../../client/model/businessUnit");
const departmentSchema = require("../../../client/model/department");
const serviceSchema = require("../../../client/model/service");
const clinetUserSchema = require("../../../client/model/user");
const { getClientDatabaseConnection } = require("../../../db/connection");
const { formatService } = require("../../../utils/helperFunctions");

const getServiceDetailsWithFiltersFn = async ({ page = null, perPage = null, searchKey, serviceId, fromDate, toDate, departmentId, branchId, buId, createdUser, updatedUser, deletedUser, clientId }) => {
    try {
        const db = await getClientDatabaseConnection(clientId);
        const Service = await db.model("service", serviceSchema);
        //, clinetBusinessUnitSchema, clinetBranchSchema, clinetUserSchema

        //these are user for populating the data
        const businessUnit = await db.model("businessUnit", clinetBusinessUnitSchema);
        const department = await db.model("department", departmentSchema);
        const branch = await db.model("branch", clinetBranchSchema);
        const user = await db.model("clientUsers", clinetUserSchema);

        if (serviceId) {
            const specificService = await Service.findOne({ _id: serviceId, deletedAt: null })
                .populate("buId", "_id name")
                .populate("branchId", "_id name")
                .populate("departmentId", "_id deptName")
                .populate("createdBy", "_id firstName lastName")
                .populate("updatedBy", "_id firstName lastName")
                .populate("deletedBy", "_id firstName lastName")
                .lean();

            if (!specificService) {
                return { status: false, message: "Service not found" };
            }

            const formattedService = formatService(specificService);

            return {
                status: true,
                message: "The Service retrieved successfully.",
                data: {
                    service: formattedService,
                    metadata: {
                        page: 1,
                        perPage: 1,
                        totalCount: 1,
                        totalPages: 1
                    },
                },
            };
        }

        // if (!page || !perPage) {
        //     const allService = await Service.find({ deletedAt: null })
        //         .populate("buId", "_id name")
        //         .populate("branchId", "_id name")
        //         .populate("departmentId", "_id deptName")
        //         .populate("createdBy", "_id firstName lastName")
        //         .populate("updatedBy", "_id firstName lastName")
        //         .populate("deletedBy", "_id firstName lastName")
        //         .lean();

        //     const formattedServices = allService.map((service) => formatService(service));

        //     return {
        //         status: true,
        //         message: "All Services retrieved successfully.",
        //         data: {
        //             services: formattedServices,
        //             pagination: {
        //                 page: 1,
        //                 perPage: allService?.length,
        //                 totalCount: allService?.length,
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
                        word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim()
                    );
                //const escapedSearchKey = searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                searchQuery = {
                    $or: words.flatMap(word => {
                        // const num = Number(word);
                        // const isNumber = Number.isFinite(num) && word.trim() !== "";

                        // console.log("number:", num, "typeof num:", typeof num, "isNumber:", isNumber);

                        return [
                            { displayId: { $regex: word, $options: "i" } },
                            { serviceName: { $regex: word, $options: "i" } },
                            //...(isNumber ? [{ price: { $gte: num - 5, $lte: num + 5 } }] : []),
                        ];
                    }),
                };
            }
        };

        //apply filters only if parameters exist
        const businessSearchKey = buId ? { buId: buId } : {};
        const branchIdSearchKey = branchId ? { branchId } : {};
        const departmentIdSearchKey = departmentId ? { departmentId } : {};
        const createdUserSearchKey = createdUser ? { createdBy: createdUser } : {};
        const updatedUserSearchKey = updatedUser ? { updatedBy: updatedUser } : {};
        const deletedUserSearchKey = deletedUser ? { deletedBy: deletedUser } : {};


        //apply date filters
        let dateSearchKey = {};
        if (fromDate || toDate) {
            dateSearchKey = { createdAt: {} };
            if (fromDate) dateSearchKey.createdAt.$gte = new Date(fromDate);
            if (toDate) dateSearchKey.createdAt.$lte = new Date(toDate);
        };



        if (!page || !perPage) {
            const allService = await Service.find({
                ...searchQuery,
                ...businessSearchKey,
                ...branchIdSearchKey,
                ...departmentIdSearchKey,
                ...dateSearchKey,
                ...createdUserSearchKey,
                ...updatedUserSearchKey,
                ...deletedUserSearchKey,
                deletedAt: null,
            })
                .populate("buId", "_id name")
                .populate("branchId", "_id name")
                .populate("departmentId", "_id deptName")
                .populate("createdBy", "_id firstName lastName")
                .populate("updatedBy", "_id firstName lastName")
                .populate("deletedBy", "_id firstName lastName")
                .lean();

            const formattedServices = allService.map((service) => formatService(service));

            return {
                status: true,
                message: "All Services retrieved successfully.",
                data: {
                    services: formattedServices,
                    pagination: {
                        page: 1,
                        perPage: allService?.length,
                        totalCount: allService?.length,
                        totalPages: 1
                    },
                },
            };
        };


        //query the database
        let query = Service.find({
            ...searchQuery,
            ...businessSearchKey,
            ...branchIdSearchKey,
            ...departmentIdSearchKey,
            ...dateSearchKey,
            ...createdUserSearchKey,
            ...updatedUserSearchKey,
            ...deletedUserSearchKey,
            deletedAt: null,
        })
            .populate("buId", "_id name")
            .populate("branchId", "_id name")
            .populate("departmentId", "_id deptName")
            .populate("createdBy", "_id firstName lastName")
            .populate("deletedBy", "_id firstName lastName")
            .populate("updatedBy", "_id firstName lastName")
            .lean();

        //apply pagination only if page & perPage are provided
        page = Number(page) || 1;
        perPage = Number(perPage) || 10;

        const skip = (page - 1) * perPage;

        //fetch data
        const services = await query.skip(skip).limit(perPage);


        const formattedServices = services.map((service) => formatService(service));

        //get total count properly
        const totalCount = await Service.countDocuments({
            ...searchQuery,
            ...businessSearchKey,
            ...branchIdSearchKey,
            ...departmentIdSearchKey,
            ...dateSearchKey,
            ...createdUserSearchKey,
            ...updatedUserSearchKey,
            ...deletedUserSearchKey,
            deletedAt: null,
        });

        //calculate total pages
        const totalPages = Math.ceil(totalCount / perPage);

        return {
            status: true,
            message: totalCount < 1 ? "No Services found" : "Service details retrieved successfully.",
            data: {
                services: formattedServices,
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
        return { status: false, message: error.message };
    }
}

module.exports = getServiceDetailsWithFiltersFn;