const updateCaseSheetWithInvoiceNumberFn = require("../../services/caseSheet/updateCaseSheetWithInvoiceNumberFn");
const mongoose = require("mongoose");
const updateCaseSheetWithInvoiceNumber = async (req, res, next) => {
    try {
        const { clientId, invoice, branchId } = req?.body;
        if (!clientId || !invoice || !branchId) return { status: false, message: "Bad request!!", data: [] };
       
        if (!mongoose.Types.ObjectId.isValid(branchId)) {
            return { status: false, message: "Invalid branchId", data: [] };
        }
        const clientIdValidation = ({ clientId }) => {
            if (!clientId || typeof clientId !== "string" || clientId.length !== 24 || !/^[A-Za-z0-9]+$/.test(clientId)) {
                return { status: false, message: "Some networking problem",  data : [] };
            }
        }
        clientIdValidation({ clientId });
        if (!mongoose.Types.ObjectId.isValid(invoice?._id)) {
            return { status: false, message: "Invalid Invoice ID", data: [] };
        }
        const result = await updateCaseSheetWithInvoiceNumberFn({ clientId, invoice, branchId });
        return res.status(200).json({ status: result?.status, message: result?.message, data: result?.data});
    }
    catch (error) {
        next(error);
    }
}

module.exports = updateCaseSheetWithInvoiceNumber