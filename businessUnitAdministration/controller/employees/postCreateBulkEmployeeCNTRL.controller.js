const sanitizeBody = require("../../../utils/sanitizeBody");
const { clientIdValidation } = require("../../../utils/validation");
const postCreateBulkEmployeeFN = require("../../services/employees/postCreateBulkEmployeeFN");
const postCreateBulkServiceFN = require("../../services/Services/postCreateBulkServiceFn");

const postCreateBulkEmployeeCTRL = async (req, res, next) =>{
    const {clientId, buId, branchId, data} = await sanitizeBody(req?.body) 
    const validation = [
        clientIdValidation({ clientId })
    ];
    const errors = validation.filter((e) => !e.status);
    if (errors.length > 0) return res.status(400).json({ status: false, message: errors.map((e) => e.message).join(", ") });
    console.log('reached Backend')
    const mainUser = req?.user;
    const result = await postCreateBulkEmployeeFN({ clientId, buId, branchId, arrayObj : data, mainUser_id : mainUser?._id })
    return res.status(200).json({ status: result?.status, message: result?.message, data: result?.data });
}

module.exports = postCreateBulkEmployeeCTRL