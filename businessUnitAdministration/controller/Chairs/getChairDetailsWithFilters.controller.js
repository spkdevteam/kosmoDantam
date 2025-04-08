const sanitizeBody = require("../../../utils/sanitizeBody");
const { mongoIdValidation, clientIdValidation, isValidDate, validateStatus } = require("../../../utils/validation");
const getChairDetailsWithFiltersFn = require("../../services/chair/getChairDetailsWithFiltersFn");

const getChairDetailsWithFilters = async (req, res, next) => {
    try {
        const { page = null, perPage = null, searchKey, chairId, businessUnitId, branchId, status, fromDate, toDate, createdUser, updatedUser, deletedUser, clientId } = await sanitizeBody(req.query);

        const validation = [
            clientIdValidation({ clientId })
        ];
        if(chairId){
            validation.push(mongoIdValidation({_id: chairId, name: "chairId"}));
        }
        if(businessUnitId){
            validation.push(mongoIdValidation({_id: businessUnitId, name: "businessUnitId"}));
        }
        if(branchId){
            validation.push(mongoIdValidation({_id: branchId, name: "branchId"}));
        }
        if(createdUser){
            validation.push(mongoIdValidation({_id: createdUser, name: "createdUser"}));
        }
        if(updatedUser){
            validation.push(mongoIdValidation({_id: updatedUser, name: "updatedUser"}));
        }
        if(deletedUser){
            validation.push(mongoIdValidation({_id: deletedUser, name: "deletedUser"}));
        }
        // if(status){
        //     validation.push(validateStatus({ value: status }));
        // }

        const errors = validation.filter((e)=> !e.status);
        if(errors.length > 0) return res.status(400).json({status: false, message: errors.map((e)=> e.message).join(", ")})

        if (page && (isNaN(page) || page < 1)) return { status: false, message: "Invalid page number" };
        if (perPage && (isNaN(perPage) || perPage < 1)) return { status: false, message: "Invalid per page number" };

        if (fromDate && !isValidDate({ value: fromDate }).status) return { status: false, message: "Invalid from date" };
        if (toDate && !isValidDate({ value: toDate }).status) return { status: false, message: "Invalid to date" };
        const result = await getChairDetailsWithFiltersFn({ page, perPage, searchKey, chairId, businessUnitId, branchId, status, fromDate, toDate, createdUser, updatedUser, deletedUser, clientId });
        return res.status(200).json({ status: result?.status, message: result?.message, data: result?.data });
    } catch (error) {
        next(error);
    }
}

module.exports = getChairDetailsWithFilters;