const sanitizeBody = require("../../../utils/sanitizeBody");
const { clientIdValidation } = require("../../../utils/validation");
const getRolesAndPermissionsWithSearchKeyFn = require("../../services/rolesAndPermission/getRolesAndPermissionsWithSearchKeyFn");

const getRolesAndPermissionsWithSearchKey = async (req, res, next) => {
    try {
        const { page = 1, perPage = 10, searchKey, clientId } = await sanitizeBody(req.query);
        console.log("searchKey-->",searchKey);

        if (page && (isNaN(page) || page < 1)) return { status: false, message: "Invalid page number" };
        if (perPage && (isNaN(perPage) || perPage < 1)) return { status: false, message: "Invalid per page number" };

        const validation = [
            clientIdValidation({ clientId })
        ];

        const errors = validation.filter((e) => !e.status);
        if (errors.length > 0) return res.status(400).json({ status: false, message: errors.map((e) => e.message).join(", ") });

        // if (fromDate && !isValidDate({ value: fromDate }).status) return { status: false, message: "Invalid from date" };
        // if (toDate && !isValidDate({ value: toDate }).status) return { status: false, message: "Invalid to date" };

        const result = await getRolesAndPermissionsWithSearchKeyFn({ page, perPage, searchKey, clientId });
        return res.status(200).json({ status: result?.status, message: result?.message, data: result?.data });
    } catch (error) {
        next(error);
    }
}

module.exports = getRolesAndPermissionsWithSearchKey;