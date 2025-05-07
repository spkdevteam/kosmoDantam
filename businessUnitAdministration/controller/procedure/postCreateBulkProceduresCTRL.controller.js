const sanitizeBody = require("../../../utils/sanitizeBody");
const { clientIdValidation, mongoIdValidation, isValidDate } = require("../../../utils/validation");
const postCreateBulkProceduresFN = require("../../services/procedure/postCreateBulkProceduresFN");
const postCreateBulkProceduresCTRL = async (req, res, next) => {
    const { clientId, buId, branchId, data } = await sanitizeBody(req?.body);
    const validation = [
        clientIdValidation({ clientId })
    ];
    const errors = validation.filter((e) => !e.status);
    if (errors.length > 0) return res.status(400).json({ status: false, message: errors.map((e) => e.message).join(", ") });
    console.log('reached Backend')
    const mainUser = req?.user;
    const result = await postCreateBulkProceduresFN({ clientId, buId, branchId, arrayObj : data, mainUser_id : mainUser?._id })
    return res.status(result?.status ? 200 : 400).json({ status: result?.status, message: result?.message, data: result?.data || [] });
}
module.exports = postCreateBulkProceduresCTRL