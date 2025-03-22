const caseSheetSchema = require("../../../client/model/caseSheet");
const { getClientDatabaseConnection } = require("../../../db/connection");
const mongoose = require("mongoose");

const updateCaseSheetWithInvoiceNumberFn = async ({ clientId, caseSheetId, invoice, branchId }) => {
    try { 
        const db = await getClientDatabaseConnection(clientId);
        const CaseSheetModelObj = await db.model('caseSheet', caseSheetSchema);
        const fetchedCaseSheet = await CaseSheetModelObj.findOne({ _id: caseSheetId, deletedAt: null });
        console.log("fetchedCaseSheetfetchedCaseSheet=>", fetchedCaseSheet);
        if (!fetchedCaseSheet) return { status: false, message: "Casesheet can't be found or deleted already!!", data: {} };
        

    }
    catch (error) {

    }
}

module.exports = updateCaseSheetWithInvoiceNumberFn