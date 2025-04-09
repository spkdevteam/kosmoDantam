const mongoose = require("mongoose");
const reverseUpdateCaseSheetWithInvoiceNumberFn = require("../../services/caseSheet/reverseUpdateCaseSheetWithInvoiceNumberFn");
const reverseUpdateCaseSheetWithInvoiceNumber = async (req, res, next) => {
    try {  //clientId, invoiceId, branchId, updatedByUserId
        console.log("req?.body==>>",req?.body)
        const { clientId, invoiceId, branchId } = req?.body;
        const user = req?.user;
        if (!clientId || !invoiceId) return { status: false, message: "Bad request!!", data: {} };
        if (!mongoose.Types.ObjectId.isValid(invoiceId)) {
            return { status: false, message: "Invalid invoiceId", data: {} };
        }
        const clientIdValidation = ({ clientId }) => {
            if (!clientId || typeof clientId !== "string" || clientId.length !== 24 || !/^[A-Za-z0-9]+$/.test(clientId)) {
                return { status: false, message: "Some networking problem", data: [] };
            }
        }
        clientIdValidation({ clientId });
        const result = await reverseUpdateCaseSheetWithInvoiceNumberFn({ clientId, invoiceId, branchId, updatedByUserId: user?._id })
        if (!result?.status) return res.status(500).json({ status: false, message: result?.message, data: {} });
        return res.status(200).json({ status: result?.status, message: result?.message, data: result?.data });

    }
    catch (error) {
        next(error);
    }
}
module.exports = reverseUpdateCaseSheetWithInvoiceNumber