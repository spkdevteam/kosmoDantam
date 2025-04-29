const sanitizeBody = require("../../../utils/sanitizeBody");
const { clientIdValidation, isValidDate, mongoIdValidation } = require("../../../utils/validation");
const getDepartmentWithFiltersFn = require("../../services/department/getDepartmentWithFiltersFn");

const getDepartmentWithFilters = async (req, res, next) => {
    try {
        const { page = null, perPage = null, searchKey, departmentId, fromDate, toDate, buId, branchId, createdUser, updatedUser, deletedUser, clientId, status } = await sanitizeBody(req.query);
        const validation = [
            clientIdValidation({ clientId })
        ];
        if (buId) {
            validation.push(mongoIdValidation({ _id: buId, name: "businessUnitId" }));
        }
        if (branchId) {
            validation.push(mongoIdValidation({ _id: branchId, name: "branchId" }));
        }
        if (departmentId) {
            validation.push(mongoIdValidation({ _id: departmentId, name: "departmentId" }));
        }
        if (createdUser) {
            validation.push(mongoIdValidation({ _id: createdUser, name: "createdUser" }));
        }
        if (updatedUser) {
            validation.push(mongoIdValidation({ _id: updatedUser, name: "updatedUser" }));
        }
        if (deletedUser) {
            validation.push(mongoIdValidation({ _id: deletedUser, name: "deletedUser" }));
        }

        const errors = validation.filter((e) => !e.status);
        if (errors.length > 0) return res.status(400).json({ status: false, message: errors.map((e) => e.message).join(", ") });

        if (page && (isNaN(page) || page < 1)) return { status: false, message: "Invalid page number" };
        if (perPage && (isNaN(perPage) || perPage < 1)) return { status: false, message: "Invalid per page number" };

        if (fromDate && !isValidDate({ value: fromDate }).status) return { status: false, message: "Invalid from date" };
        if (toDate && !isValidDate({ value: toDate }).status) return { status: false, message: "Invalid to date" };

        const result = await getDepartmentWithFiltersFn({ page, perPage, searchKey, departmentId, fromDate, toDate, buId, branchId, createdUser, updatedUser, deletedUser, clientId, status });
        return res.status(200).json({ status: result?.status, message: result?.message, data: result?.data });
    } catch (error) {
        next(error);
    }
}

module.exports = getDepartmentWithFilters;