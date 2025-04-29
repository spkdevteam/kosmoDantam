const clientRoleSchema = require("../../../client/model/role");
const clinetUserSchema = require("../../../client/model/user");
const { getClientDatabaseConnection } = require("../../../db/connection");

const getRolesAndPermissionsWithSearchKeyFn = async ({ page = 1, perPage = 10, searchKey, clientId }) => {
    try {
        console.log("searchKey-->", searchKey);
        const db = await getClientDatabaseConnection(clientId);
        const RolesAndPermission = await db.model("clientRoles", clientRoleSchema);
        const user = await db.model("clientUsers", clinetUserSchema);

        let searchQuery = {};
        if (searchKey) {
            if (searchKey.trim()) {
                const words = searchKey.trim().split(/\s+/)
                    .map(word =>
                        word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim()
                    );

                searchQuery = {
                    $or: words.flatMap(word => [
                        { name: { $regex: word, $options: "i" } },
                    ]),
                };
            };
        };


        if (!page || !perPage) {
            const allRolesAndPermissions = await RolesAndPermission.find({...searchQuery, deletedAt: null })
            .populate("createdBy", "_id firstName lastName")
            .populate("updatedBy", "_id firstName lastName")
            .lean();

            return {
                status: true,
                message: "All roles and permissions retrieved successfully.",
                data: {
                    rolesAndPermissions: allRolesAndPermissions,
                    metadata: {
                        page: 1,
                        perPage: allRolesAndPermissions?.length,
                        totalCount: allRolesAndPermissions?.length,
                        totalPages: 1
                    },
                },
            };
        };


        let query = RolesAndPermission.find({...searchQuery, deletedAt: null })
        .populate("createdBy", "_id firstName lastName")
        .populate("updatedBy", "_id firstName lastName")
        .lean();

        //apply pagination only if page & perPage are provided
        page = Number(page) || 1;
        perPage = Number(perPage) || 10;

        const skip = (page - 1) * perPage;

        // Fetch data
        const rolesAndPermissions = await query.skip(skip).limit(perPage);


        // Get total count properly
        const totalCount = await RolesAndPermission.countDocuments({ ...searchQuery, deletedAt: null });

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / perPage);

        return {
            status: true,
            message: totalCount < 1 ? "No Roles and Permissions found" : "Roles and Permissions details retrieved successfully.",
            data: {
                rolesAndPermissions: rolesAndPermissions,
                metadata: {
                    page,
                    perPage,
                    totalCount,
                    totalPages,
                },
            },
        };
    } catch (error) {
        return { status: false, message: error.message };
    }
}


module.exports = getRolesAndPermissionsWithSearchKeyFn;