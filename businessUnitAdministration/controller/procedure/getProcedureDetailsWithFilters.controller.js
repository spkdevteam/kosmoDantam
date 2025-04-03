const sanitizeBody = require("../../../utils/sanitizeBody");
const { clientIdValidation, mongoIdValidation, isValidDate } = require("../../../utils/validation");
const getProcedureDetailsWithFiltersFn = require("../../services/procedure/getProcedureDetailsWithFiltersFn");

const getProcedureDetailsWithFilters = async (req, res, next) => {
    try {
        const { page = null, perPage = null, searchKey, deptId, serviceId, buId, branchId, createdUser, updatedUser, deletedUser, fromDate, toDate, clientId } = await sanitizeBody(req.query);
        const validation = [
            clientIdValidation({ clientId })
        ];

        if (buId) {
            validation.push(mongoIdValidation({ _id: buId, name: "businessUnitId" }));
        }

        if (branchId) {
            validation.push(mongoIdValidation({ _id: branchId, name: "branchId" }));
        }

        if (deptId) {
            validation.push(mongoIdValidation({ _id: deptId, name: "deptId" }));
        }

        if (serviceId) {
            validation.push(mongoIdValidation({ _id: serviceId, name: "serviceId" }));
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

        const result = await getProcedureDetailsWithFiltersFn({ page, perPage, searchKey, deptId, serviceId, buId, branchId, createdUser, updatedUser, deletedUser, fromDate, toDate, clientId });
        return res.status(200).json({ status: result?.status, message: result?.message, data: result?.data });
    }catch(error){
        next(error);
    }
}

module.exports = getProcedureDetailsWithFilters;